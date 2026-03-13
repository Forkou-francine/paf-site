import { FiSun, FiMoon } from "react-icons/fi";
import { usePortfolioContent } from "../../hooks/usePortfolioContent";

type Props = {
  mode: "light" | "dark";
  resolved: "light" | "dark";
  onCycle: () => void;
};

export default function ThemeToggle({ mode, onCycle }: Props) {
  const { labels } = usePortfolioContent();

  const currentLabel = mode === "dark" ? labels.theme.dark : labels.theme.light;
  const message = labels.theme.buttonLabel.replace("{{label}}", currentLabel);

  return (
    <button
      type="button"
      onClick={onCycle}
      title={message}
      className="btn-hover rounded-full bg-white/80 px-3 py-2 ring-1 ring-zinc-200 dark:bg-slate-900/70 dark:ring-slate-700"
      aria-label={message}
    >
      {mode === "dark" ? <FiSun /> : <FiMoon />}
    </button>
  );
}
