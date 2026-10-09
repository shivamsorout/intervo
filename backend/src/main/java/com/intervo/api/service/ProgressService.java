package com.intervo.api.service;

import com.intervo.api.dto.ProgressResponse;
import com.intervo.api.dto.ProgressSummaryResponse;
import com.intervo.api.entity.ProgressStatus;
import com.intervo.api.entity.UserProgress;
import com.intervo.api.entity.UserProgressId;
import com.intervo.api.exception.ApiException;
import com.intervo.api.repository.ContentUnitRepository;
import com.intervo.api.repository.UserProgressRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProgressService {

    private final UserProgressRepository userProgressRepository;
    private final ContentUnitRepository contentUnitRepository;

    @Transactional
    public ProgressResponse setProgress(Long userId, Long contentUnitId, ProgressStatus status) {
        if (!contentUnitRepository.existsById(contentUnitId)) {
            throw new ApiException(HttpStatus.NOT_FOUND, "CONTENT_NOT_FOUND", "Content unit not found");
        }

        UserProgressId id = new UserProgressId(userId, contentUnitId);
        UserProgress progress = userProgressRepository.findById(id).orElse(null);

        if (progress == null) {
            progress = UserProgress.builder()
                    .userId(userId)
                    .contentUnitId(contentUnitId)
                    .status(status)
                    .lastViewedAt(LocalDateTime.now())
                    .build();
        } else if (progress.getStatus() == ProgressStatus.COMPLETED && status == ProgressStatus.IN_PROGRESS) {
            progress.setLastViewedAt(LocalDateTime.now());
        } else {
            progress.setStatus(status);
            progress.setLastViewedAt(LocalDateTime.now());
        }

        progress = userProgressRepository.save(progress);
        return ProgressResponse.from(progress);
    }

    @Transactional(readOnly = true)
    public ProgressResponse getProgress(Long userId, Long contentUnitId) {
        return userProgressRepository.findById(new UserProgressId(userId, contentUnitId))
                .map(ProgressResponse::from)
                .orElse(null);
    }

    @Transactional(readOnly = true)
    public ProgressSummaryResponse getSummary(Long userId) {
        long completedCount = userProgressRepository.countByUserIdAndStatus(userId, ProgressStatus.COMPLETED);
        long inProgressCount = userProgressRepository.countByUserIdAndStatus(userId, ProgressStatus.IN_PROGRESS);
        return new ProgressSummaryResponse(completedCount, inProgressCount);
    }
}
