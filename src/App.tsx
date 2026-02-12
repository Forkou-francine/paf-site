import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { ThemeProvider } from "./hooks/ThemeProvider";
import { LanguageProvider, useLanguage } from "./hooks/LanguageProvider";
import ScrollToTop from "./router/ScrollToTop";

import Navbar from "./components/navigation/Navbar";
import Footer from "./components/ui/Footer";

const Home = lazy(() => import("./components/pages/Home"));
const Experience = lazy(() => import("./components/pages/Experience"));
const Projects = lazy(() => import("./components/pages/Projects"));
const Skills = lazy(() => import("./components/pages/Skills"));
const Education = lazy(() => import("./components/pages/Education"));
const Contact = lazy(() => import("./components/pages/Contact"));

const pageFade: Transition = {
  duration: 0.18,
  ease: [0.16, 1, 0.3, 1],
};

function SkipLink() {
  const { language } = useLanguage();
  const label = language === "fr" ? "Aller au contenu principal" : "Skip to main content";

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
    >
      {label}
    </a>
  );
}

function RouteFallback() {
  const { language } = useLanguage();
  const message = language === "fr" ? "Chargement..." : "Loading...";

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[40vh] items-center justify-center text-sm text-zinc-500 dark:text-slate-400"
    >
      {message}
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen text-zinc-900 dark:text-slate-100">
          <SkipLink />
          <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-white to-zinc-50 dark:from-slate-950 dark:to-slate-900" />

          <Navbar />
          <ScrollToTop />

          <AnimatePresence mode="wait" initial={false}>
            <motion.main
              id="main-content"
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
    </LanguageProvider>
  );
}
