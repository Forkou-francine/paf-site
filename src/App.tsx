import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { ThemeProvider } from "./hooks/ThemeProvider";
import ScrollToTop from "./router/ScrollToTop";

import Navbar from "./components/navigation/Navbar";
import Footer from "./components/ui/Footer";

const Home = lazy(() => import("./components/pages/Home"));
const Experience = lazy(() => import("./components/pages/Experience"));
const Projects = lazy(() => import("./components/pages/Projects"));
const Skills = lazy(() => import("./components/pages/Skills"));
const Certifications = lazy(() => import("./components/pages/Certifications"));
const Education = lazy(() => import("./components/pages/Education"));
const Contact = lazy(() => import("./components/pages/Contact"));

const pageFade: Transition = {
  duration: 0.18,
  ease: [0.16, 1, 0.3, 1],
};

function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[40vh] items-center justify-center text-sm text-zinc-500 dark:text-slate-400"
    >
      Chargement...
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <div className="min-h-screen text-zinc-900 dark:text-slate-100">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-white to-zinc-50 dark:from-slate-950 dark:to-slate-900" />

        <Navbar />
        <ScrollToTop />

        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={pageFade}
            className="min-h-[70vh]"
          >
            <Suspense fallback={<RouteFallback />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/certifications" element={<Certifications />} />
                <Route path="/education" element={<Education />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </motion.main>
        </AnimatePresence>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
