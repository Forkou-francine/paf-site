import Section from "../ui/Section";
import { useMemo, useState } from "react";
import FilterBar from "../projects/FilterBar";
import ProjectCard from "../projects/ProjectCard";
import Lightbox from "../projects/LightBox";
import { usePortfolioContent } from "../../hooks/usePortfolioContent";

export default function Projects() {
  const { projects, labels } = usePortfolioContent();

  const allTechs = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.stack))).sort(),
    [projects],
  );

  const [active, setActive] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const toggle = (tech: string) =>
    setActive((prev) => {
      const next = new Set(prev);
      next.has(tech) ? next.delete(tech) : next.add(tech);
      return next;
    });

  const reset = () => setActive(new Set());

  const filtered = useMemo(() => {
    if (active.size === 0) return projects;
    return projects.filter((project) => project.stack.some((tech) => active.has(tech)));
  }, [active, projects]);

  const displayed = showAll ? filtered : filtered.slice(0, 3);

  const open = (images: string[], index = 0) => {
    if (!images.length) return;
    setLightbox({ images, index });
  };
  const close = () => setLightbox(null);
  const handlePrev = () =>
    setLightbox((current) => {
      if (!current) return current;
      const { images, index } = current;
      return {
        images,
        index: (index - 1 + images.length) % images.length,
      };
    });
  const handleNext = () =>
    setLightbox((current) => {
      if (!current) return current;
      const { images, index } = current;
      return {
        images,
        index: (index + 1) % images.length,
      };
    });

  return (
    <>
      <Section title={labels.projects.title} subtitle={labels.projects.subtitle}>
        <FilterBar
          techs={allTechs}
          active={active}
          onToggle={toggle}
          onReset={reset}
          allLabel={labels.filterBar.all}
          getTooltip={(tech) => labels.filterBar.tooltip.replace("{{tech}}", tech)}
          ariaLabel={labels.projects.title}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayed.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              labels={labels.projectCard}
              onOpen={open}
            />
          ))}
        </div>

        {filtered.length > 3 && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              className="rounded-xl bg-white/80 px-5 py-2.5 font-semibold ring-1 ring-zinc-200 hover:bg-white dark:ring-slate-700"
            >
              {showAll ? labels.projects.showLess : labels.projects.showMore}
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="mt-4 rounded-2xl bg-white/80 p-6 text-sm ring-1 ring-zinc-200 dark:ring-slate-700">
            {labels.projects.empty}
          </div>
        )}
      </Section>
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={close}
          onPrev={handlePrev}
          onNext={handleNext}
          labels={labels.projects.lightbox}
        />
      )}
    </>
  );
}
