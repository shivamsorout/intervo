package com.intervo.api.dto;

public record ProgressSummaryResponse(
        long completedCount,
        long inProgressCount
) {
}
