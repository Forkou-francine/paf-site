import React from "react";
import { motion } from "framer-motion";
import { colors } from "../../constants/colors";
import TechCircle from "./TechCircle";
import type { Project } from "../../types/types";
import type { Labels } from "../../data/content";

type Props = {
  project: Project;
  labels: Labels["projectCard"];
  onOpen: (images: string[], index?: number) => void;
};

export default function ProjectCard({ project, labels, onOpen }: Props) {
  return (
    <motion.article
      className="overflow-hidden rounded-2xl bg-white/80 ring-1 ring-zinc-200 dark:ring-slate-700"
      initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }} viewport={{ once: true }}
      whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
    >
      <button
        type="button"
        onClick={() =>
          onOpen(
            project.gallery?.length ? project.gallery : project.cover ? [project.cover] : [],
            0,
          )
        }
        className="group relative block w-full overflow-hidden bg-transparent p-0 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-500"
        aria-label={`${labels.openGallery} ${project.name}`}
      >
        <div className="aspect-video w-full bg-gradient-to-br from-zinc-100 to-zinc-50">
          {project.cover ? (
            <img
              src={project.cover}
              alt={project.name}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              width={640}
              height={360}
            />
          ) : null}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 transition-opacity group-hover:from-black/60" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-semibold text-white drop-shadow">{project.name}</h3>
          <p className="text-xs text-zinc-200 drop-shadow">
            {project.org} - {project.period}
          </p>
        </div>
      </button>
      <div className="p-5 space-y-4">
        <p className="text-sm text-zinc-700 dark:text-slate-300">{project.summary}</p>

        <dl className="grid gap-3 text-sm md:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-slate-400">
              {labels.roleLabel}
            </dt>
            <dd className="mt-1 text-zinc-900 dark:text-slate-100">{project.role}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-slate-400">
              {labels.durationLabel}
            </dt>
            <dd className="mt-1 text-zinc-900 dark:text-slate-100">{project.period}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-slate-400">
              {labels.stackLabel}
            </dt>
            <dd className="mt-2 flex flex-wrap items-center gap-2">
              {project.stack.map((tech) => (
                <TechCircle key={tech} name={tech} />
              ))}
            </dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-slate-400">
              {labels.impactLabel}
            </dt>
            <dd className="mt-1 text-sm text-zinc-700 dark:text-slate-300">{project.impact}</dd>
          </div>
        </dl>

        {project.bullets.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-slate-400">
              {labels.deliverablesLabel}
            </h4>
            <ul className="mt-2 space-y-1 pl-4 text-sm text-zinc-800 dark:text-slate-200">
              {project.bullets.map((bullet, index) => (
                <li key={index} className="list-disc">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.link && (
          <div className="pt-2">
            <a
              href={project.link}
              className={`btn-hover inline-flex items-center rounded-lg bg-gradient-to-r ${colors.primaryFrom} ${colors.primaryTo} px-3 py-1.5 text-sm font-semibold text-white hover:opacity-95`}
            >
              {labels.viewProject}
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
}
