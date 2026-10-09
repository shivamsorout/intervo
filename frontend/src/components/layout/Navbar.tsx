import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "@/components/brand/Logo";
import { buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  cn(
    "relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200",
    "after:absolute after:inset-x-3 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-[var(--color-primary)] after:to-[var(--color-accent)] after:transition-transform after:duration-300",
    "hover:text-ink hover:after:scale-x-100",
    isActive ? "text-ink after:scale-x-100" : "text-muted",
  );

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = user?.role === "ADMIN" || user?.role === "CONTENT_EDITOR";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const items: NavItem[] = isAuthenticated
    ? [
        { to: "/prep", label: "Prep" },
        { to: "/blogs", label: "Blogs" },
        { to: "/companies", label: "Companies" },
        { to: "/dashboard", label: "Dashboard" },
        ...(isAdmin ? [{ to: "/admin/content/new", label: "Admin" }] : []),
      ]
    : [
        { to: "/", label: "Home", end: true },
        { to: "/prep", label: "Explore Topics" },
        { to: "/blogs", label: "Blogs" },
      ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || menuOpen
          ? "border-line bg-canvas/75 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-15 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClasses}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          {isAuthenticated ? (
            <div className="hidden items-center gap-2 md:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-xs font-semibold text-white" aria-hidden>
                {user?.name?.charAt(0).toUpperCase()}
              </span>
              <span className="hidden max-w-32 truncate text-sm text-muted lg:inline">{user?.name}</span>
              <button type="button" onClick={handleLogout} className={buttonClasses("ghost", "sm")}>
                Log out
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link to="/login" className={buttonClasses("ghost", "sm")}>Log in</Link>
              <Link to="/signup" className={buttonClasses("primary", "sm", "group")}>
                Get Started Free
                <Icon name="arrow-right" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-muted transition-colors hover:bg-ink/5 hover:text-ink md:hidden"
          >
            <Icon name={menuOpen ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden",
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          <nav aria-label="Mobile" className="flex flex-col gap-1 border-t border-line px-4 pb-5 pt-3">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                tabIndex={menuOpen ? 0 : -1}
                className={({ isActive }) =>
                  cn(
                    "flex h-12 items-center justify-between rounded-xl px-3 text-[15px] font-medium transition-colors",
                    isActive ? "bg-ink/5 text-ink" : "text-muted hover:bg-ink/5 hover:text-ink",
                  )
                }
              >
                {item.label}
                <Icon name="arrow-right" className="h-4 w-4 opacity-40" />
              </NavLink>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              {isAuthenticated ? (
                <button type="button" onClick={handleLogout} tabIndex={menuOpen ? 0 : -1} className={buttonClasses("outline", "md", "col-span-2")}>
                  Log out
                </button>
              ) : (
                <>
                  <Link to="/login" tabIndex={menuOpen ? 0 : -1} className={buttonClasses("outline", "md")}>Log in</Link>
                  <Link to="/signup" tabIndex={menuOpen ? 0 : -1} className={buttonClasses("primary", "md")}>Get Started</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
