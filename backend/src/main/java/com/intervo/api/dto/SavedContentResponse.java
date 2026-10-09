package com.intervo.api.dto;

public record SavedContentResponse(
        ContentUnitResponse contentUnit,
        String stackSlug,
        String topicSlug,
        String subtopicSlug
) {
}
