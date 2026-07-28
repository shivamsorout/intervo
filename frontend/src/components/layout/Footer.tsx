export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} Intervo. Prepare Smarter. Get Hired Faster.</p>
        <p className="text-xs">Learn Better. Interview Better. Grow Faster.</p>
      </div>
    </footer>
  );
}
