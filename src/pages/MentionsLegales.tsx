import SEOHead from '../components/SEOHead';
import { useLocale, useT, type Locale } from '@/i18n';

const CONTENT = {
  fr: {
    seoTitle: 'Mentions Légales & RGPD - Formation IA Générative',
    seoDesc: "Informations légales et politique RGPD pour les services de formation en IA générative par Antony Addy.",
    keywords: ["mentions légales", "RGPD", "données personnelles", "formation IA"],
    h1: 'Mentions Légales',
    editorTitle: 'Éditeur du Site',
    status: 'Statut : Entrepreneur Individuel',
    emailLabel: 'Adresse e-mail : formations@antonyaddy.com',
    trainingTitle: 'Organisme de Formation',
    nda: "Numéro de Déclaration d'Activité (NDA) : 93830738883",
    authority: "Autorité d'enregistrement : DREETS Provence-Alpes-Côte d'Azur",
    naf: 'Code NAF/APE : 8559B — Autres enseignements',
    ndaNote: "Cet enregistrement ne vaut pas agrément de l'État (article L.6352-12 du Code du travail).",
    hostingTitle: 'Hébergement',
    hosting1: 'Ce site web est hébergé par Vercel Inc.',
    hosting2: 'Site web : vercel.com',
    gdprTitle: 'Protection des Données Personnelles (RGPD)',
    gdpr1: "Les données collectées via les formulaires de ce site web sont utilisées uniquement pour répondre à vos demandes de formation et ne sont jamais partagées avec des tiers.",
    gdpr2: "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles.",
    gdpr3: "Pour exercer ces droits ou pour toute question concernant le traitement de vos données, veuillez nous contacter à : formations@antonyaddy.com",
    gdpr4: "Les outils interactifs de ce site (générateur de programme, correcteur d'email, diagnostic IA responsable) fonctionnent différemment : le diagnostic s'exécute entièrement dans votre navigateur, sans aucune transmission. Le générateur de programme et le correcteur d'email envoient le texte que vous saisissez à l'API d'Anthropic (fournisseur du modèle Claude) pour générer une réponse ; ce texte n'est pas conservé par nos soins après l'affichage du résultat.",
    cookiesTitle: 'Cookies',
    cookies: "Ce site web utilise uniquement des cookies essentiels au bon fonctionnement du site. Aucun cookie de suivi ou publicitaire n'est utilisé. Les statistiques de fréquentation, lorsqu'elles sont activées, sont mesurées via Umami, une solution sans cookie qui ne collecte aucune donnée personnelle identifiable.",
    ipTitle: 'Propriété Intellectuelle',
    ip: "L'ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive d'Antony Addy et est protégé par les lois sur la propriété intellectuelle.",
  },
  en: {
    seoTitle: 'Legal Notice & GDPR - Generative AI Training',
    seoDesc: "Legal information and GDPR policy for Antony Addy's generative-AI training services.",
    keywords: ["legal notice", "GDPR", "personal data", "AI training"],
    h1: 'Legal Notice',
    editorTitle: 'Site Publisher',
    status: 'Status: Sole trader (Entrepreneur Individuel)',
    emailLabel: 'Email address: formations@antonyaddy.com',
    trainingTitle: 'Training Provider',
    nda: 'Activity Declaration Number (NDA): 93830738883',
    authority: "Registration authority: DREETS Provence-Alpes-Côte d'Azur",
    naf: 'NAF/APE code: 8559B — Other education',
    ndaNote: "This registration does not constitute State accreditation (article L.6352-12 of the French Labour Code).",
    hostingTitle: 'Hosting',
    hosting1: 'This website is hosted by Vercel Inc.',
    hosting2: 'Website: vercel.com',
    gdprTitle: 'Personal Data Protection (GDPR)',
    gdpr1: "The data collected via this site's forms is used solely to respond to your training enquiries and is never shared with third parties.",
    gdpr2: "In accordance with the General Data Protection Regulation (GDPR), you have the right to access, rectify, erase and port your personal data.",
    gdpr3: "To exercise these rights or for any question about the processing of your data, please contact us at: formations@antonyaddy.com",
    gdpr4: "The interactive tools on this site (programme generator, email corrector, responsible-AI check) work differently: the check runs entirely in your browser, with no transmission. The programme generator and email corrector send the text you enter to Anthropic's API (provider of the Claude model) to generate a response; that text is not retained by us after the result is displayed.",
    cookiesTitle: 'Cookies',
    cookies: "This website uses only cookies essential to its proper operation. No tracking or advertising cookies are used. Visit statistics, when enabled, are measured via Umami, a cookieless solution that collects no identifiable personal data.",
    ipTitle: 'Intellectual Property',
    ip: "All content on this site (text, images, logos) is the exclusive property of Antony Addy and is protected by intellectual-property law.",
  },
} satisfies Record<Locale, unknown>;

const MentionsLegales = () => {
  const locale = useLocale();
  const t = useT(CONTENT) as typeof CONTENT['fr'];

  const legalJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t.h1,
    "description": t.seoDesc,
    "inLanguage": locale,
  };

  return (
    <div className="min-h-screen pt-20">
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        keywords={t.keywords}
        jsonLd={legalJsonLd}
      />

      <section className="py-14 sm:py-24 bg-secondary/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">{t.h1}</h1>

          <div className="card-surface p-6 sm:p-10 space-y-8 text-muted-foreground">
            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">{t.editorTitle}</h2>
              <p className="mb-2"><strong className="text-foreground">Antony Addy</strong></p>
              <p className="mb-2">{t.status}</p>
              <p className="mb-2">SIRET : 483 178 893 00028</p>
              <p className="mb-2">{t.emailLabel}</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">{t.trainingTitle}</h2>
              <p className="mb-2">{t.nda}</p>
              <p className="mb-2">{t.authority}</p>
              <p className="mb-2">{t.naf}</p>
              <p className="text-sm">
                {t.ndaNote}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">{t.hostingTitle}</h2>
              <p>{t.hosting1}</p>
              <p>{t.hosting2}</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">{t.gdprTitle}</h2>
              <p className="mb-4">{t.gdpr1}</p>
              <p className="mb-4">{t.gdpr2}</p>
              <p className="mb-4">{t.gdpr3}</p>
              <p>{t.gdpr4}</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">{t.cookiesTitle}</h2>
              <p>{t.cookies}</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">{t.ipTitle}</h2>
              <p>{t.ip}</p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentionsLegales;
