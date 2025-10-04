import { motion } from "framer-motion";
export default function Section({title, subtitle, children}:{title:string; subtitle?:string; children:React.ReactNode;}){
  return (
    <motion.section initial={{y:24,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{once:true, amount:0.2}} transition={{duration:0.6, ease:"easeOut"}} className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="mt-2 max-w-2xl mx-auto text-md text-zinc-600 dark:text-slate-400">{subtitle}</p>}
          <div className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full" />
        </div>
        {children}
      </div>
    </motion.section>
  );
}
