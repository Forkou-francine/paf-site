import { Fragment } from "react";
import { m } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import type { JourneyStage } from "../../data/content";

type Props = {
  title: string;
  subtitle: string;
  stages: JourneyStage[];
};

// Couleurs propres aux paliers Medallion (Bronze / Silver / Gold).
const tierStyles = [
  {
    chip: "bg-gradient-to-br from-amber-600 to-amber-800",
    label: "text-amber-700 dark:text-amber-500",
    ring: "ring-amber-600/25 dark:ring-amber-500/25",
    glow: "from-amber-500/15",
  },
  {
    chip: "bg-gradient-to-br from-slate-300 to-slate-500",
    label: "text-slate-500 dark:text-slate-300",
    ring: "ring-slate-400/30 dark:ring-slate-400/20",
    glow: "from-slate-400/15",
  },
  {
    chip: "bg-gradient-to-br from-yellow-400 to-amber-500",
    label: "text-yellow-600 dark:text-yellow-400",
    ring: "ring-yellow-500/30 dark:ring-yellow-500/25",
    glow: "from-yellow-400/20",
  },
];

export default function MedallionJourney({ title, subtitle, stages }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-slate-100">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-zinc-600 dark:text-slate-400">{subtitle}</p>
      </div>

      <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-stretch md:gap-2">
        {stages.map((stage, index) => {
          const style = tierStyles[index % tierStyles.length];
          const isLast = index === stages.length - 1;

          return (
            <Fragment key={stage.tier}>
              <m.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.18 }}
                className={`relative flex-1 overflow-hidden rounded-2xl bg-white/80 p-6 ring-1 ${style.ring} dark:bg-slate-900/70`}
              >
                {/* Halo coloré du palier */}
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${style.glow} to-transparent blur-2xl`}
                />
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-base font-bold text-white shadow-sm ${style.chip}`}
                  >
                    {index + 1}
                  </span>
                  <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${style.label}`}>
                    {stage.tier}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-slate-100">
                  {stage.heading}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-slate-400">
                  {stage.body}
                </p>
              </m.div>

              {/* Flèche de flux entre les paliers (bas sur mobile, droite sur desktop) */}
              {!isLast && (
                <m.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.35, delay: index * 0.18 + 0.25 }}
                  className="flex shrink-0 items-center justify-center text-zinc-300 dark:text-slate-600"
                  aria-hidden="true"
                >
                  <FiArrowRight className="h-6 w-6 rotate-90 md:rotate-0" />
                </m.div>
              )}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
