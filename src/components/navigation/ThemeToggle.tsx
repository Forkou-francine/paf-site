import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";

type Props = {
  mode: "light" | "dark" | "system";
  resolved: "light" | "dark";
  onCycle: () => void;
};

export default function ThemeToggle({ mode, resolved, onCycle }: Props) {
  const label =
    mode === "system"
      ? `Systeme (${resolved})`
      : mode === "dark"
        ? "Sombre"
        : "Clair";

  return (
    <button
      type="button"
      onClick={onCycle}
      title={`Theme: ${label} - cliquer pour changer`}
      className="btn-hover rounded-full bg-white/80 px-3 py-2 ring-1 ring-zinc-200 dark:bg-slate-900/70 dark:ring-slate-700"
      aria-label={`Changer le theme - actuel: ${label}`}
    >
      {mode === "system" ? <FiMonitor /> : resolved === "dark" ? <FiSun /> : <FiMoon />}
    </button>
  );
}
