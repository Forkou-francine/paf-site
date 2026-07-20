import { usePortfolioContent } from "../../hooks/usePortfolioContent";
import { FiBarChart2, FiDatabase, FiLayers, FiUsers } from "react-icons/fi";

// Icônes et couleurs par solution livrée.
const solutionIcons = [FiBarChart2, FiDatabase, FiLayers, FiUsers];
const solutionColors = [
  "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400",
  "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
];

/**
 * Liste des « Solutions livrées ».
 * Intégrée à la rubrique « À propos de moi » (anciennement page Compétences).
 */
export default function Solutions() {
  const { skills } = usePortfolioContent();
  const solutions = skills.find(
    (s) => s.category === "Solutions livrées" || s.category === "Delivered solutions",
  );

  if (!solutions?.items?.length) return null;

  return (
    <div>
      <h3 className="font-semibold text-zinc-900 dark:text-slate-100">{solutions.category}</h3>
      {solutions.intro && (
        <p className="mt-1 text-sm text-zinc-600 dark:text-slate-400">{solutions.intro}</p>
      )}

      <div className="mt-4 space-y-3">
        {solutions.items.map((item, index) => {
          const Icon = solutionIcons[index % solutionIcons.length];
          const colorClass = solutionColors[index % solutionColors.length];
          return (
            <div
              key={item.name}
              className="flex items-start gap-4 rounded-xl bg-white p-4 ring-1 ring-zinc-100 dark:bg-slate-800/50 dark:ring-slate-700"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colorClass}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-slate-100">{item.name}</p>
                {item.detail && (
                  <p className="mt-0.5 text-sm text-zinc-600 dark:text-slate-400">{item.detail}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
