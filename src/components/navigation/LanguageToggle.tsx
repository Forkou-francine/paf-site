import { useLanguage } from "../../hooks/LanguageProvider";
import { usePortfolioContent } from "../../hooks/usePortfolioContent";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const { labels } = usePortfolioContent();

  const nextLanguage = language === "fr" ? "en" : "fr";
  const toggle = () => setLanguage(nextLanguage);

  return (
    <button
      type="button"
      onClick={toggle}
      className="btn-hover rounded-full bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-wide ring-1 ring-zinc-200 dark:bg-slate-900/70 dark:ring-slate-700"
      aria-label={labels.nav.language.aria}
    >
      {labels.nav.language.switchTo}
    </button>
  );
}
