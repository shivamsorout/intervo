package com.intervo.api.controller;

import com.intervo.api.common.ApiResponse;
import com.intervo.api.dto.BookmarkStatusResponse;
import com.intervo.api.dto.BookmarkSummaryResponse;
import com.intervo.api.security.UserPrincipal;
import com.intervo.api.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<BookmarkSummaryResponse>> getSummary(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(ApiResponse.ok(bookmarkService.getSummary(principal.getUser().getId())));
    }

    @PutMapping("/{contentUnitId}")
    public ResponseEntity<ApiResponse<BookmarkStatusResponse>> addBookmark(
            @AuthenticationPrincipal UserPrincipal principal, @PathVariable Long contentUnitId) {
        return ResponseEntity.ok(ApiResponse.ok(bookmarkService.addBookmark(principal.getUser().getId(), contentUnitId)));
    }

    @DeleteMapping("/{contentUnitId}")
    public ResponseEntity<ApiResponse<BookmarkStatusResponse>> removeBookmark(
            @AuthenticationPrincipal UserPrincipal principal, @PathVariable Long contentUnitId) {
        return ResponseEntity.ok(ApiResponse.ok(bookmarkService.removeBookmark(principal.getUser().getId(), contentUnitId)));
    }

    @GetMapping("/{contentUnitId}")
    public ResponseEntity<ApiResponse<BookmarkStatusResponse>> getStatus(
            @AuthenticationPrincipal UserPrincipal principal, @PathVariable Long contentUnitId) {
        return ResponseEntity.ok(ApiResponse.ok(bookmarkService.getStatus(principal.getUser().getId(), contentUnitId)));
    }
}
