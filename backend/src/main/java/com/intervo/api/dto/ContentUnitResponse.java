package com.intervo.api.dto;

import com.intervo.api.entity.ContentUnit;

import java.time.LocalDateTime;

public record ContentUnitResponse(
        Long id,
        String type,
        String title,
        String body,
        LocalDateTime updatedAt
) {
    public static ContentUnitResponse from(ContentUnit unit) {
        return new ContentUnitResponse(unit.getId(), unit.getType().name(), unit.getTitle(), unit.getBody(), unit.getUpdatedAt());
    }
}
