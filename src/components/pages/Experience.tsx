import Section from "../ui/Section";
import { experiences } from "../../data/content";
import Badge from "../ui/Badge";

export default function Experience() {
  return (
    <Section title="Expériences professionnelles" subtitle="Les missions clés qui ont façonné mon expertise.">
      <div className="space-y-6">
        {experiences.map((exp) => (
          <article key={exp.title} className="rounded-2xl bg-white/80 p-5 ring-1 ring-zinc-200 dark:bg-slate-900/70 dark:ring-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">
                {exp.title} — <span className="text-zinc-700 dark:text-slate-300">{exp.company}</span>
              </h3>
              <span className="text-sm text-zinc-600 dark:text-slate-400">{exp.period}</span>
            </div>
            <p className="mt-1 text-sm text-zinc-600 dark:text-slate-400">{exp.location}</p>
            <ul className="mt-3 list-disc pl-5 text-sm text-zinc-800 dark:text-slate-200">
              {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              {exp.tech.map((t) => <Badge key={t}>{t}</Badge>)}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
