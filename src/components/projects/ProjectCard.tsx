import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import type { Project } from "../../types/types";
import type { Labels } from "../../data/content";

type Props = {
  project: Project;
  labels: Labels["projectCard"];
  onOpen: (images: string[], index?: number) => void;
};

// Organization color configurations
const orgColors: Record<string, { banner: string; badge: string; text: string }> = {
  CNAF: {
    banner: "bg-gradient-to-r from-blue-500 to-blue-600",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    text: "CNAF",
  },
  EPSI: {
    banner: "bg-gradient-to-r from-orange-400 to-orange-500",
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    text: "EPSI",
  },
};

// Alternate colors for EPSI projects
const epsiAlternateColors = [
  {
    banner: "bg-gradient-to-r from-orange-400 to-orange-500",
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  },
  {
    banner: "bg-gradient-to-r from-teal-400 to-teal-500",
    badge: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  },
];

let epsiColorIndex = 0;

export default function ProjectCard({ project, labels, onOpen }: Props) {
  // Get org colors
  const getOrgStyle = () => {
    const orgKey = Object.keys(orgColors).find((key) => project.org.includes(key));
    if (orgKey === "EPSI") {
      const style = epsiAlternateColors[epsiColorIndex % epsiAlternateColors.length];
      epsiColorIndex++;
      return { ...style, text: "EPSI" };
    }
    if (orgKey) {
      return orgColors[orgKey];
    }
    return {
      banner: "bg-gradient-to-r from-violet-500 to-violet-600",
      badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
      text: project.org,
    };
  };

  const orgStyle = getOrgStyle();

  return (
    <motion.article
      className="overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200 dark:bg-slate-800 dark:ring-slate-700"
      initial={{ y: 16, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
    >
      {/* Project image or colored banner */}
      <button
        type="button"
        onClick={() =>
          onOpen(
            project.gallery?.length ? project.gallery : project.cover ? [project.cover] : [],
            0,
          )
        }
        className="block w-full cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-500 overflow-hidden"
        aria-label={`${labels.openGallery} ${project.name}`}
      >
        {project.cover ? (
          <div className="aspect-video w-full">
            <img
              src={project.cover}
              alt={project.name}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
              decoding="async"
              width={640}
              height={360}
            />
          </div>
        ) : (
          <div className={`h-24 w-full ${orgStyle.banner}`} />
        )}
      </button>

      {/* Card content */}
      <div className="p-5">
        {/* Org badge + period */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${orgStyle.badge}`}>
            {orgStyle.text}
          </span>
          <span className="text-sm text-zinc-500 dark:text-slate-400">{project.period}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-zinc-900 dark:text-slate-100 mb-2">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-zinc-600 dark:text-slate-400 mb-4">{project.summary}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-slate-700 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project link */}
        {project.link && (
          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-slate-700">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 transition-colors"
            >
              {labels.viewProject}
              <FiExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
}
