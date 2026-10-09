import { type FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { AuthShell, FormError, GoogleButton, OrDivider } from "@/components/auth/AuthShell";
import { cn } from "@/lib/cn";

const MIN_PASSWORD = 8;
const MAX_PASSWORD = 72;

export function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rules = [
    { label: `At least ${MIN_PASSWORD} characters`, met: password.length >= MIN_PASSWORD },
    { label: `No more than ${MAX_PASSWORD} characters`, met: password.length > 0 && password.length <= MAX_PASSWORD },
  ];
  const strength = Math.min(4, [password.length >= 8, password.length >= 12, /\d/.test(password), /[^A-Za-z0-9]/.test(password) || /[A-Z]/.test(password)].filter(Boolean).length);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < MIN_PASSWORD || password.length > MAX_PASSWORD) {
      setError(`Password must be between ${MIN_PASSWORD} and ${MAX_PASSWORD} characters.`);
      return;
    }
    setIsSubmitting(true);
    try {
      await signup(email, password, name);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Create account"
      title="Your next chapter starts here."
      subtitle="Create a free account to save bookmarks and track your progress."
      aside={{
        heading: "Prepare with structure, not scattered tabs.",
        points: [
          { icon: "list-tree", text: "Interview topics organised stack by stack" },
          { icon: "code", text: "Clear explanations with real code" },
          { icon: "target", text: "Bookmarks and progress for focused revision" },
        ],
        card: {
          label: "Quick revision",
          question: "What does the volatile keyword guarantee in Java?",
          answer: "Visibility: every read sees the latest write from any thread. It doesn't make compound actions like count++ atomic.",
        },
      }}
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-ink underline-offset-4 hover:text-[var(--color-primary)] hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <GoogleButton label="Sign up with Google" />
      <OrDivider />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          label="Full name"
          name="name"
          autoComplete="name"
          placeholder="Ada Lovelace"
          maxLength={255}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <div className="flex flex-col gap-2">
          <PasswordInput
            label="Password"
            name="password"
            autoComplete="new-password"
            placeholder="Create a password"
            minLength={MIN_PASSWORD}
            maxLength={MAX_PASSWORD}
            required
            aria-describedby="password-rules"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-1.5" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-300",
                  i < strength
                    ? strength <= 1
                      ? "bg-[var(--color-warning)]"
                      : strength <= 2
                        ? "bg-[var(--color-accent)]"
                        : "bg-[var(--color-success)]"
                    : "bg-ink/10",
                )}
              />
            ))}
          </div>
          <ul id="password-rules" className="flex flex-col gap-1 text-xs">
            {rules.map((rule) => (
              <li key={rule.label} className={cn("inline-flex items-center gap-1.5 transition-colors", rule.met ? "text-[var(--color-success)]" : "text-subtle")}>
                <span className={cn("flex h-3.5 w-3.5 items-center justify-center rounded-full border", rule.met ? "border-transparent bg-[var(--color-success)]/20" : "border-ink/20")}>
                  {rule.met && <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3} />}
                </span>
                {rule.label}
              </li>
            ))}
          </ul>
        </div>
        {error && <FormError message={error} />}
        <Button type="submit" size="lg" isLoading={isSubmitting} className="mt-1 w-full">
          {isSubmitting ? "Creating account..." : "Create Free Account"}
        </Button>
        <p className="text-center text-xs text-subtle">Free to use. No credit card required.</p>
      </form>
    </AuthShell>
  );
}
