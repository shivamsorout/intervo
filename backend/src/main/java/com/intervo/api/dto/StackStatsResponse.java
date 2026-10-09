package com.intervo.api.dto;

public record StackStatsResponse(
        long topicCount,
        long publishedArticleCount
) {
}
