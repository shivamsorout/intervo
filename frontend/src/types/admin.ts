import type { ContentUnit } from "./content";

export type Difficulty = "EASY" | "MEDIUM" | "HARD";
export type ContentStatus = "DRAFT" | "PUBLISHED";

export interface GenerateContentRequest {
  stackName: string;
  topicName: string;
  subtopicName: string;
  difficulty: Difficulty;
  instructions?: string;
}

export interface GeneratedContent {
  title: string;
  body: string;
}

export interface SaveContentRequest {
  stack: string;
  stackIsNew: boolean;
  topic: string;
  topicIsNew: boolean;
  subtopic: string;
  subtopicIsNew: boolean;
  title: string;
  body: string;
  status: ContentStatus;
  isFreePreview: boolean;
}

export interface SavedContentResult {
  contentUnit: ContentUnit;
  stackSlug: string;
  topicSlug: string;
  subtopicSlug: string;
}
