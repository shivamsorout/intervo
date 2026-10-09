import { type FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { AuthShell, FormError, GoogleButton, OrDivider } from "@/components/auth/AuthShell";

export function Login() {
  const { login } = useAuth();
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

  return (
    <AuthShell
      eyebrow="Log in"
      title="Welcome back."
      subtitle="Pick up where your preparation left off."
      aside={{
        heading: "Your progress is right where you left it.",
        points: [
          { icon: "bookmark", text: "Bookmarks saved for quick revision" },
          { icon: "trend", text: "Completed and in-progress topics tracked" },
          { icon: "list-tree", text: "Every stack organised topic by topic" },
        ],
        card: {
          label: "Revision card",
          question: "Why must equals() and hashCode() be overridden together?",
          answer: "Equal objects must return the same hash code, otherwise hash-based collections like HashMap can't find them.",
        },
      }}
      footer={
        <>
          No account yet?{" "}
          <Link to="/signup" className="font-semibold text-ink underline-offset-4 hover:text-[var(--color-primary)] hover:underline">
            Sign up free
          </Link>
        </>
      }
    >
      <GoogleButton label="Continue with Google" />
      <OrDivider />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex flex-col gap-1.5">
          <PasswordInput
            label="Password"
            name="password"
            autoComplete="current-password"
            placeholder="Your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/forgot-password" className="self-end text-xs font-medium text-muted transition-colors hover:text-[var(--color-primary)]">
            Forgot password?
          </Link>
        </div>
        {error && <FormError message={error} />}
        <Button type="submit" size="lg" isLoading={isSubmitting} className="mt-1 w-full">
          {isSubmitting ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </AuthShell>
  );
}
