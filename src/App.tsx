import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, useEffect, useRef, type ReactNode } from "react";
import { useReveal } from "./hooks/use-reveal";
import AntonyAddyBar from "./components/AntonyAddyBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Analytics from "./components/Analytics";
import NotFound from "./pages/NotFound";
import { routeList } from "./routes";
import { getLocaleFromPath } from "./i18n";

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

const SkipToContent = () => {
  const en = getLocaleFromPath(useLocation().pathname) === "en";
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-primary px-4 py-2 rounded-md z-50 font-medium"
    >
      {en ? "Skip to main content" : "Aller au contenu principal"}
    </a>
  );
};

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
          <AntonyAddyBar />
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            <PageTransition>
              <Suspense fallback={null}>
                <Routes>
                  {routeList.map(({ path, Page }) => (
                    <Route key={path} path={path} element={<Page />} />
                  ))}
                  {/* English mirror — same components, locale derived from the /en prefix */}
                  {routeList
                    .filter((r) => r.path !== '*')
                    .map(({ path, Page }) => (
                      <Route
                        key={`en${path}`}
                        path={path === '/' ? '/en' : `/en${path}`}
                        element={<Page />}
                      />
                    ))}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </PageTransition>
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
