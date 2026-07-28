# Phase 3 — Resume & Portfolio: Intervo Resume

## Goal
Extend Intervo from "prepare" to "apply" with a resume builder, AI-assisted review, and ATS optimization.

## Scope
**In:** resume builder (templates + editor), AI resume review, ATS score/optimization, export (PDF).
**Out:** portfolio builder (can follow later as its own sub-phase if prioritized), job tracker (Phase 5).

## Frontend Tasks
- Resume builder: form-driven editor (sections: summary, experience, projects, education, skills) with live preview.
- Template gallery (3–5 premium, modern templates matching brand aesthetic).
- AI review panel: inline suggestions per section (clarity, impact, keyword gaps).
- ATS Score widget: score + actionable checklist (missing keywords, formatting issues).
- Export to PDF; shareable public link (optional, for portfolio-style sharing).
- Version history (multiple resume variants per target role).

## Backend Tasks
- Resume domain model (sections stored as structured JSON, not raw HTML, so AI can reason over it).
- PDF generation service (server-side rendering — e.g., HTML→PDF via headless Chromium, or a Java PDF lib).
- AI review integration reusing the Phase 2 AI gateway: prompt resume content against a target job description/role for tailored suggestions.
- ATS scoring: keyword-matching + formatting-rule engine (can start rule-based, layer AI on top).
- File storage for exported PDFs (S3, private bucket + signed URLs).

## Data Model
- `resumes` (id, user_id, title, template_id, content_json, created_at, updated_at)
- `resume_versions` (resume_id, version_no, content_json, created_at)
- `ats_scores` (resume_id, score, breakdown_json, computed_at)
- `resume_exports` (resume_id, s3_key, created_at)

## AI/Infra Notes
- Reuse Phase 2's AI gateway and quota system — resume review consumes the same AI credit pool.
- Keep resume content_json schema stable early; it's the contract between the editor, PDF renderer, and AI reviewer.

## Exit Criteria
- [ ] User can build a resume from a template, get an AI review, see an ATS score, and export a PDF.
- [ ] Resume data model supports at least 2 templates rendering from the same content.
- [ ] ATS score updates when content changes (recomputed on save, not just on demand).
