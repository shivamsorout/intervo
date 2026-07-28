package com.intervo.api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;

/**
 * Simple fixed-window rate limiter for auth endpoints, backed by Redis.
 * Keyed by client IP + path so one abusive client can't lock out others.
 * Fails open (lets the request through) if Redis is unreachable or disabled,
 * so a Redis outage degrades to "unlimited" rather than locking out all auth traffic.
 */
@Slf4j
@Component
public class AuthRateLimitFilter extends OncePerRequestFilter {

    private final StringRedisTemplate redisTemplate;
    private final int limitPerMinute;
    private final boolean enabled;

    public AuthRateLimitFilter(
            StringRedisTemplate redisTemplate,
            @Value("${app.rate-limit.auth-requests-per-minute}") int limitPerMinute,
            @Value("${app.rate-limit.enabled}") boolean enabled
    ) {
        this.redisTemplate = redisTemplate;
        this.limitPerMinute = limitPerMinute;
        this.enabled = enabled;
    }

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
        return !enabled || !request.getRequestURI().startsWith("/api/auth/");
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        String clientIp = request.getRemoteAddr();
        String key = "ratelimit:auth:" + clientIp + ":" + request.getRequestURI();

        try {
            Long count = redisTemplate.opsForValue().increment(key);
            if (count != null && count == 1L) {
                redisTemplate.expire(key, Duration.ofMinutes(1));
            }

            if (count != null && count > limitPerMinute) {
                response.setStatus(429);
                response.setContentType("application/json");
                response.getWriter().write("{\"success\":false,\"error\":{\"code\":\"RATE_LIMITED\",\"message\":\"Too many requests, please try again later.\"}}");
                return;
            }
        } catch (RedisConnectionFailureException e) {
            log.warn("Redis unavailable, skipping auth rate limit for this request: {}", e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}
