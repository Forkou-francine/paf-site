import { FiMessageCircle } from "react-icons/fi";
import Section from "../ui/Section";
import { usePortfolioContent } from "../../hooks/usePortfolioContent";

/** Role badge color based on keywords */
function getRoleBadgeColor(role: string): string {
  const lower = role.toLowerCase();
  if (lower.includes("manager") || lower.includes("responsable") || lower.includes("directeur"))
    return "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300";
  if (lower.includes("enseignant") || lower.includes("professor") || lower.includes("teacher") || lower.includes("prof"))
    return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
  return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
}

export default function Recommendations() {
  const { recommendations, labels } = usePortfolioContent();

  return (
    <div className="relative">
      <Section
        title={labels.recommendations.title}
        subtitle={labels.recommendations.subtitle}
      >
        {recommendations.length === 0 ? (
          <p className="text-center text-sm text-zinc-500 dark:text-slate-400">
            {labels.recommendations.empty}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {recommendations.map((rec) => (
              <article
                key={`${rec.name}-${rec.period}`}
                className="group relative flex flex-col rounded-2xl bg-white/80 p-6 ring-1 ring-zinc-200 transition-all duration-200 hover:shadow-lg hover:ring-violet-300 dark:bg-slate-900/70 dark:ring-slate-700 dark:hover:ring-violet-500/50"
              >
                {/* Quote icon */}
                <FiMessageCircle className="mb-4 h-6 w-6 text-violet-400 dark:text-violet-500" />

                {/* Quote text */}
                <blockquote className="flex-1 text-sm leading-relaxed text-zinc-700 dark:text-slate-300">
                  "{rec.text}"
                </blockquote>

                {/* Author */}
                <div className="mt-5 flex items-center gap-3 border-t border-zinc-100 pt-4 dark:border-slate-800">
                  {/* Initials avatar */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-bold text-white shadow-sm">
                    {rec.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-zinc-900 dark:text-slate-100">
                      {rec.name}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getRoleBadgeColor(rec.role)}`}
                      >
                        {rec.role}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-slate-400">
                        {rec.period}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
