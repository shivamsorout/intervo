# Phase 2 — AI Features: Intervo AI

## Goal
Differentiate from static content sites (YouTube/GfG/blogs) with an AI mentor, doubt solver, and mock interview experience built on OpenAI/Gemini.

## Scope
**In:** AI doubt solver (chat-with-content), AI mentor (personalized guidance), AI mock interview (voice/text Q&A with feedback).
**Out:** resume AI (Phase 3), community AI moderation (later).

## Frontend Tasks
- Chat UI (streaming responses) embedded contextually on content pages ("Ask AI about this topic").
- AI Mentor dashboard: personalized "what to study next" recommendations, weak-area detection.
- AI Mock Interview flow: topic/company/experience selection → live Q&A session → post-session feedback report (scorecard, strengths/gaps, suggested resources).
- Optional voice input/output for mock interviews (Web Speech API or a provider SDK).
- Usage/quota indicators (e.g., "X AI credits remaining") if metering free vs. paid tiers.

## Backend Tasks
- AI gateway service abstracting OpenAI/Gemini behind a single internal interface (provider-agnostic, supports fallback/model switching).
- Doubt solver: RAG pipeline — embed Phase 1 content units into a vector store, retrieve relevant chunks, answer with citations back to the source content.
- AI Mentor: recommendation engine combining `user_progress` data + performance signals to suggest next topics.
- Mock Interview: session orchestration — generate questions per (stack, company, experience_level), score/evaluate free-text or transcribed answers, generate structured feedback.
- Token/cost tracking per user; rate limiting and quota enforcement (Redis counters).
- Async processing for long-running AI tasks (queue + webhook/polling) to avoid blocking HTTP threads.

## Data Model
- `ai_conversations` (id, user_id, context_content_unit_id, created_at)
- `ai_messages` (conversation_id, role, content, created_at)
- `content_embeddings` (content_unit_id, embedding_vector, chunk_text) — vector store (pgvector/OpenSearch k-NN/Pinecone, per infra choice)
- `mock_interview_sessions` (id, user_id, stack, company_id, experience_level, status, score, feedback_json)
- `ai_usage_quota` (user_id, period, tokens_used, requests_used)

## AI/Infra Notes
- Prompt templates and system prompts stored server-side (versioned), not hardcoded per call site.
- Guardrails: input sanitization, output length caps, PII scrubbing before logging.
- Cost control: cache frequent doubt-solver Q&As; pick a cheaper model for classification/routing and a stronger model only for generation/evaluation.
- Consider a queue (SQS) between mock-interview submission and AI evaluation for reliability at scale.

## Exit Criteria
- [ ] Learner can ask a question on any content page and get a grounded, cited AI answer.
- [ ] AI Mentor surfaces at least one concrete "next step" recommendation per user.
- [ ] A full mock interview session (question generation → answer → scored feedback) works end-to-end for Spring Boot backend questions.
- [ ] Quota/rate limiting prevents runaway AI spend.
