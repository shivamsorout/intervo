package com.intervo.api.dto;

import com.intervo.api.entity.Difficulty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record GenerateContentRequest(
        @NotBlank String stackName,
        @NotBlank String topicName,
        @NotBlank String subtopicName,
        @NotNull Difficulty difficulty,
        String instructions
) {
}
