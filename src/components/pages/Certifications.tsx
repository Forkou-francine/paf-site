import Section from "../ui/Section";
import { colors } from "../../data/content";
import { usePortfolioContent } from "../../hooks/usePortfolioContent";

export default function Certifications() {
  const { certifications, labels } = usePortfolioContent();

  return (
    <Section title={labels.certifications.title} subtitle={labels.certifications.subtitle}>
      <div className="rounded-2xl bg-white/80 p-5 ring-1 ring-zinc-200 dark:bg-slate-900/70 dark:ring-slate-700">
        {certifications.length === 0 ? (
          <div className="text-sm text-zinc-600 dark:text-slate-400">
            {labels.certifications.empty}
          </div>
        ) : (
          <ul className="divide-y divide-zinc-200 dark:divide-slate-800">
            {certifications.map((cert) => (
              <li
                key={cert.name}
                className="flex flex-wrap items-center justify-between gap-4 py-4"
              >
                <div>
                  <div className="font-semibold">{cert.name}</div>
                  <div className="text-sm text-zinc-600 dark:text-slate-400">{cert.issuer}</div>
                </div>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`rounded-lg bg-gradient-to-r ${colors.primaryFrom} ${colors.primaryTo} px-3 py-1.5 text-xs font-semibold text-white shadow-sm`}
                  >
                    {labels.certifications.view}
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
