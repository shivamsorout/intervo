import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Tone = "primary" | "success" | "warning" | "error" | "neutral";

const toneClasses: Record<Tone, string> = {
  primary: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  success: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
  warning: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
  error: "bg-[var(--color-error)]/10 text-[var(--color-error)]",
  neutral: "bg-slate-900/5 text-slate-600 dark:bg-white/10 dark:text-slate-300",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
