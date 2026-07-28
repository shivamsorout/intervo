import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@/types/api";
import { tokenStorage } from "@/lib/tokenStorage";
import * as authApi from "@/lib/authApi";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  setSession: (accessToken: string, refreshToken: string, user: User) => void;
  completeOAuthLogin: (accessToken: string, refreshToken: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setSession = useCallback((accessToken: string, refreshToken: string, nextUser: User) => {
    tokenStorage.setTokens(accessToken, refreshToken);
    setUser(nextUser);
  }, []);

  useEffect(() => {
    async function restoreSession() {
      if (!tokenStorage.getAccessToken()) {
        setIsLoading(false);
        return;
      }
      try {
        const currentUser = await authApi.fetchCurrentUser();
        setUser(currentUser);
      } catch {
        tokenStorage.clear();
      } finally {
        setIsLoading(false);
      }
    }
    void restoreSession();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await authApi.login(email, password);
    setSession(result.accessToken, result.refreshToken, result.user);
  }, [setSession]);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    const result = await authApi.signup(email, password, name);
    setSession(result.accessToken, result.refreshToken, result.user);
  }, [setSession]);

  const logout = useCallback(async () => {
    const refreshToken = tokenStorage.getRefreshToken();
    tokenStorage.clear();
    setUser(null);
    if (refreshToken) {
      try {
        await authApi.logout(refreshToken);
      } catch {
        // best-effort server-side revoke; local session is already cleared
      }
    }
  }, []);

  const completeOAuthLogin = useCallback(async (accessToken: string, refreshToken: string) => {
    tokenStorage.setTokens(accessToken, refreshToken);
    const currentUser = await authApi.fetchCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: !!user, login, signup, logout, setSession, completeOAuthLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
