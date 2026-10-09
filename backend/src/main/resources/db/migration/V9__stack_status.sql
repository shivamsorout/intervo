ALTER TABLE stacks
    ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'PLANNED',
    ADD COLUMN track_type VARCHAR(20) NOT NULL DEFAULT 'LANGUAGE';

UPDATE stacks SET status = 'PUBLISHED', track_type = 'LANGUAGE' WHERE slug = 'java';
UPDATE stacks SET status = 'PLANNED', track_type = 'FRAMEWORK' WHERE slug = 'spring-boot';
UPDATE stacks SET status = 'PLANNED', track_type = 'SPECIALIZATION' WHERE slug = 'backend-development';

INSERT INTO stacks (slug, name, description, sort_order, status, track_type)
SELECT 'data-analyst', 'Data Analyst', 'SQL, spreadsheets, statistics, Python for analysis, and dashboards for data analyst interviews.', 4, 'PLANNED', 'JOB_ROLE'
WHERE NOT EXISTS (SELECT 1 FROM stacks WHERE slug = 'data-analyst');
