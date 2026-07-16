import { Link } from 'react-router-dom';
import { Wallet, CalendarClock, Layers, Info } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SectionHeading from '../components/SectionHeading';
import { Button } from '../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const categories = [
  {
    title: "Financement",
    icon: Wallet,
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
    icon: CalendarClock,
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
    icon: Layers,
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
    icon: Info,
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
      <section className="relative py-14 sm:py-20 bg-secondary/40 overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary animate-fade-in-up">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            FAQ
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-in-up animate-delay-100">
            Questions fréquentes
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in-up animate-delay-200">
            Financement, format, contenu : les réponses aux questions les plus courantes
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {categories.map((cat, catIndex) => (
            <div key={cat.title} className="card-surface p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: `${catIndex * 0.08}s` }}>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <cat.icon className="h-5 w-5" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">{cat.title}</h2>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {cat.items.map((item) => (
                  <AccordionItem key={item.q} value={item.q} className="border-border">
                    <AccordionTrigger className="text-left font-display text-base font-semibold text-foreground hover:no-underline hover:text-primary">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed">
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
      <section className="relative py-14 sm:py-24 bg-ia-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid-dark" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Une autre question ?</h2>
          <p className="text-xl mb-8 text-white/85">
            Contactez-moi directement, je réponds sous 24 heures
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" onClick={handleNavClick}>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-none">
                Demander un devis
              </Button>
            </Link>
            <a href="https://wa.me/33649829826" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button variant="outline" size="lg" className="border-white/30 text-white bg-white/10 hover:bg-white hover:text-primary backdrop-blur-sm">
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
