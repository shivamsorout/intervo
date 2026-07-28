import { api } from "./api";
import type { ApiResponse, AuthResponse, User } from "@/types/api";

export async function signup(email: string, password: string, name: string) {
  const { data } = await api.post<ApiResponse<AuthResponse>>("/api/auth/signup", { email, password, name });
  if (!data.data) throw new Error(data.error?.message ?? "Signup failed");
  return data.data;
}

export async function login(email: string, password: string) {
  const { data } = await api.post<ApiResponse<AuthResponse>>("/api/auth/login", { email, password });
  if (!data.data) throw new Error(data.error?.message ?? "Login failed");
  return data.data;
}

export async function logout(refreshToken: string) {
  await api.post<ApiResponse<null>>("/api/auth/logout", { refreshToken });
}

export async function fetchCurrentUser() {
  const { data } = await api.get<ApiResponse<User>>("/api/users/me");
  if (!data.data) throw new Error(data.error?.message ?? "Failed to load user");
  return data.data;
}

export async function forgotPassword(email: string) {
  await api.post<ApiResponse<null>>("/api/auth/forgot-password", { email });
}

export async function resetPassword(token: string, newPassword: string) {
  const { data } = await api.post<ApiResponse<null>>("/api/auth/reset-password", { token, newPassword });
  if (!data.success) throw new Error(data.error?.message ?? "Reset failed");
}
