import Section from "../ui/Section";
import { profile, projects, colors } from "../../data/content";
import Badge from "../ui/Badge"; 
import SocialLinks from "../ui/SocialLinks";
import { Link } from "react-router-dom";

export default function Home(){
  return (
    <div>
      {/* Fond gradient piloté par CSS vars */}
      <div className="pointer-events-none fixed inset-0 -z-10 app-bg" />
      {/* blobs discrets */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-300/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />
      </div>

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs ring-1 ring-zinc-200 dark:ring-slate-700">
              <span className="relative inline-flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              À l'écoute d'opportunités
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">{profile.title}</h1>
            <p className="mt-2 text-lg text-zinc-600 dark:text-slate-400">{profile.tagline}</p>
            <p className="mt-4 max-w-prose text-zinc-700 dark:text-slate-300">{profile.bio}</p>
            <SocialLinks withEmail />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className={`rounded-xl bg-gradient-to-r ${colors.primaryFrom} ${colors.primaryTo} px-5 py-2.5 font-semibold text-white shadow-sm`}>Voir mes projets ✨</Link>
              <Link to="/contact" className="rounded-xl bg-white/80 px-5 py-2.5 font-semibold ring-1 ring-zinc-200 dark:ring-slate-700">Me contacter</Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square w-full overflow-hidden rounded-3xl border bg-white/60 dark:bg-slate-900/60 shadow-xl ring-1 ring-zinc-200 dark:ring-slate-700">
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
            <div className="pointer-events-none absolute -right-5 -top-5 hidden h-24 w-24 rotate-6 rounded-2xl bg-gradient-to-br from-fuchsia-300/70 to-indigo-300/70 backdrop-blur md:block" />
          </div>
        </div>
      </section>

      <Section title="Mon Aventure en Chiffres 🚀" subtitle="Quelques métriques qui illustrent mon parcours.">
        <div className="grid gap-4 md:grid-cols-3">
          <CardStat label="Projets réalisés" value={projects.length} />
          <CardStat label="Stacks maîtrisées" value={[...new Set(projects.flatMap(p=>p.stack))].length} />
          <CardStat label="Pipelines de données" value={5} />
        </div>
      </Section>

      <Section title="À propos de moi">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-white/80 p-5 ring-1 ring-zinc-200 dark:ring-slate-700">
                <h3 className="font-semibold">Langues</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {profile.languages.map((l) => (
                    <li key={l.name} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600" />
                      <span>
                        <span className="font-medium">{l.name}</span> — {l.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white/80 p-5 ring-1 ring-zinc-200 dark:ring-slate-700">
                <h3 className="font-semibold">Atouts</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.softSkills?.map((s:string)=><Badge key={s}>{s}</Badge>)}
                </div>
              </div>
              <div className="rounded-2xl bg-white/80 p-5 ring-1 ring-zinc-200 dark:ring-slate-700">
                <h3 className="font-semibold">Centres d’intérêt</h3>
                <ul className="mt-3 list-inside list-disc text-sm">
                  {profile.interests?.map((it:string)=><li key={it}>{it}</li>)}
                </ul>
              </div>
            </div>
          </Section>
    </div>
  );
}

function CardStat({label, value}:{label:string; value:number}){
  return (
    <div className="rounded-2xl bg-white/80 p-5 text-center ring-1 ring-zinc-200 dark:ring-slate-700">
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="mt-1 text-sm text-zinc-600 dark:text-slate-400">{label}</div>
    </div>
  );
}
