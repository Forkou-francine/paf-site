import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { usePortfolioContent } from "../../hooks/usePortfolioContent";

type Props = {
  mode: "light" | "dark" | "system";
  resolved: "light" | "dark";
  onCycle: () => void;
};

export default function ThemeToggle({ mode, resolved, onCycle }: Props) {
  const { labels } = usePortfolioContent();

  const resolvedLabel = resolved === "dark" ? labels.theme.dark : labels.theme.light;
  const currentLabel =
    mode === "system"
      ? `${labels.theme.system} (${resolvedLabel.toLowerCase()})`
      : mode === "dark"
        ? labels.theme.dark
        : labels.theme.light;

  const message = labels.theme.buttonLabel.replace("{{label}}", currentLabel);

  return (
    <button
      type="button"
      onClick={onCycle}
      title={message}
      className="btn-hover rounded-full bg-white/80 px-3 py-2 ring-1 ring-zinc-200 dark:bg-slate-900/70 dark:ring-slate-700"
      aria-label={message}
    >
      {mode === "system" ? <FiMonitor /> : resolved === "dark" ? <FiSun /> : <FiMoon />}
    </button>
  );
}
