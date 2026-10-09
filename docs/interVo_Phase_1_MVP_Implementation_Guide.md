# interVo --- Phase 1 MVP Implementation Guide

**Purpose:** Claude Code implementation brief\
**Phase:** Phase 1 --- Free-first Core Prep Platform\
**Goal:** Launch a polished, SEO-friendly interview-preparation website
that attracts organic traffic through useful public articles and
converts visitors into registered learners.

## 1. Product vision

**interVo** helps students and IT professionals prepare for technical interviews through structured, role-specific learning paths. It is a multi-track interview-preparation platform—not a Java-only website.

The platform must support multiple preparation tracks through a shared content model and reusable UI. Each track has its own roadmap, topic hierarchy, interview questions, explanations, examples, exercises, and progress.

Phase 1 includes:
- A public landing page explaining the multi-track product.
- Public blogs/articles anyone can read without logging in.
- A login-gated learning library for all other content.
- Java Developer and Python Developer content as the first launch tracks.
- A data model and UI that can add Data Analyst and future tracks without redesigning the product.
- A learner dashboard, track/topic browsing, Read View, bookmarks, and progress tracking.
- The existing AI-assisted admin authoring tool for drafting, editing, and publishing content.

Everything is free in Phase 1. Do not build payments, subscriptions,
paid kits, or a paywall.

**Out of scope:** user-facing AI doubt solving/chat, resume tools,
community, mock interviews, company-readiness scores, and other
future-phase features. PPT View, Flash Cards, Mind Maps, Quick Revision
Sheets, and Company-wise Questions remain planned follow-on work but are
not launch blockers.

The existing Gemini-powered admin authoring tool stays. "No AI" means no
AI feature exposed to end users in this phase.

## 2. Brand and visual direction

The brand name should be styled as **interVo** in the UI/logo. Use
`intervo` in technical identifiers, code, and URLs where lowercase is
appropriate.

Build a premium, modern, attractive, Gen-Z-friendly developer
product---not a generic coaching website. Take inspiration from Linear,
Vercel, Notion, Raycast, and Stripe without copying their interfaces.

### Art direction: premium Gen-Z tech product, not a generic template

The design must feel like a distinctive, launch-ready product built for today's developers: **Linear's clarity + Vercel's developer credibility + the energy of a modern learning startup**. Use those products as inspiration only; do not copy their layouts or branding.

The target impression is: *"This looks so good that I want to create an account and start preparing."* The site must feel polished, confident, youthful, focused, and technically credible—not childish, noisy, or like a generic LMS/admin dashboard.

#### Design principles

- Create a clear visual identity for interVo, including a distinctive wordmark treatment for `interVo`, a consistent icon style, and reusable design tokens.
- Use bold, editorial typography and strong hierarchy. Make headlines memorable; keep body text highly readable.
- Use deliberate asymmetry, layered UI previews, crisp borders, subtle gradients, soft glows, and depth. Do not put every section inside the same rounded card.
- Prefer a few strong visual moments over dozens of decorative effects.
- Use generous whitespace, consistent spacing, balanced line lengths, and a clear grid.
- Use a cohesive dark-first palette with carefully controlled purple/blue/cyan accents. If light mode already exists, preserve it and apply the same design system.
- Use real product UI as the hero visual: an attractive, accurate preview of a track dashboard, topic roadmap, interview question, code example, and learning progress. It should look like a working product—not a random illustration or generic stock image.
- Use meaningful iconography, subtle surface texture, tasteful gradients, and polished hover/focus/pressed states.
- Make all pages responsive and intentional at desktop, tablet, and mobile sizes.
- Accessibility is part of quality: semantic HTML, accessible contrast, visible keyboard focus, labeled inputs, keyboard-friendly menus, and reduced-motion support.
- Keep content and navigation obvious. Visual effects must never reduce readability, accessibility, performance, or task completion.

#### Suggested visual tokens

- App background: `#0B1020`
- Elevated surface: `#11182B`
- Card surface: `#151C30`
- Primary violet: `#7C5CFC`
- Bright blue: `#4F8CFF`
- Accent cyan: `#22D3EE`
- Primary text on dark: `#F4F7FF`
- Muted text on dark: `#A5B0C5`
- Light background: `#F8FAFC`
- Light surface: `#FFFFFF`
- Borders: low-contrast neutral borders; brighter accent borders only for focus or active states

Treat these as starting tokens, not colors to apply indiscriminately. Check contrast and use accents with restraint.

#### Typography and components

- Use Geist or Inter for interface typography and JetBrains Mono for code.
- Use a strong display scale for hero headings, a compact but readable scale for dashboard headings, and comfortable body text for learning content.
- Define tokens for spacing, radii, borders, shadows, typography, and motion; avoid arbitrary one-off styling.
- Buttons must have clear primary/secondary/tertiary hierarchy and polished hover, focus, disabled, and loading states.
- Forms must feel premium but remain easy to use.
- Cards should have different visual treatments based on purpose—track cards, progress panels, article cards, and question previews should not all look identical.
- Use a consistent icon library already in the project where possible; do not mix emoji, unrelated icon sets, and random illustrations as the primary interface language.

#### Motion and interaction

Use Framer Motion only if already installed or if adding it is justified by the existing stack; otherwise use lightweight CSS transitions. Do not replace working architecture to add animation.

- Use a refined page-load entrance: small opacity/translate transitions with a short stagger for hero elements.
- Add subtle animated gradient or glow details to the hero, never behind every section.
- Add purposeful hover states to track cards, article cards, navigation, and CTAs.
- Animate progress bars when they first enter view; respect reduced-motion preferences.
- Use small, quick transitions for tabs, dropdowns, accordions, dialogs, and topic selection.
- Code-preview panels may have a tasteful cursor/line highlight or a controlled snippet reveal, but must not simulate a fake editor that distracts from the content.
- Keep most UI transitions around 150–250 ms. Avoid long intro sequences, scroll-jacking, excessive parallax, constant floating objects, noisy particles, and animation that delays interaction.
- Ensure animations do not cause layout shifts or block page interaction.

#### Explicitly avoid

- Generic SaaS template sections with identical cards and gradients everywhere.
- A plain hero with just a heading, two buttons, and three generic feature cards.
- Excessive glassmorphism, neon everywhere, giant empty spaces, random blobs, or too many floating elements.
- Fake learner counts, fake testimonials, fake streaks, invented ratings, fake company logos, or unverified success claims.
- Tiny typography, low contrast, dense walls of text, and oversized decorative graphics that push useful content below the fold.
- Unimplemented features presented as if they already work.

#### Design quality gate

Before calling the design complete, inspect it at desktop (1440px), laptop (1280px), tablet (768px), and mobile (390px and 360px). Check for overflow, awkward wrapping, inconsistent spacing, clipped menus, poor visual hierarchy, and buttons too small to tap. Take screenshots if the available workflow supports them, review the screenshots, and make a second polish pass. Do not stop at the first functional version.

## 3. Navigation

Responsive public navbar: - interVo logo - Home - Explore Topics -
Blogs - About - Log in - **Get Started Free** (primary CTA)

On mobile, collapse navigation into an accessible menu.

The public website contains Home, Explore Topics, Blogs, About, Login,
and Signup. After login, users enter the learning dashboard. Do not
expose admin navigation to ordinary users; enforce admin access by role
on the backend.

## 4. Landing page

The landing page must explain the value of interVo quickly, show real
learning content, and encourage free signup. Avoid a wall of marketing
text.

### Section 1 --- Hero

-   Headline: **"Your Next Interview Starts Here."**
-   Supporting copy: "Prepare for IT interviews with structured
    questions, clear explanations, and focused revision --- all in one
    place."
-   Primary CTA: **Start Learning Free**
-   Secondary CTA: **Explore Topics**
-   Show a compelling preview of the actual learning interface or an
    accurate mockup.

### Section 2 --- Explore preparation tracks

Show attractive cards for the preparation tracks that are genuinely available. Initially, prioritize:
- Java Developer
- Python Developer
- Spring Boot / Backend Development only if the existing content is sufficiently complete

Data Analyst may be shown as **Coming Soon** only if it has not yet been published as a complete track. Future tracks can be displayed as planned only when this helps communicate the product roadmap without cluttering the experience.

Each track card should have a clear role-focused description, real published topic/article counts where available, a track status, and a browse/start action. Never invent counts or make empty categories look complete. Avoid presenting Data Analyst as a programming language; it is a job-role preparation track.

### Section 3 --- Free articles

Show 3--6 published public preview articles. Cards should include title,
excerpt, category, and reading time/date when available. Include **View
All Blogs**. Public preview articles must be fully readable without
login.

### Section 4 --- Learning experience

Show a real screenshot or accurate mockup of the reading interface.
Highlight only implemented features: - Structured topic-wise interview
content - Clear explanations and code examples - Organized topic
browsing - Bookmarks - Learning progress and continue reading

Do not claim user-facing AI chat, payments, PPTs, flashcards, or mind
maps are available until implemented and released.

### Section 5 --- Why interVo?

Use 3--4 concise benefit cards: - **Structured preparation:** Find
interview concepts in an organized structure. - **Less searching, more
learning:** Reduce time spent jumping between scattered resources. -
**Track your learning:** Continue where you left off and monitor topic
progress. - **One learning space:** Keep interview preparation
organized.

Avoid guarantees such as "guaranteed job" or "crack every interview."

### Section 6 --- Final CTA

Headline: **"Make your next interview your best one."** CTA: **Start
Learning Free**

### Section 7 --- Footer

Include Blogs, Explore Topics, About, Contact (if implemented), Privacy
Policy, Terms of Service, Login/Signup, and real social links only.

**Landing-page rules:** responsive, fast, accessible, no
pricing/paywall, no fake testimonials or company logos, and all CTAs
must work.

## 5. Blogs and public articles

The Blogs tab is a real public destination, not just a homepage section.

### Blog listing

-   Page title and short description
-   Search/filter controls only if supported
-   Filters for existing categories (e.g. Java, Python, Spring Boot,
    Interview Tips)
-   Responsive article grid/list
-   Title, excerpt, category, reading time/date when available
-   Pagination or Load More when needed
-   Empty and error states

### Public article page

-   Unique, stable URL/slug
-   One H1 title
-   Summary, author, publication date, reading time when available
-   Table of contents for long articles
-   Readable markdown/rich text and syntax-highlighted code
-   Responsive tables/images and descriptive alt text
-   Related articles where relevant
-   Internal links to relevant topics
-   A tasteful signup CTA

Do not place a signup overlay over the full article body. Public preview
articles must be completely readable without login. AI-assisted drafts
must be reviewed for technical accuracy and quality before publishing.

## 6. Login and signup

Authentication already exists (email/password and Google OAuth). Inspect
and reuse the existing implementation. Do not rebuild authentication
unnecessarily or change the security model without auditing the code
first.

### Login page

-   interVo logo
-   Heading: **"Welcome back."**
-   Supporting text: "Pick up where your preparation left off."
-   Email and password fields
-   Show/hide password
-   Forgot password link if supported
-   **Log In** button
-   Google sign-in
-   Link to signup
-   Validation, loading, and error states
-   Accessible labels and keyboard focus

A split layout with a subtle branded visual is fine on desktop; use a
focused single-column form on mobile.

### Signup page

Keep friction low. Ask only for: - Full name if required by the existing
user model - Email - Password

Include **Create Free Account**, Google signup/sign-in, a link to login,
password requirements, validation, and error/loading states. Do not
require technology selection during registration; offer it optionally
after signup if useful.

### Authentication behavior

-   After signup, establish the session and route to the dashboard or
    optional onboarding.
-   After login, return to the requested protected page if redirected
    from one; otherwise go to the dashboard.
-   Preserve the intended destination through login/signup.
-   Handle expired sessions and API 401 responses consistently.
-   Never expose protected article content before authentication.
-   Enforce admin roles on the backend, not just by hiding links.

## 7. Access model

### Public without login

-   Landing page
-   Blog listing and published free-preview articles
-   About and public information pages
-   Technology/topic tree may remain browseable, but protected article
    bodies require login

### Requires login

-   Full library content outside explicitly selected free previews
-   Dashboard
-   Personalized progress
-   Bookmarks
-   Other user-specific features

Use an explicit `is_free_preview` flag or equivalent curated mechanism.
Do not assume the first N articles are free. Editors must be able to
mark/unmark eligible published articles as free previews.

Backend rules: - Public endpoint returns only published content
explicitly marked as free preview. - Do not return protected article
bodies or private user data in public APIs. - Drafts/unpublished content
remain private. - Backend enforces access; frontend route guards alone
are insufficient. - Do not index protected content as public articles.

If the tree-browsing decision is still open, default to allowing guests
to browse the topic tree while requiring login to open protected
content.

## 8. Authenticated learning experience

After login, show a clean learner dashboard with real data: - Welcome
message - Continue Reading / Recently Viewed - Progress summary -
Bookmarks - Browse Technologies

Preserve existing functionality: - Stack → Topic → Subtopic browsing -
Read View with markdown/rich text - Syntax-highlighted code blocks -
Table of contents for long articles - Bookmarks - Progress tracking -
Dashboard progress counts

Do not show fake activity, streaks, or recommendations.

The following are not required for the first deploy: PPT View, Flash
Cards, Mind Maps, Quick Revision Sheets, Company-wise Question Bank
API/UI, search across all content types, content version history, and a
full draft → review → published workflow. Do not delete existing data
structures or working code for these features without a clear reason.

### Dashboard and learning workspace: make the logged-in product the main attraction

The post-login experience is as important as the public landing page. It must feel like a premium learning workspace for ambitious developers, not a plain list of links or a dated LMS.

#### Learner dashboard layout

- Use a calm, compact app shell with a responsive sidebar on desktop and a practical mobile navigation pattern.
- Sidebar/navigation: Dashboard, My Tracks / Explore Tracks, Bookmarks, Recently Viewed, and Profile where supported. Admin navigation must remain hidden from learners and protected by backend roles.
- Main welcome area: a concise greeting and a motivating but non-cheesy message such as **"Let's get interview-ready."**
- Show a **Continue Learning** panel based on the learner's actual last-opened content, including track/topic, title, and a clear resume action.
- Show **My Preparation Tracks** with progress derived from real completion data. Track cards should look distinctive and scannable.
- Include a clear **Explore Tracks** entry point so users can move between Java, Python, and future tracks.
- Use bookmarks and recently viewed content only when actual data exists. Provide designed empty states with useful next actions.
- Do not invent streaks, study hours, completed topics, readiness scores, or recommendations.

#### Track overview page

Each track should have a strong overview page with:
- Track name, role-focused description, experience level if defined, and a clear start/continue button.
- A roadmap organized into topic groups and topics, with completion state and progress based on actual learner activity.
- A clear distinction between completed, in-progress, locked-by-authentication, and planned/coming-soon content where applicable.
- Search/filter only when supported by real functionality.
- A quick explanation of what the track covers and how to use it.
- No misleading percentage or topic counts. Use backend-derived values.

#### Topic and article reading experience

- Build a focused reading layout with a readable central column, optional table of contents, and a clear breadcrumb back to the topic/track.
- Keep code examples syntax-highlighted, copyable where supported, and easy to scan on mobile.
- Give interview answers useful hierarchy: question, short answer, deeper explanation, example/code, common follow-up or pitfall when the content provides it.
- Add bookmark and progress actions with clear feedback.
- Provide previous/next topic navigation when the ordering is known.
- Keep decorative elements secondary to learning content.
- Preserve current Read View, Markdown/rich text, table of contents, bookmarks, and progress behavior.

#### Track-specific visual personality

Use the same design system for every track, but make the content itself unmistakably role-specific:
- Java Developer pages should show Java syntax and backend-oriented concepts where relevant.
- Python Developer pages should show Python examples and Python-specific concepts.
- Data Analyst pages should use data tables, SQL snippets, chart/dashboard previews, and business-case framing where relevant.
- Never just change the track title while reusing unrelated sample content.

## 9. Admin authoring

Preserve the existing Gemini-assisted admin authoring tool: - Admin
generates an article draft. - Admin edits the generated content. - Admin
adds formatting/images supported by the editor. - Admin saves drafts and
publishes. - Admin marks/unmarks eligible published articles as free
preview. - Landing page and blogs read published content from the
backend, not hardcoded arrays.

AI output is a draft, not trusted final content. Review accuracy, code
examples, formatting, and originality. Drafts must never appear in
public endpoints, the sitemap, or public article listings.

## 10. SEO and discoverability

SEO is a launch requirement for public pages. Implement: - Unique title
and meta description for landing, blog listing, and each public
article - Open Graph metadata - Canonical URLs - `sitemap.xml`
containing only indexable public URLs - Deliberate `robots.txt` rules -
Semantic HTML and correct H1/H2/H3 hierarchy - Internal links between
articles and topics - Descriptive image alt text - Fast public-page
performance - Proper 404 handling for unknown article slugs

Exclude private dashboards, admin routes, drafts, and protected library
content from the public sitemap.

The frontend is currently a client-rendered Vite SPA. Evaluate
pre-rendering or SSR for the public landing page, blog listing, and
public article routes. Keep the authenticated app client-rendered if
appropriate. Choose and document a reliable approach that makes public
article content and metadata visible to crawlers; do not assume
client-side metadata alone is sufficient.

## 11. Multi-track content strategy: Java, Python, Data Analyst, and future roles

interVo must be designed as a **multi-track preparation platform**. Java Developer is the initial flagship track. Python Developer is the second initial track. Data Analyst is a planned next track, followed by additional languages and job roles based on content quality and learner demand.

### Track rollout

**Initial launch — Java Developer and Python Developer**
- Audit and improve the existing Java content.
- Add/verify the Python track.
- Create a coherent topic/subtopic roadmap for each track.
- Publish a reviewed, useful initial content set for both tracks.
- Curate genuinely useful public-preview articles.
- Ensure protected content works after login.
- Do not label empty or unfinished topics as launched.

**Next content expansion — Data Analyst**
- Add a dedicated Data Analyst preparation track; do not treat it as a programming language.
- Build a role-specific roadmap covering SQL, spreadsheets/Excel, statistics, data cleaning, data analysis with Python, Pandas/NumPy, data visualization, Power BI/Tableau where relevant, business metrics, case studies, dashboards, and project/interview discussion.
- Keep tools and topic groups configurable so the track can adapt to the roles and tools actually targeted.
- Publish the track only when it has a credible, reviewed core set of material. Until then, show it as planned or coming soon rather than pretending it is complete.

**Future expansion — other languages and roles**
Potential future tracks include JavaScript/TypeScript, C#, C/C++, Go, PHP, QA/Automation Testing, DevOps/Cloud, Data Engineering, and Full Stack Development. These are examples for future consideration, not a commitment to launch all of them immediately. Add tracks based on learner demand and the team's ability to maintain high-quality content.

### Content quality rules

- Each track must have its own role-appropriate roadmap and topic hierarchy; do not copy the Java curriculum and merely rename the language.
- Use a shared content platform and renderer wherever possible, while allowing different content types and assessment formats per track.
- Keep counts database-driven and accurate.
- Prefer a smaller coherent set of high-quality content over a large set of shallow articles.
- Use the existing AI authoring tool to speed up drafting, with human review for correctness, code examples, practical relevance, and clarity before publishing.
- Keep track status explicit, for example `planned`, `in_progress`, and `published`; only published tracks should appear as fully available.
- Preserve the free-first Phase 1 model. Do not add payments or a paywall.

## 11A. Multi-track architecture and content model

The system must support new preparation tracks through data/configuration and admin content creation wherever practical—not through duplicated pages or hardcoded language-specific branches.

### Recommended conceptual hierarchy

`Preparation Track → Topic Group → Topic → Subtopic → Content Unit`

Examples:
- `Java Developer → Core Java → Collections Framework → HashMap`
- `Python Developer → Python Core → Data Structures → Dictionaries`
- `Data Analyst → SQL & Databases → Querying Data → Joins`

Use the existing Stack → Topic → Subtopic model if it already supports this structure cleanly. Do not perform a destructive rewrite just to rename entities. If terminology changes are necessary, use a safe migration and maintain compatibility with existing records and routes.

### Track metadata

Each track should be able to store, at minimum:
- Stable slug/identifier (e.g. `java-developer`, `python-developer`, `data-analyst`)
- Display name and concise description
- Track type/category (e.g. programming language, job role, framework, or specialization)
- Publication status (`planned`, `in_progress`, `published`, or an equivalent existing convention)
- Display order and optional icon/visual
- Audience/experience level where useful
- Relationships to topics and content
- SEO title/description where the track has a public page

Do not add every field blindly: inspect the current schema first and reuse equivalent fields. Keep public topic/article counts derived from published database records.

### Reusable track experience

- Use a shared track overview, topic tree, article reader, bookmark system, and progress system.
- Topic labels, descriptions, examples, and learning order must be specific to each track.
- Progress and bookmarks must remain associated with the learner and the relevant content; adding a track must not reset existing Java progress.
- Admins should be able to create and maintain a track and its content without changing frontend code for every new topic.
- Do not show planned or incomplete tracks as fully available.
- Design for future content types such as interview Q&A, coding exercises, flashcards, quick revision sheets, mind maps, and company-specific question sets, but do not imply these formats are available until implemented.
- Do not make company-readiness scores, user-facing AI features, payments, or mock interviews Phase 1 requirements.

### Content structure by track

The platform should support different curriculum shapes rather than forcing every track into the same topic list:
- **Java Developer:** Core Java, OOP, Strings, Collections, Exceptions, Java 8+, Concurrency, JVM, Spring/Spring Boot, APIs, persistence, databases, microservices, messaging, security, caching, containers/cloud, coding, system design, production scenarios, projects, and behavioral questions.
- **Python Developer:** Python fundamentals, data structures, functions, OOP, modules/packages, exceptions, iterators/generators, decorators, context managers, concurrency/async, testing, APIs, relevant frameworks such as Django/FastAPI, databases, coding, system design where appropriate, projects, and behavioral questions.
- **Data Analyst:** SQL, Excel/spreadsheets, statistics and probability, data cleaning, exploratory analysis, Python for analysis, Pandas/NumPy, visualization, Power BI/Tableau as appropriate, business metrics, case studies, dashboard projects, communicating insights, and behavioral/project questions.

These are curriculum planning examples. Review and tailor the actual content to the intended experience level and job market before publishing.

---

## 12. Engineering rules

Inspect the repository before coding. Follow the existing React/Vite,
Java/Spring Boot, and MySQL architecture.

1.  Audit routes, API clients, authentication, controllers, services,
    security config, schema, and admin publishing first.
2.  Reuse existing components, APIs, auth, and design tokens where
    appropriate.
3.  Do not replace working architecture just to introduce a preferred
    library.
4.  Use database migrations for schema changes.
5.  Enforce authorization on the backend.
6.  Provide useful API/UI error states.
7.  Avoid hardcoded mock data in production screens.
8.  Never expose AI keys/secrets in the React bundle.
9.  Keep content structured for future renderers and AI features.
10. Add tests for access-control and login redirect flows.
11. Verify responsive layouts, keyboard access, and reduced-motion
    behavior.
12. Update docs when routes, environment variables, migrations, or
    workflows change.

Performance: - Lazy-load noncritical authenticated routes. - Optimize
public images. - Avoid loading heavy admin/editor dependencies on public
pages where route splitting is possible. - Cache public content
safely. - Never put personalized/protected responses in shared public
caches. - Keep animations lightweight.

## 13. Suggested routes

Adapt these to the existing app; do not create duplicate routes
unnecessarily.

### Public

-   `/` --- landing page
-   `/blogs` --- blog listing
-   `/blogs/:slug` --- public article
-   `/topics` --- technology/topic discovery
-   `/about` --- about page
-   `/login` --- login
-   `/signup` --- signup
-   `/forgot-password` --- only if supported

### Authenticated

-   `/dashboard`
-   Existing `/prep` or equivalent learning library
-   Existing topic/subtopic/content routes, protected when not free
    preview
-   Existing profile/bookmark routes if implemented

### Admin

-   Existing role-protected admin routes
-   Existing editor with a free-preview toggle

Preserve working URLs where possible; add redirects if public URLs
change.

## 14. Implementation Phases

Each phase below is a self-contained, reviewable slice of the step sequence from the brief. Build one, review it, then move to the next — do not build everything in one giant pass. Status annotations reflect a repository audit as of this update; re-verify before starting a phase, since things may have moved on since.

### Phase 1.0 --- Audit (Step 0) --- ✅ Done
- [x] Inspect frontend/backend structure, existing routes, auth, admin authoring/publishing
- [x] Report what is already complete, what changes are required, and any risky migrations/security implications
- No code changes in this phase.

**Audit summary:** Auth (email/password + Google OAuth), Stack → Topic → Subtopic browsing, Read View (markdown + syntax highlighting + TOC), progress tracking, bookmarking, and the Gemini-assisted admin authoring tool (generate → edit → save draft/publish) are all built and working. All of `/api/stacks/**` (GET) is currently **public with no login wall** --- this is the opposite of the target access model and is Phase 1.4's job to fix. The landing page is a placeholder (hero + 3 marketing cards, one of which advertises "Intervo AI" --- not yet built, must be removed per this brief's rules). There is no `/blogs` route, no SEO metadata/sitemap/robots.txt, no `is_free_preview` field, no free-preview admin toggle, and no Python stack (only `java`, `spring-boot`, `backend-development` are seeded).

### Phase 1.1 --- Design System and Public Shell (Step 1) --- ✅ Done
- [x] Build/reuse typography, colors, buttons, cards, navbar, footer, and responsive layout (Sections 2--3)
- [x] Rebuild the landing page using real available content, not placeholder copy (Section 4, all 7 subsections)
- [x] Remove references to unbuilt features (e.g. the current "Intervo AI" pillar card)
- Acceptance criteria: Section 15, "Landing"
- Note: a parallel, more polished design system (Logo, Icon set, Reveal/motion, aurora backgrounds, per-track theming) landed alongside this work and now substantially satisfies Section 2's expanded art-direction brief too; re-check against the new Section 2 subsections during the Phase 1.9 design-quality pass rather than re-litigating now.

### Phase 1.2 --- Blogs (Step 2) --- ✅ Done
- [x] Build the public blog listing page (Section 5, "Blog listing")
- [x] Build the public article page (Section 5, "Public article page")
- [x] Connect both to published backend content --- no hardcoded arrays
- Acceptance criteria: Section 15, "Blogs and SEO" (the non-SEO-specific items; SEO-specific items belong to Phase 1.6)

### Phase 1.3 --- Authentication Polish (Step 3) --- ✅ Done
- [x] Improve login/signup pages (Section 6) without breaking existing auth
- [x] Verify email/password, Google OAuth, error states, and redirect destinations end to end
- Acceptance criteria: Section 15, "Authentication and access"

### Phase 1.4 --- Preview Access Control (Step 4) --- ✅ Done
- [x] Add the `is_free_preview` migration/field (does not exist yet)
- [x] Add a public endpoint that returns only free-preview content
- [x] Gate the rest of `/api/stacks/**` behind authentication (currently fully public)
- [x] Add the admin toggle for marking/unmarking free-preview articles
- [x] Test both the UI and direct API access (a logged-out `curl` to a protected endpoint must be denied)
- Acceptance criteria: Section 15, "Authentication and access" (backend denial items) and "Admin" (preview-toggle items)

### Phase 1.5 --- Track Metadata & Status (new, from Sections 1/11/11A) --- ✅ Done
The guide's multi-track rewrite requires tracks to carry a real status (`planned`/`in_progress`/`published`) and type (language vs. job-role), not just "has content or not." This is foundational for the phases after it (Data Analyst must show as an honest "Coming Soon," not be hidden or look launched) and is scoped tightly: metadata only, not the full Topic Group layer (Section 11A's deeper `Track → Topic Group → Topic → Subtopic` hierarchy is deferred until a track actually has enough topics to need grouping — none do yet; adding it now would be exactly the premature schema churn Section 11A itself warns against: *"Do not perform a destructive rewrite just to rename entities"*).
- [x] Add `status` and `track_type` (and any other genuinely-needed metadata: icon, experience level) to the `stacks` table/entity
- [x] Seed a `data-analyst` stack row with `status=planned`
- [x] Update stack cards (Landing, Explore Topics) to show accurate status (Available / In Progress / Coming Soon) driven by the new field, not just inferred from content counts
- [x] Admin tool: let new-stack creation set a status
- Acceptance criteria: Section 15, "Landing" (track status item) and "Learning" (Data Analyst planned/coming-soon item)
- Note: Landing's track section still only shows Java (its content-count filter was deliberately left unchanged — see the plan's design decisions); Spring Boot, Backend Development, and Data Analyst are all visible with accurate "Coming soon" badges on the Explore Topics page.

### Phase 1.6 --- SEO (was Step 5)
- [ ] Metadata (title/description), canonical URLs, Open Graph, `sitemap.xml`, `robots.txt`
- [ ] Choose and document a rendering approach for public pages (plain CSR vs. pre-rendering/SSR) --- do not assume client-side metadata alone is sufficient
- [ ] Verify crawlers actually receive public article content and metadata, not just the authenticated app shell
- Acceptance criteria: Section 15, "Blogs and SEO" (the SEO-specific items)

### Phase 1.7 --- Content Preparation (was Step 6)
- [ ] Add the `python-developer` track (status in_progress/published as content lands)
- [ ] Audit/verify existing Java content
- [ ] Review content for quality before publishing; prefer fewer high-quality articles over many shallow ones
- [ ] Mark a curated, genuinely useful subset as free preview
- [ ] Confirm non-preview content correctly requires login
- Acceptance criteria: Section 15, "Learning"

### Phase 1.8 --- Dashboard & Learning Workspace (new, from Section 8)
The post-login experience (sidebar nav, Continue Learning panel, My Preparation Tracks, a real Track overview page, previous/next topic navigation, track-specific visual personality) is specified in much more depth than what exists today (`Dashboard.tsx` is still the simple 3-stat-card version from early in the project). This is a substantial rebuild, scoped as its own phase rather than folded into an earlier one.
- [ ] Rebuild the learner dashboard: sidebar/nav, Continue Learning panel (real last-opened content), My Preparation Tracks with real progress, Explore Tracks entry point
- [ ] Build a real Track overview page (roadmap, completion states, locked-vs-available, start/continue action)
- [ ] Polish the topic reading experience: breadcrumb, previous/next navigation where ordering is known, question/answer hierarchy where content supports it
- [ ] Apply the same design system consistently, with track-specific content personality (not just a swapped title)
- Acceptance criteria: Section 15, "Learning" and "Visual design quality"

### Phase 1.9 --- QA and Launch (was Step 7)
- [ ] Test guest, learner, and admin roles end to end
- [ ] Verify login redirects, public articles, protected APIs, sitemap, responsive layouts, loading/error states
- [ ] Run tests, production build, and verify environment configuration
- [ ] Design quality gate: review desktop (1440/1280), tablet (768), and mobile (390/360) screenshots across the app before calling it launch-ready
- Acceptance criteria: Section 15, "Quality" and "Visual design quality" (final pass over every other subsection)

## 15. Acceptance criteria

### Landing

-   [ ] Polished, responsive landing page clearly explains interVo.
-   [ ] CTAs work.
-   [ ] Preparation-track cards and article teasers use real backend data.
-   [ ] Track status is accurate; planned tracks are not presented as fully launched.
-   [ ] No fake metrics/testimonials.
-   [ ] No pricing or paywall.

### Blogs and SEO

-   [ ] Public articles can be read without login.
-   [ ] Every public article has a stable URL and unique metadata.
-   [ ] Canonical/Open Graph metadata is present.
-   [ ] Sitemap contains only public indexable pages.
-   [ ] Protected content and drafts are excluded.
-   [ ] Public pages are fast and crawler-accessible.

### Authentication and access

-   [ ] Existing email/password login works.
-   [ ] Google OAuth works.
-   [ ] Signup works.
-   [ ] Guests are redirected from protected content.
-   [ ] Successful login returns users to the requested destination.
-   [ ] Backend denies unauthenticated access to protected content.
-   [ ] Admin routes/APIs remain role-protected.

### Learning

-   [ ] Java and Python are available as the initial preparation tracks.
-   [ ] The content model can support a Data Analyst track and additional languages/roles without duplicating the whole application.
-   [ ] Data Analyst is clearly marked as planned/coming soon until its reviewed content is ready.
-   [ ] Authenticated learners can browse and read content.
-   [ ] Bookmarks and progress still work.
-   [ ] Dashboard shows actual progress.
-   [ ] Existing functionality is not accidentally broken.

### Admin

-   [ ] Admin can draft, edit, and publish with the existing tool.
-   [ ] Admin can mark/unmark free-preview articles.
-   [ ] Unpublished content is never exposed publicly.
-   [ ] Published content appears according to preview status.

### Visual design quality

-   [ ] The interface has a recognizable interVo visual identity rather than a generic template appearance.
-   [ ] Typography, spacing, colors, borders, shadows, radii, and interaction states use consistent design tokens.
-   [ ] Landing page hero includes a polished, accurate preview of the actual product experience.
-   [ ] Public and authenticated pages feel like parts of one coherent product.
-   [ ] Dashboard, track overview, topic reader, and article cards have clear hierarchy and purpose-specific layouts.
-   [ ] Motion is purposeful, lightweight, and respects reduced-motion preferences.
-   [ ] Desktop, tablet, and mobile layouts have been reviewed; no horizontal overflow or clipped controls.
-   [ ] Loading, error, empty, disabled, and success states are designed rather than left as browser defaults.
-   [ ] No fake metrics, testimonials, streaks, progress, or nonfunctional controls are shown.

### Quality

-   [ ] No critical console errors or backend exceptions in core flows.
-   [ ] Mobile and desktop layouts are verified.
-   [ ] Labels, focus states, and keyboard navigation work.
-   [ ] Migrations and tests are included.
-   [ ] Production build succeeds.

## 16. Instructions to Claude Code

Act as a senior product designer and senior full-stack engineer. You are responsible for both visual quality and implementation quality.

First inspect the repository and provide a concise audit before coding. Identify the current UI framework, styling system, routing, reusable components, and existing product behavior. Then implement one reviewable step at a time, starting with the design system, public shell, and landing page.

**Do not interpret "make it modern" as a small color change.** Rework the visual hierarchy, composition, typography, spacing, product preview, responsive behavior, and interaction details according to Section 2. The result must look intentionally art-directed and premium, while remaining maintainable and fast.

Before implementation:
1. Inspect the current pages and identify why they look basic or generic.
2. Propose a short visual direction and list the components/tokens to reuse.
3. Preserve all working routes, authentication, backend contracts, content, and access-control rules.

During implementation:
1. Build reusable design tokens and components instead of adding isolated styles everywhere.
2. Implement the complete responsive layout—not only the desktop hero.
3. Use real backend content and real state; do not ship invented dashboard numbers or fake interactions.
4. Ensure every visible button, tab, menu, filter, and CTA works or is clearly disabled/not shown.
5. Keep animations polished, purposeful, lightweight, and accessible.
6. Do not add new dependencies without checking whether the current stack already supports the requirement.
7. Do not remove existing functionality or change the backend security model to achieve a visual result.

After each step:
1. Summarize files changed and key decisions.
2. Run relevant tests/build checks and report failures honestly.
3. Review the actual rendered UI at desktop and mobile sizes if browser/screenshot tools are available.
4. Fix layout issues and do a visual polish pass before moving on.
5. Ask before major architectural changes or destructive migrations.

Do not attempt to build the whole product in one giant pass. Ship polished, coherent slices. A page is not finished merely because it compiles: it must look good, behave correctly, and work at mobile sizes.

**The product should feel like a premium developer tool that helps
people prepare for interviews---not a generic coaching website.**

## Final positioning

**interVo --- A smarter place to prepare for IT interviews.**

The long-term product direction is a multi-track preparation platform for developers and data professionals. Start with high-quality Java and Python tracks, add Data Analyst next, and expand to other languages and job roles as quality content becomes available.

Phase 1 succeeds when a visitor discovers interVo through a useful
public article, understands the product from the landing page, creates a
free account, explores Java/Python interview content, reads and
bookmarks material, tracks progress, and editors can publish quality
content without a code deployment.
