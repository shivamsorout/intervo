CREATE TABLE user_progress (
    user_id         BIGINT NOT NULL,
    content_unit_id BIGINT NOT NULL,
    status          VARCHAR(20) NOT NULL,
    last_viewed_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, content_unit_id),
    CONSTRAINT fk_user_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_progress_content_unit FOREIGN KEY (content_unit_id) REFERENCES content_units(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE bookmarks (
    user_id         BIGINT NOT NULL,
    content_unit_id BIGINT NOT NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, content_unit_id),
    CONSTRAINT fk_bookmarks_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_bookmarks_content_unit FOREIGN KEY (content_unit_id) REFERENCES content_units(id) ON DELETE CASCADE
) ENGINE=InnoDB;
