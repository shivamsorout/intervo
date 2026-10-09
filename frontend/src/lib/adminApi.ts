import { api } from "./api";
import { unwrap } from "./apiError";
import type { ApiResponse } from "@/types/api";
import type { GenerateContentRequest, GeneratedContent, SaveContentRequest, SavedContentResult } from "@/types/admin";

export async function generateContent(request: GenerateContentRequest) {
  return unwrap(
    api.post<ApiResponse<GeneratedContent>>("/api/admin/content/generate", request),
    "Failed to generate content",
  );
}

export async function saveContent(request: SaveContentRequest) {
  return unwrap(api.post<ApiResponse<SavedContentResult>>("/api/admin/content/save", request), "Failed to save content");
}
