import { FaLinkedin, FaGithub, FaMedium, FaMailchimp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { profile, colors } from "../../data/content";

type Props = { withEmail?: boolean; className?: string };

export default function SocialLinks({ withEmail = true, className = "" }: Props) {
  return (
    <div className={`mt-6 flex flex-wrap items-center gap-4 text-sm ${className}`}>
      {withEmail && profile.email && (
        <a
          href={`mailto:${profile.email}`}
          className={`rounded-full bg-white/80 px-3 py-1 ring-1 ring-zinc-200 dark:ring-slate-700 inline-flex items-center ${colors.ring}`}
        >
           <FiMail className="h-4 w-4 text-zinc-900 dark:text-white" />
        </a>
      )}

      <div className="flex items-center gap-3">
        {profile.linkedin && (
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className={`rounded-full bg-white/80 px-3 py-1 ring-1 ring-zinc-200 dark:ring-slate-700 inline-flex items-center gap-2 hover:bg-white dark:hover:bg-slate-800 transition-colors ${colors.ring}`}
          >
            <FaLinkedin className="h-4 w-4 text-[#0A66C2]" />
          </a>
        )}
        {profile.github && (
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className={`rounded-full bg-white/80 px-3 py-1 ring-1 ring-zinc-200 dark:ring-slate-700 inline-flex items-center gap-2 hover:bg-white dark:hover:bg-slate-800 transition-colors ${colors.ring}`}
          >
            <FaGithub className="h-4 w-4" />
          </a>
        )}
        {profile.medium && (
          <a
            href={profile.medium}
            target="_blank"
            rel="noreferrer"
            aria-label="Medium"
            title="Medium"
            className={`rounded-full bg-white/80 px-3 py-1 ring-1 ring-zinc-200 dark:ring-slate-700 inline-flex items-center gap-2 hover:bg-white dark:hover:bg-slate-800 transition-colors ${colors.ring}`}
          >
            <FaMedium className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
