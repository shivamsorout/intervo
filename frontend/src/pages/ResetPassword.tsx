import { type FormEvent, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as authApi from "@/lib/authApi";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await authApi.resetPassword(token, password);
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="mx-auto flex min-h-[70svh] max-w-md flex-col justify-center px-4 py-12 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          This reset link is missing its token. <Link to="/forgot-password" className="text-[var(--color-primary)]">Request a new one</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70svh] max-w-md flex-col justify-center px-4 py-12">
      <Card>
        <CardBody>
          <h1 className="font-[var(--font-display)] text-2xl font-semibold">Choose a new password</h1>
          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              label="New password"
              type="password"
              name="password"
              autoComplete="new-password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}
            <Button type="submit" isLoading={isSubmitting}>Reset password</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
