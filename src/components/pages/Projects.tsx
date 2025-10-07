import Section from "../ui/Section";
import { useMemo, useState } from "react";
import { projects } from "../../data/content";
import FilterBar from "../projects/FilterBar";
import ProjectCard from "../projects/ProjectCard";
import Lightbox from "../projects/LightBox";


export default function Projects(){
  const allTechs = useMemo(()=>Array.from(new Set(projects.flatMap(p=>p.stack))).sort(),[]);
  const [active, setActive] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const toggle = (t:string)=>
    setActive(prev=>{
      const n=new Set(prev); 
      n.has(t)?n.delete(t):n.add(t); 
      return n;
    });
  const reset = ()=>setActive(new Set());
  const filtered = useMemo(() => {
    if (active.size === 0) return projects;
    return projects.filter(p => p.stack.some(t => active.has(t)))
  }, [active]);
  // const filtered = active.size? projects.filter(p=>p.stack.some(s=>active.has(s))) : projects;
  const displayed = showAll ? filtered : filtered.slice(0, 3);
  const [lb, setLb] = useState<{images:string[]; index:number}|null>(null);
  const open = (images:string[], index=0)=> images.length && setLb({images,index});
  const close=()=>setLb(null);
  const prev =()=> lb && setLb({...lb, index:(lb.index-1+lb.images.length)%lb.images.length});
  const next =()=> lb && setLb({...lb, index:(lb.index+1)%lb.images.length});

  return (
    <>
      <Section title="Projets" subtitle="Une sélection de mes réalisations.">
        <FilterBar techs={allTechs} active={active} onToggle={toggle} onReset={reset} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayed.map(p=>(
            <ProjectCard key={p.name} p={p} onOpen={open} />
            ))}
        </div>

        {filtered.length > 3 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(s => !s)}
            className="rounded-xl bg-white/80 px-5 py-2.5 font-semibold ring-1 ring-zinc-200 dark:ring-slate-700 hover:bg-white"
          >
            {showAll ? "Voir moins de projets" : "Voir plus de projets"}
          </button>
        </div>
      )}

      {/* Message si aucun projet ne correspond aux filtres */}
      {filtered.length === 0 && (
        <div className="mt-4 rounded-2xl bg-white/80 p-6 text-sm ring-1 ring-zinc-200 dark:ring-slate-700">
          Aucun projet ne correspond aux filtres sélectionnés.
        </div>
      )}
      </Section>
      {lb && <Lightbox images={lb.images} index={lb.index} onClose={close} onPrev={prev} onNext={next} />}
    </>
  );
}
