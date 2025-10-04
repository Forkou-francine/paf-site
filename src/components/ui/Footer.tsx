import { profile } from "../../data/content";
export default function Footer(){
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-white/60 dark:bg-slate-900/60 py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-zinc-700 dark:text-slate-300">
        <div>Fait avec du café, React et Tailwind CSS.</div>
        <div className="mt-1">© {year} {profile.name}. Tous droits réservés.</div>
      </div>
    </footer>
  );
}
