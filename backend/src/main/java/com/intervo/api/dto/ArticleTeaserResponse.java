package com.intervo.api.dto;

import java.time.LocalDateTime;

public record ArticleTeaserResponse(
        Long id,
        String title,
        String excerpt,
        String stackSlug,
        String stackName,
        String topicSlug,
        String subtopicSlug,
        LocalDateTime updatedAt
) {
}
