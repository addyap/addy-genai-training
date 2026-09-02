import { Link } from 'react-router-dom';
import { MessageSquare, ImageIcon, Workflow, FileSpreadsheet, Building2, User, ShieldCheck, ArrowRight, ArrowUpRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import HeroSection from '../components/home/HeroSection';
import SectionHeading from '../components/SectionHeading';
import { Button } from '../components/ui/button';
import { getCreations } from '../lib/creations';
import { useLocale, localizePath, useT, type Locale } from '@/i18n';

const PILLAR_ICONS = [MessageSquare, ImageIcon, Workflow, FileSpreadsheet];
const PILLAR_TONES = ['bg-primary/10 text-primary', 'bg-fuchsia-500/10 text-fuchsia-600', 'bg-indigo-500/10 text-indigo-600', 'bg-sky-500/10 text-sky-600'];

const CONTENT = {
  fr: {
    seoTitle: 'Formation IA Générative en Entreprise | Antony Addy',
    seoDesc: "Formations pratiques en IA générative (ChatGPT, Claude, Copilot) pour entreprises et indépendants, par un formateur certifié d'État — en français ou en anglais.",
    keywords: ["formation IA générative", "formation ChatGPT entreprise", "formateur intelligence artificielle", "prompt engineering formation", "Copilot formation", "formation IA responsable", "formation IA RGPD", "formation IA OPCO", "formation IA Fréjus", "formation IA en anglais", "formation IA bilingue"],
    pillarsEyebrow: 'Compétences',
    pillarsTitle: 'Quatre compétences clés, quatre usages concrets',
    pillarsDesc: "Chaque formation part d'un besoin réel : gagner du temps, produire plus vite, décider mieux",
    pillars: [
      { title: "IA conversationnelle & prompt engineering", description: "Utiliser ChatGPT, Claude ou Gemini efficacement : formuler les bonnes consignes, structurer un échange et obtenir des résultats fiables pour la rédaction, l'organisation du travail et l'aide à la décision.", link: { to: "/generateur-programme", label: "Essayer le générateur de programme" } },
      { title: "Création visuelle par IA", description: "Générer des images et des vidéos avec des outils comme Midjourney, DALL·E ou Sora pour la communication, le marketing et la création de contenu, sans compétences graphiques préalables.", link: { to: "/ressources#prompt-visuel", label: "Guide : bien prompter le visuel" } },
      { title: "Automatisation & agents IA", description: "Connecter l'IA à vos outils du quotidien pour automatiser les tâches répétitives — tri d'emails, comptes rendus, veille, reporting — grâce à des agents simples à mettre en place.", link: { to: "/ressources#automatisation", label: "Guide : identifier une tâche à automatiser" } },
      { title: "IA intégrée à la bureautique", description: "Exploiter Copilot (Microsoft 365) ou Gemini (Google Workspace) directement dans Word, Excel, Outlook ou Docs pour rédiger, synthétiser et analyser plus vite.", link: { to: "/ressources#bureautique", label: "Bibliothèque de prompts" } },
    ],
    responsibleTitle: 'Un cadre responsable, à chaque formation',
    responsibleBody: "Risques éthiques et juridiques, protection des données personnelles (RGPD), fiabilité des réponses générées : chaque module intègre un temps dédié pour développer un regard critique et un usage sécurisé de l'IA, pas seulement sa prise en main technique.",
    responsibleCta: "Évaluer la maturité IA responsable de mon organisation",
    moreCta: 'Découvrir le détail des formations',
    audienceEyebrow: 'Pour qui',
    audienceTitle: 'Deux publics, une même exigence',
    audienceDesc: "Deux approches — un même objectif : rendre l'IA générative utile au quotidien",
    companyTitle: 'Entreprises',
    companyBody: "Formez vos équipes à un usage sûr et productif de l'IA générative : cadrage des usages, ateliers pratiques adaptés à chaque métier (RH, marketing, support, direction) et montée en compétence collective.",
    companyFoot: 'Formations en intra, sur site ou à distance →',
    soloTitle: 'Indépendants',
    soloBody: "Gagnez du temps et de la clarté dans votre activité : apprenez à utiliser l'IA générative pour la rédaction, la création de contenu et l'organisation, avec un accompagnement individuel adapté à votre métier.",
    soloFoot: 'Sessions individuelles, en visio ou en présentiel →',
    journeyBadge: 'Mon parcours',
    journeyQuote: "« J'utilise l'intelligence artificielle générative au quotidien dans mon activité de formateur — préparation de supports, automatisation de tâches administratives, création de contenus pédagogiques. »",
    journeyBody: "Je lance aujourd'hui une offre de formation dédiée pour transmettre ces usages concrets, avec la même exigence pédagogique que j'applique depuis 2017 comme Formateur Professionnel d'Adultes certifié d'État, d'abord en anglais professionnel puis en SAP.",
    journeyCta: 'En savoir plus sur mon parcours',
    year2017: "Formateur Professionnel d'Adultes certifié d'État",
    year2026: "Lancement de l'offre IA générative",
    worksEyebrow: 'Réalisations',
    worksTitle: "Des plateformes que j'ai conçues avec l'IA",
    worksDesc: "La meilleure preuve de ce que l'IA générative permet : ces plateformes d'apprentissage de l'anglais, je les ai imaginées, développées et mises en ligne moi-même, en m'appuyant sur l'IA.",
    discover: 'Découvrir le site',
    ctaTitle: "Prêt à passer à l'action avec l'IA générative ?",
    ctaSub: "Discutons de vos besoins et construisons ensemble un programme de formation sur mesure",
    ctaQuote: 'Demander un devis',
    ctaWhatsApp: 'Consultation WhatsApp',
  },
  en: {
    seoTitle: 'Generative AI Training for Business | Antony Addy',
    seoDesc: "Practical generative-AI training (ChatGPT, Claude, Copilot) for companies and independent professionals, by a state-certified trainer — in French or English.",
    keywords: ["generative AI training", "ChatGPT training for business", "AI trainer France", "prompt engineering training", "Copilot training", "responsible AI training", "AI GDPR training", "bilingual AI trainer", "generative AI training in English", "corporate AI workshop France"],
    pillarsEyebrow: 'Skills',
    pillarsTitle: 'Four key skills, four concrete uses',
    pillarsDesc: "Every course starts from a real need: save time, produce faster, decide better",
    pillars: [
      { title: "Conversational AI & prompt engineering", description: "Use ChatGPT, Claude or Gemini effectively: write the right instructions, structure an exchange and get reliable results for writing, organising work and supporting decisions.", link: { to: "/generateur-programme", label: "Try the programme generator" } },
      { title: "AI visual creation", description: "Generate images and videos with tools like Midjourney, DALL·E or Sora for communication, marketing and content creation — no prior design skills required.", link: { to: "/ressources#prompt-visuel", label: "Guide: prompting visuals well" } },
      { title: "Automation & AI agents", description: "Connect AI to your everyday tools to automate repetitive tasks — email triage, meeting notes, monitoring, reporting — with simple agents that are easy to set up.", link: { to: "/ressources#automatisation", label: "Guide: spot a task to automate" } },
      { title: "AI inside your office suite", description: "Put Copilot (Microsoft 365) or Gemini (Google Workspace) to work right inside Word, Excel, Outlook or Docs to write, summarise and analyse faster.", link: { to: "/ressources#bureautique", label: "Prompt library" } },
    ],
    responsibleTitle: 'A responsible framework, in every course',
    responsibleBody: "Ethical and legal risks, personal-data protection (GDPR), the reliability of generated answers: every module sets aside dedicated time to build a critical eye and safe, secure AI use — not just the technical how-to.",
    responsibleCta: "Assess my organisation's responsible-AI maturity",
    moreCta: 'See the training in detail',
    audienceEyebrow: 'Who it’s for',
    audienceTitle: 'Two audiences, one standard',
    audienceDesc: "Two approaches — one goal: make generative AI genuinely useful day to day",
    companyTitle: 'Companies',
    companyBody: "Train your teams for safe, productive use of generative AI: framing appropriate uses, hands-on workshops tailored to each role (HR, marketing, support, management) and collective upskilling.",
    companyFoot: 'In-house training, on-site or remote →',
    soloTitle: 'Independent professionals',
    soloBody: "Gain time and clarity in your work: learn to use generative AI for writing, content creation and organisation, with one-to-one coaching tailored to your field.",
    soloFoot: 'One-to-one sessions, online or in person →',
    journeyBadge: 'My background',
    journeyQuote: "“I use generative AI every day in my work as a trainer — preparing materials, automating admin tasks, creating teaching content.”",
    journeyBody: "I'm now launching a dedicated training offer to pass on these concrete uses, with the same teaching standards I've applied since 2017 as a state-certified adult-education trainer, first in business English and then in SAP.",
    journeyCta: 'More about my background',
    year2017: "State-certified adult-education trainer",
    year2026: "Launch of the generative-AI offer",
    worksEyebrow: 'Work',
    worksTitle: "Platforms I built with AI",
    worksDesc: "The best proof of what generative AI makes possible: these English-learning platforms — I imagined, built and shipped them myself, with the help of AI.",
    discover: 'Visit the site',
    ctaTitle: "Ready to take action with generative AI?",
    ctaSub: "Let's talk through your needs and build a tailor-made training programme together",
    ctaQuote: 'Get a quote',
    ctaWhatsApp: 'WhatsApp consultation',
  },
} satisfies Record<Locale, unknown>;

const buildJsonLd = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Antony Addy — Formation IA Générative",
  "description": locale === 'en'
    ? "Generative-AI training for companies and independent professionals, delivered in French or English"
    : "Formations en intelligence artificielle générative pour entreprises et indépendants, animées en français ou en anglais",
  "url": "https://ia.antonyaddy.com",
  "logo": "https://ia.antonyaddy.com/favicon.svg",
  "image": "https://ia.antonyaddy.com/antonyaddy1.jpg",
  "email": "formations@antonyaddy.com",
  "telephone": "+33649829826",
  "sameAs": ["https://www.linkedin.com/in/antonyaddy/"],
  "founder": {
    "@type": "Person",
    "name": "Antony Addy",
    "jobTitle": locale === 'en' ? "Generative AI Trainer" : "Formateur en IA Générative",
    "image": "https://ia.antonyaddy.com/antonyaddy1.jpg",
    "knowsLanguage": ["fr", "en"],
    "sameAs": ["https://www.linkedin.com/in/antonyaddy/"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Fréjus",
    "addressRegion": "Provence-Alpes-Côte d'Azur",
    "postalCode": "83600",
    "addressCountry": "FR"
  },
  "areaServed": ["France"],
  "serviceType": "Formation IA Générative",
  "availableLanguage": ["fr", "en"],
  "inLanguage": locale,
});

const Home = () => {
  const locale = useLocale();
  const t = useT(CONTENT) as typeof CONTENT['fr'];
  const creations = getCreations(locale);
  const lp = (href: string) => localizePath(href, locale);
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        keywords={t.keywords}
        jsonLd={buildJsonLd(locale)}
      />

      <HeroSection />

      {/* Pillars */}
      <section className="relative py-14 sm:py-24 bg-white overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-96 bg-dot-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.pillarsEyebrow}
            title={t.pillarsTitle}
            description={t.pillarsDesc}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {t.pillars.map((pillar, index) => {
              const Icon = PILLAR_ICONS[index];
              return (
                <div
                  key={pillar.title}
                  className="card-surface relative overflow-hidden p-6 sm:p-8 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="index-numeral absolute top-4 right-6 select-none" aria-hidden="true" data-index={String(index + 1).padStart(2, '0')} />
                  <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl mb-5 ${PILLAR_TONES[index]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="relative font-display text-lg font-semibold text-foreground mb-3 pr-10">{pillar.title}</h3>
                  <p className="relative text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                  {pillar.link && (
                    <Link to={lp(pillar.link.to)} className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                      {pillar.link.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cross-cutting: responsible use, ethics, RGPD */}
          <div className="mt-5 sm:mt-6 relative overflow-hidden rounded-2xl border border-warm/25 bg-warm/5 p-6 sm:p-8 animate-fade-in-up animate-delay-300">
            <div className="absolute inset-0 bg-dot-grid opacity-60" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warm text-warm-foreground shadow-glow-warm">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{t.responsibleTitle}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {t.responsibleBody}
                </p>
                <Link to={lp('/diagnostic')} onClick={handleNavClick} className="inline-flex items-center gap-1.5 text-sm font-medium text-warm hover:underline">
                  {t.responsibleCta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to={lp('/formations')} onClick={handleNavClick}>
              <Button size="lg">
                {t.moreCta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Audience split */}
      <section className="py-14 sm:py-24 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.audienceEyebrow}
            title={t.audienceTitle}
            description={t.audienceDesc}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="card-surface p-8 sm:p-10 animate-fade-in-up">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6">
                <Building2 className="h-7 w-7" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-3">{t.companyTitle}</h3>
              <p className="text-muted-foreground leading-relaxed mb-5">
                {t.companyBody}
              </p>
              <p className="text-sm font-medium text-primary">{t.companyFoot}</p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-ia-navy p-8 sm:p-10 text-white shadow-card-hover animate-fade-in-up animate-delay-100">
              <div className="absolute inset-0 bg-dot-grid-dark" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-white mb-6">
                  <User className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-white mb-3">{t.soloTitle}</h3>
                <p className="text-white/70 leading-relaxed mb-5">
                  {t.soloBody}
                </p>
                <p className="text-sm font-medium text-primary-foreground/90">{t.soloFoot}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach teaser */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 mb-4 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {t.journeyBadge}
              </div>
              <p className="font-display text-2xl sm:text-3xl font-semibold text-foreground leading-snug mb-6">
                {t.journeyQuote}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t.journeyBody}
              </p>
              <Link to={lp('/a-propos')} onClick={handleNavClick} className="inline-block mt-6">
                <Button variant="outline" size="lg">
                  {t.journeyCta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="lg:col-span-4">
              <div className="card-surface p-8 text-center">
                <div className="font-display text-5xl font-bold text-gradient mb-2">2017</div>
                <p className="text-sm text-muted-foreground">{t.year2017}</p>
                <div className="h-px bg-border my-6" />
                <div className="font-display text-5xl font-bold text-gradient-warm mb-2">2026</div>
                <p className="text-sm text-muted-foreground">{t.year2026}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Réalisations — plateformes construites avec l'IA (preuve concrète) */}
      <section className="py-14 sm:py-24 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.worksEyebrow}
            title={t.worksTitle}
            description={t.worksDesc}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {creations.map((c, index) => (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener"
                className="card-surface group relative flex flex-col overflow-hidden animate-fade-in-up transition-shadow hover:shadow-card-hover"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${c.accent}`} />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {c.tag}
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{c.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground flex-1">{c.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {t.discover}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-14 sm:py-24 bg-ia-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid-dark" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {t.ctaTitle}
          </h2>
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
                {t.ctaWhatsApp}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
