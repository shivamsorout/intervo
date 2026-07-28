# Phase 5 — Jobs & Career Tools: Intervo Jobs + Learn

## Goal
Close the loop from "prepared" to "hired" with job tracking, referrals, career roadmaps, and lightweight coding/system-design practice.

## Scope
**In:** job application tracker, referral/hiring update feed, career roadmaps, coding practice (basic), system design primers.
**Out:** full competitive-programming judge (out of scope — link out or keep minimal), full recruiter/hiring marketplace (future "Intervo Recruit").

## Frontend Tasks
- Job Tracker board (Kanban: Saved → Applied → Interviewing → Offer → Rejected) per user.
- Company hiring updates feed (curated/aggregated postings, referral tags).
- Career Roadmap viewer (visual, stack-specific — e.g., "Backend Developer Roadmap") linking into Phase 1 content.
- Coding Practice module: problem list + in-browser code editor (Monaco) + run/submit against test cases.
- System Design primer pages (diagrams + write-ups, reusing Phase 1's Read/PPT view components).

## Backend Tasks
- Job application tracker CRUD API (per-user, private data).
- Hiring updates ingestion — manual/admin-curated initially; scriptable scraper/partner-feed later.
- Roadmap content model (nodes + edges referencing existing `content_units`/`topics`).
- Code execution service for coding practice — **sandboxed** execution (isolated Docker containers per submission, strict CPU/memory/time limits, no network access) or a managed code-execution API (e.g., Judge0) instead of building an in-house sandbox from scratch.
- Test case storage + grading per problem.

## Data Model
- `job_applications` (id, user_id, company, role, status, applied_at, notes)
- `hiring_updates` (id, company_id, role, link, posted_at, tags)
- `roadmap_nodes` (id, stack, title, topic_id, position, prerequisite_ids)
- `coding_problems` (id, title, difficulty, statement, starter_code, test_cases_json)
- `submissions` (id, user_id, problem_id, code, language, status, runtime_ms, created_at)

## AI/Infra Notes
- Code execution is the one component with real security exposure — isolate it in its own service/network boundary, never execute user code in the main API process.
- Roadmaps and system design pages should be pure content authored through the Phase 1 CMS, not a new content system.

## Exit Criteria
- [ ] User can track a job application through the full pipeline.
- [ ] At least one full stack-specific roadmap is browsable and links into real content.
- [ ] Coding practice: a learner can submit code and get pass/fail results safely sandboxed.
