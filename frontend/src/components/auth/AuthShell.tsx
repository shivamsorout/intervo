import type { ReactNode } from "react";
import { LogoMark } from "@/components/brand/Logo";
import { Icon, type IconName, GoogleIcon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
  aside: {
    heading: string;
    points: { icon: IconName; text: string }[];
    card: { label: string; question: string; answer: string };
  };
}

export function AuthShell({ eyebrow, title, subtitle, children, footer, aside }: AuthShellProps) {
  return (
    <div className="relative isolate">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-grid mask-fade-b absolute inset-0 opacity-60" />
        <div className="animate-aurora absolute -left-40 -top-40 h-[480px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(117,98,255,0.22),transparent)]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center lg:min-h-[calc(100svh-3.75rem)] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:px-8 lg:py-14">
        <div className="iv-rise mx-auto w-full max-w-[420px]">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-9 w-9" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">{eyebrow}</span>
          </div>
          <h1 className="mt-6 font-[var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-[1.1]">
            {title}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{subtitle}</p>

          <div className="mt-8 rounded-3xl border border-line bg-surface/80 p-5 shadow-[0_24px_60px_-30px_rgba(8,11,22,0.35)] backdrop-blur-xl sm:p-7">
            {children}
          </div>

          <div className="mt-6 text-center text-sm text-muted">{footer}</div>
        </div>

        <aside className="dark relative isolate hidden h-full max-h-[720px] min-h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#070a15] p-10 text-ink lg:flex lg:flex-col">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="animate-aurora absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(117,98,255,0.5),transparent)]" />
            <div className="animate-aurora absolute -bottom-32 -left-16 h-[380px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(66,217,245,0.3),transparent)] [animation-delay:-8s]" />
            <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_80%)]" />
          </div>

          <h2 className="max-w-sm font-[var(--font-display)] text-3xl font-semibold leading-tight tracking-tight">
            {aside.heading}
          </h2>
          <ul className="mt-8 space-y-4">
            {aside.points.map((point, i) => (
              <li key={point.text} className="iv-rise flex items-center gap-3 text-[15px] text-muted" style={{ animationDelay: `${200 + i * 100}ms` }}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[var(--color-accent)]">
                  <Icon name={point.icon} className="h-4 w-4" />
                </span>
                {point.text}
              </li>
            ))}
          </ul>

          <div className="relative mt-auto">
            <div aria-hidden className="absolute inset-x-6 -top-3 h-full rounded-2xl border border-white/8 bg-white/[0.03]" />
            <div aria-hidden className="absolute inset-x-3 -top-1.5 h-full rounded-2xl border border-white/10 bg-white/[0.05]" />
            <div className="animate-float relative rounded-2xl border border-white/12 bg-surface/90 p-5 shadow-2xl backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)]">{aside.card.label}</p>
              <p className="mt-2 font-[var(--font-display)] text-lg font-semibold text-ink">{aside.card.question}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{aside.card.answer}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function GoogleButton({ label }: { label: string }) {
  const { showToast } = useToast();
  const googleLoginUrl = `${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"}/oauth2/authorization/google`;
  return (
    <a
      href={googleLoginUrl}
      onClick={() => showToast("Redirecting to Google...", "info")}
      className="flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-line-strong bg-surface text-sm font-medium text-ink transition-all duration-200 hover:-translate-y-px hover:border-ink/25 hover:shadow-[0_8px_20px_-12px_rgba(8,11,22,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] active:scale-[0.98]"
    >
      <GoogleIcon />
      {label}
    </a>
  );
}

export function OrDivider() {
  return (
    <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-subtle">
      <div className="h-px flex-1 bg-line-strong" />
      or
      <div className="h-px flex-1 bg-line-strong" />
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <div role="alert" className="flex items-start gap-2 rounded-xl border border-[var(--color-error)]/30 bg-[var(--color-error)]/10 px-3.5 py-2.5 text-sm text-[var(--color-error)]">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden className="mt-0.5 h-4 w-4 shrink-0">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
      {message}
    </div>
  );
}
