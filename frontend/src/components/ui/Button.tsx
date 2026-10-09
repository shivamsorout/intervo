import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: cn(
    "relative overflow-hidden text-white",
    "bg-[linear-gradient(135deg,#8573ff_0%,#7562ff_45%,#5a48f0_100%)]",
    "shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_8px_24px_-8px_rgba(117,98,255,0.7)]",
    "hover:shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_12px_32px_-8px_rgba(117,98,255,0.85)] hover:-translate-y-px",
  ),
  secondary: "bg-[var(--color-secondary)] text-white hover:opacity-90",
  ghost: "bg-transparent text-muted hover:text-ink hover:bg-ink/5",
  outline: cn(
    "border border-line-strong bg-surface/60 text-ink backdrop-blur",
    "hover:border-[var(--color-primary)]/50 hover:bg-surface hover:-translate-y-px",
  ),
  danger: "bg-[var(--color-error)] text-white hover:opacity-90",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex select-none items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 ease-out",
    "active:translate-y-0 active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={buttonClasses(variant, size, className)}
      {...props}
    >
      {isLoading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" aria-hidden />
      )}
      {children}
    </button>
  ),
);

Button.displayName = "Button";
