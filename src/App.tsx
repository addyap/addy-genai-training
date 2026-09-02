import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Analytics from "./components/Analytics";
import Home from "./pages/Home";
import Formations from "./pages/Formations";
import FAQ from "./pages/FAQ";
import Resources from "./pages/Resources";
import Diagnostic from "./pages/Diagnostic";
import GenerateurProgramme from "./pages/GenerateurProgramme";
import CorrectionEmail from "./pages/CorrectionEmail";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/MentionsLegales";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
};

const SkipToContent = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-primary px-4 py-2 rounded-md z-50 font-medium"
  >
    Aller au contenu principal
  </a>
);

const routeList = [
  { path: '/', element: <Home /> },
  { path: '/formations', element: <Formations /> },
  { path: '/faq', element: <FAQ /> },
  { path: '/ressources', element: <Resources /> },
  { path: '/diagnostic', element: <Diagnostic /> },
  { path: '/generateur-programme', element: <GenerateurProgramme /> },
  { path: '/correction-email', element: <CorrectionEmail /> },
  { path: '/a-propos', element: <APropos /> },
  { path: '/contact', element: <Contact /> },
  { path: '/mentions-legales', element: <MentionsLegales /> },
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Analytics />
      <SkipToContent />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          <Routes>
            {routeList.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
            {/* English mirror — same components, locale derived from the /en prefix */}
            {routeList
              .filter((r) => r.path !== '*')
              .map(({ path, element }) => (
                <Route
                  key={`en${path}`}
                  path={path === '/' ? '/en' : `/en${path}`}
                  element={element}
                />
              ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
