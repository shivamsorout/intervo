import GithubSlugger from "github-slugger";

export interface Heading {
  depth: number;
  text: string;
  slug: string;
}

const HEADING_LINE = /^(#{1,3})\s+(.+)$/;

export function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];

  for (const line of markdown.split("\n")) {
    const match = HEADING_LINE.exec(line.trim());
    if (!match) continue;
    const text = match[2].replace(/[*_`]/g, "").trim();
    headings.push({ depth: match[1].length, text, slug: slugger.slug(text) });
  }

  return headings;
}
