import Section from "../ui/Section";
import { usePortfolioContent } from "../../hooks/usePortfolioContent";
import { techLogos } from "../../data/content";
import { FiBarChart2, FiDatabase, FiLayers, FiUsers, FiAward, FiExternalLink } from "react-icons/fi";

// Icons for solutions
const solutionIcons = [FiBarChart2, FiDatabase, FiLayers, FiUsers];
const solutionColors = [
  "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400",
  "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
];

// Tech badges config
const masteredTechs = [
  { name: "Databricks", abbr: "DB", color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" },
  { name: "Python", abbr: "Py", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300" },
  { name: "Power BI", abbr: "PBI", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
  { name: "PySpark", abbr: "Sp", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" },
  { name: "Azure", abbr: "Az", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  { name: "SQL", abbr: "SQL", color: "bg-zinc-200 text-zinc-700 dark:bg-slate-700 dark:text-slate-300" },
];

const learningTechs = [
  { name: "Airflow", abbr: "Af" },
  { name: "Dbt", abbr: "dbt" },
  { name: "Kafka", abbr: "K" },
];

export default function Skills() {
  const { skills, labels, certifications } = usePortfolioContent();
  const solutions = skills.find((s) => s.category === "Solutions livrées" || s.category === "Delivered solutions");
  const techTools = skills.find((s) => s.category === "Technologies et outils" || s.category === "Technologies & tooling");

  return (
    <div className="relative">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-300/25 via-fuchsia-200/15 to-transparent blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-indigo-100/20 via-sky-50/10 to-transparent blur-3xl" />
        <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-violet-200/15 blur-3xl" />
      </div>

      <Section title={labels.skills.title} subtitle={labels.skills.subtitle}>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left card - Solutions livrées */}
        <div className="rounded-2xl bg-white/80 p-6 ring-1 ring-zinc-200 dark:bg-slate-900/70 dark:ring-slate-700">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-slate-100">
            {solutions?.category || "Solutions livrées"}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-slate-400">
            {solutions?.intro || "Ce que je mets en production pour les équipes métier."}
          </p>

          <div className="mt-6 space-y-4">
            {solutions?.items.map((item, index) => {
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

        {/* Right card - Technologies et outils */}
        <div className="rounded-2xl bg-white/80 p-6 ring-1 ring-zinc-200 dark:bg-slate-900/70 dark:ring-slate-700">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-slate-100">
            {techTools?.category || "Technologies et outils"}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-slate-400">
            {techTools?.intro || "Ce que j'utilise au quotidien — et ce que j'apprends."}
          </p>

          {/* Utilisé au quotidien */}
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-slate-500">
              Utilisé au quotidien
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {masteredTechs.map((tech) => (
                <span
                  key={tech.name}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${tech.color}`}
                >
                  {techLogos[tech.name] ? (
                    <img src={techLogos[tech.name]} alt="" className="h-4 w-4 object-contain" />
                  ) : (
                    <span className="text-xs font-bold">{tech.abbr}</span>
                  )}
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* En apprentissage */}
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-slate-500">
              En apprentissage
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {learningTechs.map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-600 dark:border-slate-600 dark:text-slate-400"
                >
                  {techLogos[tech.name] ? (
                    <img src={techLogos[tech.name]} alt="" className="h-4 w-4 object-contain" />
                  ) : (
                    <span className="text-xs font-bold">{tech.abbr}</span>
                  )}
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications obtenues */}
          <div className="mt-6 rounded-xl bg-violet-50 p-4 dark:bg-violet-900/20">
            <div className="flex items-center gap-2">
              <FiAward className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              <p className="font-semibold text-zinc-900 dark:text-slate-100">Certifications obtenues</p>
            </div>
            <div className="mt-3 space-y-2">
              {certifications.map((cert) => (
                <a
                  key={cert.name}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 text-sm transition-colors hover:text-violet-600 dark:hover:text-violet-400"
                >
                  <span className="text-zinc-700 dark:text-slate-300">{cert.name}</span>
                  <span className="flex shrink-0 items-center gap-1 font-medium text-violet-600 dark:text-violet-400">
                    {cert.issuer}
                    <FiExternalLink className="h-3 w-3" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
    </div>
  );
}
