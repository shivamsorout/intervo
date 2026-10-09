import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPublishedArticles } from "@/lib/contentApi";
import { articleHref, formatArticleDate } from "@/lib/articles";
import type { ArticleTeaser } from "@/types/content";
import { ArticleVisual } from "@/components/content/ArticleVisual";
import { StackBadge } from "@/components/content/stackTheme";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const FETCH_LIMIT = 60;
const PAGE_SIZE = 9;

function ArticleCard({ article, index }: { article: ArticleTeaser; index: number }) {
  const date = formatArticleDate(article.updatedAt);
  return (
    <Reveal delay={(index % 3) * 80} className="h-full">
      <Link
        to={articleHref(article)}
        className="card-glow group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(117,98,255,0.55)] focus-visible:outline-none"
      >
        <ArticleVisual article={article} />
        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-subtle">
            <StackBadge slug={article.stackSlug} name={article.stackName} />
            {date && <time dateTime={article.updatedAt}>{date}</time>}
          </div>
          <h3 className="mt-3 font-[var(--font-display)] text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-[var(--color-primary)]">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{article.excerpt}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-ink">
            Read article
            <Icon name="arrow-right" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function FeaturedArticle({ article }: { article: ArticleTeaser }) {
  const date = formatArticleDate(article.updatedAt);
  return (
    <Reveal>
      <Link
        to={articleHref(article)}
        className="card-glow group grid overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-35px_rgba(117,98,255,0.6)] focus-visible:outline-none md:grid-cols-[1.1fr_1fr]"
      >
        <ArticleVisual article={article} size="lg" className="md:h-full md:min-h-72" />
        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-subtle">
            <span className="rounded-full bg-[var(--color-primary)]/12 px-2.5 py-1 font-medium text-[var(--color-primary)]">Latest</span>
            <StackBadge slug={article.stackSlug} name={article.stackName} />
            {date && <time dateTime={article.updatedAt}>{date}</time>}
          </div>
          <h2 className="mt-4 font-[var(--font-display)] text-2xl font-bold leading-tight tracking-tight text-ink transition-colors group-hover:text-[var(--color-primary)] sm:text-3xl">
            {article.title}
          </h2>
          <p className="mb-6 mt-3 line-clamp-4 leading-relaxed text-muted">{article.excerpt}</p>
          <span className={buttonClasses("primary", "md", "mt-auto translate-y-0 self-start")}>
            Read article
            <Icon name="arrow-right" className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function GridSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="relative h-80 overflow-hidden rounded-3xl border border-line bg-surface">
          <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-ink/5 to-transparent" />
        </div>
      ))}
    </div>
  );
}

export function Blogs() {
  const [articles, setArticles] = useState<ArticleTeaser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [stack, setStack] = useState<string>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    document.title = "Blog — interview prep articles | interVo";
  }, []);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    fetchPublishedArticles(FETCH_LIMIT)
      .then((data) => {
        if (!cancelled) setArticles(data);
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

  const stacks = useMemo(() => {
    const seen = new Map<string, string>();
    articles.forEach((a) => seen.set(a.stackSlug, a.stackName));
    return Array.from(seen, ([slug, name]) => ({ slug, name }));
  }, [articles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter(
      (a) =>
        (stack === "all" || a.stackSlug === stack) &&
        (!q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)),
    );
  }, [articles, query, stack]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [query, stack]);

  const isFiltering = query.trim() !== "" || stack !== "all";
  const [featured, ...rest] = filtered;
  const grid = isFiltering ? filtered : rest;

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
            The interVo blog
          </p>
          <h1 className="iv-rise mt-4 font-[var(--font-display)] text-4xl font-bold tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl" style={{ animationDelay: "80ms" }}>
            Interview prep, <span className="text-gradient">explained properly.</span>
          </h1>
          <p className="iv-rise mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg" style={{ animationDelay: "160ms" }}>
            In-depth articles on the concepts interviewers actually ask about, with clear explanations and real code.
            Free to read, no account required.
          </p>
        </header>

        {!error && (
          <div className="iv-rise sticky top-[60px] z-20 -mx-4 mt-10 border-b border-line bg-canvas/80 px-4 py-3 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border sm:px-3" style={{ animationDelay: "240ms" }}>
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <label className="relative flex-1 md:max-w-sm">
                <span className="sr-only">Search articles</span>
                <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="h-10 w-full rounded-xl border border-line-strong bg-surface pl-10 pr-3 text-sm text-ink outline-none transition-all placeholder:text-subtle focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/15"
                />
              </label>
              <div role="group" aria-label="Filter by technology" className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-0.5">
                {[{ slug: "all", name: "All" }, ...stacks].map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => setStack(s.slug)}
                    aria-pressed={stack === s.slug}
                    className={cn(
                      "h-9 shrink-0 rounded-full border px-3.5 text-sm font-medium transition-all duration-200",
                      stack === s.slug
                        ? "border-transparent bg-ink text-canvas"
                        : "border-line-strong text-muted hover:border-ink/25 hover:text-ink",
                    )}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-10">
          {isLoading ? (
            <GridSkeleton />
          ) : error ? (
            <EmptyState
              title="We couldn't load the articles"
              description="Something went wrong while fetching the blog. Check your connection and try again."
              action={
                <button type="button" onClick={() => setReloadKey((k) => k + 1)} className={buttonClasses("outline", "md")}>
                  Try again
                </button>
              }
            />
          ) : articles.length === 0 ? (
            <EmptyState
              title="The first articles are on their way"
              description="We're writing in-depth interview guides right now. In the meantime, explore the topic library."
              action={<Link to="/prep" className={buttonClasses("primary", "md")}>Explore Topics</Link>}
            />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No articles match your search"
              description="Try a different keyword or clear the technology filter."
              action={
                <button type="button" onClick={() => { setQuery(""); setStack("all"); }} className={buttonClasses("outline", "md")}>
                  Clear filters
                </button>
              }
            />
          ) : (
            <div className="flex flex-col gap-10">
              {!isFiltering && featured && <FeaturedArticle article={featured} />}
              {grid.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {grid.slice(0, visible).map((article, i) => (
                    <ArticleCard key={article.id} article={article} index={i} />
                  ))}
                </div>
              )}
              {grid.length > visible && (
                <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className={buttonClasses("outline", "md", "self-center")}>
                  Load more articles
                </button>
              )}
            </div>
          )}
        </div>

        <Reveal className="mt-20">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-surface p-6 sm:p-8 md:flex-row md:items-center">
            <div>
              <h2 className="font-[var(--font-display)] text-2xl font-semibold tracking-tight text-ink">Want the full library?</h2>
              <p className="mt-2 max-w-xl text-muted">Create a free account to bookmark articles and track your progress topic by topic.</p>
            </div>
            <Link to="/signup" className={buttonClasses("primary", "lg", "group shrink-0")}>
              Start Learning Free
              <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
