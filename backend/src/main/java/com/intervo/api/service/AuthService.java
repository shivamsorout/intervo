package com.intervo.api.service;

import com.intervo.api.dto.AuthResponse;
import com.intervo.api.dto.LoginRequest;
import com.intervo.api.dto.SignupRequest;
import com.intervo.api.dto.UserResponse;
import com.intervo.api.entity.AuthProvider;
import com.intervo.api.entity.PasswordResetToken;
import com.intervo.api.entity.RefreshToken;
import com.intervo.api.entity.Role;
import com.intervo.api.entity.User;
import com.intervo.api.exception.ApiException;
import com.intervo.api.repository.PasswordResetTokenRepository;
import com.intervo.api.repository.RefreshTokenRepository;
import com.intervo.api.repository.UserRepository;
import com.intervo.api.security.JwtService;
import com.intervo.api.security.RefreshTokenGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private static final long PASSWORD_RESET_TTL_MINUTES = 30;

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenGenerator refreshTokenGenerator;

    @Value("${app.jwt.refresh-token-ttl-days}")
    private long refreshTokenTtlDays;

    @Value("${app.frontend.base-url}")
    private String frontendBaseUrl;

    @Transactional
    public AuthResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ApiException(HttpStatus.CONFLICT, "EMAIL_TAKEN", "An account with this email already exists");
        }

        User user = User.builder()
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .name(request.name())
                .role(Role.STUDENT)
                .provider(AuthProvider.LOCAL)
                .build();
        user = userRepository.save(user);

        return issueTokens(user);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS", "Invalid email or password"));

        if (user.getPasswordHash() == null || !passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS", "Invalid email or password");
        }

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        return issueTokens(user);
    }

    @Transactional
    public AuthResponse refresh(String rawRefreshToken) {
        String hash = refreshTokenGenerator.hash(rawRefreshToken);
        RefreshToken stored = refreshTokenRepository.findByTokenHashAndRevokedFalse(hash)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_REFRESH_TOKEN", "Refresh token is invalid or expired"));

        if (stored.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_REFRESH_TOKEN", "Refresh token is invalid or expired");
        }

        User user = userRepository.findById(stored.getUserId())
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_REFRESH_TOKEN", "Refresh token is invalid or expired"));

        stored.setRevoked(true);
        refreshTokenRepository.save(stored);

        return issueTokens(user);
    }

    @Transactional
    public void logout(String rawRefreshToken) {
        String hash = refreshTokenGenerator.hash(rawRefreshToken);
        refreshTokenRepository.findByTokenHashAndRevokedFalse(hash).ifPresent(token -> {
            token.setRevoked(true);
            refreshTokenRepository.save(token);
        });
    }

    @Transactional
    public User findOrCreateOAuthUser(String email, String name, AuthProvider provider) {
        return userRepository.findByEmail(email)
                .orElseGet(() -> userRepository.save(User.builder()
                        .email(email)
                        .name(name)
                        .role(Role.STUDENT)
                        .provider(provider)
                        .passwordHash(null)
                        .build()));
    }

    @Transactional
    public AuthResponse issueTokens(User user) {
        String accessToken = jwtService.generateAccessToken(user);

        String rawRefreshToken = refreshTokenGenerator.generateRawToken();
        RefreshToken refreshToken = RefreshToken.builder()
                .userId(user.getId())
                .tokenHash(refreshTokenGenerator.hash(rawRefreshToken))
                .expiresAt(LocalDateTime.now().plusDays(refreshTokenTtlDays))
                .build();
        refreshTokenRepository.save(refreshToken);

        return new AuthResponse(accessToken, rawRefreshToken, UserResponse.from(user));
    }

    /**
     * Always succeeds from the caller's perspective (no email enumeration), even if
     * no account matches. Email delivery isn't wired up yet (see Phase 6 - SES) so the
     * reset link is logged instead; swap this for a real mailer without changing callers.
     */
    @Transactional
    public void forgotPassword(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            String rawToken = refreshTokenGenerator.generateRawToken();
            PasswordResetToken resetToken = PasswordResetToken.builder()
                    .userId(user.getId())
                    .tokenHash(refreshTokenGenerator.hash(rawToken))
                    .expiresAt(LocalDateTime.now().plusMinutes(PASSWORD_RESET_TTL_MINUTES))
                    .build();
            passwordResetTokenRepository.save(resetToken);

            String resetLink = frontendBaseUrl + "/reset-password?token=" + rawToken;
            log.info("Password reset link for {}: {}", user.getEmail(), resetLink);
        });
    }

    @Transactional
    public void resetPassword(String rawToken, String newPassword) {
        String hash = refreshTokenGenerator.hash(rawToken);
        PasswordResetToken resetToken = passwordResetTokenRepository.findByTokenHashAndUsedFalse(hash)
                .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "INVALID_RESET_TOKEN", "This reset link is invalid or has expired"));

        if (resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_RESET_TOKEN", "This reset link is invalid or has expired");
        }

        User user = userRepository.findById(resetToken.getUserId())
                .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "INVALID_RESET_TOKEN", "This reset link is invalid or has expired"));

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        resetToken.setUsed(true);
        passwordResetTokenRepository.save(resetToken);

        refreshTokenRepository.deleteByUserId(user.getId());
    }
}
