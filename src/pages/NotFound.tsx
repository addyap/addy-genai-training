import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { Button } from "../components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const notFoundJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Page non trouvée",
    "description": "La page demandée est introuvable"
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Page non trouvée - Erreur 404"
        description="La page que vous recherchez est introuvable. Retournez à l'accueil pour découvrir les formations en IA générative."
        robots="noindex, nofollow"
        jsonLd={notFoundJsonLd}
      />

      <section className="py-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page non trouvée</h2>
            <p className="text-lg text-gray-600 mb-8">
              La page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <Link to="/">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
