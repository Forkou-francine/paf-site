import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

import heroPhoto from "./assets/ange1.jpg";

// ── images (gardées pour la section Compétences / Projets)
import cnafDashboard from "./assets/projects/projet2-cc.png";
import cnafAnalyse from "./assets/projects/project2.png";
import schoolProjectOne from "./assets/projects/project1.png";
import schoolProjectTwo from "./assets/projects/project3.png";
import schoolProjectTwoOne from "./assets/projects/ae.png";

import logoDatabricks from "./assets/logos/databricks.png";
import logoSpark from "./assets/logos/spark.png";
import logoPython from "./assets/logos/python.png";
import logoPowerBI from "./assets/logos/powerbi.png";
import logoAzure from "./assets/logos/azure.png";
import logoHadoop from "./assets/logos/hadoop.png";
import logoMap from "./assets/logos/map.jpeg";
import logoAirflow from "./assets/logos/airflow.png";
import logoDbt from "./assets/logos/Dbt.png";
import logoDocker from "./assets/logos/Docker.png";

// Palette & helpers
const colors = {
  primaryFrom: "from-violet-600",
  primaryTo: "to-indigo-600",
  softFrom: "from-fuchsia-50",
  softTo: "to-indigo-50",
  ring: "focus:ring-violet-600",
};

// Animations (A)
const fadeUp = {
  initial: { y: 24, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 },
};

// Logos par techno (utilisés en Compétences)
const techLogos: Record<string, string> = {
  Databricks: logoDatabricks,
  Spark: logoSpark,
  Python: logoPython,
  "Power BI": logoPowerBI,
  Azure: logoAzure,
  Hadoop: logoHadoop,
  MapReduce: logoMap,
  Airflow: logoAirflow,
  Dbt: logoDbt,
  Docker: logoDocker,
};

const profile = {
  name: "Ange Francine FORKOU",
  title: "Data Engineer · Développeuse BI",
  location: "Ille-et-Vilaine, France",
  email: "francineforkou@gmail.com",
  phone: "+33 6 95 27 78 30",
  linkedin: "https://www.linkedin.com/in/forkou-francine",
  github: "https://github.com/Forkou-francine",
  medium: "https://medium.com/@francineforkou",
  cvUrl: "https://drive.google.com/file/d/1YsF6baPAIC5nL4vwzLBciB5JSYT6jE_K/view?usp=sharing",
  languages: [
    { name: "Français", level: "Courant" },
    { name: "Anglais", level: "C1+ (TOEIC 950/990, BULATS 98/100)" },
  ],
  softSkills: ["Bon relationnel", "Rigueur et discipline", "Esprit d'analyse", "Autonomie"],
  interests: ["Technologie", "Entrepreneuriat & leadership", "Bénévolat"],
};

const experiences = [
  {
    company: "Caisse Nationale des Allocations Familiales (CNAF)",
    location: "Rennes, FR",
    title: "Alternance – Data Engineer / Développeuse applicative BI",
    period: "Sept. 2024 — Présent",
    bullets: [
      "Refonte d’un tableau de bord analytique des réclamations (Databricks Python/Spark) + intégration Power BI.",
      "Transformation de données brutes en indicateurs clés ; modélisation dimensionnelle dans Azure Storage.",
      "Collaboration MOA/AMOA ; maintenance CI/CD via Azure DevOps et Git.",
    ],
    tech: ["Databricks", "Python", "Spark", "Power BI", "Azure", "Azure DevOps", "Git"],
  },
  {
    company: "Orange",
    location: "Rennes, FR",
    title: "Stage – Ingénieure Logiciel",
    period: "Fév. 2024 — Août 2024",
    bullets: [
      "Visualisation de données réseaux (transport optique).",
      "APIs avec Python (FastAPI) & front TypeScript (Vue.js).",
      "Admin NoSQL (MongoDB) sur clusters Kubernetes ; CI/CD GitLab + SonarQube.",
    ],
    tech: ["FastAPI", "Vue.js", "TypeScript", "MongoDB", "Kubernetes", "GitLab CI", "SonarQube"],
  },
];

const education = [
  { school: "EPSI, Rennes", degree: "Mastère Spécialisé – Expert en Ingénierie des Données", period: "Sept. 2024 — Présent" },
  { school: "IUSJ (Cameroun) × UTT (France)", degree: "Diplôme d’ingénieur en Informatique et Systèmes d'Information – Développement Logiciel", period: "2019 — 2024", details: "Architecture SI, web & mobile, data mining (R), data viz (Power BI)" },
  { school: "UTBM, Belfort", degree: "Semestre d’échange – Développement logiciel avancé", period: "Sept. 2023 — Fév. 2024", details: "Bases de données (SQL/NoSQL), gestion de projet agile, Java" },
];

// ── Certifications
type Cert = { name: string; issuer: string; year?: string; id?: string; link?: string; image?: string };
const certifications: Cert[] = [
  {
    name: "IBM Data Analyst Professional Certificate",
    issuer: "IBM / Coursera",
    link: "https://www.coursera.org/professional-certificates/ibm-data-analyst",
  },
  {
    name: "AI Foundations for Everyone Specialization",
    issuer: "IBM / Coursera",
    link: "https://www.coursera.org/account/accomplishments/specialization/WQ2GLB46L5M6",
    image: "",
  },
  {
    name: "Dataiku Core Designer",
    issuer: "Dataiku",
    link: "http://verify.skilljar.com/c/z6p5zxzj6ped",
  },
  {
    name: "Microsoft Certified: Power BI Data Analyst Associate",
    issuer: "Microsoft",
    link: "https://learn.microsoft.com/certifications/power-bi-data-analyst-associate/",
  },
  {
    name: "Databricks for Data Engineering",
    issuer: "Databricks",
    link: "https://www.databricks.com/learn/certification",
  },
];

// ── Projets
type Project = {
  name: string;
  org: string;
  period: string;
  bullets: string[];
  cover?: string;
  stack: string[]; // cercles
  link?: string;
  gallery?: string[];
};

const projects: Project[] = [
  {
    name: "Tableau de bord des réclamations",
    org: "CNAF – Alternance",
    period: "2024 — 2025",
    bullets: [
      "Modélisation et pipeline ETL (Databricks · Spark · Python).",
      "Mesures DAX & modèles pour Power BI ; drilldown multi-niveaux.",
      "Suivi des réclamations, typologies & délais de traitement.",
    ],
    cover: cnafDashboard,
    gallery: [cnafDashboard, cnafAnalyse],
    stack: ["Databricks", "Spark", "Python", "Power BI", "Azure"],
    link: "#",
  },
  {
    name: "Analyse de données e-commerce",
    org: "EPSI – M1",
    period: "2024 — 2025",
    bullets: [
      "Ingestion & préparation (Hadoop · Spark · MapReduce).",
      "Exploration & KPI pour suivi de ventes.",
      "Data viz pour recommandations marketing.",
    ],
    cover: schoolProjectOne,
    stack: ["Hadoop", "Spark", "MapReduce"],
    link: "https://www.canva.com/design/DAGfjcpth5M/lAgCMBD_27AWh9dLE6yY7g/edit?utm_content=DAGfjcpth5M&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  },
  {
    name: "Pipeline Big Data pour un labo de recherche",
    org: "EPSI – M1",
    period: "2024 — 2025",
    bullets: [
      "Orchestration Airflow, transformations avec dbt & Spark.",
      "Stockage & modélisation (PostgreSQL) — reporting Looker Studio.",
      "CI légère et documentation.",
    ],
    cover: schoolProjectTwo,
    gallery: [schoolProjectTwo, schoolProjectTwoOne],
    stack: ["Python", "Spark", "Airflow", "LookerStudio", "Dbt", "PostgreSQL"],
    link: "https://www.canva.com/design/DAGqzNY5xKY/9o3BTlrJ3Ax-Hc3CJfh6rw/edit?utm_content=DAGqzNY5xKY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  },
];

const skills = [
  { category: "Orchestration & Monitoring", items: ["Airflow", "Prometheus", "Grafana"] },
  { category: "ETL & Data Viz", items: ["Power BI", "Tableau", "Dataiku", "Databricks", "Hadoop", "Azure Storage"] },
  { category: "Langages & Frameworks", items: ["Python", "Spark", "Java", "Scala"] },
  { category: "Bases de données", items: ["SQL", "NoSQL", "Cassandra", "MongoDB"] },
  { category: "CI/CD & Ops", items: ["Docker", "Kubernetes", "GitLab CI", "Azure DevOps"] },
];

// UI atoms
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/70 px-2.5 py-1 text-xs font-medium tracking-wide text-zinc-900 ring-1 ring-inset ring-zinc-200">
      {children}
    </span>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-fuchsia-200 to-indigo-200 px-2.5 py-1 text-xs font-semibold text-zinc-900">
      {children}
    </span>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className="scroll-mt-24"
      initial={fadeUp.initial}
      whileInView={fadeUp.whileInView}
      transition={fadeUp.transition}
      viewport={fadeUp.viewport}
    >
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>}
          <div className={`mt-4 h-[2px] w-20 bg-gradient-to-r ${colors.primaryFrom} ${colors.primaryTo}`} />
        </div>
        {children}
      </div>
    </motion.section>
  );
}

// ── petits cercles (initiales) pour technos de projet
const abbrev: Record<string, string> = {
  Databricks: "DB",
  Spark: "SP",
  Python: "PY",
  "Power BI": "PBI",
  Azure: "AZ",
  Hadoop: "HD",
  MapReduce: "MR",
  SQL: "SQL",
  Tailwind: "TW",
  Java: "JV",
  Scala: "SC",
  Airflow: "AF",
  Dbt: "DBT",
  LookerStudio: "LS",
  PostgreSQL: "PG",
};

function TechCircle({ name }: { name: string }) {
  const label = abbrev[name] || name.slice(0, 2).toUpperCase();
  return (
    <div
      title={name}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-[11px] font-bold text-white shadow-sm"
    >
      {label}
    </div>
  );
}

// Filtre (F)
function FilterBar({
  techs,
  active,
  onToggle,
  onReset,
}: {
  techs: string[];
  active: Set<string>;
  onToggle: (t: string) => void;
  onReset: () => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <button
        onClick={onReset}
        className="btn-hover rounded-full bg-white px-3 py-1 text-sm ring-1 ring-zinc-200"
      >
        Tout
      </button>
      {techs.map((t) => {
        const isOn = active.has(t);
        return (
          <button
            key={t}
            onClick={() => onToggle(t)}
            className={`btn-hover rounded-full px-3 py-1 text-sm ring-1 ${
              isOn ? "bg-zinc-900 text-white ring-zinc-900" : "bg-white ring-zinc-200"
            }`}
            title={`Filtrer: ${t}`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

// ── Carte projet (A/C)
function ProjectCard({
  p,
  onOpen,
}: {
  p: Project;
  onOpen: (images: string[], index?: number) => void;
}) {
  return (
    <motion.article
      className="overflow-hidden rounded-2xl bg-white/80 ring-1 ring-zinc-200"
      initial={{ y: 16, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
    >
      <div
        className="relative cursor-pointer"
        onClick={() =>
          onOpen(p.gallery?.length ? p.gallery : p.cover ? [p.cover] : [], 0)
        }
      >
        <div className="aspect-video w-full bg-gradient-to-br from-zinc-100 to-zinc-50">
          {p.cover ? (
            <img src={p.cover} alt={p.name} className="h-full w-full object-center" />
          ) : null}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-semibold text-white drop-shadow">{p.name}</h3>
          <p className="text-xs text-zinc-200 drop-shadow">
            {p.org} · {p.period}
          </p>
        </div>
      </div>

      <div className="p-5">
        <ul className="list-disc pl-5 text-sm text-zinc-800">
          {p.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        {p.stack.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {p.stack.map((t) => (
              <TechCircle key={t} name={t} />
            ))}
          </div>
        )}

        {p.link && (
          <div className="mt-4">
            <a
              href={p.link}
              className={`btn-hover inline-flex items-center rounded-lg bg-gradient-to-r ${colors.primaryFrom} ${colors.primaryTo} px-3 py-1.5 text-sm font-semibold text-white hover:opacity-95`}
            >
              Voir le projet
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
}

// ── Lightbox (C)
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  if (!images.length) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-white"
      >
        Fermer ✕
      </button>
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white"
      >
        ‹
      </button>
      <img
        src={images[index]}
        alt=""
        className="max-h-[85vh] max-w-[90vw] rounded-md object-contain shadow-2xl"
      />
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white"
      >
        ›
      </button>
      <div className="absolute bottom-4 flex gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Compteurs (E)
function useCounter(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setValue(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);
  return value;
}

function Stat({ label, value, suffix = "+" }: { label: string; value: number; suffix?: string }) {
  const n = useCounter(value);
  return (
    <div className="rounded-2xl bg-white/80 p-5 text-center ring-1 ring-zinc-200">
      <div className="text-3xl font-extrabold">
        {n}
        {suffix}
      </div>
      <div className="mt-1 text-sm text-zinc-600">{label}</div>
    </div>
  );
}

// ── Progress & Roadmap items (pour “En cours”)
function Progress({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-zinc-200">
      <div
        className={`h-2 rounded-full bg-gradient-to-r ${colors.primaryFrom} ${colors.primaryTo}`}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

function RoadmapItem({
  title,
  detail,
  tag,
}: {
  title: string;
  detail?: string;
  tag?: string;
}) {
  return (
    <li className="rounded-xl bg-white/70 p-3 ring-1 ring-zinc-200">
      <div className="flex items-center justify-between gap-3">
        <span className="font-medium">{title}</span>
        {tag && (
          <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-xs font-semibold text-white">
            {tag}
          </span>
        )}
      </div>
      {detail && <p className="mt-1 text-xs text-zinc-600">{detail}</p>}
    </li>
  );
}

// ── Formulaire contact (I)
function ContactFormReal() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const subject = String(fd.get("subject") || "");
    const message = String(fd.get("message") || "");
    if (!name || !email || !message) return;

    if (FORMSPREE_ID) {
      try {
        setStatus("sending");
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: fd,
        });
        const json = await res.json();
        if (res.ok) {
          setStatus("ok");
          setMsg("Message envoyé ✅");
          (e.currentTarget as HTMLFormElement).reset();
        } else {
          setStatus("error");
          setMsg(json?.error || "Une erreur est survenue.");
        }
      } catch {
        setStatus("error");
        setMsg("Impossible d'envoyer le message.");
      }
    } else {
      const body = encodeURIComponent(`${message}\n\n— ${name} <${email}>`);
      const subj = encodeURIComponent(subject || "Prise de contact via portfolio");
      window.location.href = `mailto:${profile.email}?subject=${subj}&body=${body}`;
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Votre nom"
          className={`h-10 rounded-md border px-3 outline-none focus:ring-2 ${colors.ring}`}
        />
        <input
          name="email"
          required
          type="email"
          placeholder="Votre email"
          className={`h-10 rounded-md border px-3 outline-none focus:ring-2 ${colors.ring}`}
        />
      </div>
      <input
        name="subject"
        placeholder="Sujet"
        className={`h-10 w-full rounded-md border px-3 outline-none focus:ring-2 ${colors.ring}`}
      />
      <textarea
        name="message"
        required
        rows={4}
        placeholder="Message"
        className={`w-full rounded-md border p-3 outline-none focus:ring-2 ${colors.ring}`}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className={`btn-hover w-full rounded-xl bg-gradient-to-r ${colors.primaryFrom} ${colors.primaryTo} px-4 py-2 font-semibold text-white shadow-sm disabled:opacity-60`}
      >
        {status === "sending" ? "Envoi..." : "Envoyer"}
      </button>
      {status !== "idle" && (
        <p
          className={`text-sm ${
            status === "ok"
              ? "text-emerald-600"
              : status === "error"
              ? "text-red-600"
              : "text-zinc-500"
          }`}
        >
          {msg}
        </p>
      )}
      {!FORMSPREE_ID && (
        <p className="text-xs text-zinc-500">
          Astuce : ajoute ton ID Formspree pour un envoi direct (sinon, ouverture du client mail).
        </p>
      )}
    </form>
  );
}

const FORMSPREE_ID = ""; // ← mets l'ID Formspree ici (ex: "meqprkgy"). Laisse vide pour fallback mailto:

export default function Portfolio() {
  const year = useMemo(() => new Date().getFullYear(), []);

  const allTechs = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.stack))).sort(),
    []
  );
  const [activeTechs, setActiveTechs] = useState<Set<string>>(new Set());

  const toggleTech = (t: string) => {
    setActiveTechs((prev) => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });
  };
  const resetTech = () => setActiveTechs(new Set());

  const filteredProjects = useMemo(() => {
    if (activeTechs.size === 0) return projects;
    return projects.filter((p) => p.stack.some((s) => activeTechs.has(s)));
  }, [activeTechs]);

  // Lightbox
  const [lb, setLb] = React.useState<{ images: string[]; index: number } | null>(
    null
  );
  const openLb = (images: string[], index = 0) =>
    images.length && setLb({ images, index });
  const closeLb = () => setLb(null);
  const prevLb = () =>
    lb && setLb({ ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length });
  const nextLb = () =>
    lb && setLb({ ...lb, index: (lb.index + 1) % lb.images.length });

  return (
    <div className={`min-h-screen text-zinc-900`}>
      {/* Background décor */}
      <div
        className={`pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b ${colors.softFrom} ${colors.softTo}`}
      />

      {/* Blobs animés (B) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-300/30 blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl animate-pulse-slower" />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="font-semibold tracking-tight">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-zinc-900 align-middle" />
            {profile.name}
          </a>
          <nav className="hidden gap-6 text-sm md:flex">
            {[
              ["À propos", "about"],
              ["En cours", "now"],
              ["Expériences", "experience"],
              ["Projets", "projects"],
              ["Compétences", "skills"],
              ["Certifications", "certifications"],
              ["Formation", "education"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} className="link-underline">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {profile.cvUrl && (
              <a
                href={profile.cvUrl}
                className={`btn-hover rounded-xl bg-gradient-to-r ${colors.primaryFrom} ${colors.primaryTo} px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:opacity-95`}
                target="_blank"
                rel="noreferrer"
              >
                Télécharger le CV
              </a>
            )}
          </div>
        </div>
      </header>

      {/* HERO (mis à jour) */}
      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            {/* Badge statut actuel */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs ring-1 ring-zinc-200">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              En alternance à la CNAF — Je documente mes projets ici
            </div>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
              {profile.title}
            </h1>

            <p className="mt-4 max-w-prose text-zinc-700">
              Étudiante en Mastère Spécialisé et data engineer en alternance,
              je conçois des pipelines et des tableaux de bord pour transformer la donnée en décisions.
              Ici, je <span className="font-medium">documente mes projets</span>, mes apprentissages et mes certifications.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <Pill>{profile.location}</Pill>
              <a
                href={`mailto:${profile.email}`}
                className={`rounded-full bg-white/80 px-3 py-1 ring-1 ring-zinc-200 ${colors.ring}`}
              >
                {profile.email}
              </a>
              <a
                href={profile.linkedin}
                className={`rounded-full bg-white/80 px-3 py-1 ring-1 ring-zinc-200 ${colors.ring}`}
              >
                LinkedIn
              </a>
              <a
                href={profile.github}
                className={`rounded-full bg-white/80 px-3 py-1 ring-1 ring-zinc-200 ${colors.ring}`}
              >
                GitHub
              </a>
              <a
                href={profile.medium}
                className={`rounded-full bg-white/80 px-3 py-1 ring-1 ring-zinc-200 ${colors.ring}`}
              >
                Medium
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#now"
                className={`btn-hover rounded-xl bg-white/80 px-4 py-2 font-semibold ring-1 ring-zinc-200 hover:bg-white`}
              >
                Ce sur quoi je travaille
              </a>
              <a
                href="#projects"
                className={`btn-hover rounded-xl bg-gradient-to-r ${colors.primaryFrom} ${colors.primaryTo} px-4 py-2 font-semibold text-white shadow-sm hover:opacity-95`}
              >
                Voir mes projets
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="relative">
            <div className="aspect-square w-full overflow-hidden rounded-3xl border bg-white/60 shadow-xl ring-1 ring-zinc-200">
              <img src={heroPhoto} alt="Ange Francine Forkou" className="h-full w-full object-cover" />
            </div>
            <div className="pointer-events-none absolute -right-5 -top-5 hidden h-24 w-24 rotate-6 rounded-2xl bg-gradient-to-br from-fuchsia-300/70 to-indigo-300/70 backdrop-blur md:block" />
          </div>
        </div>
      </section>

      {/* Stats (E) */}
      <Section id="stats" title="En chiffres">
        <div className="grid gap-4 md:grid-cols-4">
          <Stat label="Projets menés" value={projects.length} suffix="" />
          <Stat
            label="Stacks maîtrisées"
            value={[...new Set(projects.flatMap((p) => p.stack))].length}
            suffix=""
          />
          <Stat label="Tableaux de bord" value={3} />
          <Stat label="Pipelines data" value={5} />
        </div>
      </Section>

      {/* En cours / Roadmap */}
      <Section id="now" title="En cours" subtitle="Ce que je fais, j’apprends et où je vais">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Carte 1 */}
          <div className="rounded-2xl bg-white/80 p-5 ring-1 ring-zinc-200">
            <h3 className="text-lg font-semibold">Alternance — CNAF</h3>
            <p className="mt-1 text-sm text-zinc-600">Tableau de bord des réclamations · 2024—2025</p>
            <ul className="mt-3 list-disc pl-5 text-sm text-zinc-800">
              <li>Ingestion & pipeline ETL (Databricks · Spark · Python)</li>
              <li>Modèle métrique & DAX pour Power BI</li>
              <li>Suivi SLA, typologies & délais de traitement</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Databricks", "Spark", "Python", "Power BI", "Azure"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white px-2.5 py-1 text-xs ring-1 ring-zinc-200"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4">
              <a href="#projects" className={`link-underline text-sm`}>
                Voir les captures
              </a>
            </div>
          </div>

          {/* Carte 2 */}
          <div className="rounded-2xl bg-white/80 p-5 ring-1 ring-zinc-200">
            <h3 className="text-lg font-semibold">Apprentissages</h3>
            <div className="mt-4 space-y-3">
              <div>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span>Databricks Unity Catalog</span>
                  <span>45%</span>
                </div>
                <Progress value={45} />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span>dbt (modélisation)</span>
                  <span>40%</span>
                </div>
                <Progress value={40} />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span>Dataiku (Core → Advanced)</span>
                  <span>60%</span>
                </div>
                <Progress value={60} />
              </div>
            </div>
            <p className="mt-3 text-xs text-zinc-600">
              Je prends des notes sur Medium et j’ouvre des démos GitHub quand c’est possible.
            </p>
            <div className="mt-3 flex gap-2">
              <a href={profile.medium} className="link-underline text-sm">
                Mes articles Medium
              </a>
              <span className="text-zinc-400">·</span>
              <a href={profile.github} className="link-underline text-sm">
                Mes repos GitHub
              </a>
            </div>
          </div>

          {/* Carte 3 */}
          <div className="rounded-2xl bg-white/80 p-5 ring-1 ring-zinc-200">
            <h3 className="text-lg font-semibold">Roadmap 2025</h3>
            <ul className="mt-4 space-y-2">
              <RoadmapItem
                title="Optimiser un pipeline Spark (cost & perf)"
                tag="Q3"
                detail="Benchmark + cache + AQE"
              />
              <RoadmapItem
                title="dbt + Lakehouse — bonnes pratiques"
                tag="Q3"
                detail="Tests, docs, CI"
              />
              <RoadmapItem
                title="Power BI — performance & UX"
                tag="Q4"
                detail="Composite models, aggregations"
              />
              <RoadmapItem title="Certification Databricks (DE/Associate)" tag="Q4" />
            </ul>
            <div className="mt-4 text-xs text-zinc-600">
              Ouverte aux <span className="font-medium">échanges techniques</span> et aux mini-collaborations.
            </div>
          </div>
        </div>
      </Section>

      {/* À PROPOS */}
      <Section id="about" title="À propos">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white/80 p-5 ring-1 ring-zinc-200">
            <h3 className="font-semibold">Langues</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {profile.languages.map((l) => (
                <li key={l.name} className="flex items-start gap-2">
                  <span
                    className={`mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${colors.primaryFrom} ${colors.primaryTo}`}
                  />
                  <span>
                    <span className="font-medium">{l.name}</span> — {l.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white/80 p-5 ring-1 ring-zinc-200">
            <h3 className="font-semibold">Atouts</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.softSkills.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white/80 p-5 ring-1 ring-zinc-200">
            <h3 className="font-semibold">Centres d’intérêt</h3>
            <ul className="mt-3 list-inside list-disc text-sm">
              {profile.interests.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* EXPÉRIENCES */}
      <Section id="experience" title="Expériences professionnelles">
        <div className="space-y-6">
          {experiences.map((exp) => (
            <article key={exp.title} className="rounded-2xl bg-white/80 p-5 ring-1 ring-zinc-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">
                  {exp.title} — <span className="text-zinc-700">{exp.company}</span>
                </h3>
                <span className="text-sm text-zinc-600">{exp.period}</span>
              </div>
              <p className="mt-1 text-sm text-zinc-600">{exp.location}</p>
              <ul className="mt-3 list-disc pl-5 text-sm text-zinc-800">
                {exp.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* PROJETS (avec filtre + lightbox) */}
      <Section id="projects" title="Projets">
        <FilterBar techs={allTechs} active={activeTechs} onToggle={toggleTech} onReset={resetTech} />
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((p) => (
            <ProjectCard key={p.name} p={p} onOpen={openLb} />
          ))}
          {filteredProjects.length === 0 && (
            <div className="rounded-2xl bg-white/80 p-6 text-sm ring-1 ring-zinc-200">
              Aucun projet ne correspond aux filtres sélectionnés.
            </div>
          )}
        </div>
      </Section>

      {lb && (
        <Lightbox
          images={lb.images}
          index={lb.index}
          onClose={closeLb}
          onPrev={prevLb}
          onNext={nextLb}
        />
      )}

      {/* COMPÉTENCES (avec logos) */}
      <Section id="skills" title="Compétences">
        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((group) => (
            <div key={group.category} className="rounded-2xl bg-white/80 p-5 ring-1 ring-zinc-200">
              <h3 className="font-semibold">{group.category}</h3>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                {group.items.map((name) => {
                  const logo = techLogos[name];
                  return logo ? (
                    <span
                      key={name}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-2.5 py-1 ring-1 ring-zinc-200"
                    >
                      <img src={logo} alt={name} className="h-5 w-5 object-contain" />
                      <span>{name}</span>
                    </span>
                  ) : (
                    <Badge key={name}>{name}</Badge>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certifications" title="Certifications">
        {certifications.length === 0 ? (
          <div className="rounded-2xl bg-white/80 p-5 text-sm ring-1 ring-zinc-200">
            Ajoute tes certifications ici (ex : AZ-900, Databricks Lakehouse Fundamentals, PL-300…).
          </div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {certifications.map((c) => (
              <li key={c.name} className="rounded-2xl bg-white/80 p-5 ring-1 ring-zinc-200">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-sm text-zinc-600">{c.issuer}</div>
                    {c.id && <div className="text-xs text-zinc-500">ID: {c.id}</div>}
                  </div>
                  {c.year && (
                    <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
                      {c.year}
                    </span>
                  )}
                </div>
                {c.link && (
                  <a
                    href={c.link}
                    className={`mt-3 inline-flex rounded-lg bg-gradient-to-r ${colors.primaryFrom} ${colors.primaryTo} px-3 py-1.5 text-xs font-semibold text-white`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Voir le certificat
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* FORMATION */}
      <Section id="education" title="Formation">
        <ol className="relative ml-3 space-y-6 border-l border-zinc-200 pl-6">
          {education.map((e) => (
            <li key={e.school}>
              <span
                className={`absolute -left-[9px] mt-1 block h-3 w-3 rounded-full bg-gradient-to-r ${colors.primaryFrom} ${colors.primaryTo}`}
              />
              <h3 className="font-semibold">{e.degree}</h3>
              <p className="text-sm text-zinc-700">{e.school}</p>
              <p className="text-xs text-zinc-500">{e.period}</p>
              {e.details && <p className="mt-1 text-sm text-zinc-700">{e.details}</p>}
            </li>
          ))}
        </ol>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact">
        <div className="rounded-2xl bg-white/80 p-6 ring-1 ring-zinc-200">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold">Discutons</h3>
              <p className="mt-2 max-w-prose text-sm text-zinc-700">
                Vous travaillez sur un sujet data/BI proche ? Discutons ! Je suis ouverte aux
                échanges techniques et aux collaborations ponctuelles.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className={`rounded-xl bg-white px-3 py-2 font-medium ring-1 ring-zinc-200 ${colors.ring}`}
                >
                  {profile.email}
                </a>
                <a
                  href={`tel:${profile.phone.replaceAll(" ", "")}`}
                  className={`rounded-xl bg-white px-3 py-2 font-medium ring-1 ring-zinc-200 ${colors.ring}`}
                >
                  {profile.phone}
                </a>
              </div>
            </div>
            <div className="rounded-xl bg-white p-4 ring-1 ring-zinc-200">
              <ContactFormReal />
            </div>
          </div>
        </div>
      </Section>

      <footer className="border-t bg-white/60 py-8">
        <div className="mx-auto max-w-6xl px-4 text-sm text-zinc-700">
          © {year} {profile.name}. Construit en React + Tailwind.
        </div>
      </footer>
    </div>
  );
}
