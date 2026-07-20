import { usePortfolioContent } from "../../hooks/usePortfolioContent";

/**
 * Frise chronologique du parcours de formation.
 * Placée à gauche de la rubrique Formation, en regard des technologies.
 */
export default function EducationTimeline() {
  const { education } = usePortfolioContent();

  return (
    <ol className="relative ml-3 space-y-6 border-l border-zinc-200 pl-6 dark:border-slate-800">
      {education.map((entry) => (
        <li key={`${entry.school}-${entry.period}`}>
          <span className="absolute -left-[9px] mt-1 block h-4 w-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 ring-8 ring-white dark:ring-slate-900" />
          <h3 className="font-semibold">{entry.degree}</h3>
          <p className="text-sm text-zinc-700 dark:text-slate-300">{entry.school}</p>
          <p className="text-xs text-zinc-500 dark:text-slate-500">{entry.period}</p>
          {entry.details && (
            <p className="mt-1 text-sm text-zinc-700 dark:text-slate-300">{entry.details}</p>
          )}
        </li>
      ))}
    </ol>
  );
}
