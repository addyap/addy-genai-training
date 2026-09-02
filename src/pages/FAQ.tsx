import { Link } from 'react-router-dom';
import { Wallet, CalendarClock, Layers, Info } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { Button } from '../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useLocale, localizePath, useT, type Locale } from '@/i18n';

const CATEGORY_ICONS = [Wallet, CalendarClock, Layers, Info];
const CATEGORY_TONES = ['bg-warm/10 text-warm', 'bg-primary/10 text-primary', 'bg-indigo-500/10 text-indigo-600', 'bg-fuchsia-500/10 text-fuchsia-600'];

const CONTENT = {
  fr: {
    seoTitle: 'FAQ Formation IA Générative | Antony Addy',
    seoDesc: "Financement (OPCO, CPF, devis), durée, format, prérequis, outils abordés : les réponses aux questions les plus fréquentes sur la formation IA générative.",
    keywords: ["FAQ formation IA", "financement formation IA", "OPCO IA générative", "CPF IA", "formation IA prérequis"],
    badge: 'FAQ',
    h1: 'Questions fréquentes',
    lede: "Financement, format, contenu : les réponses aux questions les plus courantes",
    ctaTitle: 'Une autre question ?',
    ctaSub: "Contactez-moi directement, je réponds sous 24 heures",
    ctaQuote: 'Demander un devis',
    categories: [
      { title: "Financement", items: [
        { q: "Comment financer une formation avec vous ?", a: "Deux voies possibles : le devis direct, réglé par l'entreprise sur ses fonds propres ou par vous-même si vous êtes indépendant ; ou une mission en sous-traitance pour un centre de formation certifié Qualiopi, qui porte alors le financement OPCO/CPF de son côté (voir la question suivante)." },
        { q: "Le programme est-il finançable par un OPCO ou via le CPF ?", a: "Pas directement. Depuis 2022, le financement mutualisé (OPCO, CPF, Pôle emploi, Régions) est conditionné à la certification Qualiopi, que cette activité ne possède pas. Je reste déclaré comme organisme de formation (NDA 93830738883, DREETS PACA) et je structure mes programmes selon les formats attendus par les financeurs. En direct, seul le devis (financement propre) est disponible — mais un financement OPCO/CPF reste possible indirectement en passant par un centre de formation certifié Qualiopi qui me missionne en sous-traitance." },
        { q: "Travaillez-vous avec des centres de formation ?", a: "Oui. Je peux intervenir en sous-traitance pour des centres de formation certifiés Qualiopi : ils portent la certification et la relation avec le financeur, j'assure la conception et l'animation du contenu IA générative. C'est la voie à privilégier si votre financement doit obligatoirement passer par un organisme certifié." },
        { q: "Une facture ou une attestation de formation est-elle fournie ?", a: "Oui : facture, convention de formation et attestation de présence sont fournies systématiquement, quel que soit le mode de financement." },
      ] },
      { title: "Organisation & format", items: [
        { q: "Combien de temps dure une formation ?", a: "Cela dépend du besoin : d'une session courte de sensibilisation à un programme sur plusieurs jours avec une intersession pour mettre en pratique entre les sessions. Chaque devis précise la durée proposée." },
        { q: "Combien de participants par session ?", a: "Les groupes en entreprise restent volontairement resserrés pour être interactifs. L'accompagnement pour indépendants se fait en solo ou en très petit groupe." },
        { q: "Présentiel ou distanciel ?", a: "Les deux sont possibles : présentiel dans vos locaux en France, ou sessions à distance en visioconférence." },
        { q: "Les formations sont-elles disponibles en anglais ?", a: "Oui. J'anime les formations en français ou en anglais, au choix : un même programme peut être livré dans l'une ou l'autre langue — pratique pour les équipes internationales ou les entreprises dont la langue de travail est l'anglais." },
        { q: "Faut-il des prérequis techniques ?", a: "Non. Aucune compétence technique particulière n'est nécessaire — seulement une pratique de base d'un ordinateur." },
      ] },
      { title: "Contenu", items: [
        { q: "Quels outils d'IA sont abordés ?", a: "ChatGPT, Claude ou Gemini pour la partie conversationnelle ; des outils comme Midjourney, DALL·E ou Sora pour l'image et la vidéo ; Copilot et Gemini Workspace pour la bureautique ; des outils d'automatisation pour les agents IA. Le choix précis s'adapte aux outils déjà utilisés dans votre structure." },
        { q: "Le programme aborde-t-il les risques et la RGPD ?", a: "Oui, systématiquement. Chaque formation intègre un temps dédié aux risques éthiques et juridiques et à l'usage responsable des données personnelles — ce n'est pas une option annexe." },
      ] },
      { title: "À propos de l'offre", items: [
        { q: "Est-ce une offre récente ?", a: "Oui, cette offre de formation en IA générative est un lancement 2026. Elle s'appuie sur ma pratique quotidienne de ces outils et sur mon expérience de Formateur Professionnel d'Adultes certifié d'État depuis 2017, d'abord en anglais professionnel puis sur SAP." },
        { q: "Comment obtenir un devis personnalisé ?", a: "Via le formulaire de contact ou WhatsApp — je réponds sous 24 heures avec une proposition adaptée à votre contexte." },
      ] },
    ],
  },
  en: {
    seoTitle: 'Generative AI Training FAQ | Antony Addy',
    seoDesc: "Funding (OPCO, CPF, quote), duration, format, prerequisites, tools covered: answers to the most common questions about generative-AI training.",
    keywords: ["AI training FAQ", "AI training funding", "OPCO generative AI", "CPF AI", "AI training prerequisites"],
    badge: 'FAQ',
    h1: 'Frequently asked questions',
    lede: "Funding, format, content: answers to the most common questions",
    ctaTitle: 'Another question?',
    ctaSub: "Contact me directly — I reply within 24 hours",
    ctaQuote: 'Get a quote',
    categories: [
      { title: "Funding", items: [
        { q: "How can a course with you be funded?", a: "Two routes: a direct quote, paid by the company from its own funds or by you if you're self-employed; or a subcontracting engagement for a Qualiopi-certified training centre, which then handles OPCO/CPF funding on its side (see the next question)." },
        { q: "Can the programme be funded by an OPCO or via the CPF?", a: "Not directly. Since 2022, pooled funding (OPCO, CPF, Pôle emploi, Regions) requires Qualiopi certification, which this activity does not hold. I remain a registered training provider (NDA 93830738883, DREETS PACA) and structure my programmes to the formats funders expect. Directly, only the quote (self-funded) is available — but OPCO/CPF funding remains possible indirectly through a Qualiopi-certified training centre that subcontracts to me." },
        { q: "Do you work with training centres?", a: "Yes. I can work as a subcontractor for Qualiopi-certified training centres: they hold the certification and the relationship with the funder, and I design and deliver the generative-AI content. This is the route to favour if your funding must go through a certified body." },
        { q: "Is an invoice or a training certificate provided?", a: "Yes: invoice, training agreement and attendance certificate are provided as standard, whatever the funding method." },
      ] },
      { title: "Organisation & format", items: [
        { q: "How long does a course last?", a: "It depends on the need: from a short awareness session to a multi-day programme with an inter-session to practise between sessions. Each quote states the proposed duration." },
        { q: "How many participants per session?", a: "In-company groups are deliberately kept small to stay interactive. Coaching for independent professionals is one-to-one or in a very small group." },
        { q: "On-site or remote?", a: "Both are possible: on-site at your premises in France, or remote sessions by video conference." },
        { q: "Is the training available in English?", a: "Yes. I run the training in French or in English, as you prefer: the same programme can be delivered in either language — handy for international teams or companies whose working language is English." },
        { q: "Are there any technical prerequisites?", a: "No. No particular technical skill is required — only basic computer use." },
      ] },
      { title: "Content", items: [
        { q: "Which AI tools are covered?", a: "ChatGPT, Claude or Gemini for the conversational part; tools like Midjourney, DALL·E or Sora for image and video; Copilot and Gemini Workspace for the office suite; automation tools for AI agents. The exact selection adapts to the tools already used in your organisation." },
        { q: "Does the programme cover risks and GDPR?", a: "Yes, always. Every course includes dedicated time on ethical and legal risks and the responsible use of personal data — it is not an add-on." },
      ] },
      { title: "About the offer", items: [
        { q: "Is this a recent offer?", a: "Yes, this generative-AI training offer is a 2026 launch. It builds on my daily practice with these tools and my experience as a state-certified adult-education trainer since 2017, first in business English then in SAP." },
        { q: "How do I get a tailored quote?", a: "Via the contact form or WhatsApp — I reply within 24 hours with a proposal matched to your context." },
      ] },
    ],
  },
} satisfies Record<Locale, unknown>;

const FAQ = () => {
  const locale = useLocale();
  const t = useT(CONTENT) as typeof CONTENT['fr'];
  const lp = (href: string) => localizePath(href, locale);
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "inLanguage": locale,
    "mainEntity": t.categories.flatMap((cat) =>
      cat.items.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a },
      }))
    ),
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        keywords={t.keywords}
        jsonLd={faqJsonLd}
      />

      {/* Hero */}
      <section className="relative py-14 sm:py-20 bg-secondary/40 overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary animate-fade-in-up">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-in-up animate-delay-100">
            {t.h1}
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in-up animate-delay-200">
            {t.lede}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {t.categories.map((cat, catIndex) => {
            const Icon = CATEGORY_ICONS[catIndex];
            return (
              <div key={cat.title} className="card-surface p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: `${catIndex * 0.08}s` }}>
                <div className="flex items-center gap-4 mb-2">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${CATEGORY_TONES[catIndex]}`}>
                    <Icon className="h-5 w-5" />
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
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-14 sm:py-24 bg-ia-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid-dark" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t.ctaTitle}</h2>
          <p className="text-xl mb-8 text-white/85">
            {t.ctaSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={lp('/contact')} onClick={handleNavClick}>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-none">
                {t.ctaQuote}
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
