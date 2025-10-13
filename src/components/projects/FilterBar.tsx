import React from "react";

type Props = {
  techs: string[];
  active: Set<string>;
  onToggle: (tech: string) => void;
  onReset: () => void;
  allLabel: string;
  getTooltip: (tech: string) => string;
  ariaLabel?: string;
};

export default function FilterBar({
  techs,
  active,
  onToggle,
  onReset,
  allLabel,
  getTooltip,
  ariaLabel = "Technology filters",
}: Props) {
  return (
    <div
      className="mb-6 flex flex-wrap items-center justify-center gap-2"
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={onReset}
        className="btn-hover rounded-full bg-white px-3 py-1 text-sm ring-1 ring-zinc-200 dark:ring-slate-700"
        aria-pressed={active.size === 0}
      >
        {allLabel}
      </button>
      {techs.map((tech) => (
        <button
          key={tech}
          type="button"
          onClick={() => onToggle(tech)}
          className={`btn-hover rounded-full px-3 py-1 text-sm ring-1 ${
            active.has(tech)
              ? "bg-zinc-900 text-white ring-zinc-900"
              : "bg-white ring-zinc-200 dark:ring-slate-700"
          }`}
          title={getTooltip(tech)}
          aria-pressed={active.has(tech)}
        >
          {tech}
        </button>
      ))}
    </div>
  );
}
