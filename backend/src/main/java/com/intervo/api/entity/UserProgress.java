package com.intervo.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_progress")
@IdClass(UserProgressId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProgress {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Id
    @Column(name = "content_unit_id")
    private Long contentUnitId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProgressStatus status;

    @Column(name = "last_viewed_at", nullable = false)
    @Builder.Default
    private LocalDateTime lastViewedAt = LocalDateTime.now();
}
