package com.intervo.api.repository;

import com.intervo.api.entity.Bookmark;
import com.intervo.api.entity.BookmarkId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookmarkRepository extends JpaRepository<Bookmark, BookmarkId> {
    List<Bookmark> findAllByUserId(Long userId);
    long countByUserId(Long userId);
}
