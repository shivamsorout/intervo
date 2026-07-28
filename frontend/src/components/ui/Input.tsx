import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors",
            "placeholder:text-slate-400",
            "focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20",
            "dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500",
            error && "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20",
            className,
          )}
          {...props}
        />
        {error && <span className="text-xs text-[var(--color-error)]">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
