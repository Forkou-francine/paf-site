import React from "react";
import { motion } from "framer-motion";
import { colors } from "../../constants/colors";
import TechCircle from "./TechCircle";
import type { Project } from "../../types/types";

export default function ProjectCard({ p, onOpen }:{
  p: Project; onOpen: (images: string[], index?: number) => void;
}) {
  return (
    <motion.article
      className="overflow-hidden rounded-2xl bg-white/80 ring-1 ring-zinc-200 dark:ring-slate-700"
      initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }} viewport={{ once: true }}
      whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
    >
      <button
        type="button"
        onClick={() => onOpen(p.gallery?.length ? p.gallery : p.cover ? [p.cover] : [], 0)}
        className="group relative block w-full overflow-hidden bg-transparent p-0 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-500"
        aria-label={`Ouvrir la galerie du projet ${p.name}`}
      >
        <div className="aspect-video w-full bg-gradient-to-br from-zinc-100 to-zinc-50">
          {p.cover ? (
            <img
              src={p.cover}
              alt={p.name}
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
          <h3 className="text-lg font-semibold text-white drop-shadow">{p.name}</h3>
          <p className="text-xs text-zinc-200 drop-shadow">{p.org} - {p.period}</p>
        </div>
      </button>
      <div className="p-5">
        <ul className="list-disc pl-5 text-sm text-zinc-800">{p.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
        {!!p.stack.length && <div className="mt-4 flex flex-wrap items-center gap-2">{p.stack.map((t) => <TechCircle key={t} name={t} />)}</div>}
        {p.link && <div className="mt-4">
          <a href={p.link} className={`btn-hover inline-flex items-center rounded-lg bg-gradient-to-r ${colors.primaryFrom} ${colors.primaryTo} px-3 py-1.5 text-sm font-semibold text-white hover:opacity-95`}>Voir le projet</a>
        </div>}
      </div>
    </motion.article>
  );
}
