# Phase 6 — Scale, Growth & Launch

## Goal
Turn the product into a business and prepare for public/scaled launch: monetization, performance, analytics, and the first brand extensions.

## Scope
**In:** payments/subscriptions, performance hardening, analytics, SEO, accessibility pass, first extension (Campus/Enterprise), public launch.
**Out:** anything not yet validated by usage data from Phases 1–5.

## Frontend Tasks
- Pricing page + subscription management UI (plan selection, billing history, upgrade/downgrade).
- Performance pass: code-splitting, image optimization, Lighthouse ≥ 90 on core pages.
- SEO: SSR/prerendering for public content pages (consider Next.js migration or a prerendering layer if the SPA hurts SEO), sitemaps, structured data for content/company pages.
- Accessibility audit (WCAG AA): keyboard nav, contrast (check brand palette against AA on both themes), ARIA labeling.
- Analytics instrumentation (funnel: signup → first content view → first AI interaction → subscription).

## Backend Tasks
- Payments integration (Stripe or a regional provider) — plans, webhooks, invoicing, proration.
- Entitlement/feature-gating service (free vs. premium: AI quota tiers, premium content, resume exports).
- Observability: distributed tracing (OpenTelemetry), centralized logging, SLO dashboards, alerting on error budget burn.
- Load testing key flows (auth, content browsing, AI endpoints) and scaling API (horizontal pod/task autoscaling on AWS).
- Data backup/DR plan for MySQL (automated snapshots, point-in-time recovery) and Redis.
- Security hardening: dependency scanning, OWASP top-10 pass, secrets rotation, WAF in front of ALB/CloudFront.

## Data Model
- `subscriptions` (user_id, plan, status, current_period_end, provider_customer_id)
- `invoices` (subscription_id, amount, status, issued_at)
- `feature_entitlements` (plan, feature_key, limit)
- `analytics_events` (user_id, event_name, properties_json, created_at) — or route to a dedicated analytics platform instead of modeling in MySQL.

## Growth / Brand Extension Notes
- First extension candidates once core is stable: **Intervo Campus** (college partnerships) or **Intervo Pro** (premium tier) — both are packaging/entitlement changes on top of existing systems, not new platforms.
- Keep `Intervo <X>` naming and sub-brand routing (`/prep`, `/ai`, `/resume`, `/jobs`, `/community`) consistent with the brand doc's product ecosystem so future extensions slot in without a rebrand.

## Exit Criteria
- [ ] A user can subscribe, get gated premium features, and manage billing self-service.
- [ ] Core public pages pass Lighthouse ≥ 90 and WCAG AA.
- [ ] Observability stack answers "what broke and for whom" within minutes during an incident.
- [ ] Public launch checklist complete (domain, legal/privacy pages, support channel, status page).
