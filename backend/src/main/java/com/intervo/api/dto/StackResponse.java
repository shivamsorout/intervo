package com.intervo.api.dto;

import com.intervo.api.entity.Stack;

public record StackResponse(
        Long id,
        String slug,
        String name,
        String description,
        String icon,
        int sortOrder,
        String status,
        String trackType
) {
    public static StackResponse from(Stack stack) {
        return new StackResponse(stack.getId(), stack.getSlug(), stack.getName(), stack.getDescription(), stack.getIcon(), stack.getSortOrder(), stack.getStatus().name(), stack.getTrackType().name());
    }
}
