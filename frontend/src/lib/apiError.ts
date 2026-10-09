import axios, { type AxiosResponse } from "axios";
import type { ApiResponse } from "@/types/api";

export class ApiRequestError extends Error {
  code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.code = code;
  }
}

function toApiError(err: unknown, fallback: string): ApiRequestError {
  if (err instanceof ApiRequestError) return err;
  if (axios.isAxiosError(err) && err.response?.data?.error) {
    const apiError = err.response.data.error as { code?: string; message?: string };
    return new ApiRequestError(apiError.message ?? fallback, apiError.code);
  }
  if (err instanceof Error) return new ApiRequestError(err.message);
  return new ApiRequestError(fallback);
}

export async function unwrap<T>(request: Promise<AxiosResponse<ApiResponse<T>>>, fallback: string): Promise<T> {
  try {
    const { data } = await request;
    if (!data.data) throw new ApiRequestError(data.error?.message ?? fallback, data.error?.code);
    return data.data;
  } catch (err) {
    throw toApiError(err, fallback);
  }
}

export async function unwrapVoid(request: Promise<AxiosResponse<ApiResponse<unknown>>>, fallback: string): Promise<void> {
  try {
    const { data } = await request;
    if (!data.success) throw new ApiRequestError(data.error?.message ?? fallback, data.error?.code);
  } catch (err) {
    throw toApiError(err, fallback);
  }
}
