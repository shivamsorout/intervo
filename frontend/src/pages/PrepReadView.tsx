import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { ApiRequestError, fetchContentUnit } from "@/lib/contentApi";
import * as progressApi from "@/lib/progressApi";
import type { ContentUnit, ProgressStatus } from "@/types/content";
import { extractHeadings } from "@/components/prep/extractHeadings";
import { TableOfContents } from "@/components/prep/TableOfContents";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/Toast";

export function PrepReadView() {
  const { stackSlug, topicSlug, subtopicSlug } = useParams<{
    stackSlug: string;
    topicSlug: string;
    subtopicSlug: string;
  }>();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();
  const [content, setContent] = useState<ContentUnit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loginRequired, setLoginRequired] = useState(false);
  const [progressStatus, setProgressStatus] = useState<ProgressStatus | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isTogglingBookmark, setIsTogglingBookmark] = useState(false);

  useEffect(() => {
    if (!stackSlug || !topicSlug || !subtopicSlug) return;
    let cancelled = false;

    setIsLoading(true);
    setError(null);
    setLoginRequired(false);

    fetchContentUnit(stackSlug, topicSlug, subtopicSlug)
      .then((data) => {
        if (!cancelled) setContent(data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (err instanceof ApiRequestError && err.code === "LOGIN_REQUIRED") {
          setLoginRequired(true);
        } else {
          setError(err instanceof Error ? err.message : "Failed to load content");
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [stackSlug, topicSlug, subtopicSlug]);

  useEffect(() => {
    if (!content || !isAuthenticated) return;
    let cancelled = false;

    progressApi
      .setProgress(content.id, "IN_PROGRESS")
      .then((progress) => {
        if (!cancelled) setProgressStatus(progress.status);
      })
      .catch(() => {
        // best-effort view tracking; doesn't block reading
      });

    progressApi
      .fetchBookmarkStatus(content.id)
      .then((status) => {
        if (!cancelled) setIsBookmarked(status.bookmarked);
      })
      .catch(() => {
        // best-effort; bookmark toggle just stays in its default state
      });

    return () => {
      cancelled = true;
    };
  }, [content, isAuthenticated]);

  const headings = useMemo(() => (content ? extractHeadings(content.body) : []), [content]);

  async function handleMarkComplete() {
    if (!content) return;
    setIsCompleting(true);
    try {
      const progress = await progressApi.setProgress(content.id, "COMPLETED");
      setProgressStatus(progress.status);
      showToast("Marked as complete", "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to update progress", "error");
    } finally {
      setIsCompleting(false);
    }
  }

  async function handleToggleBookmark() {
    if (!content) return;
    setIsTogglingBookmark(true);
    try {
      const status = isBookmarked
        ? await progressApi.removeBookmark(content.id)
        : await progressApi.addBookmark(content.id);
      setIsBookmarked(status.bookmarked);
      showToast(status.bookmarked ? "Bookmarked" : "Bookmark removed", "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to update bookmark", "error");
    } finally {
      setIsTogglingBookmark(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        to={`/prep/${stackSlug}`}
        className="text-sm text-slate-500 hover:text-[var(--color-primary)] dark:text-slate-400"
      >
        &larr; Back to topics
      </Link>

      {isLoading && <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">Loading article...</p>}

      {error && <p className="mt-8 text-sm text-[var(--color-error)]">{error}</p>}

      {loginRequired && !isLoading && (
        <Card className="mx-auto mt-10 max-w-md text-center">
          <CardBody className="flex flex-col items-center gap-3 py-10">
            <h1 className="font-[var(--font-display)] text-xl font-semibold text-ink">
              This article is part of the full library
            </h1>
            <p className="text-sm leading-relaxed text-muted">
              Create a free account (or log in) to keep reading — you'll land right back here.
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/login"
                state={{ from: location.pathname }}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--color-primary)] px-5 text-sm font-medium text-white hover:opacity-90"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                state={{ from: location.pathname }}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-line-strong px-5 text-sm font-medium text-ink hover:bg-ink/5"
              >
                Sign up free
              </Link>
            </div>
          </CardBody>
        </Card>
      )}

      {content && !isLoading && !error && !loginRequired && (
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_240px]">
          <div>
            {isAuthenticated && (
              <div className="mb-6 flex flex-wrap gap-3">
                <Button
                  variant={progressStatus === "COMPLETED" ? "secondary" : "primary"}
                  size="sm"
                  isLoading={isCompleting}
                  disabled={progressStatus === "COMPLETED"}
                  onClick={handleMarkComplete}
                >
                  {progressStatus === "COMPLETED" ? "Completed" : "Mark as complete"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  isLoading={isTogglingBookmark}
                  onClick={handleToggleBookmark}
                >
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
              </div>
            )}

            <article className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-[var(--font-display)] prose-code:font-[var(--font-mono)]">
              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug, rehypeHighlight]}>
                {content.body}
              </Markdown>
            </article>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
