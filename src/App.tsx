import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "./hooks/ThemeProvider";
import ScrollToTop from "././router/ScrollToTop";

import Navbar from "./components/navigation/Navbar";
import Footer from "./components/ui/Footer";
import Home from "./components/pages/Home";
import Experience from "./components/pages/Experience";
import Projects from "./components/pages/Projects";
import Skills from "./components/pages/Skills";
import Certifications from "./components/pages/Certifications";
import Education from "./components/pages/Education";
import Contact from "./components/pages/Contact";
import NotFound from "./components/pages/NotFound";

const pageFade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.18, ease: "easeOut" }
};

export default function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
        <div className="min-h-screen text-zinc-900 dark:text-slate-100">
          {/* fond */}
          <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-white to-zinc-50 dark:from-slate-950 dark:to-slate-900" />

          <Navbar />
          <ScrollToTop />

          {/* IMPORTANT: AnimatePresence avec location + key */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.main
              key={location.pathname}
              {...pageFade}
              className="min-h-[70vh]"
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/certifications" element={<Certifications />} />
                <Route path="/education" element={<Education />} />
                <Route path="/contact" element={<Contact />} />
                {/* fallback */}
                <Route path="*" element={<Home />} />
              </Routes>
            </motion.main>
          </AnimatePresence>

          <Footer />
        </div>
    </ThemeProvider>
  );
}