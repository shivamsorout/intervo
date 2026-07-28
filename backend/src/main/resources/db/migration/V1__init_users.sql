CREATE TABLE users (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NULL,
    name            VARCHAR(255) NOT NULL,
    role            VARCHAR(32)  NOT NULL DEFAULT 'STUDENT',
    provider        VARCHAR(32)  NOT NULL DEFAULT 'LOCAL',
    enabled         BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login_at   DATETIME     NULL
) ENGINE=InnoDB;

CREATE TABLE user_profiles (
    user_id           BIGINT PRIMARY KEY,
    experience_level  VARCHAR(32) NULL,
    target_stack      VARCHAR(64) NULL,
    avatar_url        VARCHAR(512) NULL,
    CONSTRAINT fk_user_profiles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE refresh_tokens (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    token_hash  VARCHAR(255) NOT NULL UNIQUE,
    expires_at  DATETIME NOT NULL,
    revoked     BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_refresh_tokens_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
