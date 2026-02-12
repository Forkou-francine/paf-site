import Section from "../ui/Section";
import { usePortfolioContent } from "../../hooks/usePortfolioContent";

// Company logo configurations
const companyLogos: Record<string, { abbr: string; bgColor: string; textColor: string }> = {
  "Caisse Nationale des Allocations Familiales (CNAF)": {
    abbr: "CNAF",
    bgColor: "bg-blue-600",
    textColor: "text-white",
  },
  Orange: {
    abbr: "O",
    bgColor: "bg-orange-500",
    textColor: "text-white",
  },
};

// Tech badge color mapping
const techColors: Record<string, string> = {
  Databricks: "border-red-400 text-red-600 dark:border-red-500 dark:text-red-400",
  Python: "border-yellow-400 text-yellow-600 dark:border-yellow-500 dark:text-yellow-400",
  Spark: "border-orange-400 text-orange-600 dark:border-orange-500 dark:text-orange-400",
  "Power BI": "border-amber-400 text-amber-600 dark:border-amber-500 dark:text-amber-400",
  Azure: "border-blue-400 text-blue-600 dark:border-blue-500 dark:text-blue-400",
  "Unity Catalog": "border-purple-400 text-purple-600 dark:border-purple-500 dark:text-purple-400",
  "Delta Lake": "border-teal-400 text-teal-600 dark:border-teal-500 dark:text-teal-400",
  "Azure DevOps": "border-sky-400 text-sky-600 dark:border-sky-500 dark:text-sky-400",
  Git: "border-orange-400 text-orange-600 dark:border-orange-500 dark:text-orange-400",
  FastAPI: "border-emerald-400 text-emerald-600 dark:border-emerald-500 dark:text-emerald-400",
  "Vue.js": "border-green-400 text-green-600 dark:border-green-500 dark:text-green-400",
  TypeScript: "border-blue-400 text-blue-600 dark:border-blue-500 dark:text-blue-400",
  MongoDB: "border-green-400 text-green-600 dark:border-green-500 dark:text-green-400",
  Kubernetes: "border-blue-400 text-blue-600 dark:border-blue-500 dark:text-blue-400",
  "GitLab CI": "border-orange-400 text-orange-600 dark:border-orange-500 dark:text-orange-400",
  SonarQube: "border-cyan-400 text-cyan-600 dark:border-cyan-500 dark:text-cyan-400",
};

const defaultTechColor = "border-zinc-300 text-zinc-600 dark:border-slate-600 dark:text-slate-400";

// Extract type (Alternance, Stage) from title
function parseTitle(fullTitle: string): { type: string; title: string } {
  const match = fullTitle.match(/^(Alternance|Stage|Apprenticeship|Internship)\s*[-–]\s*(.+)$/i);
  if (match) {
    return { type: match[1], title: match[2] };
  }
  return { type: "", title: fullTitle };
}

// Type badge color
function getTypeBadgeColor(type: string): string {
  const lowerType = type.toLowerCase();
  if (lowerType.includes("alternance") || lowerType.includes("apprenticeship")) {
    return "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300";
  }
  if (lowerType.includes("stage") || lowerType.includes("internship")) {
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
  }
  return "bg-zinc-100 text-zinc-700 dark:bg-slate-700 dark:text-slate-300";
}

export default function Experience() {
  const { experiences, labels } = usePortfolioContent();

  return (
    <div className="relative">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-300/25 via-fuchsia-200/15 to-transparent blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-indigo-100/20 via-sky-50/10 to-transparent blur-3xl" />
        <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-violet-200/15 blur-3xl" />
      </div>

      <Section title={labels.experience.title} subtitle={labels.experience.subtitle}>
      <div className="space-y-6">
        {experiences.map((exp) => {
          const { type, title } = parseTitle(exp.title);
          const logo = companyLogos[exp.company] || { abbr: exp.company.charAt(0), bgColor: "bg-zinc-500", textColor: "text-white" };

          return (
            <article
              key={`${exp.title}-${exp.company}`}
              className="rounded-2xl bg-white/80 p-6 ring-1 ring-zinc-200 transition-all duration-200 hover:shadow-lg hover:ring-violet-300 dark:bg-slate-900/70 dark:ring-slate-700 dark:hover:ring-violet-500/50"
            >
              {/* Header */}
              <div className="flex items-start gap-4">
                {/* Company logo badge */}
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${logo.bgColor} ${logo.textColor} text-sm font-bold shadow-sm`}
                >
                  {logo.abbr}
                </div>

                {/* Title and company */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-slate-100">
                        {title}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-slate-400">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    {/* Type badge and period */}
                    <div className="flex items-center gap-3 shrink-0">
                      {type && (
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${getTypeBadgeColor(type)}`}>
                          {type}
                        </span>
                      )}
                      <span className="text-sm text-zinc-500 dark:text-slate-400 whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bullets */}
              <ul className="mt-5 space-y-2 text-sm text-zinc-700 dark:text-slate-300">
                {exp.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                    <span dangerouslySetInnerHTML={{ __html: formatBullet(bullet) }} />
                  </li>
                ))}
              </ul>

              {/* Tech stack */}
              <div className="mt-5 flex flex-wrap gap-2">
                {exp.tech.map((tech) => (
                  <span
                    key={`${exp.company}-${tech}`}
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${techColors[tech] || defaultTechColor}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
    </div>
  );
}

// Format bullet points with bold highlights
function formatBullet(text: string): string {
  // Bold text before colons (e.g., "Refonte du système national :")
  // Also bold numbers and key metrics
  return text
    .replace(/^([^:]+):/, "<strong>$1</strong>:")
    .replace(/(\d+\s*(?:CAF|utilisateurs|notebooks|minutes|millions?))/gi, "<strong>$1</strong>");
}
