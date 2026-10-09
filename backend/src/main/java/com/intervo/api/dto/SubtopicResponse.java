package com.intervo.api.dto;

import com.intervo.api.entity.Subtopic;

public record SubtopicResponse(
        Long id,
        String slug,
        String name,
        int sortOrder
) {
    public static SubtopicResponse from(Subtopic subtopic) {
        return new SubtopicResponse(subtopic.getId(), subtopic.getSlug(), subtopic.getName(), subtopic.getSortOrder());
    }
}
