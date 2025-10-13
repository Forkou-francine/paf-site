import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useTheme } from "../../hooks/ThemeProvider";
import { usePortfolioContent } from "../../hooks/usePortfolioContent";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { mode, resolved, onCycle } = useTheme();
  const { profile, labels } = usePortfolioContent();

  const baseItem =
    "rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10";
  const activeItem = "text-violet-600 dark:text-violet-400 font-semibold";

  const navItems = labels.nav.items;

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-semibold tracking-tight">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-zinc-900 align-middle dark:bg-white" />
          {profile.name}
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `${baseItem} ${isActive ? activeItem : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
          <LanguageToggle />
          <ThemeToggle mode={mode} resolved={resolved} onCycle={onCycle} />
          {profile.cvUrl && (
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
            >
              {labels.nav.downloadCv}
            </a>
          )}
        </nav>

        {/* Mobile */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full p-2 ring-1 ring-zinc-200 dark:ring-slate-700 md:hidden"
          aria-label={labels.nav.openMenu}
        >
          <FiMenu />
        </button>
      </div>

      {/* Drawer mobile simple (sans AnimatePresence pour eviter les conflits) */}
      {open && (
        <div className="md:hidden">
          <div className="mx-auto max-w-6xl px-4 pb-3">
            <div className="rounded-xl bg-white/90 p-3 ring-1 ring-zinc-200 dark:bg-slate-900/80 dark:ring-slate-700">
              <div className="mb-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10"
                  aria-label={labels.nav.closeMenu}
                >
                  <FiX />
                </button>
                <LanguageToggle />
              </div>
              <div className="grid gap-1">
                {navItems.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `${baseItem} ${isActive ? activeItem : ""}`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
                {profile.cvUrl && (
                  <a
                    href={profile.cvUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white"
                    onClick={() => setOpen(false)}
                  >
                    {labels.nav.downloadCv}
                  </a>
                )}
              </div>
              <div className="mt-3 flex justify-end">
                <ThemeToggle mode={mode} resolved={resolved} onCycle={onCycle} />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
