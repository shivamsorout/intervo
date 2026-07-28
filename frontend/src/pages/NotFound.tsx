import { Link } from "react-router-dom";
import { buttonClasses } from "@/components/ui/Button";

export function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="font-[var(--font-display)] text-4xl font-bold">404</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">This page doesn't exist yet.</p>
      <Link to="/" className={buttonClasses("primary", "md", "mt-6")}>Back home</Link>
    </div>
  );
}
