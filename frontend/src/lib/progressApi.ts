import { api } from "./api";
import { unwrap } from "./apiError";
import type { ApiResponse } from "@/types/api";
import type { BookmarkStatus, BookmarkSummary, Progress, ProgressStatus, ProgressSummary } from "@/types/content";

export async function fetchProgress(contentUnitId: number) {
  const { data } = await api.get<ApiResponse<Progress | null>>(`/api/progress/${contentUnitId}`);
  return data.data;
}

export async function setProgress(contentUnitId: number, status: ProgressStatus) {
  return unwrap(
    api.put<ApiResponse<Progress>>(`/api/progress/${contentUnitId}`, { status }),
    "Failed to update progress",
  );
}

export async function fetchProgressSummary() {
  return unwrap(api.get<ApiResponse<ProgressSummary>>("/api/progress/summary"), "Failed to load progress summary");
}

export async function fetchBookmarkStatus(contentUnitId: number) {
  return unwrap(
    api.get<ApiResponse<BookmarkStatus>>(`/api/bookmarks/${contentUnitId}`),
    "Failed to load bookmark status",
  );
}

export async function addBookmark(contentUnitId: number) {
  return unwrap(api.put<ApiResponse<BookmarkStatus>>(`/api/bookmarks/${contentUnitId}`), "Failed to bookmark");
}

export async function removeBookmark(contentUnitId: number) {
  return unwrap(
    api.delete<ApiResponse<BookmarkStatus>>(`/api/bookmarks/${contentUnitId}`),
    "Failed to remove bookmark",
  );
}

export async function fetchBookmarkSummary() {
  return unwrap(api.get<ApiResponse<BookmarkSummary>>("/api/bookmarks/summary"), "Failed to load bookmark summary");
}
