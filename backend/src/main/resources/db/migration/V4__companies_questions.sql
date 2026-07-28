CREATE TABLE companies (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    slug        VARCHAR(100) NOT NULL UNIQUE,
    name        VARCHAR(150) NOT NULL,
    logo_url    VARCHAR(512) NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE questions (
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id       BIGINT NULL,
    topic_id         BIGINT NULL,
    difficulty       VARCHAR(10) NOT NULL,
    experience_level VARCHAR(20) NOT NULL,
    question_text    TEXT NOT NULL,
    answer_text      MEDIUMTEXT NOT NULL,
    status           VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    created_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_questions_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL,
    CONSTRAINT fk_questions_topic FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE INDEX idx_questions_company ON questions(company_id);
CREATE INDEX idx_questions_topic ON questions(topic_id);
CREATE INDEX idx_questions_status ON questions(status);

INSERT INTO companies (slug, name) VALUES
    ('amazon', 'Amazon'),
    ('google', 'Google'),
    ('microsoft', 'Microsoft'),
    ('tcs', 'TCS'),
    ('infosys', 'Infosys'),
    ('wipro', 'Wipro'),
    ('accenture', 'Accenture'),
    ('cognizant', 'Cognizant');
