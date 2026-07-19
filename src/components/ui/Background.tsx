/**
 * Fond global du site : une trame de points discrète (clin d'œil aux grilles de
 * données) posée sur deux halos colorés doux. Fixe, non interactif, en arrière-plan.
 * Instancié une seule fois dans App — inutile de le répéter par page.
 */
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Trame de points thématique */}
      <div className="bg-dotgrid absolute inset-0" />
      {/* Halos colorés pour la chaleur */}
      <div className="absolute -left-32 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-300/20 via-fuchsia-200/10 to-transparent blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-indigo-100/15 via-sky-50/10 to-transparent blur-3xl" />
      <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-violet-200/12 blur-3xl" />
    </div>
  );
}
