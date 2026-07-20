import Section from "../ui/Section";
import EducationTimeline from "../ui/EducationTimeline";
import TechStack from "../ui/TechStack";
import { usePortfolioContent } from "../../hooks/usePortfolioContent";

export default function Education() {
  const { labels } = usePortfolioContent();

  return (
    <div className="relative">
      <Section title={labels.education.title} subtitle={labels.education.subtitle}>
        <div className="grid items-start gap-8 lg:grid-cols-2">
          {/* Colonne gauche : parcours de formation */}
          <EducationTimeline />

          {/* Colonne droite : technologies, outils et certifications */}
          <TechStack />
        </div>
      </Section>
    </div>
  );
}
