package com.intervo.api.repository;

import com.intervo.api.entity.Subtopic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubtopicRepository extends JpaRepository<Subtopic, Long> {
    List<Subtopic> findAllByTopicIdOrderBySortOrderAsc(Long topicId);
    Optional<Subtopic> findByTopicIdAndSlug(Long topicId, String slug);
    boolean existsByTopicIdAndSlug(Long topicId, String slug);
}
