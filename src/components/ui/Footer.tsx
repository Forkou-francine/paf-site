import { usePortfolioContent } from "../../hooks/usePortfolioContent";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiMedium } from "react-icons/si";

export default function Footer() {
  const { profile, labels } = usePortfolioContent();
  const year = new Date().getFullYear().toString();
  const rights = labels.footer.rights
    .replace("{{year}}", year)
    .replace("{{name}}", profile.name);

  return (
    <footer className="bg-slate-900 py-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 text-sm text-slate-400">
        <span className="text-xl font-bold text-violet-400">AF.</span>
        <div className="flex items-center gap-3">
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
              aria-label="GitHub"
            >
              <FiGithub className="h-5 w-5" />
            </a>
          )}
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="h-5 w-5" />
            </a>
          )}
          {profile.medium && (
            <a
              href={profile.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
              aria-label="Medium"
            >
              <SiMedium className="h-5 w-5" />
            </a>
          )}
        </div>
        <span>·</span>
        <span>{labels.footer.madeWith}</span>
        <span>·</span>
        <span>{rights}</span>
      </div>
    </footer>
  );
}
