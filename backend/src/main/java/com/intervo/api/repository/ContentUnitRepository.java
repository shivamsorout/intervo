package com.intervo.api.repository;

import com.intervo.api.entity.ContentStatus;
import com.intervo.api.entity.ContentType;
import com.intervo.api.entity.ContentUnit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContentUnitRepository extends JpaRepository<ContentUnit, Long> {
    List<ContentUnit> findAllBySubtopicIdOrderBySortOrderAsc(Long subtopicId);
    List<ContentUnit> findAllBySubtopicIdAndStatusOrderBySortOrderAsc(Long subtopicId, ContentStatus status);
    List<ContentUnit> findAllByStatusAndTypeOrderByUpdatedAtDesc(ContentStatus status, ContentType type);
}
