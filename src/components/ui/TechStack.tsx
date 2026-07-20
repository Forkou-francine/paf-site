import { usePortfolioContent } from "../../hooks/usePortfolioContent";
import { techLogos } from "../../data/content";
import { FiAward, FiExternalLink } from "react-icons/fi";

// Technos utilisées au quotidien (badges colorés).
const masteredTechs = [
  { name: "Databricks", abbr: "DB", color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" },
  { name: "Python", abbr: "Py", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300" },
  { name: "Power BI", abbr: "PBI", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
  { name: "PySpark", abbr: "Sp", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" },
  { name: "Azure", abbr: "Az", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  { name: "SQL", abbr: "SQL", color: "bg-zinc-200 text-zinc-700 dark:bg-slate-700 dark:text-slate-300" },
];

// Technos en cours d'apprentissage (badges neutres).
const learningTechs = [
  { name: "Airflow", abbr: "Af" },
  { name: "Dbt", abbr: "dbt" },
  { name: "Kafka", abbr: "K" },
];

/**
 * Carte « Technologies et outils » + certifications.
 * Utilisée à droite de la rubrique Formation (anciennement page Compétences).
 */
export default function TechStack() {
  const { skills, labels, certifications } = usePortfolioContent();
  const techTools = skills.find(
    (s) => s.category === "Technologies et outils" || s.category === "Technologies & tooling",
  );

  return (
    <div className="rounded-2xl bg-white/80 p-6 ring-1 ring-zinc-200 transition-all duration-200 hover:shadow-lg hover:ring-violet-300 dark:bg-slate-900/70 dark:ring-slate-700 dark:hover:ring-violet-500/50">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-slate-100">
        {techTools?.category || "Technologies et outils"}
      </h3>
      <p className="mt-1 text-sm text-zinc-600 dark:text-slate-400">
        {techTools?.intro || "Ce que j'utilise au quotidien — et ce que j'apprends."}
      </p>

      {/* Utilisé au quotidien */}
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-slate-500">
          {labels.skills.dailyUse}
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
          {labels.skills.learning}
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
          <p className="font-semibold text-zinc-900 dark:text-slate-100">{labels.skills.certificationsTitle}</p>
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
  );
}
