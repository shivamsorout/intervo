import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-[var(--color-bg-dark)]/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="font-[var(--font-display)] text-xl font-bold">
          <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
            Intervo
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          <Link to="/prep" className="hover:text-[var(--color-primary)]">Prep</Link>
          <Link to="/companies" className="hover:text-[var(--color-primary)]">Companies</Link>
          <Link to="/dashboard" className="hover:text-[var(--color-primary)]">Dashboard</Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-slate-600 dark:text-slate-300 sm:inline">{user?.name}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>Log out</Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>Log in</Button>
              <Button size="sm" onClick={() => navigate("/signup")}>Sign up</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
