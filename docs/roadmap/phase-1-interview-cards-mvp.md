# Phase 1 (Actual Build) — Interview Cards MVP

This is the real near-term build target, replacing the scope of [phase-1-core-prep-platform.md](phase-1-core-prep-platform.md) and pulling in a slice of [phase-2-ai-features.md](phase-2-ai-features.md) for now. Those two files stay as-is for later — this doc describes what we're actually building next.

## The Idea

A user comes to Intervo to prepare for an interview, for **any IT role** (not just Java/Spring Boot to start — the filter itself is what scopes it per visit).

- User picks filters — Language/Tech (e.g. Java), Level, Topic, maybe Company.
- Results show as **Cards** — not real PDFs, just styled cards like "Java Developer — Entry Level Interview Question & Answer".
- User opens a card → lands on a **Read View** of that Q&A content.
- While reading, an **AI chatbot sits alongside** the content so the user can ask doubts about what they're reading.
- This same pattern covers every IT stack/role, not just Java — one system, many cards.

On the admin side:

- Content is produced **by AI only** — no manual long-form writing.
- Admin fills a form: **Language, Level, Topic, No. of Questions**, plus a few more fields (see open questions below).
- Admin clicks **Generate** → AI produces the interview Q&A content.
- The AI's output loads into an **HTML editor (WYSIWYG)** where the admin can tweak wording, formatting, and **insert images** to make the card look complete before publishing.

## User-Facing Flow

1. **Browse/Filter page** — filter chips or dropdowns for Language/Tech, Level, Topic (Company optional). Results render as a grid of Cards.
2. **Card** — shows title (e.g. "Java Developer — Entry Level Interview Question & Answer"), tech tag, level tag, question count, maybe a short teaser.
3. **Card detail / Read View** — opens the full Q&A content (rendered from the admin-authored HTML) in a clean reading layout.
4. **AI Chatbot side panel** — visible while reading, scoped to the card's own content (so it can answer "what does X mean" or "explain this answer differently" using that card as context, not the whole internet).

## Admin Flow

1. **Generate form** — fields:
   - Language / Tech (e.g. Java, React, DevOps, SQL...)
   - Level (Fresher, 1–2 yrs, 2–3 yrs, 3–5 yrs, 5–8 yrs, 8+ yrs — per the brand doc's experience bands)
   - Topic (e.g. Collections, Multithreading, Spring Security...)
   - Number of Questions
   - *(open — see below)*
2. **Generate button** → calls the AI (OpenAI/Gemini) with a prompt built from those fields → returns Q&A content as HTML.
3. **HTML editor view** — AI output loads into a rich text editor (e.g. TipTap). Admin can edit text, fix formatting, and upload/insert images inline.
4. **Save as Draft / Publish** — draft is admin-only; published cards become visible (and filterable) on the user-facing side.

## Open Questions (need your input before backend design)

- What should the "some other fields" be on the generate form beyond Language/Level/Topic/No. of Questions? Candidates: Company (optional, for company-specific phrasing), Difficulty, a free-text "focus/instructions" box for the AI prompt, Card title (auto-generated vs. manual).
- Is "Company" a filter on the user side too, or just Language/Level/Topic for now?
- Should users need to be logged in to read cards, or is reading public and only the AI chatbot requires login (to meter usage)?
- One card = one AI generation call producing all N questions at once, or can admin regenerate/add more questions into an existing card later?

## Data Model (draft, single entity — replaces the stack/topic/subtopic/content_unit hierarchy from the old phase-1 doc)

- `interview_cards`: id, title, language/tech, level, topic, company (nullable), question_count, content_html (MEDIUMTEXT), cover_image_url (nullable), status (DRAFT/PUBLISHED), created_by, created_at, updated_at
- Filters (language, level, topic, company) live directly on the card — no separate taxonomy tables needed for this simpler model.
- AI generation metadata (prompt used, model, tokens) optionally logged for cost tracking, not shown to users.

## AI Integration Notes

- Reuses the AI gateway concept from [phase-2-ai-features.md](phase-2-ai-features.md): one internal service wrapping OpenAI/Gemini, prompt template versioned server-side.
- Generation prompt assembles Language + Level + Topic + No. of Questions (+ whatever else we land on above) into a structured request asking for clean HTML (headings per question, code blocks where relevant).
- Doubt-solving chatbot is scoped per-card: pass the card's `content_html` (stripped to text) as context so answers stay grounded in what the user is actually reading.

## Status

Not started. Existing backend code from the earlier (more generic) content-model attempt has not been wired to this design yet — needs a decision on whether to adapt or replace it once the open questions above are answered.
