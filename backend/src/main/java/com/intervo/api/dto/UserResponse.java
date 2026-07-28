package com.intervo.api.dto;

import com.intervo.api.entity.Role;
import com.intervo.api.entity.User;

public record UserResponse(
        Long id,
        String email,
        String name,
        Role role
) {
    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getEmail(), user.getName(), user.getRole());
    }
}
