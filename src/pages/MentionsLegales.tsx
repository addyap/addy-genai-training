import SEOHead from '../components/SEOHead';

const legalJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Mentions Légales - Formation IA Générative",
  "description": "Informations légales et politique RGPD pour les services de formation en IA générative par Antony Addy",
  "inLanguage": "fr"
};

const MentionsLegales = () => {
  return (
    <div className="min-h-screen pt-20">
      <SEOHead
        title="Mentions Légales & RGPD - Formation IA Générative"
        description="Informations légales et politique RGPD pour les services de formation en IA générative par Antony Addy."
        keywords={["mentions légales", "RGPD", "données personnelles", "formation IA"]}
        jsonLd={legalJsonLd}
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Mentions Légales</h1>

          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Éditeur du Site</h2>
              <p className="mb-2"><strong>Antony Addy</strong></p>
              <p className="mb-2">Statut : Entrepreneur Individuel</p>
              <p className="mb-2">SIRET : 483 178 893 00028</p>
              <p className="mb-2">Adresse e-mail : ia@antonyaddy.com</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Hébergement</h2>
              <p>Ce site web est hébergé par Vercel Inc.</p>
              <p>Site web : vercel.com</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Protection des Données Personnelles (RGPD)</h2>
              <p className="mb-4">
                Les données collectées via les formulaires de ce site web sont utilisées uniquement pour répondre à vos demandes de formation et ne sont jamais partagées avec des tiers.
              </p>
              <p className="mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles.
              </p>
              <p>
                Pour exercer ces droits ou pour toute question concernant le traitement de vos données, veuillez nous contacter à : ia@antonyaddy.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies</h2>
              <p>
                Ce site web utilise uniquement des cookies essentiels au bon fonctionnement du site. Aucun cookie de suivi ou publicitaire n'est utilisé.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Propriété Intellectuelle</h2>
              <p>
                L'ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive d'Antony Addy et est protégé par les lois sur la propriété intellectuelle.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentionsLegales;
