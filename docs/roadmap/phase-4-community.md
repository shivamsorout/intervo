# Phase 4 — Community & Interview Experiences: Intervo Community

## Goal
Add the social/trust layer — real interview experiences and peer discussion — that static content sites can't replicate.

## Scope
**In:** interview experience posts, discussions/comments, career tips feed, moderation, reputation/basic gamification.
**Out:** hiring/recruiter-facing features (Enterprise/Recruit — future extension).

## Frontend Tasks
- Interview Experience submission flow (structured form: company, role, experience level, rounds, questions asked, outcome, narrative).
- Experience feed with filters (company, stack, experience level, outcome).
- Discussion threads (post + nested comments), upvote/downvote.
- User profile page: badges, contribution history, streaks (ties into Phase 1 progress data).
- Report/flag content UI for moderation.
- Notifications (in-app) for replies/mentions.

## Backend Tasks
- Experience post + comment domain model with moderation states (pending/published/flagged/removed).
- Voting/reputation service.
- Basic auto-moderation (profanity/spam filter; optionally reuse AI gateway for content-quality/toxicity checks).
- Admin moderation queue API.
- Notification service (in-app; email via SES optional).
- Link experience posts back into Phase 1's company-wise question bank (e.g., "add this question to the bank" admin action).

## Data Model
- `experience_posts` (id, user_id, company_id, role, experience_level, outcome, rounds_json, narrative, status, created_at)
- `comments` (id, post_id, user_id, parent_comment_id, content, status, created_at)
- `votes` (user_id, target_type, target_id, value)
- `reputation` (user_id, points, badges_json)
- `reports` (id, target_type, target_id, reporter_id, reason, status)

## AI/Infra Notes
- Feed ranking can start simple (recency + votes); revisit with a relevance model later.
- Reuse AI gateway for optional toxicity/spam classification instead of building a bespoke model.

## Exit Criteria
- [ ] User can publish an interview experience and it appears in a filterable feed.
- [ ] Comment/vote system works with basic moderation (flag → admin review → action).
- [ ] Reputation/badges visible on user profile.
