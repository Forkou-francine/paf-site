import { Link } from "react-router-dom";
import { FiLinkedin, FiMail } from "react-icons/fi";
import { usePortfolioContent } from "../../hooks/usePortfolioContent";

// Pour utiliser ton illustration 3D à la place des initiales :
// 1. Dépose l'image dans src/assets/ (ex. avatar-3d.png)
// 2. Décommente l'import ci-dessous et la balise <img> plus bas.
import avatar from "../../assets/avatar-3d.png";

export default function AuthorCard() {
  const { profile, labels } = usePortfolioContent();

  // const initials = profile.name
  //   .split(" ")
  //   .map((word) => word[0])
  //   .join("")
  //   .slice(0, 2)
  //   .toUpperCase();

  return (
    <aside className="mt-12 flex flex-col gap-4 rounded-2xl bg-white/80 p-6 ring-1 ring-zinc-200 dark:bg-slate-900/70 dark:ring-slate-700 sm:flex-row sm:items-center">
      {/* Avatar : initiales pour l'instant, remplaçables par l'illustration 3D */}
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-lg font-bold text-white shadow-sm">
        <img src={avatar} alt={profile.name} className="h-full w-full object-cover" />
        {/* {initials} */}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
          {labels.blog.writtenBy}
        </p>
        <p className="mt-0.5 font-display text-lg font-bold text-zinc-900 dark:text-slate-100">
          {profile.name}
        </p>
        <p className="text-sm text-zinc-600 dark:text-slate-400">{profile.title}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <FiLinkedin className="h-3.5 w-3.5 text-[#0A66C2]" />
              LinkedIn
            </a>
          )}
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <FiMail className="h-3.5 w-3.5" />
            {labels.home.secondaryCta}
          </Link>
        </div>
      </div>
    </aside>
  );
}
