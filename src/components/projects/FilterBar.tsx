import React from "react";
export default function FilterBar({
  techs, active, onToggle, onReset,
}:{ techs: string[]; active: Set<string>; onToggle: (t: string)=>void; onReset: ()=>void }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filtres des technologies">
      <button
        type="button"
        onClick={onReset}
        className="btn-hover rounded-full bg-white px-3 py-1 text-sm ring-1 ring-zinc-200 dark:ring-slate-700"
        aria-pressed={active.size === 0}
      >
        Tout
      </button>
      {techs.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onToggle(t)}
          className={`btn-hover rounded-full px-3 py-1 text-sm ring-1 ${active.has(t) ? "bg-zinc-900 text-white ring-zinc-900" : "bg-white ring-zinc-200 dark:ring-slate-700"}`}
          title={`Filtrer: ${t}`}
          aria-pressed={active.has(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
