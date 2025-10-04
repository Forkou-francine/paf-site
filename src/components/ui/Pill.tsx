import React from "react";
export default function Pill({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-gradient-to-r from-fuchsia-200 to-indigo-200 px-2.5 py-1 text-xs font-semibold text-zinc-900">{children}</span>;
}
