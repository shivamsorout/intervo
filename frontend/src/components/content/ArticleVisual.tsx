import { getStackTheme } from "./stackTheme";
import { humanizeSlug } from "@/lib/articles";
import type { ArticleTeaser } from "@/types/content";
import { cn } from "@/lib/cn";

interface ArticleVisualProps {
  article: ArticleTeaser;
  size?: "lg" | "md";
  className?: string;
}

export function ArticleVisual({ article, size = "md", className }: ArticleVisualProps) {
  const theme = getStackTheme(article.stackSlug, article.stackName);
  return (
    <div
      aria-hidden
      className={cn("code-panel relative overflow-hidden", size === "lg" ? "h-56 sm:h-64" : "h-36", className)}
    >
      <div
        className="absolute -right-10 -top-16 h-56 w-56 rounded-full opacity-60 transition-transform duration-700 group-hover:scale-110"
        style={{ background: `radial-gradient(circle, ${theme.from}66, transparent 70%)` }}
      />
      <div
        className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full opacity-40 transition-transform duration-700 group-hover:scale-110"
        style={{ background: `radial-gradient(circle, ${theme.to}55, transparent 70%)` }}
      />
      <div className="bg-grid absolute inset-0 opacity-40 [--iv-line:rgba(255,255,255,0.05)]" />
      <div className={cn("relative flex h-full flex-col justify-between", size === "lg" ? "p-6" : "p-4")}>
        <div className="flex items-center gap-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-lg"
            style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
          >
            {theme.glyph}
          </span>
          <span className="font-mono text-[11px] text-white/50">
            {article.stackSlug}/{article.topicSlug}
          </span>
        </div>
        <div className="font-mono leading-relaxed">
          <p className={cn("text-white/35", size === "lg" ? "text-xs" : "text-[10.5px]")}>
            {"// "}
            {humanizeSlug(article.topicSlug)}
          </p>
          <p className={cn("truncate text-white/80", size === "lg" ? "text-sm" : "text-[11.5px]")}>
            <span className="tok-k">interview</span>.<span className="tok-f">prepare</span>(
            <span className="tok-s">"{humanizeSlug(article.subtopicSlug)}"</span>)
          </p>
        </div>
      </div>
    </div>
  );
}
