import { type FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/Toast";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const googleLoginUrl = `${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"}/oauth2/authorization/google`;

  return (
    <div className="mx-auto flex min-h-[70svh] max-w-md flex-col justify-center px-4 py-12">
      <Card>
        <CardBody>
          <h1 className="font-[var(--font-display)] text-2xl font-semibold">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Log in to keep prepping where you left off.</p>

          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}
            <Button type="submit" isLoading={isSubmitting}>Log in</Button>
          </form>

          <div className="my-4 flex items-center gap-3 text-xs text-slate-400">
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
            or
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
          </div>

          <a
            href={googleLoginUrl}
            className="flex h-10 items-center justify-center rounded-xl border border-slate-200 text-sm font-medium hover:bg-slate-900/5 dark:border-white/10 dark:hover:bg-white/5"
            onClick={() => showToast("Redirecting to Google...", "info")}
          >
            Continue with Google
          </a>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            No account yet?{" "}
            <Link to="/signup" className="font-medium text-[var(--color-primary)]">Sign up</Link>
          </p>
          <p className="mt-2 text-center text-sm">
            <Link to="/forgot-password" className="text-slate-500 hover:text-[var(--color-primary)] dark:text-slate-400">
              Forgot password?
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
