import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef, type ReactNode } from "react";
import { useReveal } from "./hooks/use-reveal";
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
    // Jump, don't glide: a long smooth scroll while the next page renders disorients.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
};

// The new route settles in on navigation; the first, prerendered load plays its own intro instead.
const PageTransition = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const lastPath = useRef(pathname);
  const navigated = useRef(false);
  if (lastPath.current !== pathname) {
    lastPath.current = pathname;
    navigated.current = true;
  }

  return (
    <div key={pathname} className={navigated.current ? 'page-enter' : undefined}>
      {children}
    </div>
  );
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

const App = () => {
  useReveal();

  return (
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
            <PageTransition>
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
            </PageTransition>
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
