import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ImageIcon, Workflow, FileSpreadsheet, Copy, Check, ArrowRight, ArrowUpRight, Sparkles, Wand2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SectionHeading from '../components/SectionHeading';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import { getCreations } from '../lib/creations';
import { useLocale, localizePath, useT, type Locale } from '@/i18n';

const CONTENT = {
  fr: {
    seoTitle: 'Ressources IA Générative — Guides & Prompts',
    seoDesc: "Guides gratuits : bien prompter la création visuelle, identifier une tâche à automatiser, bibliothèque de prompts pour Word, Excel, Outlook et PowerPoint.",
    keywords: ["guide prompt IA", "prompts Copilot", "prompts bureautique IA", "automatisation IA guide", "prompt image IA"],
    badge: 'Ressources',
    h1: 'Guides et prompts, en libre accès',
    lede: "Un aperçu concret de ce qu'on travaille en formation — à utiliser dès maintenant",
    copyToast: { title: 'Prompt copié', desc: "Collez-le directement dans votre outil d'IA préféré." },
    copyFail: { title: 'Copie impossible', desc: 'Sélectionnez le texte manuellement pour le copier.' },
    visualTitle: 'Bien écrire un prompt pour la création visuelle',
    visualP1a: "Que ce soit pour Midjourney, DALL·E ou Sora, un bon prompt suit la même logique : ",
    visualP1strong: "sujet, style, composition, lumière, détails techniques",
    visualP1b: ". Plus la description est précise, moins l'outil a besoin de deviner.",
    weakLabel: 'Prompt faible', weakExample: "« Une photo d'un bureau moderne »",
    strongLabel: 'Prompt travaillé', strongExample: "« Photo grand angle d'un bureau moderne minimaliste, lumière naturelle douce venant d'une baie vitrée, palette beige et bois clair, plante verte au premier plan, style photographie d'architecture, format 16:9 »",
    visualP2: "Trois réflexes à prendre : itérer plutôt que tout vouloir dans un seul prompt, utiliser un vocabulaire de style précis (photoréaliste, illustration, aquarelle, angle de vue, éclairage), et toujours préciser le format de sortie attendu (ratio, orientation, usage prévu).",
    autoTitle: 'Comment identifier une tâche à automatiser',
    autoP1a: "Toutes les tâches ne se valent pas pour l'automatisation. Une bonne candidate coche généralement trois critères : elle est ",
    autoP1s1: 'répétitive', autoP1mid: ", elle suit des ", autoP1s2: 'règles claires', autoP1mid2: " (peu d'exceptions), et elle a un ", autoP1s3: 'déclencheur identifiable', autoP1end: " (un email reçu, une nouvelle ligne dans un tableau, une échéance récurrente).",
    autoSteps: [
      ['Lister', ' les tâches récurrentes de la semaine ou du mois.'],
      ['Estimer', ' le temps passé sur chacune.'],
      ['Repérer', ' celles avec un déclencheur net et peu de jugement humain nécessaire.'],
      ['Prototyper', " avec un outil simple avant d'industrialiser."],
    ],
    autoP2a: "Exemples fréquents : tri et catégorisation d'emails, résumé de comptes rendus de réunion, extraction de données depuis des documents, réponses aux questions fréquentes, brouillons de contenu récurrent. À l'inverse, gardez un contrôle humain sur toute décision sensible ou à fort enjeu — c'est le principe même du ",
    autoLink: 'cadre responsable',
    autoP2b: ' abordé en formation.',
    libTitle: 'Bibliothèque de prompts bureautique',
    libSub: 'Pour Copilot (Microsoft 365) ou Gemini (Google Workspace) — cliquez pour copier',
    promptLibrary: [
      { tool: "Word / Google Docs", prompts: ["Reformule ce paragraphe pour un ton plus professionnel et concis, sans dépasser 100 mots : [coller le texte]", "Relis ce document et liste les incohérences ou répétitions à corriger : [coller le texte]", "Résume ce document en 5 points clés destinés à un dirigeant pressé : [coller le texte]"] },
      { tool: "Excel / Google Sheets", prompts: ["Explique-moi cette formule et propose une version plus simple si possible : [coller la formule]", "À partir de ces données, identifie les 3 tendances les plus significatives : [décrire ou coller les données]", "Propose une formule pour calculer [objectif] à partir des colonnes suivantes : [lister les colonnes]"] },
      { tool: "Outlook / Gmail", prompts: ["Rédige une réponse professionnelle et cordiale à cet email, en refusant poliment la demande : [coller l'email]", "Résume les points d'action de ce fil de discussion en une liste à puces : [coller le fil]", "Rédige un email de relance poli pour une facture impayée depuis 15 jours"] },
      { tool: "PowerPoint / Slides", prompts: ["Propose un plan de présentation en 6 slides sur le sujet suivant : [sujet]", "Reformule ce texte de slide pour qu'il tienne en 3 puces courtes : [coller le texte]", "Suggère une accroche percutante pour ouvrir une présentation sur [sujet]"] },
    ],
    toolsEyebrow: 'Outils en direct',
    toolsTitle: 'Deux outils IA à tester tout de suite',
    toolsDesc: "Des démonstrations interactives, pas seulement des guides — le texte que vous saisissez est envoyé à Claude (Anthropic) pour générer une réponse",
    genTitle: 'Générateur de programme', genDesc: "Décrivez votre équipe et votre besoin, obtenez un aperçu de programme en quelques secondes.",
    corrTitle: "Correcteur d'email anglais", corrDesc: "Collez un email professionnel, obtenez une version corrigée et une explication des améliorations.",
    tryIt: 'Essayer',
    worksEyebrow: 'Réalisations',
    worksTitle: "Des plateformes que j'ai conçues avec l'IA",
    worksDesc: "Au-delà des démonstrations : ces plateformes d'apprentissage de l'anglais, je les ai imaginées, développées et mises en ligne moi-même, en m'appuyant sur l'IA générative.",
    discover: 'Découvrir le site',
    ctaTitle: "Envie d'aller plus loin ?",
    ctaSub: "Ces ressources sont un aperçu — la formation va plus loin, sur vos propres cas d'usage",
    ctaTraining: 'Voir les formations',
    ctaDiagnostic: 'Faire le diagnostic IA responsable',
  },
  en: {
    seoTitle: 'Generative AI Resources — Guides & Prompts',
    seoDesc: "Free guides: prompting AI visuals well, spotting a task to automate, and a prompt library for Word, Excel, Outlook and PowerPoint.",
    keywords: ["AI prompt guide", "Copilot prompts", "office AI prompts", "AI automation guide", "AI image prompt"],
    badge: 'Resources',
    h1: 'Guides and prompts, freely available',
    lede: "A concrete glimpse of what we work on in training — usable right now",
    copyToast: { title: 'Prompt copied', desc: "Paste it straight into your favourite AI tool." },
    copyFail: { title: 'Copy failed', desc: 'Select the text manually to copy it.' },
    visualTitle: 'Writing a good prompt for visual creation',
    visualP1a: "Whether for Midjourney, DALL·E or Sora, a good prompt follows the same logic: ",
    visualP1strong: "subject, style, composition, light, technical details",
    visualP1b: ". The more precise the description, the less the tool has to guess.",
    weakLabel: 'Weak prompt', weakExample: "“A photo of a modern office”",
    strongLabel: 'Worked prompt', strongExample: "“Wide-angle photo of a minimalist modern office, soft natural light from a bay window, beige and light-wood palette, a green plant in the foreground, architectural-photography style, 16:9 format”",
    visualP2: "Three habits to build: iterate rather than cramming everything into one prompt, use precise style vocabulary (photorealistic, illustration, watercolour, viewing angle, lighting), and always state the expected output format (ratio, orientation, intended use).",
    autoTitle: 'How to spot a task to automate',
    autoP1a: "Not all tasks are equal for automation. A good candidate usually ticks three boxes: it is ",
    autoP1s1: 'repetitive', autoP1mid: ", it follows ", autoP1s2: 'clear rules', autoP1mid2: " (few exceptions), and it has an ", autoP1s3: 'identifiable trigger', autoP1end: " (an email received, a new row in a spreadsheet, a recurring deadline).",
    autoSteps: [
      ['List', ' the recurring tasks of the week or month.'],
      ['Estimate', ' the time spent on each.'],
      ['Spot', ' the ones with a clear trigger and little human judgement needed.'],
      ['Prototype', ' with a simple tool before scaling up.'],
    ],
    autoP2a: "Common examples: sorting and categorising emails, summarising meeting notes, extracting data from documents, answering FAQs, drafting recurring content. Conversely, keep a human in control of any sensitive or high-stakes decision — that's the very principle of the ",
    autoLink: 'responsible framework',
    autoP2b: ' covered in training.',
    libTitle: 'Office prompt library',
    libSub: 'For Copilot (Microsoft 365) or Gemini (Google Workspace) — click to copy',
    promptLibrary: [
      { tool: "Word / Google Docs", prompts: ["Rewrite this paragraph in a more professional, concise tone, in no more than 100 words: [paste the text]", "Proofread this document and list the inconsistencies or repetitions to fix: [paste the text]", "Summarise this document into 5 key points for a busy executive: [paste the text]"] },
      { tool: "Excel / Google Sheets", prompts: ["Explain this formula to me and suggest a simpler version if possible: [paste the formula]", "From this data, identify the 3 most significant trends: [describe or paste the data]", "Suggest a formula to calculate [goal] from the following columns: [list the columns]"] },
      { tool: "Outlook / Gmail", prompts: ["Draft a professional, cordial reply to this email, politely declining the request: [paste the email]", "Summarise the action points from this thread as a bullet list: [paste the thread]", "Draft a polite follow-up email for an invoice unpaid for 15 days"] },
      { tool: "PowerPoint / Slides", prompts: ["Suggest a 6-slide presentation outline on the following topic: [topic]", "Rewrite this slide text so it fits into 3 short bullets: [paste the text]", "Suggest a punchy hook to open a presentation on [topic]"] },
    ],
    toolsEyebrow: 'Live tools',
    toolsTitle: 'Two AI tools to try right now',
    toolsDesc: "Interactive demos, not just guides — the text you enter is sent to Claude (Anthropic) to generate a response",
    genTitle: 'Programme generator', genDesc: "Describe your team and your need, and get a programme outline in seconds.",
    corrTitle: 'English email corrector', corrDesc: "Paste a professional email and get a corrected version with an explanation of the improvements.",
    tryIt: 'Try it',
    worksEyebrow: 'Work',
    worksTitle: "Platforms I built with AI",
    worksDesc: "Beyond the demos: these English-learning platforms — I imagined, built and shipped them myself, with the help of generative AI.",
    discover: 'Visit the site',
    ctaTitle: "Want to go further?",
    ctaSub: "These resources are a glimpse — training goes further, on your own use cases",
    ctaTraining: 'See the training',
    ctaDiagnostic: 'Take the responsible-AI check',
  },
} satisfies Record<Locale, unknown>;

const PromptCard = ({ prompt, copyToast, copyFail }: { prompt: string; copyToast: { title: string; desc: string }; copyFail: { title: string; desc: string } }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      toast({ title: copyToast.title, description: copyToast.desc });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: copyFail.title, description: copyFail.desc, variant: "destructive" });
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group w-full text-left flex items-start gap-3 rounded-xl border border-border bg-white p-4 hover:border-primary/30 hover:shadow-card-hover transition-all duration-300"
    >
      <span className="flex-1 text-sm text-foreground/80 leading-relaxed">{prompt}</span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </span>
    </button>
  );
};

const Resources = () => {
  const locale = useLocale();
  const t = useT(CONTENT) as typeof CONTENT['fr'];
  const creations = getCreations(locale);
  const lp = (href: string) => localizePath(href, locale);
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resourcesJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": t.h1,
    "description": t.seoDesc,
    "inLanguage": locale,
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        keywords={t.keywords}
        jsonLd={resourcesJsonLd}
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

      {/* Guide: prompt visuel */}
      <section id="prompt-visuel" className="py-14 sm:py-24 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-600">
              <ImageIcon className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">{t.visualTitle}</h2>
          </div>

          <div className="card-surface p-6 sm:p-8 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              {t.visualP1a}<strong className="text-foreground">{t.visualP1strong}</strong>{t.visualP1b}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-secondary/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mb-2">{t.weakLabel}</p>
                <p className="text-sm italic">{t.weakExample}</p>
              </div>
              <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary/70 mb-2">{t.strongLabel}</p>
                <p className="text-sm italic">{t.strongExample}</p>
              </div>
            </div>
            <p>{t.visualP2}</p>
          </div>
        </div>
      </section>

      {/* Guide: automatisation */}
      <section id="automatisation" className="py-14 sm:py-24 bg-secondary/40 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
              <Workflow className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">{t.autoTitle}</h2>
          </div>

          <div className="card-surface p-6 sm:p-8 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              {t.autoP1a}<strong className="text-foreground">{t.autoP1s1}</strong>{t.autoP1mid}<strong className="text-foreground">{t.autoP1s2}</strong>{t.autoP1mid2}<strong className="text-foreground">{t.autoP1s3}</strong>{t.autoP1end}
            </p>
            <ol className="space-y-3 list-decimal list-inside">
              {t.autoSteps.map(([bold, rest]) => (
                <li key={bold}><strong className="text-foreground">{bold}</strong>{rest}</li>
              ))}
            </ol>
            <p>
              {t.autoP2a}<Link to={lp('/formations')} onClick={handleNavClick} className="text-primary hover:underline">{t.autoLink}</Link>{t.autoP2b}
            </p>
          </div>
        </div>
      </section>

      {/* Prompt cheat-sheet */}
      <section id="bureautique" className="py-14 sm:py-24 bg-white scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">{t.libTitle}</h2>
              <p className="text-muted-foreground mt-1">{t.libSub}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {t.promptLibrary.map((group) => (
              <div key={group.tool} className="card-surface p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">{group.tool}</h3>
                <div className="space-y-3">
                  {group.prompts.map((prompt) => (
                    <PromptCard key={prompt} prompt={prompt} copyToast={t.copyToast} copyFail={t.copyFail} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live tools */}
      <section className="py-14 sm:py-24 bg-secondary/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.toolsEyebrow}
            title={t.toolsTitle}
            description={t.toolsDesc}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <Link to={lp('/generateur-programme')} className="card-surface p-6 sm:p-8 block hover:border-primary/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{t.genTitle}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{t.genDesc}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                {t.tryIt} <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            <Link to={lp('/correction-email')} className="card-surface p-6 sm:p-8 block hover:border-primary/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5">
                <Wand2 className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{t.corrTitle}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{t.corrDesc}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                {t.tryIt} <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Réalisations — plateformes construites avec l'IA */}
      <section className="py-14 sm:py-24 bg-white">
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t.ctaTitle}</h2>
          <p className="text-xl mb-8 text-white/85">
            {t.ctaSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={lp('/formations')} onClick={handleNavClick}>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-none">
                {t.ctaTraining}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to={lp('/diagnostic')} onClick={handleNavClick}>
              <Button variant="outline" size="lg" className="border-white/30 text-white bg-white/10 hover:bg-white hover:text-primary backdrop-blur-sm">
                {t.ctaDiagnostic}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
