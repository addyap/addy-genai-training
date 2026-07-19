import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://ia.antonyaddy.com';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  jsonLd?: object;
  robots?: string;
}

const SEOHead = ({
  title = "Antony Addy — Formateur en IA Générative",
  description = "Formations en intelligence artificielle générative pour entreprises et indépendants, par un formateur professionnel d'adultes certifié d'État.",
  keywords = ["formation IA générative", "formateur intelligence artificielle", "ChatGPT entreprise", "formation ChatGPT", "prompt engineering", "IA France"],
  canonicalUrl,
  ogImage = "/social-preview.png",
  jsonLd,
  robots = "index, follow"
}: SEOHeadProps) => {
  const location = useLocation();
  const currentUrl = canonicalUrl || `${BASE_URL}${location.pathname}`;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;

  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Antony Addy — Formation IA Générative",
    "url": BASE_URL,
    "author": {
      "@type": "Person",
      "name": "Antony Addy",
      "jobTitle": "Formateur en IA Générative",
      "worksFor": {
        "@type": "Organization",
        "name": "Antony Addy Formation"
      }
    }
  };

  const structuredData = jsonLd || defaultJsonLd;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="robots" content={robots} />
      <meta name="author" content="Antony Addy" />
      <meta name="language" content="French" />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Antony Addy — Formateur en IA Générative" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Antony Addy — Formation IA Générative" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:image:alt" content="Antony Addy — Formateur en IA Générative" />

      {/* Additional SEO */}
      <meta name="geo.region" content="FR-83" />
      <meta name="geo.placename" content="Fréjus" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
