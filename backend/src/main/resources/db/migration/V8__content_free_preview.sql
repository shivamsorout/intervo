ALTER TABLE content_units
    ADD COLUMN is_free_preview TINYINT(1) NOT NULL DEFAULT 0;

UPDATE content_units cu
JOIN subtopics st ON cu.subtopic_id = st.id
JOIN topics t ON st.topic_id = t.id
JOIN stacks s ON t.stack_id = s.id
SET cu.is_free_preview = 1
WHERE s.slug = 'java' AND t.slug = 'collections' AND st.slug = 'hashmap-internals';
