import Section from "../ui/Section";
import { usePortfolioContent } from "../../hooks/usePortfolioContent";

export default function Education() {
  const { education, labels } = usePortfolioContent();

  return (
    <div className="relative">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-300/25 via-fuchsia-200/15 to-transparent blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-indigo-100/20 via-sky-50/10 to-transparent blur-3xl" />
        <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-violet-200/15 blur-3xl" />
      </div>

      <Section title={labels.education.title} subtitle={labels.education.subtitle}>
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
      </Section>
    </div>
  );
}
