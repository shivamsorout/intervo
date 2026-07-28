package com.intervo.api.security;

import com.intervo.api.dto.AuthResponse;
import com.intervo.api.entity.AuthProvider;
import com.intervo.api.entity.User;
import com.intervo.api.service.AuthService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

/**
 * After Google OAuth2 login, mint our own JWT/refresh token pair (rather than
 * relying on the provider session) and hand it to the SPA via redirect.
 */
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final AuthService authService;

    @Value("${app.oauth2.success-redirect-url}")
    private String successRedirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        User user = authService.findOrCreateOAuthUser(email, name != null ? name : email, AuthProvider.GOOGLE);
        AuthResponse tokens = authService.issueTokens(user);

        String redirectUrl = UriComponentsBuilder.fromUriString(successRedirectUrl)
                .queryParam("accessToken", tokens.accessToken())
                .queryParam("refreshToken", tokens.refreshToken())
                .build()
                .toUriString();

        response.sendRedirect(redirectUrl);
    }
}
