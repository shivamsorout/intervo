# Intervo — Implementation Roadmap

AI-powered interview preparation platform. Tech stack: **React + TypeScript + Tailwind CSS** (frontend), **Java Spring Boot** (backend), **MySQL** (primary DB), **Redis** (cache/session), **AWS** (hosting/infra), **OpenAI/Gemini** (AI features), **Docker** (containerization).

Launch focus (V1): Java, Spring Boot, and Backend Development content — then expand to every stack.

## Phases

| Phase | Name | Focus | Doc |
|---|---|---|---|
| 0 | Foundation & Setup | Repos, infra, CI/CD, auth, design system | [phase-0-foundation.md](phase-0-foundation.md) |
| 1 | Core Prep Platform (MVP) | Courses, revision sheets, flashcards, mind maps, PPT/Read view, company-wise Qs | [phase-1-core-prep-platform.md](phase-1-core-prep-platform.md) |
| 2 | AI Features (Intervo AI) | AI mentor, AI doubt solver, AI mock interview | [phase-2-ai-features.md](phase-2-ai-features.md) |
| 3 | Resume & Portfolio (Intervo Resume) | Resume builder, ATS optimization, resume review | [phase-3-resume-builder.md](phase-3-resume-builder.md) |
| 4 | Community & Interview Experiences | Discussions, experience sharing, career tips | [phase-4-community.md](phase-4-community.md) |
| 5 | Jobs & Career Tools (Intervo Jobs) | Job tracker, referrals, roadmaps, coding practice, system design | [phase-5-jobs-career-tools.md](phase-5-jobs-career-tools.md) |
| 6 | Scale, Growth & Launch | Performance, analytics, payments, enterprise/campus, public launch | [phase-6-scale-and-launch.md](phase-6-scale-and-launch.md) |

## How to use these docs

Each phase doc has the same structure: **Goal → Scope (in/out) → Frontend Tasks → Backend Tasks → Data Model → AI/Infra Notes → Exit Criteria (Definition of Done)**.

Work phases in order — each one is a shippable increment, not a sprint plan. Skip ahead only if a later phase unblocks revenue or user validation earlier (e.g., you may want to pull the Resume Builder forward).
