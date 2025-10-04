import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";

export default function ThemeToggle({
  mode, 
  resolved, 
  onCycle,
}: { 
  mode: "light" | "dark" | "system"; 
  resolved: "light" | "dark"; 
  onCycle: ()=>void }) 
  {
  const label = mode === "system" ? `Système (${resolved})` : mode === "dark" ? "Sombre" : "Clair";
  return (
    <button
      onClick={onCycle}
      title={`Thème: ${label} — cliquer pour changer`}
      className="btn-hover rounded-full bg-white/80 px-3 py-2 ring-1 ring-zinc-200 dark:bg-slate-900/70 dark:ring-slate-700"
      aria-label="Changer le thème"
    >
      {mode === "system" ? <FiMonitor /> : resolved === "dark" ? <FiSun /> : <FiMoon />}
    </button>
  );
}
