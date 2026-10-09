package com.intervo.api.service;

import com.intervo.api.dto.BookmarkStatusResponse;
import com.intervo.api.dto.BookmarkSummaryResponse;
import com.intervo.api.entity.Bookmark;
import com.intervo.api.entity.BookmarkId;
import com.intervo.api.exception.ApiException;
import com.intervo.api.repository.BookmarkRepository;
import com.intervo.api.repository.ContentUnitRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final ContentUnitRepository contentUnitRepository;

    @Transactional
    public BookmarkStatusResponse addBookmark(Long userId, Long contentUnitId) {
        if (!contentUnitRepository.existsById(contentUnitId)) {
            throw new ApiException(HttpStatus.NOT_FOUND, "CONTENT_NOT_FOUND", "Content unit not found");
        }

        BookmarkId id = new BookmarkId(userId, contentUnitId);
        if (!bookmarkRepository.existsById(id)) {
            bookmarkRepository.save(Bookmark.builder().userId(userId).contentUnitId(contentUnitId).build());
        }
        return new BookmarkStatusResponse(true);
    }

    @Transactional
    public BookmarkStatusResponse removeBookmark(Long userId, Long contentUnitId) {
        bookmarkRepository.deleteById(new BookmarkId(userId, contentUnitId));
        return new BookmarkStatusResponse(false);
    }

    @Transactional(readOnly = true)
    public BookmarkStatusResponse getStatus(Long userId, Long contentUnitId) {
        return new BookmarkStatusResponse(bookmarkRepository.existsById(new BookmarkId(userId, contentUnitId)));
    }

    @Transactional(readOnly = true)
    public BookmarkSummaryResponse getSummary(Long userId) {
        return new BookmarkSummaryResponse(bookmarkRepository.countByUserId(userId));
    }
}
