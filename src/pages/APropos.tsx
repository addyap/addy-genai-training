import { Link } from 'react-router-dom';
import { MessageSquare, ImageIcon, Workflow, FileSpreadsheet, CheckCircle2, Mail, MessageCircle, MapPin, Linkedin } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SectionHeading from '../components/SectionHeading';
import { Button } from '../components/ui/button';
import { useLocale, localizePath, useT, type Locale } from '@/i18n';

const EXPERTISE_ICONS = [MessageSquare, ImageIcon, Workflow, FileSpreadsheet];
const EXPERTISE_TONES = ['bg-primary/10 text-primary', 'bg-fuchsia-500/10 text-fuchsia-600', 'bg-indigo-500/10 text-indigo-600', 'bg-sky-500/10 text-sky-600'];

const CONTENT = {
  fr: {
    seoTitle: "À propos d'Antony Addy - Formateur en IA Générative",
    seoDesc: "Formateur Professionnel d'Adultes certifié d'État depuis 2017, utilisateur quotidien de l'IA générative. Formations en entreprise et pour indépendants.",
    keywords: ["Antony Addy", "formateur IA générative", "formateur professionnel d'adultes", "FPA", "Fréjus"],
    badge: 'À propos',
    h1: "Formateur professionnel, utilisateur quotidien de l'IA générative",
    lede: "De l'anglais professionnel à SAP, puis à l'intelligence artificielle générative",
    p1: "Formateur Professionnel d'Adultes certifié d'État depuis 2017, j'ai construit mon activité sur une conviction simple : une compétence ne s'acquiert vraiment qu'en la pratiquant sur des cas réels. C'est cette approche que j'ai appliquée à la formation en anglais professionnel, puis à la formation SAP Gestion des Matériaux.",
    p2: "J'utilise aujourd'hui l'intelligence artificielle générative au quotidien dans mon activité : préparation de supports de cours, rédaction, automatisation de tâches administratives, création de contenus pédagogiques. Cette pratique intensive et concrète est le socle de cette nouvelle offre de formation.",
    p3a: "Mon parcours de formateur en anglais professionnel me permet d'animer ces formations ",
    p3strong: "en français comme en anglais",
    p3b: " : un même programme peut être livré dans l'une ou l'autre langue — utile pour les équipes internationales et les entreprises anglophones.",
    p4: "C'est une offre que je lance aujourd'hui : je n'ai pas encore d'historique de missions de formation dédiées à l'IA générative, mais j'y apporte la même rigueur pédagogique et la même exigence de résultats concrets que sur mes autres domaines de formation.",
    expertiseEyebrow: 'Expertise',
    expertiseTitle: 'Domaines pratiqués',
    expertiseDesc: "Des usages testés et utilisés dans mon activité, avant d'être enseignés",
    expertise: [
      { title: "IA conversationnelle", description: "Usage quotidien de ChatGPT, Claude et Gemini pour la rédaction, l'organisation du travail et l'aide à la décision" },
      { title: "Création visuelle", description: "Génération d'images et de vidéos pour la communication et le contenu" },
      { title: "Automatisation", description: "Mise en place d'agents et d'automatisations pour gagner du temps sur les tâches répétitives" },
      { title: "Bureautique augmentée", description: "Copilot et Gemini intégrés à Word, Excel, Outlook et Google Workspace" },
    ],
    qualEyebrow: 'Qualifications',
    qualTitle: 'Qualifications professionnelles',
    qualHeading: 'Formation & Expérience',
    qualifications: [
      "Formateur Professionnel d'Adultes (FPA), certifié d'État depuis 2017",
      "Pratique quotidienne des outils d'IA générative dans son activité de formateur",
      "Expérience de formation professionnelle en anglais des affaires et en SAP Gestion des Matériaux",
      "Organisme de formation déclaré — NDA 93830738883 (DREETS Provence-Alpes-Côte d'Azur)",
      "SIRET : 483 178 893 00028",
    ],
    approachHeading: 'Approche Pédagogique',
    approach1: "Chaque formation part de vos cas d'usage réels : on travaille sur vos documents, vos outils et vos processus.",
    approach2: "Formations personnalisées, adaptées à votre secteur d'activité et au niveau de départ des participants.",
    ctaTitle: "Envie d'échanger sur votre projet ?",
    ctaSub: "Contactez-moi pour discuter de vos besoins et construire un programme sur mesure",
    ctaContact: 'Contactez-moi',
    ctaTraining: 'Voir mes formations',
  },
  en: {
    seoTitle: "About Antony Addy — Generative AI Trainer",
    seoDesc: "State-certified adult-education trainer since 2017 and daily generative-AI user. Training for companies and independent professionals, in French or English.",
    keywords: ["Antony Addy", "generative AI trainer", "corporate AI trainer", "AI trainer Fréjus", "bilingual AI trainer"],
    badge: 'About',
    h1: "A professional trainer and daily user of generative AI",
    lede: "From business English to SAP, and now to generative artificial intelligence",
    p1: "A state-certified adult-education trainer since 2017, I built my practice on one simple conviction: a skill is only truly acquired by practising it on real cases. That's the approach I applied to business-English training, then to SAP Materials Management training.",
    p2: "Today I use generative AI every day in my work: preparing course materials, writing, automating admin tasks, creating teaching content. That intensive, hands-on practice is the foundation of this new training offer.",
    p3a: "My background as a business-English trainer means I can run this training ",
    p3strong: "in French or in English",
    p3b: ": the same programme can be delivered in either language — useful for international teams and English-speaking companies.",
    p4: "This is an offer I'm launching now: I don't yet have a track record of engagements dedicated to generative AI, but I bring the same teaching rigour and the same demand for concrete results as in my other training fields.",
    expertiseEyebrow: 'Expertise',
    expertiseTitle: 'Fields I practise',
    expertiseDesc: "Uses I test and rely on in my own work before teaching them",
    expertise: [
      { title: "Conversational AI", description: "Daily use of ChatGPT, Claude and Gemini for writing, organising work and supporting decisions" },
      { title: "Visual creation", description: "Generating images and videos for communication and content" },
      { title: "Automation", description: "Setting up agents and automations to save time on repetitive tasks" },
      { title: "Augmented office suite", description: "Copilot and Gemini inside Word, Excel, Outlook and Google Workspace" },
    ],
    qualEyebrow: 'Qualifications',
    qualTitle: 'Professional qualifications',
    qualHeading: 'Training & Experience',
    qualifications: [
      "Certified Adult-Education Trainer (FPA), state-certified since 2017",
      "Daily hands-on use of generative-AI tools in his training practice",
      "Professional-training experience in business English and SAP Materials Management",
      "Registered training provider — NDA 93830738883 (DREETS Provence-Alpes-Côte d'Azur)",
      "SIRET: 483 178 893 00028",
    ],
    approachHeading: 'Teaching approach',
    approach1: "Every course starts from your real use cases: we work on your documents, your tools and your processes.",
    approach2: "Tailored training, adapted to your sector and to the participants' starting level.",
    ctaTitle: "Want to talk through your project?",
    ctaSub: "Get in touch to discuss your needs and build a tailor-made programme",
    ctaContact: 'Contact me',
    ctaTraining: 'See my training',
  },
} satisfies Record<Locale, unknown>;

const buildJsonLd = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": locale === 'en' ? "About Antony Addy — Generative AI Trainer" : "À propos d'Antony Addy - Formateur en IA Générative",
  "description": locale === 'en'
    ? "State-certified adult-education trainer and daily generative-AI user, offering practical training in France, delivered in French or English"
    : "Formateur Professionnel d'Adultes certifié d'État, utilisateur quotidien de l'IA générative, proposant des formations pratiques en France, animées en français ou en anglais",
  "provider": {
    "@type": "Person",
    "name": "Antony Addy",
    "jobTitle": locale === 'en' ? "Generative AI Trainer" : "Formateur en IA Générative",
    "image": "https://ia.antonyaddy.com/antonyaddy1.jpg",
    "email": "formations@antonyaddy.com",
    "knowsLanguage": ["fr", "en"],
    "knowsAbout": ["Generative AI", "ChatGPT", "Prompt engineering", "Microsoft Copilot", "AI automation", "Professional training"],
    "sameAs": ["https://www.linkedin.com/in/antonyaddy/"]
  },
  "serviceType": "Formation IA Générative",
  "areaServed": ["France"],
  "inLanguage": ["fr", "en"],
  "availableLanguage": ["French", "English"]
});

const APropos = () => {
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
        jsonLd={buildJsonLd(locale)}
      />

      {/* Hero */}
      <section className="relative py-14 sm:py-24 bg-ia-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid-dark" />
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.7fr_1fr] gap-10 lg:gap-16 items-start animate-fade-in-up">
            <div>
            <div className="inline-flex items-center gap-2 mb-5 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t.badge}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t.h1}
            </h1>
            <p className="text-xl text-gradient-light font-medium mb-8">
              {t.lede}
            </p>
            <div className="space-y-6 text-lg text-white/75 leading-relaxed">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
              <p>
                {t.p3a}<strong className="text-white/90">{t.p3strong}</strong>{t.p3b}
              </p>
              <p>{t.p4}</p>
            </div>
            </div>

            <div className="order-first lg:order-none lg:pt-1">
              <div className="relative mx-auto lg:mx-0 w-48 sm:w-64 lg:w-full max-w-xs">
                <div className="absolute -inset-3 rounded-[1.75rem] bg-primary/30 blur-2xl" aria-hidden="true" />
                <img
                  src="/antonyaddy1.jpg"
                  alt={locale === 'en' ? 'Antony Addy, generative AI trainer' : 'Antony Addy, formateur en IA générative'}
                  width={960}
                  height={960}
                  loading="lazy"
                  className="relative w-full aspect-square rounded-[1.5rem] object-cover ring-1 ring-white/15 shadow-2xl"
                />
              </div>

              <ul className="mx-auto lg:mx-0 mt-6 w-full max-w-xs space-y-1.5 text-sm">
                <li>
                  <a href="mailto:formations@antonyaddy.com" className="flex items-center gap-3 rounded-lg px-3 py-2 text-white/80 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ia-navy">
                    <Mail className="h-4 w-4 text-primary shrink-0" />
                    <span>formations@antonyaddy.com</span>
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/33649829826" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg px-3 py-2 text-white/80 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ia-navy">
                    <MessageCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>WhatsApp · +33 6 49 82 98 26<span className="sr-only">{locale === 'en' ? ' (opens in a new tab)' : " (s'ouvre dans un nouvel onglet)"}</span></span>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/antonyaddy/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg px-3 py-2 text-white/80 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ia-navy">
                    <Linkedin className="h-4 w-4 text-primary shrink-0" />
                    <span>LinkedIn<span className="sr-only">{locale === 'en' ? ' (opens in a new tab)' : " (s'ouvre dans un nouvel onglet)"}</span></span>
                  </a>
                </li>
                <li className="flex items-center gap-3 px-3 py-2 text-white/60">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span>Fréjus, France</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.expertiseEyebrow}
            title={t.expertiseTitle}
            description={t.expertiseDesc}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {t.expertise.map((item, index) => {
              const Icon = EXPERTISE_ICONS[index];
              return (
                <div key={item.title} className="card-surface p-6 text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl mx-auto mb-4 ${EXPERTISE_TONES[index]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-14 sm:py-24 bg-secondary/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t.qualEyebrow} title={t.qualTitle} className="mx-auto" />

          <div className="card-surface p-6 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-5">{t.qualHeading}</h3>
                <ul className="space-y-3.5">
                  {t.qualifications.map((qualification) => (
                    <li key={qualification} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-warm mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{qualification}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-5">{t.approachHeading}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t.approach1}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t.approach2}
                </p>
              </div>
            </div>
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
                {t.ctaContact}
              </Button>
            </Link>
            <Link to={lp('/formations')} onClick={handleNavClick}>
              <Button variant="outline" size="lg" className="border-white/30 text-white bg-white/10 hover:bg-white hover:text-primary backdrop-blur-sm">
                {t.ctaTraining}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default APropos;
