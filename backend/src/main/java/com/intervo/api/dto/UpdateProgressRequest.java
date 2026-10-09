package com.intervo.api.dto;

import com.intervo.api.entity.ProgressStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateProgressRequest(
        @NotNull ProgressStatus status
) {
}
