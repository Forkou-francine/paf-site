import React from "react";
export default function RoadmapItem({ title, detail, tag }:{
  title: string; detail?: string; tag?: string;
}) {
  return (
    <li className="rounded-xl bg-white/70 p-3 ring-1 ring-zinc-200 dark:ring-slate-700">
      <div className="flex items-center justify-between gap-3">
        <span className="font-medium">{title}</span>
        {tag && <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-xs font-semibold text-white">{tag}</span>}
      </div>
      {detail && <p className="mt-1 text-xs text-zinc-600 dark:text-slate-400">{detail}</p>}
    </li>
  );
}
