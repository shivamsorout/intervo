import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchStacks, fetchStackStats } from "@/lib/contentApi";
import type { Stack } from "@/types/content";
import { StackCard, StackSkeleton, type StackWithStats } from "@/components/content/StackCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/motion/Reveal";
import { buttonClasses } from "@/components/ui/Button";

export function PrepStackList() {
  const [stacks, setStacks] = useState<StackWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    document.title = "Explore Topics — interVo";
  }, []);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetchStacks()
      .then(async (allStacks: Stack[]) => {
        const withStats = await Promise.all(
          allStacks.map(async (stack) => ({ ...stack, stats: await fetchStackStats(stack.slug) })),
        );
        if (!cancelled) setStacks(withStats);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  return (
    <div className="relative isolate">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] overflow-hidden">
        <div className="bg-grid mask-fade-b absolute inset-0 opacity-70" />
        <div className="animate-aurora absolute -top-40 left-1/4 h-[420px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(117,98,255,0.25),transparent)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <header className="max-w-3xl">
          <p className="iv-rise inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
            <span className="h-px w-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]" />
            Explore Topics
          </p>
          <h1
            className="iv-rise mt-4 font-[var(--font-display)] text-4xl font-bold tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Pick your stack. <span className="text-gradient">Own your interview.</span>
          </h1>
          <p className="iv-rise mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg" style={{ animationDelay: "160ms" }}>
            Browse structured, topic-wise interview preparation for every technology — free to read, no account
            required.
          </p>
        </header>

        <div className="mt-12">
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <StackSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <EmptyState
              title="We couldn't load the topic library"
              description="Something went wrong while fetching the stacks. Check your connection and try again."
              action={
                <button type="button" onClick={() => setReloadKey((k) => k + 1)} className={buttonClasses("outline", "md")}>
                  Try again
                </button>
              }
            />
          ) : stacks.length === 0 ? (
            <EmptyState
              title="No stacks available yet"
              description="We're setting up the topic library right now. Check back shortly."
              icon="layers"
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stacks.map((stack, i) => (
                <StackCard key={stack.slug} stack={stack} index={i} />
              ))}
            </div>
          )}
        </div>

        <Reveal className="mt-20">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-surface p-6 sm:p-8 md:flex-row md:items-center">
            <div>
              <h2 className="font-[var(--font-display)] text-2xl font-semibold tracking-tight text-ink">
                Want to track your progress?
              </h2>
              <p className="mt-2 max-w-xl text-muted">
                Create a free account to bookmark topics and pick up exactly where you left off.
              </p>
            </div>
            <Link to="/signup" className={buttonClasses("primary", "lg", "shrink-0")}>
              Start Learning Free
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
