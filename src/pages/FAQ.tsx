import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { Button } from '../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const categories = [
  {
    title: "Financement",
    items: [
      {
        q: "Comment financer une formation avec vous ?",
        a: "Aujourd'hui, le financement se fait par devis direct : réglé par l'entreprise sur ses fonds propres, ou par vous-même si vous êtes indépendant. C'est le mode de financement disponible dès maintenant.",
      },
      {
        q: "Le programme est-il finançable par un OPCO ou via le CPF ?",
        a: "Non. Depuis 2022, le financement mutualisé (OPCO, CPF, Pôle emploi, Régions) est conditionné à la certification Qualiopi, que cette activité ne possède pas. Je reste déclaré comme organisme de formation (NDA 93830738883, DREETS PACA) et je structure mes programmes selon les formats attendus par les financeurs, mais le financement direct (devis réglé par l'entreprise ou l'indépendant) est aujourd'hui la seule solution disponible.",
      },
      {
        q: "Une facture ou une attestation de formation est-elle fournie ?",
        a: "Oui : facture, convention de formation et attestation de présence sont fournies systématiquement, quel que soit le mode de financement.",
      },
    ],
  },
  {
    title: "Organisation & format",
    items: [
      {
        q: "Combien de temps dure une formation ?",
        a: "Cela dépend du besoin : d'une session courte de sensibilisation à un programme sur plusieurs jours avec une intersession pour mettre en pratique entre les sessions. Chaque devis précise la durée proposée.",
      },
      {
        q: "Combien de participants par session ?",
        a: "Les groupes en entreprise restent volontairement resserrés pour être interactifs. L'accompagnement pour indépendants se fait en solo ou en très petit groupe.",
      },
      {
        q: "Présentiel ou distanciel ?",
        a: "Les deux sont possibles : présentiel dans vos locaux en France, ou sessions à distance en visioconférence.",
      },
      {
        q: "Faut-il des prérequis techniques ?",
        a: "Non. Aucune compétence technique particulière n'est nécessaire — seulement une pratique de base d'un ordinateur.",
      },
    ],
  },
  {
    title: "Contenu",
    items: [
      {
        q: "Quels outils d'IA sont abordés ?",
        a: "ChatGPT, Claude ou Gemini pour la partie conversationnelle ; des outils comme Midjourney, DALL·E ou Sora pour l'image et la vidéo ; Copilot et Gemini Workspace pour la bureautique ; des outils d'automatisation pour les agents IA. Le choix précis s'adapte aux outils déjà utilisés dans votre structure.",
      },
      {
        q: "Le programme aborde-t-il les risques et la RGPD ?",
        a: "Oui, systématiquement. Chaque formation intègre un temps dédié aux risques éthiques et juridiques et à l'usage responsable des données personnelles — ce n'est pas une option annexe.",
      },
    ],
  },
  {
    title: "À propos de l'offre",
    items: [
      {
        q: "Est-ce une offre récente ?",
        a: "Oui, cette offre de formation en IA générative est un lancement 2026. Elle s'appuie sur ma pratique quotidienne de ces outils et sur mon expérience de Formateur Professionnel d'Adultes certifié d'État depuis 2017, d'abord en anglais professionnel puis sur SAP.",
      },
      {
        q: "Comment obtenir un devis personnalisé ?",
        a: "Via le formulaire de contact ou WhatsApp — je réponds sous 24 heures avec une proposition adaptée à votre contexte.",
      },
    ],
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": categories.flatMap((cat) =>
    cat.items.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    }))
  ),
};

const FAQ = () => {
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Questions Fréquentes — Financement, Format, Contenu | Antony Addy"
        description="Financement (OPCO, CPF, devis direct), durée, format présentiel/distanciel, prérequis, outils d'IA abordés : les réponses aux questions les plus fréquentes sur les formations en IA générative."
        keywords={["FAQ formation IA", "financement formation IA", "OPCO IA générative", "CPF IA", "formation IA prérequis"]}
        jsonLd={faqJsonLd}
      />

      {/* Hero */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-primary/10 to-[hsl(var(--ia-navy))]/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Questions fréquentes
          </h1>
          <p className="text-xl text-gray-600 animate-fade-in-up animate-delay-100">
            Financement, format, contenu : les réponses aux questions les plus courantes
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {categories.map((cat) => (
            <div key={cat.title}>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{cat.title}</h2>
              <Accordion type="single" collapsible className="w-full">
                {cat.items.map((item) => (
                  <AccordionItem key={item.q} value={item.q}>
                    <AccordionTrigger className="text-left text-base">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-base leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-ia-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Une autre question ?</h2>
          <p className="text-xl mb-8 text-white/85">
            Contactez-moi directement, je réponds sous 24 heures
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" onClick={handleNavClick}>
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Demander un devis
              </Button>
            </Link>
            <a href="https://wa.me/33649829826" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button variant="outline" size="lg" className="border-white text-white bg-white/10 hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold backdrop-blur-sm">
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
