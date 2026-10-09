import type { Heading } from "./extractHeadings";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="font-[var(--font-display)] text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
        On this page
      </p>
      <ul className="mt-3 space-y-2">
        {headings.map((heading) => (
          <li key={heading.slug} style={{ paddingLeft: (heading.depth - 1) * 12 }}>
            <a
              href={`#${heading.slug}`}
              className="text-slate-600 hover:text-[var(--color-primary)] dark:text-slate-400 dark:hover:text-[var(--color-primary)]"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
