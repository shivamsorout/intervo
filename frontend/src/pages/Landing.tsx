import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buttonClasses } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { HeroPreview } from "@/components/landing/HeroPreview";
import { LearningShowcase } from "@/components/landing/LearningShowcase";
import { ArticleVisual } from "@/components/content/ArticleVisual";
import { StackBadge } from "@/components/content/stackTheme";
import { StackCard, StackSkeleton, bentoSpans, type StackWithStats } from "@/components/content/StackCard";
import { fetchPublishedArticles, fetchStackStats, fetchStacks } from "@/lib/contentApi";
import { articleHref, formatArticleDate } from "@/lib/articles";
import type { ArticleTeaser } from "@/types/content";
import { cn } from "@/lib/cn";

const benefits: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "list-tree",
    title: "Structured preparation",
    description: "Every technology is broken into topics and subtopics in a sensible order, so you never wonder what to study next.",
  },
  {
    icon: "code",
    title: "Clear technical explanations",
    description: "Short answers you can say out loud, deep dives for follow-ups, and real code that shows how things actually work.",
  },
  {
    icon: "target",
    title: "Focused revision",
    description: "Bookmark the concepts you keep forgetting and come back to exactly those before the interview.",
  },
  {
    icon: "trend",
    title: "Track your learning progress",
    description: "Mark articles complete and see what's done and what's still in progress on your dashboard.",
  },
];

function SectionHeading({ eyebrow, title, description, align = "left" }: { eyebrow: string; title: string; description?: string; align?: "left" | "center" }) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
        <span className="h-px w-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]" />
        {eyebrow}
      </p>
      <h2 className="mt-3 font-[var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </Reveal>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-b absolute inset-0 opacity-70" />
        <div className="animate-aurora absolute -top-40 left-[-10%] h-[520px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(117,98,255,0.35),transparent)] dark:bg-[radial-gradient(closest-side,rgba(117,98,255,0.4),transparent)]" />
        <div className="animate-aurora absolute -top-20 right-[-15%] h-[480px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(66,217,245,0.22),transparent)] [animation-delay:-6s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-10 lg:px-8 lg:pb-16 lg:pt-16">
        <div className="max-w-xl">
          <p className="iv-rise inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/70 py-1 pl-1 pr-3 text-xs font-medium text-muted backdrop-blur">
            <span className="rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] px-2 py-0.5 text-[11px] font-semibold text-white">
              Free
            </span>
            A smarter way to prepare
          </p>
          <h1
            className="iv-rise mt-6 font-[var(--font-display)] text-[2.6rem] font-bold leading-[1.04] tracking-[-0.03em] text-ink sm:text-6xl lg:text-[4.1rem]"
            style={{ animationDelay: "80ms" }}
          >
            Your next interview <span className="text-gradient">starts here.</span>
          </h1>
          <p className="iv-rise mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg" style={{ animationDelay: "160ms" }}>
            Everything you need to prepare for technical interviews. Structured questions, practical explanations, and
            smarter revision, all in one place.
          </p>
          <div className="iv-rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
            <Link to="/signup" className={buttonClasses("primary", "lg", "group")}>
              Start Learning Free
              <Icon name="arrow-right" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link to="/prep" className={buttonClasses("outline", "lg")}>
              Explore Topics
            </Link>
          </div>
          <ul className="iv-rise mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted" style={{ animationDelay: "320ms" }}>
            {["Free to use", "Public articles, no login", "Progress & bookmarks"].map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Icon name="check" className="h-3.5 w-3.5 text-[var(--color-success)]" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative px-2 pb-14 sm:px-6 sm:pb-6 lg:px-0">
          <HeroPreview />
        </div>
      </div>
    </section>
  );
}

function StacksSection({ stacks, isLoading }: { stacks: StackWithStats[]; isLoading: boolean }) {
  if (!isLoading && stacks.length === 0) return null;
  const spans = bentoSpans(isLoading ? 4 : stacks.length);
  return (
    <section id="stacks" className="relative mx-auto max-w-7xl scroll-mt-20 px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Technologies"
          title="Pick your stack. Own your interview."
          description="Explore structured preparation resources built around the technologies you want to master."
        />
        <Reveal delay={120}>
          <Link to="/prep" className={buttonClasses("outline", "md", "group shrink-0")}>
            View all topics
            <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
        {isLoading
          ? spans.map((span, i) => <StackSkeleton key={i} className={span} />)
          : stacks.map((stack, i) => <StackCard key={stack.slug} stack={stack} index={i} className={spans[i]} />)}
      </div>
    </section>
  );
}

function ArticleDate({ value }: { value: string }) {
  const formatted = formatArticleDate(value);
  if (!formatted) return null;
  return (
    <time dateTime={value} className="inline-flex items-center gap-1.5">
      <Icon name="clock" className="h-3.5 w-3.5" />
      Updated {formatted}
    </time>
  );
}

function BlogSection({ articles }: { articles: ArticleTeaser[] }) {
  if (articles.length === 0) return null;
  const [featured, ...rest] = articles;
  const list = rest.slice(0, 4);

  return (
    <section className="relative border-y border-line bg-surface-2/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="From the blog"
            title="Level up before your next interview."
            description="Free, in-depth articles on the questions interviewers actually ask. No account needed to read them."
          />
          <Reveal delay={120}>
            <Link to="/blogs" className={buttonClasses("outline", "md", "group shrink-0")}>
              Explore All Articles
              <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className={cn("mt-12 grid gap-6", list.length > 0 && "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10")}>
          <Reveal>
            <Link
              to={articleHref(featured)}
              className={cn(
                "card-glow group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-35px_rgba(117,98,255,0.6)] focus-visible:outline-none",
                list.length === 0 && "md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]",
              )}
            >
              <ArticleVisual article={featured} size="lg" className={cn(list.length === 0 && "md:h-full md:min-h-80")} />
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 text-xs text-subtle">
                  <StackBadge slug={featured.stackSlug} name={featured.stackName} />
                  <span className="rounded-full bg-[var(--color-primary)]/12 px-2.5 py-1 font-medium text-[var(--color-primary)]">Featured</span>
                  <ArticleDate value={featured.updatedAt} />
                </div>
                <h3 className="mt-4 font-[var(--font-display)] text-2xl font-semibold leading-tight tracking-tight text-ink transition-colors group-hover:text-[var(--color-primary)] sm:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-muted">{featured.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-ink">
                  Read article
                  <Icon name="arrow-right" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          {list.length > 0 && (
            <ol className="flex flex-col lg:-mt-6">
              {list.map((article, i) => (
                <Reveal as="li" key={article.id} delay={100 + i * 90} className="border-b border-line last:border-b-0">
                  <Link to={articleHref(article)} className="group flex gap-5 py-6 focus-visible:outline-none">
                    <span className="font-mono text-sm text-subtle transition-colors group-hover:text-[var(--color-primary)]">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-subtle">
                        <StackBadge slug={article.stackSlug} name={article.stackName} />
                        <ArticleDate value={article.updatedAt} />
                      </div>
                      <h3 className="mt-2.5 font-[var(--font-display)] text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-[var(--color-primary)]">
                        {article.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{article.excerpt}</p>
                    </div>
                    <Icon name="arrow-up-right" className="mt-1 h-4 w-4 shrink-0 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                  </Link>
                </Reveal>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}

function ShowcaseSection() {
  return (
    <section className="dark relative isolate overflow-hidden bg-[#060914] text-ink">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_30%_40%,#000,transparent)]" />
        <div className="absolute -left-40 top-20 h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(117,98,255,0.28),transparent)]" />
        <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(66,217,245,0.16),transparent)]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="The learning experience"
          title="Built for how interviews are actually won."
          description="Clear answers, real code, an ordered path through every topic, and tools to make revision stick."
        />
        <Reveal delay={120} className="mt-12">
          <LearningShowcase />
        </Reveal>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Why interVo"
            title="Less searching. More preparing."
            description="Stop juggling blog posts, videos and forum threads. Spend your time on the part that matters: understanding."
          />
          <Reveal delay={150} className="mt-8">
            <Link to="/signup" className={buttonClasses("primary", "md", "group")}>
              Create your free account
              <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <ol className="relative">
          <span aria-hidden className="absolute bottom-6 left-[23px] top-6 w-px bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-accent)]/60 to-transparent" />
          {benefits.map((benefit, i) => (
            <Reveal as="li" key={benefit.title} delay={i * 110} className="group relative flex gap-6 pb-10 last:pb-0">
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-line-strong bg-surface text-[var(--color-primary)] shadow-[0_8px_24px_-12px_rgba(117,98,255,0.6)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-gradient-to-br group-hover:from-[var(--color-primary)] group-hover:to-[var(--color-accent)] group-hover:text-white">
                <Icon name={benefit.icon} className="h-5 w-5" />
              </span>
              <div className="pt-1">
                <p className="font-mono text-xs text-subtle">0{i + 1}</p>
                <h3 className="mt-1 font-[var(--font-display)] text-xl font-semibold tracking-tight text-ink">{benefit.title}</h3>
                <p className="mt-2 max-w-md leading-relaxed text-muted">{benefit.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
      <Reveal>
        <div className="dark relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0e1d] px-6 py-16 text-center sm:px-12 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="animate-aurora absolute -left-24 -top-32 h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(117,98,255,0.55),transparent)]" />
            <div className="animate-aurora absolute -bottom-40 -right-20 h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(66,217,245,0.35),transparent)] [animation-delay:-9s]" />
            <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
          </div>
          <h2 className="mx-auto max-w-3xl font-[var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-5xl sm:leading-[1.08]">
            Make your next interview your best one.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Build your knowledge, revise with focus, and prepare with confidence.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/signup" className={buttonClasses("primary", "lg", "group w-full sm:w-auto")}>
              Start Learning Free
              <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/blogs" className={buttonClasses("outline", "lg", "w-full sm:w-auto")}>
              Read the blog
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Landing() {
  const [stacks, setStacks] = useState<StackWithStats[]>([]);
  const [stacksLoading, setStacksLoading] = useState(true);
  const [articles, setArticles] = useState<ArticleTeaser[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetchStacks()
      .then(async (allStacks) => {
        const withStats = await Promise.all(
          allStacks.map(async (stack) => ({ ...stack, stats: await fetchStackStats(stack.slug) })),
        );
        if (!cancelled) setStacks(withStats.filter((s) => s.stats.topicCount > 0));
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setStacksLoading(false);
      });

    fetchPublishedArticles(5)
      .then((data) => {
        if (!cancelled) setArticles(data);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="-mt-15">
      <div className="pt-15">
        <Hero />
      </div>
      <StacksSection stacks={stacks} isLoading={stacksLoading} />
      <BlogSection articles={articles} />
      <ShowcaseSection />
      <BenefitsSection />
      <FinalCta />
    </div>
  );
}
