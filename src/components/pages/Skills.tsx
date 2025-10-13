import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../ui/Section";
import { techLogos } from "../../data/content";
import { usePortfolioContent } from "../../hooks/usePortfolioContent";

export default function Skills() {
  const { skills, labels } = usePortfolioContent();
  const [active, setActive] = useState(skills?.[0]?.category ?? "");
  const group = skills.find((s) => s.category === active) ?? skills[0];

  return (
    <Section title={labels.skills.title} subtitle={labels.skills.subtitle}>
      <div className="rounded-2xl bg-white/80 p-5 ring-1 ring-zinc-200 dark:bg-slate-900/70 dark:ring-slate-700">
        <div className="flex flex-wrap border-b border-zinc-200 dark:border-slate-800">
          {skills.map((g) => (
            <button
              key={g.category}
              type="button"
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
            key={group?.category}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4 space-y-4 text-sm"
          >
            {group?.intro && (
              <p className="text-zinc-600 dark:text-slate-400">{group.intro}</p>
            )}
            <ul className="grid gap-3 md:grid-cols-2">
              {group?.items.map((item) => (
                <li
                  key={item.name}
                  className="flex gap-3 rounded-xl bg-white px-3 py-3 ring-1 ring-zinc-200 dark:bg-slate-900/70 dark:ring-slate-700"
                >
                  {techLogos[item.name] ? (
                    <img
                      src={techLogos[item.name]}
                      alt={item.name}
                      className="h-8 w-8 flex-none object-contain"
                    />
                  ) : (
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold uppercase text-white">
                      {item.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  <div className="space-y-1">
                    <p className="font-semibold text-zinc-900 dark:text-slate-100">
                      {item.name}
                    </p>
                    {item.detail && (
                      <p className="text-xs text-zinc-600 dark:text-slate-400">
                        {item.detail}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
