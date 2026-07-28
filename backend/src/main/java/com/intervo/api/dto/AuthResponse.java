package com.intervo.api.dto;

public record AuthResponse(
        String accessToken,
        String refreshToken,
        UserResponse user
) {
}
