import { api } from "./api";
import { unwrap, unwrapVoid } from "./apiError";
import type { ApiResponse, AuthResponse, User } from "@/types/api";

export async function signup(email: string, password: string, name: string) {
  return unwrap(
    api.post<ApiResponse<AuthResponse>>("/api/auth/signup", { email, password, name }),
    "Signup failed",
  );
}

export async function login(email: string, password: string) {
  return unwrap(api.post<ApiResponse<AuthResponse>>("/api/auth/login", { email, password }), "Login failed");
}

export async function logout(refreshToken: string) {
  await api.post<ApiResponse<null>>("/api/auth/logout", { refreshToken });
}

export async function fetchCurrentUser() {
  return unwrap(api.get<ApiResponse<User>>("/api/users/me"), "Failed to load user");
}

export async function forgotPassword(email: string) {
  await api.post<ApiResponse<null>>("/api/auth/forgot-password", { email });
}

export async function resetPassword(token: string, newPassword: string) {
  return unwrapVoid(api.post<ApiResponse<null>>("/api/auth/reset-password", { token, newPassword }), "Reset failed");
}
