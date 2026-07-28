package com.intervo.api.repository;

import com.intervo.api.entity.UserProgress;
import com.intervo.api.entity.UserProgressId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserProgressRepository extends JpaRepository<UserProgress, UserProgressId> {
    List<UserProgress> findAllByUserId(Long userId);
    long countByUserId(Long userId);
}
