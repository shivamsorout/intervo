package com.intervo.api.dto;

import com.intervo.api.entity.UserProgress;

import java.time.LocalDateTime;

public record ProgressResponse(
        Long contentUnitId,
        String status,
        LocalDateTime lastViewedAt
) {
    public static ProgressResponse from(UserProgress progress) {
        return new ProgressResponse(progress.getContentUnitId(), progress.getStatus().name(), progress.getLastViewedAt());
    }
}
