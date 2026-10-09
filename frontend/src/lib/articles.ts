import type { ArticleTeaser } from "@/types/content";

export function articleHref(article: ArticleTeaser) {
  return `/prep/${article.stackSlug}/${article.topicSlug}/${article.subtopicSlug}`;
}

const dateFormatter = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" });

export function formatArticleDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : dateFormatter.format(date);
}

export function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
