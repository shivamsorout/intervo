import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const { completeOAuthLogin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (!accessToken || !refreshToken) {
      setError("Missing tokens in callback URL");
      return;
    }

    completeOAuthLogin(accessToken, refreshToken)
      .then(() => navigate("/dashboard", { replace: true }))
      .catch(() => setError("Could not complete Google sign-in"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto flex min-h-[70svh] max-w-md flex-col items-center justify-center px-4 text-center">
      {error ? (
        <p className="text-sm text-[var(--color-error)]">{error}</p>
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-400">Signing you in...</p>
      )}
    </div>
  );
}
