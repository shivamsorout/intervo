package com.intervo.api.controller;

import com.intervo.api.common.ApiResponse;
import com.intervo.api.dto.ProgressResponse;
import com.intervo.api.dto.ProgressSummaryResponse;
import com.intervo.api.dto.UpdateProgressRequest;
import com.intervo.api.security.UserPrincipal;
import com.intervo.api.service.ProgressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final ProgressService progressService;

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<ProgressSummaryResponse>> getSummary(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(ApiResponse.ok(progressService.getSummary(principal.getUser().getId())));
    }

    @PutMapping("/{contentUnitId}")
    public ResponseEntity<ApiResponse<ProgressResponse>> setProgress(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long contentUnitId,
            @Valid @RequestBody UpdateProgressRequest request) {
        ProgressResponse response = progressService.setProgress(principal.getUser().getId(), contentUnitId, request.status());
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @GetMapping("/{contentUnitId}")
    public ResponseEntity<ApiResponse<ProgressResponse>> getProgress(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long contentUnitId) {
        ProgressResponse response = progressService.getProgress(principal.getUser().getId(), contentUnitId);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }
}
