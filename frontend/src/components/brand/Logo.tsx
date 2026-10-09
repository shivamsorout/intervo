import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={cn("h-7 w-7", className)}>
      <defs>
        <linearGradient id="iv-mark" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b7bff" />
          <stop offset="0.55" stopColor="#7562ff" />
          <stop offset="1" stopColor="#42d9f5" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="9" fill="url(#iv-mark)" />
      <rect x="1.5" y="1.5" width="29" height="29" rx="8.5" stroke="white" strokeOpacity="0.25" />
      <path d="M10 9.5v13" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M14.5 10.5l4.25 11 4.25-11" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ className, to = "/" }: { className?: string; to?: string }) {
  return (
    <Link
      to={to}
      aria-label="interVo home"
      className={cn("group inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]", className)}
    >
      <LogoMark className="transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-105" />
      <span className="font-[var(--font-display)] text-[19px] font-bold tracking-tight text-ink">
        inter<span className="text-gradient">Vo</span>
      </span>
    </Link>
  );
}
