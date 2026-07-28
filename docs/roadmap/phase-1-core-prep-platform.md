# Phase 1 — Core Prep Platform (MVP): Intervo Prep

## Goal
Ship the MVP people actually came for: structured interview prep content for Java / Spring Boot / Backend Development, in multiple learning formats, with progress tracking.

## Scope
**In:** content model + CMS, topic/roadmap browsing, Read View, PPT View, flash cards, mind maps, quick revision sheets, company-wise question banks, progress tracking.
**Out:** AI generation/doubt solving (Phase 2), resume tools (Phase 3), community (Phase 4).

## Frontend Tasks
- Content browsing: stack → topic → subtopic tree navigation (starting with Java/Spring Boot/Backend).
- **Read View**: article-style long-form content renderer (markdown/rich text) with code blocks (JetBrains Mono), syntax highlighting, table of contents.
- **PPT View**: slide-based renderer for the same content — swipe/arrow navigation, presentation-style cards.
- **Flash Cards**: swipeable Q&A card component with flip animation, spaced-repetition style "mark as known/unsure".
- **Mind Maps**: interactive node-graph viewer (e.g., React Flow) for topic relationships.
- **Quick Revision Sheets**: condensed, printable/exportable cheat-sheet view per topic.
- **Company-wise Questions**: filterable question bank (company × topic × difficulty × experience level).
- Progress tracking UI: per-topic completion %, streaks, dashboard widgets.
- Search across all content types.
- Bookmarking / "save for later".

## Backend Tasks
- Content domain model supporting one logical topic rendered in multiple views (read/ppt/flashcard/mindmap/sheet) without duplicating authoring.
- CMS/admin API for content editors to create/update/publish content (draft → review → published states).
- Company & question bank APIs with filtering/pagination.
- Progress tracking service: track view/completion events per user per content unit.
- Search: start with MySQL full-text or a lightweight Elasticsearch/OpenSearch index if content volume warrants it.
- Content versioning (so edits don't break in-progress user sessions).

## Data Model
- `stacks` (Java, Spring Boot, Backend, …), `topics`, `subtopics` (hierarchical, ordered)
- `content_units` (id, subtopic_id, type: ARTICLE, PPT_SLIDE, FLASHCARD, MINDMAP_NODE, REVISION_SHEET, status, version)
- `companies` (id, name, logo_url)
- `questions` (id, company_id, topic_id, difficulty, experience_level, question_text, answer_text)
- `user_progress` (user_id, content_unit_id, status: NOT_STARTED/IN_PROGRESS/COMPLETED, last_viewed_at)
- `bookmarks` (user_id, content_unit_id)

## AI/Infra Notes
- No live AI calls yet, but author content with an eye toward Phase 2 (AI will later generate/summarize these same content units — keep content structured/JSON-friendly, not free-form HTML blobs).
- S3 for content assets (images/diagrams); CloudFront CDN in front.
- Redis caching for hot content trees and question bank filters.

## Exit Criteria
- [ ] A learner can pick "Spring Boot", browse topics, and consume the same topic in Read View, PPT View, Flash Cards, and a Revision Sheet.
- [ ] Company-wise question bank is filterable and searchable.
- [ ] Progress is tracked and visible on the dashboard.
- [ ] Content editors can publish new content without a deploy.
