import React from "react";
export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/70 px-2.5 py-1 text-xs font-medium tracking-wide text-zinc-900 ring-1 ring-inset ring-zinc-200 dark:bg-slate-800/70 dark:text-slate-100 dark:ring-slate-700">
      {children}
    </span>
  );
}
