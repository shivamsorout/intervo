package com.intervo.api.dto;

import com.intervo.api.entity.Topic;

public record TopicResponse(
        Long id,
        String slug,
        String name,
        String description,
        int sortOrder
) {
    public static TopicResponse from(Topic topic) {
        return new TopicResponse(topic.getId(), topic.getSlug(), topic.getName(), topic.getDescription(), topic.getSortOrder());
    }
}
