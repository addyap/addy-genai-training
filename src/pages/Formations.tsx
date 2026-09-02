import { Link } from 'react-router-dom';
import { MessageSquare, ImageIcon, Workflow, FileSpreadsheet, ShieldCheck, ArrowRight, CheckCircle2, Building2, Laptop, Target } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SectionHeading from '../components/SectionHeading';
import { Button } from '../components/ui/button';
import { useLocale, localizePath, useT, type Locale } from '@/i18n';

const SERVICE_ICONS = [MessageSquare, ImageIcon, Workflow, FileSpreadsheet];
const SERVICE_TONES = ['bg-primary/10 text-primary', 'bg-fuchsia-500/10 text-fuchsia-600', 'bg-indigo-500/10 text-indigo-600', 'bg-sky-500/10 text-sky-600'];
const FORMAT_ICONS = [Building2, Laptop, Target];

const CONTENT = {
  fr: {
    seoTitle: 'Formations IA Générative : Prompts, Automatisation',
    seoDesc: "Programmes de formation IA générative : IA conversationnelle, création visuelle, automatisation, bureautique. Entreprises et indépendants, en français ou en anglais.",
    keywords: ["formation prompt engineering", "formation ChatGPT", "formation Copilot", "formation automatisation IA", "formation Midjourney", "formation IA entreprise", "formation IA éthique", "formation IA RGPD", "formation IA OPCO", "cahier des charges formation IA", "formation IA sensibilisation 1 jour", "formation IA en anglais", "formation IA bilingue"],
    badge: 'Programme',
    h1: 'Des formations IA générative pour un usage concret, immédiat',
    lede: 'Quatre compétences, adaptables à vos outils, votre secteur et votre niveau de départ',
    certified: "Formateur Professionnel d'Adultes certifié d'État depuis 2017",
    heroCta: 'Construire mon programme de formation',
    ableTo: 'Être capable de :',
    services: [
      { title: "IA conversationnelle & prompt engineering", description: "Utiliser ChatGPT, Claude ou Gemini comme de vrais outils de travail — pour écrire, organiser et décider, pas comme des gadgets.", link: { to: "/generateur-programme", label: "Essayer le générateur de programme" }, features: ["Comprendre les fondamentaux de l'IA générative", "Rédiger, tester et améliorer des prompts efficaces", "Améliorer la clarté et la structuration de vos écrits professionnels", "Structurer une réunion, un ordre du jour ou un plan d'action avec l'IA", "Vérifier et fiabiliser les réponses de l'IA"] },
      { title: "Création visuelle par IA", description: "Produire des visuels et des vidéos sans compétences graphiques préalables.", link: { to: "/ressources#prompt-visuel", label: "Guide : bien prompter le visuel" }, features: ["Générer des images à partir d'une simple description", "Créer des vidéos courtes pour les réseaux sociaux et la communication", "Adapter le style visuel à une charte graphique", "Utiliser ces contenus en connaissance des questions de droits et d'usage"] },
      { title: "Automatisation & agents IA", description: "Faire gagner du temps aux équipes sur les tâches répétitives.", link: { to: "/ressources#automatisation", label: "Guide : identifier une tâche à automatiser" }, features: ["Identifier les tâches à automatiser en priorité", "Connecter des outils IA à vos processus existants", "Mettre en place des agents simples pour le tri, la synthèse ou le reporting", "Mesurer le gain de temps réel"] },
      { title: "IA intégrée à la bureautique", description: "Exploiter l'IA déjà présente dans vos outils Microsoft 365 ou Google Workspace.", link: { to: "/ressources#bureautique", label: "Bibliothèque de prompts" }, features: ["Utiliser Copilot dans Word, Excel, Outlook et PowerPoint", "Utiliser Gemini dans Docs, Sheets et Gmail", "Rédiger et synthétiser plus vite sans perdre en qualité", "Adopter de bons réflexes d'usage professionnel"] },
    ],
    responsible: {
      title: "Cadre responsable : éthique, risques & RGPD",
      description: "Un module transversal, intégré à chaque formation, pas une case cochée en fin de programme.",
      features: ["Identifier les principaux risques éthiques et juridiques liés à l'IA générative", "Exploiter les données à caractère personnel dans le respect du RGPD", "Développer un regard critique sur les résultats produits par l'IA", "Mettre en place un usage responsable et sécurisé au sein de son organisation"],
      cta: "Évaluer la maturité IA responsable de mon organisation",
    },
    formatsEyebrow: 'Formats',
    formatsTitle: 'Formats de formation',
    formatsDesc: "Choisissez le format qui convient le mieux à vos besoins",
    formats: [
      { title: "Formation en Entreprise", description: "Ateliers pratiques dans vos locaux, adaptés aux métiers et aux outils déjà utilisés par vos équipes." },
      { title: "Formation à Distance", description: "Sessions en visioconférence, aussi interactives et concrètes qu'en présentiel." },
      { title: "Accompagnement Individuel", description: "Pour les indépendants : un format resserré, centré sur votre activité et vos cas d'usage réels." },
    ],
    fundingEyebrow: 'Organismes financeurs',
    fundingTitle: 'Un format compatible avec les exigences des financeurs',
    fundingDesc: "OPCO, employeurs publics, associations : chaque programme peut être structuré selon le cadre attendu par les financeurs de la formation professionnelle",
    fundingChecklist: [
      "Objectifs pédagogiques formulés en compétences (« être capable de… »)",
      "Formats adaptables : d'une session courte de sensibilisation (1 jour, tout public) à un parcours multi-journées avec intersession",
      "Groupes de 8 à 14 participants, en présentiel ou à distance",
      "Mises en situation, jeux de rôle et travail sur des cas vécus par les participants",
      "Évaluation à chaud (orale et écrite) et suivi à distance après la formation",
      "Programme adaptable au cahier des charges d'un appel d'offres ou d'un marché",
      "Intervention possible en sous-traitance pour un centre de formation certifié Qualiopi",
    ],
    methodEyebrow: 'Méthode',
    methodTitle: 'Une pédagogie pragmatique',
    method1: "Chaque formation part de vos cas d'usage réels — pas d'exemples génériques. On travaille sur vos documents, vos processus et vos outils, pour que les compétences soient utilisables dès le lendemain.",
    method2: "Cette approche « apprendre en faisant » est celle que j'applique depuis 2017 comme Formateur Professionnel d'Adultes certifié d'État, d'abord en anglais professionnel puis sur SAP : peu de théorie, beaucoup de pratique guidée, et un droit à l'erreur assumé pendant l'apprentissage.",
    ctaTitle: 'Un besoin spécifique ?',
    ctaSub: "Décrivez votre contexte et je vous propose un programme adapté à vos outils et à votre secteur",
    ctaQuote: 'Demander un devis',
  },
  en: {
    seoTitle: 'Generative AI Training: Prompts, Automation & More',
    seoDesc: "Generative-AI training programmes: conversational AI, visual creation, automation, office suite. For companies and independents, in French or English.",
    keywords: ["prompt engineering training", "ChatGPT training", "Copilot training", "AI automation training", "Midjourney training", "corporate AI training", "AI ethics training", "AI GDPR training", "AI training in English", "bilingual AI training"],
    badge: 'Programme',
    h1: 'Generative-AI training for concrete, immediate use',
    lede: 'Four skills, adaptable to your tools, your sector and your starting level',
    certified: "State-certified adult-education trainer since 2017",
    heroCta: 'Build my training programme',
    ableTo: 'You will be able to:',
    services: [
      { title: "Conversational AI & prompt engineering", description: "Use ChatGPT, Claude or Gemini as genuine work tools — to write, organise and decide, not as gadgets.", link: { to: "/generateur-programme", label: "Try the programme generator" }, features: ["Understand the fundamentals of generative AI", "Write, test and improve effective prompts", "Improve the clarity and structure of your professional writing", "Structure a meeting, agenda or action plan with AI", "Check and make AI answers reliable"] },
      { title: "AI visual creation", description: "Produce visuals and videos with no prior design skills.", link: { to: "/ressources#prompt-visuel", label: "Guide: prompting visuals well" }, features: ["Generate images from a simple description", "Create short videos for social media and communication", "Match the visual style to a brand guideline", "Use this content with an awareness of rights and usage"] },
      { title: "Automation & AI agents", description: "Save your teams time on repetitive tasks.", link: { to: "/ressources#automatisation", label: "Guide: spot a task to automate" }, features: ["Identify the tasks to automate first", "Connect AI tools to your existing processes", "Set up simple agents for triage, summarising or reporting", "Measure the real time saved"] },
      { title: "AI inside your office suite", description: "Put to work the AI already built into your Microsoft 365 or Google Workspace tools.", link: { to: "/ressources#bureautique", label: "Prompt library" }, features: ["Use Copilot in Word, Excel, Outlook and PowerPoint", "Use Gemini in Docs, Sheets and Gmail", "Write and summarise faster without losing quality", "Adopt sound professional-use habits"] },
    ],
    responsible: {
      title: "Responsible framework: ethics, risks & GDPR",
      description: "A cross-cutting module built into every course — not a box ticked at the end.",
      features: ["Identify the main ethical and legal risks of generative AI", "Use personal data in compliance with GDPR", "Build a critical eye on the results AI produces", "Put safe, responsible use in place across your organisation"],
      cta: "Assess my organisation's responsible-AI maturity",
    },
    formatsEyebrow: 'Formats',
    formatsTitle: 'Training formats',
    formatsDesc: "Choose the format that best fits your needs",
    formats: [
      { title: "In-Company Training", description: "Hands-on workshops at your premises, tailored to the roles and tools your teams already use." },
      { title: "Remote Training", description: "Video-conference sessions, as interactive and concrete as in person." },
      { title: "One-to-One Coaching", description: "For independent professionals: a focused format centred on your work and your real use cases." },
    ],
    fundingEyebrow: 'Funding bodies',
    fundingTitle: 'A format compatible with funders’ requirements',
    fundingDesc: "OPCOs, public employers, associations: every programme can be structured to meet the framework expected by professional-training funders",
    fundingChecklist: [
      "Learning objectives expressed as competencies (“be able to…”)",
      "Adaptable formats: from a short awareness session (1 day, all audiences) to a multi-day path with an inter-session",
      "Groups of 8 to 14 participants, on-site or remote",
      "Role-plays, simulations and work on cases the participants have lived",
      "On-the-spot assessment (oral and written) and remote follow-up after the course",
      "Programme adaptable to the specifications of a tender or public contract",
      "Possible engagement as a subcontractor for a Qualiopi-certified training centre",
    ],
    methodEyebrow: 'Method',
    methodTitle: 'A pragmatic pedagogy',
    method1: "Every course starts from your real use cases — no generic examples. We work on your documents, your processes and your tools, so the skills are usable the very next day.",
    method2: "This 'learn by doing' approach is the one I've applied since 2017 as a state-certified adult-education trainer, first in business English then in SAP: little theory, a lot of guided practice, and a genuine right to make mistakes while learning.",
    ctaTitle: 'A specific need?',
    ctaSub: "Describe your context and I'll propose a programme tailored to your tools and your sector",
    ctaQuote: 'Get a quote',
  },
} satisfies Record<Locale, unknown>;

const courseProvider = {
  "@type": "Person",
  "name": "Antony Addy",
  "jobTitle": "Formateur en IA Générative",
  "url": "https://ia.antonyaddy.com",
  "sameAs": ["https://www.linkedin.com/in/antonyaddy/"],
};

const buildJsonLd = (locale: Locale, t: typeof CONTENT['fr']) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "name": "Formations en IA Générative",
      "description": locale === 'en'
        ? "Practical generative-AI training: prompt engineering, visual creation, automation, augmented office suite, ethics and GDPR framework"
        : "Formations pratiques en intelligence artificielle générative : prompt engineering, création visuelle, automatisation, bureautique augmentée, cadre éthique et RGPD",
      "provider": courseProvider,
      "serviceType": "Formation IA Générative",
      "areaServed": ["France"],
      "availableLanguage": ["fr", "en"],
      "inLanguage": locale,
    },
    ...[...t.services, t.responsible].map((s) => ({
      "@type": "Course",
      "name": s.title,
      "description": s.description,
      "url": "https://ia.antonyaddy.com/formations",
      "inLanguage": ["fr", "en"],
      "provider": courseProvider,
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": ["Onsite", "Online"],
        "location": { "@type": "Place", "name": "France" },
      },
    })),
  ],
});

const Formations = () => {
  const locale = useLocale();
  const t = useT(CONTENT) as typeof CONTENT['fr'];
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
        jsonLd={buildJsonLd(locale, t)}
      />

      {/* Hero */}
      <section className="relative py-14 sm:py-24 bg-ia-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid-dark" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80 animate-fade-in-up">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 animate-fade-in-up animate-delay-100">
            {t.h1}
          </h1>
          <p className="text-xl text-white/75 mb-4 animate-fade-in-up animate-delay-200">
            {t.lede}
          </p>
          <p className="text-sm text-white/55 mb-8 animate-fade-in-up animate-delay-200">
            {t.certified}
          </p>
          <div className="animate-fade-in-up animate-delay-300">
            <Link to={lp('/contact')} onClick={handleNavClick}>
              <Button size="lg" className="whitespace-normal text-center h-auto py-3">
                {t.heroCta}
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services detail */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {t.services.map((service, index) => {
              const Icon = SERVICE_ICONS[index];
              return (
                <div
                  key={service.title}
                  className="card-surface relative overflow-hidden p-6 sm:p-8 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="index-numeral absolute top-4 right-6 select-none" aria-hidden="true" data-index={String(index + 1).padStart(2, '0')} />
                  <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl mb-5 ${SERVICE_TONES[index]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="relative font-display text-xl font-semibold text-foreground mb-2 pr-10">{service.title}</h3>
                  <p className="relative text-muted-foreground mb-6">{service.description}</p>
                  <p className="relative text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mb-3">{t.ableTo}</p>
                  <ul className="relative space-y-2.5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-warm mr-2.5 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {service.link && (
                    <Link to={lp(service.link.to)} className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                      {service.link.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cross-cutting: responsible use, ethics, RGPD */}
          <div className="mt-5 sm:mt-6 relative overflow-hidden rounded-2xl border border-warm/25 bg-warm/5 p-6 sm:p-8">
            <div className="absolute inset-0 bg-dot-grid opacity-60" />
            <div className="relative flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warm text-warm-foreground shadow-glow-warm">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{t.responsible.title}</h3>
                <p className="text-muted-foreground mb-6">{t.responsible.description}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mb-3">{t.ableTo}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 mb-5">
                  {t.responsible.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-warm mr-2.5 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to={lp('/diagnostic')} className="inline-flex items-center gap-1.5 text-sm font-medium text-warm hover:underline">
                  {t.responsible.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Formats */}
      <section className="py-14 sm:py-24 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.formatsEyebrow}
            title={t.formatsTitle}
            description={t.formatsDesc}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {t.formats.map((format, index) => {
              const Icon = FORMAT_ICONS[index];
              return (
                <div
                  key={format.title}
                  className="card-surface p-6 sm:p-8 text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-5">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">{format.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{format.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Institutional / funded-training format */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.fundingEyebrow}
            title={t.fundingTitle}
            description={t.fundingDesc}
          />

          <div className="rounded-2xl border border-warm/20 bg-warm/5 p-6 sm:p-10">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
              {t.fundingChecklist.map((item) => (
                <li key={item} className="flex items-start text-foreground/80">
                  <CheckCircle2 className="h-5 w-5 text-warm mr-3 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-14 sm:py-24 bg-secondary/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading eyebrow={t.methodEyebrow} title={t.methodTitle} className="mx-auto" />
          <div className="card-surface p-8 sm:p-10 text-left space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.method1}</p>
            <p>{t.method2}</p>
          </div>
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

export default Formations;
