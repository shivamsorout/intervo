CREATE TABLE stacks (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    slug        VARCHAR(100) NOT NULL UNIQUE,
    name        VARCHAR(150) NOT NULL,
    description VARCHAR(500) NULL,
    icon        VARCHAR(100) NULL,
    sort_order  INT NOT NULL DEFAULT 0,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE topics (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    stack_id    BIGINT NOT NULL,
    slug        VARCHAR(100) NOT NULL,
    name        VARCHAR(150) NOT NULL,
    description VARCHAR(500) NULL,
    sort_order  INT NOT NULL DEFAULT 0,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_topics_stack FOREIGN KEY (stack_id) REFERENCES stacks(id) ON DELETE CASCADE,
    CONSTRAINT uq_topics_stack_slug UNIQUE (stack_id, slug)
) ENGINE=InnoDB;

CREATE TABLE subtopics (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    topic_id    BIGINT NOT NULL,
    slug        VARCHAR(100) NOT NULL,
    name        VARCHAR(150) NOT NULL,
    sort_order  INT NOT NULL DEFAULT 0,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_subtopics_topic FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE,
    CONSTRAINT uq_subtopics_topic_slug UNIQUE (topic_id, slug)
) ENGINE=InnoDB;

CREATE TABLE content_units (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    subtopic_id BIGINT NOT NULL,
    type        VARCHAR(20) NOT NULL,
    title       VARCHAR(255) NOT NULL,
    body        MEDIUMTEXT NOT NULL,
    status      VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    version     INT NOT NULL DEFAULT 1,
    sort_order  INT NOT NULL DEFAULT 0,
    created_by  BIGINT NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_content_units_subtopic FOREIGN KEY (subtopic_id) REFERENCES subtopics(id) ON DELETE CASCADE,
    CONSTRAINT fk_content_units_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE INDEX idx_content_units_subtopic ON content_units(subtopic_id);
CREATE INDEX idx_content_units_status ON content_units(status);
