# Phase 1 — Core Prep Platform (MVP): Intervo Prep

## Goal
Ship a free, SEO-friendly MVP that people actually find via search and come back to: a public landing page with a handful of free blog-style articles, and a login-gated content library behind it — launching with Java and Python interview content. No payments, no user-facing AI in this phase — the goal is to get real organic traffic and real learners on the platform first.

## Scope
**In:** landing page overhaul, free/public blog teasers, login-gated full content library, Read View, SEO (meta tags, sitemap, crawlability), Java + Python launch content, topic/roadmap browsing, progress tracking, bookmarking. PPT View, flash cards, mind maps, quick revision sheets, and company-wise question banks stay in Phase 1's scope but are **not required for the first deploy** — see Launch Sequencing below.
**Out:** AI generation/doubt-solving as a user-facing feature (Phase 2) — not implemented or exposed until after Phase 1 is deployed and has real users. Any payments/paywall (everything in this phase is free). Resume tools (Phase 3), community (Phase 4).

Note: an AI-assisted **admin authoring tool** already exists (admin fills a form, Gemini drafts an article, admin edits and publishes) — that stays as an internal content-production convenience and isn't affected by the "no AI" rule above, which is about what end users see and interact with, not how editors produce content.

## Access Model & Landing Page
This is the headline change for this phase: today everything under `/prep` is public with no login wall. That flips.

- **Landing page** (currently empty, needs a full build): shows a curated set of free, fully-readable blog/article teasers — real content, not just marketing copy — so search engines and first-time visitors see substance immediately. No login required to read these.
- **Everything else is gated.** Any content beyond the free landing-page set requires login. Browsing the stack/topic/subtopic tree can stay visible to entice signup, but opening an article redirects to login/signup if the learner isn't authenticated.
- **Mechanism**: introduce a "free preview" flag on content (e.g. a boolean on `content_units`, or a small curated list the landing page pulls from) so editors can explicitly choose which articles are the public hook — not an arbitrary "first N" rule.
- Signup/login stays exactly as-is (email+password and Google OAuth, already built) — the only change is what's reachable before vs. after authenticating.

## SEO
Explicit requirement: when someone searches for interview-prep topics, Intervo should show up. This phase needs:
- Per-page `<title>`/meta description, Open Graph tags for the landing page and each public article.
- `sitemap.xml` and `robots.txt` covering the public landing page and free articles (not the login-gated library, which shouldn't be indexed with content a crawler can't actually read).
- Semantic HTML structure (proper heading hierarchy, etc.) on the Read View — already close to this via the markdown renderer, needs a pass for correctness.
- Crawlability: the frontend is currently a client-rendered Vite SPA. Plain client-side rendering is workable for modern Googlebot but isn't ideal for fast/complete indexing — worth a deliberate decision (e.g. pre-rendering or SSR for the public landing/article pages specifically, not the whole gated app) rather than assuming CSR is good enough.
- Fast load times on the public pages (this is itself an SEO/ranking factor, not just UX).

## Launch Content Focus
Initial content covers **Java and Python**, interview-focused (not general tutorials). This supersedes the earlier "Java / Spring Boot / Backend Development" launch focus — Spring Boot and Backend Development content can follow once Java and Python are live. (The roadmap `README.md`'s "Launch focus" line still says the old focus and should be updated to match — flagging this, not changing it here since it wasn't asked for.)

## Implementation Phases

Each sub-phase below is a self-contained, reviewable slice — build it, review it, then move to the next. Sub-phases 1.1–1.4 are what's needed for the first deploy; 1.5 is everything else already in Phase 1's scope, picked up after launch.

### Phase 1.1 — Access Model: Free Preview + Login Gate
Flip today's "everything public" model to "free preview public, everything else gated." This is foundational — the landing page (1.2) depends on it.

Backend:
- [ ] Add an `is_free_preview` boolean to `content_units` (migration)
- [ ] New public endpoint serving just the free-preview content units, for the landing page to pull from
- [ ] `SecurityConfig`: the existing public `GET /api/stacks/**` matcher becomes authenticated, except the new free-preview endpoint
- [ ] Admin tool: let the editor toggle "free preview" when saving content

Frontend:
- [ ] Prep pages handle the now-possible 401/redirect-to-login when a logged-out user opens gated content
- [ ] Open decision to confirm before building: can a logged-out visitor still browse the stack/topic/subtopic tree (just can't open an article), or is the tree itself gated too?

### Phase 1.2 — Landing Page Rebuild
Real landing page instead of today's placeholder. Depends on 1.1 for real free content to show.
- [ ] Hero + value proposition
- [ ] Grid/list of free-preview article teasers, pulled from the new public endpoint
- [ ] Login/signup CTAs for the gated library
- Visual design, motion and content layout for this page are specified in Phase 1.2a below.

### Phase 1.2a — Premium Frontend Redesign
Visual and motion overhaul of the public face of interVo. Purely a frontend change: routes, auth flows, API contracts and backend access rules stay exactly as they are.

**Creative direction:** premium developer SaaS. Linear-level typography, Vercel's developer focus, Raycast-style interface detail, and editorial layouts for technical content. Dark-first, with light mode kept working.

**Design system**
- Palette: midnight `#080B16`, surfaces `#101629` / `#171E33`, electric violet `#7562FF`, cyan `#42D9F5`, text `#F4F6FF`, muted `#A3AEC7`. Every color is a semantic token (`canvas`, `surface`, `surface-2`, `line`, `ink`, `muted`) with light-mode counterparts.
- Type: Space Grotesk for display headlines, Inter for body text, JetBrains Mono for code.
- Shared primitives: gradient primary button, hairline borders, layered surfaces, soft glows, and syntax-highlighted code panels.

**Motion**
- Built with CSS keyframes plus an IntersectionObserver `Reveal` component. No animation library is added.
- Patterns: staggered hero entrance, scroll reveals, card lift on hover, gentle floating cards in the hero preview, animated progress, and an ambient gradient behind the hero and the final CTA.
- Only `transform` and `opacity` are animated. No scroll-jacking. Every animation is switched off under `prefers-reduced-motion`.

**Landing page (top to bottom)**
- [x] Sticky translucent navbar that gains a blur and border once the page scrolls. Links: Home, Explore Topics, Blogs, theme toggle, Log in, Get Started Free. Mobile menu.
- [x] Hero: eyebrow, "Your Next Interview Starts Here.", two CTAs, and a layered product preview. The preview is a Java "How does HashMap work internally?" read view with a topic sidebar, highlighted code, a progress bar, a bookmark, a floating revision card and stacked learning cards. It is labelled as an illustrative preview and shows no fabricated statistics.
- [x] "Pick your stack. Own your interview." shows technology cards from `/api/stacks` and `/api/stacks/{slug}/stats`, each with its own visual treatment and real topic/article counts. Stacks with topics but no published articles are labelled "In progress" rather than presented as complete.
- [x] "Level up before your next interview." is an editorial article layout (one featured article plus a list) from `/api/articles/published`. The section is omitted when nothing is published, and it links to `/blogs`.
- [x] Learning-experience showcase: tabbed panels covering only features that already exist (structured Q&A, code examples, topic-wise browsing, bookmarks + progress).
- [x] "Less searching. More preparing." is a connected-steps benefits layout.
- [x] Final CTA "Make your next interview your best one." with an ambient gradient.
- [x] Footer: brand, description, Explore Topics, Blogs, Log in, Sign up. About, Contact, Privacy and Terms are deferred until those pages exist, and social links until real accounts exist.

**Blogs**
- [x] New public `/blogs` listing that uses the existing published-articles endpoint: editorial heading, search, technology filters, a featured article, a responsive grid, and empty and error states. Articles keep their existing `/prep/...` URLs.
- [ ] Article read view redesign (TOC, reading progress, related articles, signup CTA). Follow-up slice.

**Auth**
- [x] Login ("Welcome back.") and Signup ("Your next chapter starts here.") use a split-screen layout: a focused form panel plus a brand panel on desktop, and a single column on mobile. Both include show/hide password, Google sign-in, and loading and error states, and Signup adds live password-rule feedback. `useAuth`, the Google OAuth URL, post-login redirects and the API calls are unchanged.

### Phase 1.3 — SEO Foundation
- [ ] Per-page meta tags (title, description, Open Graph) for the landing page and free articles
- [ ] `sitemap.xml` and `robots.txt` (covering only the public landing page + free articles, not gated content)
- [ ] Semantic HTML pass on the Read View heading structure
- [ ] Open decision to confirm before building: plain client-side rendering vs. pre-rendering/SSR for the public pages specifically — affects how real the SEO payoff is

### Phase 1.4 — Java + Python Launch Content
- [ ] Decide target content volume for a credible launch (how many topics/subtopics per stack)
- [ ] Add a `python` stack (today only `java`, `spring-boot`, `backend-development` are seeded)
- [ ] Author Java + Python content via the existing AI-assisted admin tool
- [ ] Mark a curated subset as free preview

### Phase 1.5 — Post-Launch (within Phase 1, sequence TBD)
Everything else already in this phase's scope, picked up after the first deploy:
- PPT View
- Flash Cards
- Mind Maps
- Quick Revision Sheets
- Company-wise Question Bank (tables exist, seeded with 8 companies, no API/UI yet)
- Search across content types
- Content versioning / a true draft → review → published state

## Data Model
- `stacks` (Java, Python, …), `topics`, `subtopics` (hierarchical, ordered) *(Built.)*
- `content_units` (id, subtopic_id, type: ARTICLE, PPT_SLIDE, FLASHCARD, MINDMAP_NODE, REVISION_SHEET, status, version, **is_free_preview**) *(Built minus the free-preview flag, needed for the landing page.)*
- `companies` (id, name, logo_url) *(Built, seeded.)*
- `questions` (id, company_id, topic_id, difficulty, experience_level, question_text, answer_text) *(Table exists, no API/UI yet.)*
- `user_progress` (user_id, content_unit_id, status: IN_PROGRESS/COMPLETED, last_viewed_at) *(Built.)*
- `bookmarks` (user_id, content_unit_id) *(Built.)*

## AI/Infra Notes
- No user-facing AI calls in this phase — deferred until after deploy (Phase 2). The existing AI-assisted admin authoring tool (Gemini) is an internal production aid, not a user feature, and stays as-is.
- Author content with an eye toward Phase 2 (AI will later generate/summarize/doubt-solve against these same content units — keep content structured/JSON-friendly, not free-form HTML blobs).
- S3 for content assets (images/diagrams); CloudFront CDN in front.
- Redis caching for hot content trees and question bank filters.
- Everything in this phase is free to use — no billing/paywall infrastructure needed yet.

## Exit Criteria
- [ ] Landing page is live, public, and shows real free article content (not just marketing copy).
- [ ] A visitor can read the free preview articles without logging in; everything else prompts login/signup.
- [ ] Core SEO is in place: meta tags, sitemap.xml, robots.txt, and a deliberate crawlability decision for the public pages.
- [ ] Java and Python interview content is live and browsable post-login.
- [ ] Progress is tracked and visible on the dashboard. *(Already true.)*
- [ ] A learner can pick "Spring Boot" (or any stack), browse topics, and consume the same topic in Read View, PPT View, Flash Cards, and a Revision Sheet. *(Follow-on, not launch-blocking — see Phase 1.5.)*
- [ ] Company-wise question bank is filterable and searchable. *(Follow-on.)*
- [ ] Content editors can publish new content without a deploy. *(Already true via the admin AI tool.)*
