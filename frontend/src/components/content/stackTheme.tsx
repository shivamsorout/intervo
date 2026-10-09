import type { ReactNode } from "react";

export interface StackTheme {
  from: string;
  to: string;
  tint: string;
  snippet: string;
  glyph: ReactNode;
}

const glyphProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "h-5 w-5",
};

const themes: Record<string, StackTheme> = {
  java: {
    from: "#f59e0b",
    to: "#ef4444",
    tint: "rgba(245, 158, 11, 0.14)",
    snippet: "Map<String, List<Integer>> map = new HashMap<>();",
    glyph: (
      <svg {...glyphProps}>
        <path d="M5 11h12v4a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5v-4Z" />
        <path d="M17 12h1.5a2.5 2.5 0 0 1 0 5H17" />
        <path d="M9 3c-1 1.2 1 2 0 3.5M13 3c-1 1.2 1 2 0 3.5" />
      </svg>
    ),
  },
  python: {
    from: "#3b82f6",
    to: "#facc15",
    tint: "rgba(59, 130, 246, 0.14)",
    snippet: "squares = [n * n for n in range(10) if n % 2]",
    glyph: (
      <svg {...glyphProps}>
        <path d="M12 3h-2.5A2.5 2.5 0 0 0 7 5.5V8h5" />
        <path d="M7 8H5.5A2.5 2.5 0 0 0 3 10.5v3A2.5 2.5 0 0 0 5.5 16H7" />
        <path d="M12 21h2.5a2.5 2.5 0 0 0 2.5-2.5V16h-5" />
        <path d="M17 16h1.5a2.5 2.5 0 0 0 2.5-2.5v-3A2.5 2.5 0 0 0 18.5 8H17" />
        <path d="M7 16v-3.5A2.5 2.5 0 0 1 9.5 10h5A2.5 2.5 0 0 0 17 7.5V5.5" />
      </svg>
    ),
  },
  "spring-boot": {
    from: "#22c55e",
    to: "#14b8a6",
    tint: "rgba(34, 197, 94, 0.14)",
    snippet: "@RestController @RequestMapping(\"/api\")",
    glyph: (
      <svg {...glyphProps}>
        <path d="M20 4c-9 0-15 5-15 12 0 1.5.4 2.8 1 4" />
        <path d="M20 4c1 9-4 15-11 15" />
        <path d="M5 20c2-4 5-7 9-9" />
      </svg>
    ),
  },
  "backend-development": {
    from: "#42d9f5",
    to: "#6366f1",
    tint: "rgba(66, 217, 245, 0.14)",
    snippet: "GET /api/orders?status=PAID  200 OK",
    glyph: (
      <svg {...glyphProps}>
        <rect x="3" y="4" width="18" height="6" rx="2" />
        <rect x="3" y="14" width="18" height="6" rx="2" />
        <path d="M7 7h.01M7 17h.01M11 7h6M11 17h6" />
      </svg>
    ),
  },
};

const fallbackPalette = [
  { from: "#7562ff", to: "#42d9f5", tint: "rgba(117, 98, 255, 0.14)" },
  { from: "#ec4899", to: "#7562ff", tint: "rgba(236, 72, 153, 0.14)" },
  { from: "#14b8a6", to: "#42d9f5", tint: "rgba(20, 184, 166, 0.14)" },
];

export function getStackTheme(slug: string, name: string, index = 0): StackTheme {
  const known = themes[slug];
  if (known) return known;
  const palette = fallbackPalette[index % fallbackPalette.length];
  return {
    ...palette,
    snippet: `// ${name.toLowerCase()} interview prep`,
    glyph: (
      <span className="font-[var(--font-display)] text-sm font-bold" aria-hidden>
        {name.slice(0, 2)}
      </span>
    ),
  };
}

export function StackBadge({ slug, name, className }: { slug: string; name: string; className?: string }) {
  const theme = getStackTheme(slug, name);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs font-medium text-ink/85 ${className ?? ""}`}
      style={{ backgroundColor: theme.tint }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }} />
      {name}
    </span>
  );
}
