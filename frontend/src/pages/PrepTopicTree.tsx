import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchStacks, fetchSubtopics, fetchTopics } from "@/lib/contentApi";
import type { Stack, Subtopic, Topic } from "@/types/content";
import { getStackTheme } from "@/components/content/stackTheme";
import { Card, CardBody } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

interface TopicWithSubtopics {
  topic: Topic;
  subtopics: Subtopic[];
}

function TreeSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="relative h-36 overflow-hidden rounded-3xl border border-line bg-surface">
          <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-ink/5 to-transparent" />
        </div>
      ))}
    </div>
  );
}

export function PrepTopicTree() {
  const { stackSlug } = useParams<{ stackSlug: string }>();
  const [stack, setStack] = useState<Stack | null>(null);
  const [tree, setTree] = useState<TopicWithSubtopics[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stackSlug) return;
    let cancelled = false;

    setIsLoading(true);
    setError(null);

    Promise.all([fetchStacks(), fetchTopics(stackSlug)])
      .then(async ([allStacks, topics]) => {
        const subtopicLists = await Promise.all(topics.map((topic) => fetchSubtopics(stackSlug, topic.slug)));
        if (cancelled) return;
        setStack(allStacks.find((s) => s.slug === stackSlug) ?? null);
        setTree(topics.map((topic, index) => ({ topic, subtopics: subtopicLists[index] })));
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
  }, [stackSlug]);

  const theme = stackSlug ? getStackTheme(stackSlug, stack?.name ?? stackSlug) : null;

  return (
    <div className="relative isolate">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] overflow-hidden">
        <div className="bg-grid mask-fade-b absolute inset-0 opacity-70" />
        {theme && (
          <div
            className="animate-aurora absolute -top-32 left-1/4 h-[380px] w-[560px] rounded-full opacity-60"
            style={{ background: `radial-gradient(closest-side, ${theme.tint.replace("0.14", "0.3")}, transparent)` }}
          />
        )}
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-24 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <Link
          to="/prep"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <Icon name="arrow-right" className="h-3.5 w-3.5 rotate-180" />
          Explore Topics
        </Link>

        <div className="iv-rise mt-5 flex items-center gap-4">
          {theme && (
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
            >
              {theme.glyph}
            </span>
          )}
          <div>
            <h1 className="font-[var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {stack?.name ?? stackSlug}
            </h1>
            {stack?.description && <p className="mt-1.5 max-w-2xl text-muted">{stack.description}</p>}
          </div>
        </div>

        <div className="mt-10">
          {isLoading ? (
            <TreeSkeleton />
          ) : error ? (
            <EmptyState title="We couldn't load this stack" description={error} />
          ) : tree.length === 0 ? (
            <EmptyState
              title="No topics published yet"
              description="We're still building out this stack's content. Check back soon, or explore another technology."
              icon="list-tree"
            />
          ) : (
            <div className="space-y-5">
              {tree.map(({ topic, subtopics }, i) => (
                <Reveal key={topic.id} delay={i * 80}>
                  <Card className="overflow-hidden rounded-3xl">
                    <CardBody className="p-6 sm:p-7">
                      <h2 className="font-[var(--font-display)] text-xl font-semibold tracking-tight text-ink">
                        {topic.name}
                      </h2>
                      {topic.description && <p className="mt-1.5 text-sm leading-relaxed text-muted">{topic.description}</p>}

                      {subtopics.length === 0 ? (
                        <p className="mt-4 text-sm text-subtle">No subtopics published yet.</p>
                      ) : (
                        <ul className="mt-4 divide-y divide-line">
                          {subtopics.map((subtopic) => (
                            <li key={subtopic.id}>
                              <Link
                                to={`/prep/${stackSlug}/${topic.slug}/${subtopic.slug}`}
                                className={cn(
                                  "group flex items-center justify-between gap-3 py-3 text-sm font-medium text-ink",
                                  "transition-colors hover:text-[var(--color-primary)]",
                                )}
                              >
                                {subtopic.name}
                                <Icon
                                  name="arrow-right"
                                  className="h-4 w-4 shrink-0 text-subtle transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--color-primary)]"
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardBody>
                  </Card>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
