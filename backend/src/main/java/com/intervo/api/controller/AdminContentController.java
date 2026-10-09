package com.intervo.api.controller;

import com.intervo.api.common.ApiResponse;
import com.intervo.api.dto.GenerateContentRequest;
import com.intervo.api.dto.GeneratedContentResponse;
import com.intervo.api.dto.SaveContentRequest;
import com.intervo.api.dto.SavedContentResponse;
import com.intervo.api.security.UserPrincipal;
import com.intervo.api.service.AdminContentService;
import com.intervo.api.service.GeminiContentGeneratorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/content")
@RequiredArgsConstructor
public class AdminContentController {

    private final GeminiContentGeneratorService geminiContentGeneratorService;
    private final AdminContentService adminContentService;

    @PostMapping("/generate")
    public ResponseEntity<ApiResponse<GeneratedContentResponse>> generate(@Valid @RequestBody GenerateContentRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(geminiContentGeneratorService.generate(request)));
    }

    @PostMapping("/save")
    public ResponseEntity<ApiResponse<SavedContentResponse>> save(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody SaveContentRequest request) {
        SavedContentResponse response = adminContentService.saveContent(request, principal.getUser().getId());
        return ResponseEntity.ok(ApiResponse.ok(response));
    }
}
