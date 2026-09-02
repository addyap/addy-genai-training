import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { Button } from "../components/ui/button";
import { useLocale, localizePath } from "@/i18n";

const STR = {
  fr: {
    title: 'Page non trouvée - Erreur 404',
    desc: "La page que vous recherchez est introuvable. Retournez à l'accueil pour découvrir les formations en IA générative.",
    h2: 'Page non trouvée',
    body: "La page que vous recherchez n'existe pas ou a été déplacée.",
    back: "Retour à l'accueil",
  },
  en: {
    title: 'Page not found - Error 404',
    desc: "The page you're looking for could not be found. Head back home to explore the generative-AI training.",
    h2: 'Page not found',
    body: "The page you're looking for doesn't exist or has been moved.",
    back: 'Back to home',
  },
};

const NotFound = () => {
  const location = useLocation();
  const locale = useLocale();
  const t = STR[locale];

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const notFoundJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t.h2,
    "description": t.desc,
    "inLanguage": locale,
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={t.title}
        description={t.desc}
        robots="noindex, nofollow"
        jsonLd={notFoundJsonLd}
      />

      <section className="relative min-h-screen flex items-center justify-center bg-ia-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid-dark" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="relative max-w-md mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h1 className="text-gradient-light text-8xl font-bold mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-white mb-4">{t.h2}</h2>
            <p className="text-lg text-white/70 mb-8">
              {t.body}
            </p>
            <Link to={localizePath('/', locale)}>
              <Button size="lg">
                {t.back}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
