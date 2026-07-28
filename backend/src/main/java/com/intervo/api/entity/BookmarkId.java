package com.intervo.api.entity;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkId implements Serializable {
    private Long userId;
    private Long contentUnitId;
}
