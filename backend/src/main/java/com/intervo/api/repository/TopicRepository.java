package com.intervo.api.repository;

import com.intervo.api.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findAllByStackIdOrderBySortOrderAsc(Long stackId);
    Optional<Topic> findByStackIdAndSlug(Long stackId, String slug);
    boolean existsByStackIdAndSlug(Long stackId, String slug);
}
