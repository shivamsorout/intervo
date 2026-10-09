package com.intervo.api.controller;

import com.intervo.api.common.ApiResponse;
import com.intervo.api.dto.ArticleTeaserResponse;
import com.intervo.api.service.ArticleFeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleFeedController {

    private final ArticleFeedService articleFeedService;

    @GetMapping("/published")
    public ResponseEntity<ApiResponse<List<ArticleTeaserResponse>>> listPublished(
            @RequestParam(defaultValue = "6") int limit) {
        return ResponseEntity.ok(ApiResponse.ok(articleFeedService.listPublished(limit)));
    }
}
