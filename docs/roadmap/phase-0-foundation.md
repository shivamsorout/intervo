# Phase 0 — Foundation & Setup

## Goal
Stand up the repos, infrastructure, auth, and design system so every later phase builds on a stable base.

## Scope
**In:** repo/monorepo layout, CI/CD, Dockerized local dev, DB + cache provisioning, JWT auth, base design system, landing page shell.
**Out:** any real course content, AI features, payments.

## Repo & Project Structure
- Two repos (or a monorepo with `/frontend` and `/backend`): `intervo-web` (React) and `intervo-api` (Spring Boot).
- `intervo-api`: standard Maven/Gradle Spring Boot layout — `config`, `controller`, `service`, `repository`, `entity`, `dto`, `security`, `exception`.
- `intervo-web`: Vite + React + TypeScript, `src/{components,pages,features,hooks,lib,api,styles}`.
- Shared `.editorconfig`, ESLint + Prettier, Checkstyle/Spotless for Java.

## Frontend Tasks
- Bootstrap Vite React-TS app; Tailwind CSS config with brand tokens (colors, fonts below).
- Configure fonts: Inter (primary), Poppins (secondary), JetBrains Mono (code).
- Base layout shell: navbar, footer, auth pages (login/signup/forgot password), dashboard skeleton.
- Global design tokens: dark background `#0B0F19`, card `#151A27`, light background `#F8FAFC`, primary `#6D5DF6`, secondary `#3B82F6`, accent `#06B6D4`, success `#10B981`, warning `#F59E0B`, error `#EF4444`.
- Dark/light theme toggle (dark-first, per brand personality).
- Reusable UI kit: Button, Card, Input, Modal, Toast, Badge, Tabs — rounded corners, soft shadows, subtle glassmorphism, gradient highlights.
- API client (Axios/fetch wrapper) with interceptors for auth token refresh.
- Routing (React Router), protected route wrapper.

## Backend Tasks
- Spring Boot app with Spring Web, Spring Security, Spring Data JPA, Validation.
- JWT-based auth: signup, login, refresh token, logout; password hashing (BCrypt).
- OAuth2 login (Google) for low-friction signup — common for this audience.
- Role model: `STUDENT`, `ADMIN`, `CONTENT_EDITOR` (future-proofs Phase 1 CMS work).
- Global exception handler, standard API response envelope, request validation.
- Rate limiting on auth endpoints (Redis-backed bucket).
- Health check / actuator endpoints.

## Data Model (initial)
- `users` (id, email, password_hash, name, role, provider, created_at, last_login_at)
- `user_profiles` (user_id, experience_level, target_stack, avatar_url)
- `refresh_tokens` (id, user_id, token_hash, expires_at)

## Infra / DevOps
- Docker Compose for local dev: `mysql`, `redis`, `backend`, `frontend`.
- AWS target architecture: RDS (MySQL), ElastiCache (Redis), ECS/Fargate or EC2 for API, S3 + CloudFront for frontend/static assets, ACM for TLS.
- GitHub Actions CI: lint + test + build on PR; separate deploy workflow per environment (staging/prod).
- Environment config via `.env` / AWS Secrets Manager — never commit secrets.
- Structured logging (JSON) + basic CloudWatch alarms (5xx rate, latency).

## Exit Criteria
- [ ] User can sign up, log in (email + Google), and land on an empty dashboard.
- [ ] `docker compose up` runs the full stack locally.
- [ ] CI pipeline green on lint/test/build for both repos.
- [ ] Design system (colors, typography, base components) implemented and documented in Storybook or an equivalent style guide page.
- [ ] Staging environment deployed on AWS and reachable over HTTPS.
