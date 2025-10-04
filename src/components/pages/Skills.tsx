import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../ui/Section";
import { skills, techLogos } from "../../data/content";
import Badge from "../ui/Badge";

export default function Skills() {
  const [active, setActive] = useState(skills?.[0]?.category ?? "");

  return (
    <Section title="Compétences" subtitle="Les technologies que j'utilise au quotidien.">
      <div className="rounded-2xl bg-white/80 p-5 ring-1 ring-zinc-200 dark:bg-slate-900/70 dark:ring-slate-700">
        <div className="flex flex-wrap border-b border-zinc-200 dark:border-slate-800">
          {skills.map((g) => (
            <button
              key={g.category}
              onClick={() => setActive(g.category)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                active === g.category
                  ? "border-b-2 border-violet-600 text-violet-600"
                  : "border-b-2 border-transparent text-zinc-600 dark:text-slate-400 hover:text-zinc-900"
              }`}
            >
              {g.category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4 flex flex-wrap items-center gap-3 text-sm"
          >
            {skills.find((s) => s.category === active)?.items.map((name) =>
              techLogos[name] ? (
                <span key={name} className="inline-flex items-center gap-2 rounded-full bg-white px-2.5 py-1 ring-1 ring-zinc-200 dark:ring-slate-700">
                  <img src={techLogos[name]} alt={name} className="h-5 w-5 object-contain" />
                  <span>{name}</span>
                </span>
              ) : (
                <Badge key={name}>{name}</Badge>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
