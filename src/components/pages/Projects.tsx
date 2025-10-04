import Section from "../ui/Section";
import { useMemo, useState } from "react";
import { projects } from "../../data/content";
import FilterBar from "../projects/FilterBar";
import ProjectCard from "../projects/ProjectCard";
import Lightbox from "../projects/LightBox";

export default function Projects(){
  const allTechs = useMemo(()=>Array.from(new Set(projects.flatMap(p=>p.stack))).sort(),[]);
  const [active, setActive] = useState<Set<string>>(new Set());
  const toggle = (t:string)=>setActive(prev=>{const n=new Set(prev); n.has(t)?n.delete(t):n.add(t); return n;});
  const reset = ()=>setActive(new Set());
  const filtered = active.size? projects.filter(p=>p.stack.some(s=>active.has(s))) : projects;

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
          {filtered.map(p=><ProjectCard key={p.name} p={p} onOpen={open} />)}
        </div>
      </Section>
      {lb && <Lightbox images={lb.images} index={lb.index} onClose={close} onPrev={prev} onNext={next} />}
    </>
  );
}
