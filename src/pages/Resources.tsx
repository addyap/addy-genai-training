import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ImageIcon, Workflow, FileSpreadsheet, Copy, Check, ArrowRight, Sparkles, Wand2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SectionHeading from '../components/SectionHeading';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';

const promptLibrary = [
  {
    tool: "Word / Google Docs",
    prompts: [
      "Reformule ce paragraphe pour un ton plus professionnel et concis, sans dépasser 100 mots : [coller le texte]",
      "Relis ce document et liste les incohérences ou répétitions à corriger : [coller le texte]",
      "Résume ce document en 5 points clés destinés à un dirigeant pressé : [coller le texte]",
    ],
  },
  {
    tool: "Excel / Google Sheets",
    prompts: [
      "Explique-moi cette formule et propose une version plus simple si possible : [coller la formule]",
      "À partir de ces données, identifie les 3 tendances les plus significatives : [décrire ou coller les données]",
      "Propose une formule pour calculer [objectif] à partir des colonnes suivantes : [lister les colonnes]",
    ],
  },
  {
    tool: "Outlook / Gmail",
    prompts: [
      "Rédige une réponse professionnelle et cordiale à cet email, en refusant poliment la demande : [coller l'email]",
      "Résume les points d'action de ce fil de discussion en une liste à puces : [coller le fil]",
      "Rédige un email de relance poli pour une facture impayée depuis 15 jours",
    ],
  },
  {
    tool: "PowerPoint / Slides",
    prompts: [
      "Propose un plan de présentation en 6 slides sur le sujet suivant : [sujet]",
      "Reformule ce texte de slide pour qu'il tienne en 3 puces courtes : [coller le texte]",
      "Suggère une accroche percutante pour ouvrir une présentation sur [sujet]",
    ],
  },
];

const PromptCard = ({ prompt }: { prompt: string }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      toast({ title: "Prompt copié", description: "Collez-le directement dans votre outil d'IA préféré." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Copie impossible",
        description: "Sélectionnez le texte manuellement pour le copier.",
        variant: "destructive",
      });
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

const resourcesJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Ressources — Guides et prompts IA générative",
  "description": "Guides pratiques pour bien prompter la création visuelle par IA, identifier une tâche à automatiser, et bibliothèque de prompts pour la bureautique augmentée",
  "inLanguage": "fr"
};

const Resources = () => {
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Ressources IA Générative — Guides & Prompts | Antony Addy"
        description="Guides pratiques gratuits : bien écrire un prompt pour la création visuelle, identifier une tâche à automatiser avec l'IA, bibliothèque de prompts pour Word, Excel, Outlook et PowerPoint."
        keywords={["guide prompt IA", "prompts Copilot", "prompts bureautique IA", "automatisation IA guide", "prompt image IA"]}
        jsonLd={resourcesJsonLd}
      />

      {/* Hero */}
      <section className="relative py-14 sm:py-20 bg-secondary/40 overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary animate-fade-in-up">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Ressources
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-in-up animate-delay-100">
            Guides et prompts, en libre accès
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in-up animate-delay-200">
            Un aperçu concret de ce qu'on travaille en formation — à utiliser dès maintenant
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
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Bien écrire un prompt pour la création visuelle</h2>
          </div>

          <div className="card-surface p-6 sm:p-8 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Que ce soit pour Midjourney, DALL·E ou Sora, un bon prompt suit la même logique : <strong className="text-foreground">sujet, style, composition, lumière, détails techniques</strong>. Plus la description est précise, moins l'outil a besoin de deviner.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-secondary/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mb-2">Prompt faible</p>
                <p className="text-sm italic">« Une photo d'un bureau moderne »</p>
              </div>
              <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary/70 mb-2">Prompt travaillé</p>
                <p className="text-sm italic">« Photo grand angle d'un bureau moderne minimaliste, lumière naturelle douce venant d'une baie vitrée, palette beige et bois clair, plante verte au premier plan, style photographie d'architecture, format 16:9 »</p>
              </div>
            </div>
            <p>
              Trois réflexes à prendre : <strong className="text-foreground">itérer</strong> plutôt que tout vouloir dans un seul prompt, utiliser un <strong className="text-foreground">vocabulaire de style</strong> précis (photoréaliste, illustration, aquarelle, angle de vue, éclairage), et toujours préciser le <strong className="text-foreground">format de sortie</strong> attendu (ratio, orientation, usage prévu).
            </p>
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
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Comment identifier une tâche à automatiser</h2>
          </div>

          <div className="card-surface p-6 sm:p-8 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Toutes les tâches ne se valent pas pour l'automatisation. Une bonne candidate coche généralement trois critères : elle est <strong className="text-foreground">répétitive</strong>, elle suit des <strong className="text-foreground">règles claires</strong> (peu d'exceptions), et elle a un <strong className="text-foreground">déclencheur identifiable</strong> (un email reçu, une nouvelle ligne dans un tableau, une échéance récurrente).
            </p>
            <ol className="space-y-3 list-decimal list-inside">
              <li><strong className="text-foreground">Lister</strong> les tâches récurrentes de la semaine ou du mois.</li>
              <li><strong className="text-foreground">Estimer</strong> le temps passé sur chacune.</li>
              <li><strong className="text-foreground">Repérer</strong> celles avec un déclencheur net et peu de jugement humain nécessaire.</li>
              <li><strong className="text-foreground">Prototyper</strong> avec un outil simple avant d'industrialiser.</li>
            </ol>
            <p>
              Exemples fréquents : tri et catégorisation d'emails, résumé de comptes rendus de réunion, extraction de données depuis des documents, réponses aux questions fréquentes, brouillons de contenu récurrent. À l'inverse, gardez un contrôle humain sur toute décision sensible ou à fort enjeu — c'est le principe même du <Link to="/formations" onClick={handleNavClick} className="text-primary hover:underline">cadre responsable</Link> abordé en formation.
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
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Bibliothèque de prompts bureautique</h2>
              <p className="text-muted-foreground mt-1">Pour Copilot (Microsoft 365) ou Gemini (Google Workspace) — cliquez pour copier</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {promptLibrary.map((group) => (
              <div key={group.tool} className="card-surface p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">{group.tool}</h3>
                <div className="space-y-3">
                  {group.prompts.map((prompt) => (
                    <PromptCard key={prompt} prompt={prompt} />
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
            eyebrow="Outils en direct"
            title="Deux outils IA à tester tout de suite"
            description="Des démonstrations interactives, pas seulement des guides — le texte que vous saisissez est envoyé à Claude (Anthropic) pour générer une réponse"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <Link to="/generateur-programme" className="card-surface p-6 sm:p-8 block hover:border-primary/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">Générateur de programme</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">Décrivez votre équipe et votre besoin, obtenez un aperçu de programme en quelques secondes.</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Essayer <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            <Link to="/correction-email" className="card-surface p-6 sm:p-8 block hover:border-primary/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5">
                <Wand2 className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">Correcteur d'email anglais</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">Collez un email professionnel, obtenez une version corrigée et une explication des améliorations.</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Essayer <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-14 sm:py-24 bg-ia-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid-dark" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Envie d'aller plus loin ?</h2>
          <p className="text-xl mb-8 text-white/85">
            Ces ressources sont un aperçu — la formation va plus loin, sur vos propres cas d'usage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/formations" onClick={handleNavClick}>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-none">
                Voir les formations
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/diagnostic" onClick={handleNavClick}>
              <Button variant="outline" size="lg" className="border-white/30 text-white bg-white/10 hover:bg-white hover:text-primary backdrop-blur-sm">
                Faire le diagnostic IA responsable
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
