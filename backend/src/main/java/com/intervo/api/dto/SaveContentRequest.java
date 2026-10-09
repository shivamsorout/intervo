package com.intervo.api.dto;

import com.intervo.api.entity.ContentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SaveContentRequest(
        @NotBlank String stack,
        boolean stackIsNew,
        @NotBlank String topic,
        boolean topicIsNew,
        @NotBlank String subtopic,
        boolean subtopicIsNew,
        @NotBlank String title,
        @NotBlank String body,
        @NotNull ContentStatus status,
        boolean isFreePreview
) {
}
