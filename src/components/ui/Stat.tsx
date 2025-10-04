import React, { useEffect, useState } from "react";

function useCounter(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setValue(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);
  return value;
}

export default function Stat({ label, value, suffix = "+" }:{
  label: string; value: number; suffix?: string;
}) {
  const n = useCounter(value);
  return (
    <div className="rounded-2xl bg-white/80 p-5 text-center ring-1 ring-zinc-200 dark:ring-slate-700">
      <div className="text-3xl font-extrabold">{n}{suffix}</div>
      <div className="mt-1 text-sm text-zinc-600 dark:text-slate-400">{label}</div>
    </div>
  );
}
