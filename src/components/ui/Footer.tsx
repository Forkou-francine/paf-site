import { usePortfolioContent } from "../../hooks/usePortfolioContent";

export default function Footer() {
  const { profile, labels } = usePortfolioContent();
  const year = new Date().getFullYear().toString();
  const rights = labels.footer.rights
    .replace("{{year}}", year)
    .replace("{{name}}", profile.name);

  return (
    <footer className="border-t bg-white/60 py-8 dark:bg-slate-900/60">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-zinc-700 dark:text-slate-300">
        <div>{labels.footer.madeWith}</div>
        <div className="mt-1">{rights}</div>
      </div>
    </footer>
  );
}
