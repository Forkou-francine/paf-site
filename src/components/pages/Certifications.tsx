import Section from "../ui/Section";
import { certifications, colors } from "../../data/content";

export default function Certifications() {
  return (
    <Section title="Certifications" subtitle="Preuves de mon apprentissage continu.">
      <div className="rounded-2xl bg-white/80 p-5 ring-1 ring-zinc-200 dark:bg-slate-900/70 dark:ring-slate-700">
        {certifications.length === 0 ? (
          <div className="text-sm text-zinc-600 dark:text-slate-400">
            Aucune certification renseignée pour le moment.
          </div>
        ) : (
          <ul className="divide-y divide-zinc-200 dark:divide-slate-800">
            {certifications.map((c) => (
              <li key={c.name} className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-sm text-zinc-600 dark:text-slate-400">{c.issuer}</div>
                </div>
                {c.link && (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`rounded-lg bg-gradient-to-r ${colors.primaryFrom} ${colors.primaryTo} px-3 py-1.5 text-xs font-semibold text-white shadow-sm`}
                  >
                    Voir le certificat
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
