package com.intervo.api.repository;

import com.intervo.api.entity.Stack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StackRepository extends JpaRepository<Stack, Long> {
    Optional<Stack> findBySlug(String slug);
    boolean existsBySlug(String slug);
    List<Stack> findAllByOrderBySortOrderAsc();
}
