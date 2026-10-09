export type TrackStatus = "PLANNED" | "IN_PROGRESS" | "PUBLISHED";
export type TrackType = "LANGUAGE" | "FRAMEWORK" | "JOB_ROLE" | "SPECIALIZATION";

export interface Stack {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  sortOrder: number;
  status: TrackStatus;
  trackType: TrackType;
}

export interface Topic {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  sortOrder: number;
}

export interface Subtopic {
  id: number;
  slug: string;
  name: string;
  sortOrder: number;
}

export interface ContentUnit {
  id: number;
  type: "ARTICLE" | "FLASHCARD";
  title: string;
  body: string;
  updatedAt: string;
}

export interface StackStats {
  topicCount: number;
  publishedArticleCount: number;
}

export interface ArticleTeaser {
  id: number;
  title: string;
  excerpt: string;
  stackSlug: string;
  stackName: string;
  topicSlug: string;
  subtopicSlug: string;
  updatedAt: string;
}

export type ProgressStatus = "IN_PROGRESS" | "COMPLETED";

export interface Progress {
  contentUnitId: number;
  status: ProgressStatus;
  lastViewedAt: string;
}

export interface ProgressSummary {
  completedCount: number;
  inProgressCount: number;
}

export interface BookmarkStatus {
  bookmarked: boolean;
}

export interface BookmarkSummary {
  count: number;
}
