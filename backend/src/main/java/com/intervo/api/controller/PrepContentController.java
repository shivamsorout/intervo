package com.intervo.api.controller;

import com.intervo.api.common.ApiResponse;
import com.intervo.api.dto.ContentUnitResponse;
import com.intervo.api.dto.StackResponse;
import com.intervo.api.dto.StackStatsResponse;
import com.intervo.api.dto.SubtopicResponse;
import com.intervo.api.dto.TopicResponse;
import com.intervo.api.security.UserPrincipal;
import com.intervo.api.service.PrepContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stacks")
@RequiredArgsConstructor
public class PrepContentController {

    private final PrepContentService prepContentService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<StackResponse>>> listStacks() {
        return ResponseEntity.ok(ApiResponse.ok(prepContentService.listStacks()));
    }

    @GetMapping("/{stackSlug}/topics")
    public ResponseEntity<ApiResponse<List<TopicResponse>>> listTopics(@PathVariable String stackSlug) {
        return ResponseEntity.ok(ApiResponse.ok(prepContentService.listTopics(stackSlug)));
    }

    @GetMapping("/{stackSlug}/topics/{topicSlug}/subtopics")
    public ResponseEntity<ApiResponse<List<SubtopicResponse>>> listSubtopics(
            @PathVariable String stackSlug, @PathVariable String topicSlug) {
        return ResponseEntity.ok(ApiResponse.ok(prepContentService.listSubtopics(stackSlug, topicSlug)));
    }

    @GetMapping("/{stackSlug}/topics/{topicSlug}/subtopics/{subtopicSlug}/content")
    public ResponseEntity<ApiResponse<ContentUnitResponse>> getContent(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable String stackSlug, @PathVariable String topicSlug, @PathVariable String subtopicSlug) {
        ContentUnitResponse response = prepContentService.getArticle(stackSlug, topicSlug, subtopicSlug, principal != null);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @GetMapping("/{stackSlug}/stats")
    public ResponseEntity<ApiResponse<StackStatsResponse>> getStats(@PathVariable String stackSlug) {
        return ResponseEntity.ok(ApiResponse.ok(prepContentService.getStackStats(stackSlug)));
    }
}
