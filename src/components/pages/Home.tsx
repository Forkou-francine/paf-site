import SocialLinks from "../ui/SocialLinks";
import { Link } from "react-router-dom";
import { colors, techLogos } from "../../data/content";
import { usePortfolioContent } from "../../hooks/usePortfolioContent";
import { FiMessageSquare, FiSearch, FiCheckCircle, FiUsers } from "react-icons/fi";

const floatingTechs = [
  { name: "Databricks", abbr: "DB", position: "top-4 right-4", delay: 0 },
  { name: "Python", abbr: "Py", position: "top-1/4 -right-2", delay: 0.2 },
  { name: "Power BI", abbr: "PBI", position: "bottom-16 -left-4", delay: 0.4 },
  { name: "Spark", abbr: "SP", position: "-bottom-2 right-1/4", delay: 0.6 },
];

const workStyleIcons = [FiMessageSquare, FiSearch, FiCheckCircle, FiUsers];

export default function Home() {
  const { profile, labels } = usePortfolioContent();

  return (
    <div>
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Large purple gradient on the left */}
        <div className="absolute -left-32 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-300/25 via-fuchsia-200/15 to-transparent blur-3xl" />
        {/* Soft blue gradient on the right */}
        <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-indigo-100/20 via-sky-50/10 to-transparent blur-3xl" />
        {/* Additional soft purple accent */}
        <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-violet-200/15 blur-3xl" />
      </div>

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs ring-1 ring-zinc-200 dark:bg-slate-800/80 dark:text-slate-100 dark:ring-slate-700">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
              </span>
              {labels.home.availability}
            </div>
            <h1 className="mt-3 text-2xl font-bold text-zinc-900 dark:text-slate-100 md:text-3xl">
              {profile.name}
            </h1>
            <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
              <span className="block">Data Engineer</span>
              <span className="block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                & Développeuse BI
              </span>
            </h1>
            <p className="mt-2 text-lg text-zinc-600 dark:text-slate-400">{profile.tagline}</p>
            <p className="mt-4 max-w-prose text-zinc-700 dark:text-slate-300">{profile.bio}</p>
            <SocialLinks withEmail />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className={`rounded-xl bg-gradient-to-r ${colors.primaryFrom} ${colors.primaryTo} px-5 py-2.5 font-semibold text-white shadow-sm`}
              >
                {labels.home.primaryCta}
              </Link>
              <Link
                to="/contact"
                className="rounded-xl bg-white/80 px-5 py-2.5 font-semibold ring-1 ring-zinc-200 dark:bg-slate-800/80 dark:text-slate-100 dark:ring-slate-700"
              >
                {labels.home.secondaryCta}
              </Link>
            </div>
          </div>
          <div className="relative">
            {/* Decorative blob on top-left of image */}
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-violet-400/50 via-fuchsia-300/40 to-transparent blur-2xl" />
            <div className="aspect-square w-full overflow-hidden rounded-3xl border border-violet-200 bg-violet-100/60 shadow-xl ring-1 ring-violet-200 dark:border-violet-800 dark:bg-violet-900/30 dark:ring-violet-800">
              <img
                src={profile.heroPhoto}
                alt={`Portrait de ${profile.name}`}
                className="h-full w-full object-cover"
                decoding="async"
                loading="eager"
                width={768}
                height={768}
              />
            </div>

            {/* Tech badges */}
            {floatingTechs.map((tech) => (
              <div
                key={tech.name}
                className={`absolute ${tech.position} hidden md:flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 shadow-md ring-1 ring-zinc-200 dark:bg-slate-800 dark:ring-slate-700`}
              >
                {techLogos[tech.name] ? (
                  <img src={techLogos[tech.name]} alt={tech.name} className="h-5 w-5 object-contain" />
                ) : (
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-violet-600 text-[10px] font-bold text-white">
                    {tech.abbr}
                  </span>
                )}
                <span className="text-xs font-medium text-zinc-700 dark:text-slate-200">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left - About text */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
              {labels.home.aboutTitle}
            </span>
            <div className="mt-6 space-y-4 text-zinc-600 dark:text-slate-400">
              <p>{labels.home.aboutText}</p>
            </div>
          </div>

          {/* Right - How I work + Languages */}
          <div className="space-y-6">
            {/* How I work */}
            <div className="rounded-2xl bg-white/80 p-6 ring-1 ring-zinc-200 dark:bg-slate-800/80 dark:ring-slate-700">
              <h3 className="font-semibold text-zinc-900 dark:text-slate-100">{labels.home.softSkillsTitle}</h3>
              <ul className="mt-4 space-y-4">
                {profile.softSkills?.map((skill, index) => {
                  const Icon = workStyleIcons[index % workStyleIcons.length];
                  const [title, ...rest] = skill.split(" - ");
                  const description = rest.join(" - ");
                  return (
                    <li key={skill} className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <span className="font-medium text-zinc-900 dark:text-slate-100">{title}</span>
                        {description && (
                          <p className="text-sm text-zinc-500 dark:text-slate-400">{description}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Languages */}
            <div className="rounded-2xl bg-white/80 p-6 ring-1 ring-zinc-200 dark:bg-slate-800/80 dark:ring-slate-700">
              <h3 className="font-semibold text-zinc-900 dark:text-slate-100">{labels.home.languagesTitle}</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {profile.languages.map((l) => (
                  <span
                    key={l.name}
                    className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-1.5 text-sm dark:bg-slate-700"
                  >
                    <span className="font-medium text-zinc-900 dark:text-slate-100">{l.name}</span>
                    <span className="text-zinc-500 dark:text-slate-400">{l.level}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

