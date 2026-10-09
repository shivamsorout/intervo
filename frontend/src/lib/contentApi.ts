import { api } from "./api";
import { unwrap } from "./apiError";
import type { ApiResponse } from "@/types/api";
import type { ArticleTeaser, ContentUnit, Stack, StackStats, Subtopic, Topic } from "@/types/content";

export { ApiRequestError } from "./apiError";

export async function fetchStacks() {
  return unwrap(api.get<ApiResponse<Stack[]>>("/api/stacks"), "Failed to load stacks");
}

export async function fetchTopics(stackSlug: string) {
  return unwrap(api.get<ApiResponse<Topic[]>>(`/api/stacks/${stackSlug}/topics`), "Failed to load topics");
}

export async function fetchSubtopics(stackSlug: string, topicSlug: string) {
  return unwrap(
    api.get<ApiResponse<Subtopic[]>>(`/api/stacks/${stackSlug}/topics/${topicSlug}/subtopics`),
    "Failed to load subtopics",
  );
}

export async function fetchContentUnit(stackSlug: string, topicSlug: string, subtopicSlug: string) {
  return unwrap(
    api.get<ApiResponse<ContentUnit>>(
      `/api/stacks/${stackSlug}/topics/${topicSlug}/subtopics/${subtopicSlug}/content`,
    ),
    "Failed to load content",
  );
}

export async function fetchStackStats(stackSlug: string) {
  return unwrap(api.get<ApiResponse<StackStats>>(`/api/stacks/${stackSlug}/stats`), "Failed to load stack stats");
}

export async function fetchPublishedArticles(limit = 6) {
  return unwrap(
    api.get<ApiResponse<ArticleTeaser[]>>("/api/articles/published", { params: { limit } }),
    "Failed to load articles",
  );
}
