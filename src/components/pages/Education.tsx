import Section from "../ui/Section";
import { education } from "../../data/content";

export default function Education() {
  return (
    <Section title="Formation" subtitle="Mes fondations académiques.">
      <ol className="relative ml-3 space-y-6 border-l border-zinc-200 dark:border-slate-800 pl-6">
        {education.map((e) => (
          <li key={e.school}>
            <span className="absolute -left-[9px] mt-1 block h-4 w-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 ring-8 ring-white dark:ring-slate-900" />
            <h3 className="font-semibold">{e.degree}</h3>
            <p className="text-sm text-zinc-700 dark:text-slate-300">{e.school}</p>
            <p className="text-xs text-zinc-500 dark:text-slate-500">{e.period}</p>
            {e.details && <p className="mt-1 text-sm text-zinc-700 dark:text-slate-300">{e.details}</p>}
          </li>
        ))}
      </ol>
    </Section>
  );
}
