import { Link } from "react-router-dom";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { getStackTheme } from "./stackTheme";
import type { Stack, StackStats } from "@/types/content";
import { cn } from "@/lib/cn";

export interface StackWithStats extends Stack {
  stats: StackStats;
}

export function bentoSpans(count: number) {
  const pattern = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-4"];
  const spans = Array.from({ length: count }, (_, i) => pattern[i % 4]);
  const rest = count % 4;
  const start = count - rest;
  if (rest === 1) spans[start] = "lg:col-span-6";
  if (rest === 2) spans.splice(start, 2, "lg:col-span-3", "lg:col-span-3");
  if (rest === 3) spans.splice(start, 3, "lg:col-span-2", "lg:col-span-2", "lg:col-span-2");
  return spans;
}

export function StackSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-52 overflow-hidden rounded-3xl border border-line bg-surface", className)}>
      <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-ink/5 to-transparent" />
    </div>
  );
}

export function StackCard({ stack, index, className }: { stack: StackWithStats; index: number; className?: string }) {
  const theme = getStackTheme(stack.slug, stack.name, index);
  const wide = className?.includes("col-span-4") || className?.includes("col-span-6");

  return (
    <Reveal delay={index * 90} className={cn("h-full", className)}>
      <Link
        to={`/prep/${stack.slug}`}
        className="card-glow group relative flex h-full min-h-56 flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(117,98,255,0.55)] focus-visible:outline-none sm:p-7"
      >
        <div
          aria-hidden
          className="absolute -right-16 -top-24 h-64 w-64 rounded-full opacity-50 transition-opacity duration-500 group-hover:opacity-80"
          style={{ background: `radial-gradient(circle, ${theme.tint.replace("0.14", "0.6")}, transparent 70%)` }}
        />
        <div className="relative flex items-start justify-between gap-4">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
          >
            {theme.glyph}
          </span>
          {stack.status === "PUBLISHED" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" /> Available
            </span>
          ) : stack.status === "IN_PROGRESS" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line-strong px-2.5 py-1 text-[11px] font-medium text-subtle">
              In progress
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-2.5 py-1 text-[11px] font-medium text-subtle">
              <Icon name="clock" className="h-3 w-3" /> Coming soon
            </span>
          )}
        </div>

        <div className="relative mt-6">
          <h3 className="font-[var(--font-display)] text-2xl font-semibold tracking-tight text-ink">{stack.name}</h3>
          {stack.description && (
            <p className={cn("mt-2 text-sm leading-relaxed text-muted", wide ? "max-w-lg" : "line-clamp-3")}>{stack.description}</p>
          )}
        </div>

        {wide && (
          <div className="code-panel relative mt-5 hidden truncate rounded-xl border border-white/8 px-3.5 py-2.5 text-[12px] sm:block" aria-hidden>
            <span className="text-white/30">› </span>
            <span className="text-white/75">{theme.snippet}</span>
          </div>
        )}

        <div className="relative mt-auto flex items-end justify-between gap-4 pt-6">
          <dl className="flex gap-5">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.12em] text-subtle">Topics</dt>
              <dd className="mt-0.5 font-[var(--font-display)] text-xl font-semibold text-ink">{stack.stats.topicCount}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.12em] text-subtle">Articles</dt>
              <dd className="mt-0.5 font-[var(--font-display)] text-xl font-semibold text-ink">{stack.stats.publishedArticleCount}</dd>
            </div>
          </dl>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
            Explore
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong transition-all duration-300 group-hover:border-transparent group-hover:bg-[var(--color-primary)] group-hover:text-white">
              <Icon name="arrow-up-right" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
