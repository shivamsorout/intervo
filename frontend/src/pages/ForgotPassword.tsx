import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import * as authApi from "@/lib/authApi";
import { Card, CardBody } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await authApi.forgotPassword(email);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70svh] max-w-md flex-col justify-center px-4 py-12">
      <Card>
        <CardBody>
          <h1 className="font-[var(--font-display)] text-2xl font-semibold">Reset your password</h1>

          {submitted ? (
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              If an account exists for <span className="font-medium">{email}</span>, we've sent a link to reset your password.
            </p>
          ) : (
            <>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Enter your email and we'll send you a reset link.
              </p>
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
                <Button type="submit" isLoading={isSubmitting}>Send reset link</Button>
              </form>
            </>
          )}

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            <Link to="/login" className="font-medium text-[var(--color-primary)]">Back to log in</Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
