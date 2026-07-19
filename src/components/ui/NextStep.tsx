import { Link, useLocation } from "react-router-dom";
import { m } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { usePortfolioContent } from "../../hooks/usePortfolioContent";

// Parcours guidé : chaque page pointe vers la suivante, tout converge vers Contact.
const ORDER = ["/", "/projects", "/experience", "/skills", "/education", "/contact"];

export default function NextStep() {
  const { pathname } = useLocation();
  const { labels } = usePortfolioContent();

  const index = ORDER.indexOf(pathname);
  // Rien à afficher sur Contact (destination finale) ni sur une route inconnue.
  if (index === -1 || pathname === "/contact") return null;

  const nextPath = ORDER[index + 1];
  const nextLabel = labels.nav.items.find((item) => item.to === nextPath)?.label ?? "";
  const nextIsContact = nextPath === "/contact";

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-6">
      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-end gap-2"
      >
        <Link
          to={nextPath}
          className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 pl-5 pr-2.5 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-600/25"
        >
          <span className="flex flex-col text-right leading-tight">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70">
              {labels.nextStep.kicker}
            </span>
            <span className="text-sm font-bold">{nextLabel}</span>
          </span>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
            <FiArrowRight className="h-4 w-4" />
          </span>
        </Link>

        {/* Contact toujours accessible en un clic, sauf si l'étape suivante est déjà Contact */}
        {!nextIsContact && (
          <Link
            to="/contact"
            className="text-xs font-medium text-violet-600 underline-offset-4 hover:underline dark:text-violet-400"
          >
            {labels.nextStep.ctaContact}
          </Link>
        )}
      </m.div>
    </section>
  );
}
