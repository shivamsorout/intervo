import { Link } from "react-router-dom";
import { Logo } from "@/components/brand/Logo";

const columns = [
  {
    title: "Learn",
    links: [
      { to: "/prep", label: "Explore Topics" },
      { to: "/blogs", label: "Blogs" },
    ],
  },
  {
    title: "Account",
    links: [
      { to: "/login", label: "Log in" },
      { to: "/signup", label: "Sign up free" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-line">
      <div className="hairline-top absolute inset-x-0 -top-px h-px" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Structured interview preparation for IT students and professionals. Clear explanations, real code, and
            focused revision in one place.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">{column.title}</h2>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-subtle sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} interVo. All rights reserved.</p>
          <p>Built for people who want to walk into interviews prepared.</p>
        </div>
      </div>
    </footer>
  );
}
