import { Link } from 'react-router-dom';
import { MessageSquare, ImageIcon, Workflow, FileSpreadsheet, ShieldCheck, ArrowRight, CheckCircle2, Building2, Laptop, Target } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SectionHeading from '../components/SectionHeading';
import { Button } from '../components/ui/button';

const services = [
  {
    icon: MessageSquare,
    title: "IA conversationnelle & prompt engineering",
    description: "Utiliser ChatGPT, Claude ou Gemini comme de vrais outils de travail, pas comme des gadgets.",
    tone: "bg-primary/10 text-primary",
    link: { to: "/generateur-programme", label: "Essayer le générateur de programme" },
    features: [
      "Comprendre les fondamentaux de l'IA générative",
      "Rédiger, tester et améliorer des prompts efficaces",
      "Choisir le bon outil selon le besoin",
      "Vérifier et fiabiliser les réponses de l'IA",
    ],
  },
  {
    icon: ImageIcon,
    title: "Création visuelle par IA",
    description: "Produire des visuels et des vidéos sans compétences graphiques préalables.",
    tone: "bg-fuchsia-500/10 text-fuchsia-600",
    link: { to: "/ressources#prompt-visuel", label: "Guide : bien prompter le visuel" },
    features: [
      "Générer des images à partir d'une simple description",
      "Créer des vidéos courtes pour les réseaux sociaux et la communication",
      "Adapter le style visuel à une charte graphique",
      "Utiliser ces contenus en connaissance des questions de droits et d'usage",
    ],
  },
  {
    icon: Workflow,
    title: "Automatisation & agents IA",
    description: "Faire gagner du temps aux équipes sur les tâches répétitives.",
    tone: "bg-indigo-500/10 text-indigo-600",
    link: { to: "/ressources#automatisation", label: "Guide : identifier une tâche à automatiser" },
    features: [
      "Identifier les tâches à automatiser en priorité",
      "Connecter des outils IA à vos processus existants",
      "Mettre en place des agents simples pour le tri, la synthèse ou le reporting",
      "Mesurer le gain de temps réel",
    ],
  },
  {
    icon: FileSpreadsheet,
    title: "IA intégrée à la bureautique",
    description: "Exploiter l'IA déjà présente dans vos outils Microsoft 365 ou Google Workspace.",
    tone: "bg-sky-500/10 text-sky-600",
    link: { to: "/ressources#bureautique", label: "Bibliothèque de prompts" },
    features: [
      "Utiliser Copilot dans Word, Excel, Outlook et PowerPoint",
      "Utiliser Gemini dans Docs, Sheets et Gmail",
      "Rédiger et synthétiser plus vite sans perdre en qualité",
      "Adopter de bons réflexes d'usage professionnel",
    ],
  },
];

const responsibleUse = {
  icon: ShieldCheck,
  title: "Cadre responsable : éthique, risques & RGPD",
  description: "Un module transversal, intégré à chaque formation, pas une case cochée en fin de programme.",
  features: [
    "Identifier les principaux risques éthiques et juridiques liés à l'IA générative",
    "Exploiter les données à caractère personnel dans le respect du RGPD",
    "Développer un regard critique sur les résultats produits par l'IA",
    "Mettre en place un usage responsable et sécurisé au sein de son organisation",
  ],
};

const trainingFormats = [
  {
    title: "Formation en Entreprise",
    description: "Ateliers pratiques dans vos locaux, adaptés aux métiers et aux outils déjà utilisés par vos équipes.",
    icon: Building2,
  },
  {
    title: "Formation à Distance",
    description: "Sessions en visioconférence, aussi interactives et concrètes qu'en présentiel.",
    icon: Laptop,
  },
  {
    title: "Accompagnement Individuel",
    description: "Pour les indépendants : un format resserré, centré sur votre activité et vos cas d'usage réels.",
    icon: Target,
  },
];

const fundingChecklist = [
  "Objectifs pédagogiques formulés en compétences (« être capable de… »)",
  "Formats multi-journées avec intersession, pour mettre en pratique entre les sessions",
  "Groupes de 8 à 14 participants, en présentiel ou à distance",
  "Mises en situation, jeux de rôle et travail sur des cas vécus par les participants",
  "Évaluation à chaud (orale et écrite) et suivi à distance après la formation",
  "Programme adaptable au cahier des charges d'un appel d'offres ou d'un marché",
  "Intervention possible en sous-traitance pour un centre de formation certifié Qualiopi",
];

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Formations en IA Générative",
  "description": "Formations pratiques en intelligence artificielle générative : prompt engineering, création visuelle, automatisation, bureautique augmentée, cadre éthique et RGPD",
  "provider": {
    "@type": "Person",
    "name": "Antony Addy",
    "jobTitle": "Formateur en IA Générative"
  },
  "serviceType": "Formation IA Générative",
  "areaServed": ["France"],
  "inLanguage": "fr"
};

const Formations = () => {
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Formations IA Générative : Prompts, Automatisation"
        description="Programmes détaillés : IA conversationnelle, création visuelle, automatisation, bureautique augmentée. Pour entreprises et indépendants, en France."
        keywords={["formation prompt engineering", "formation ChatGPT", "formation Copilot", "formation automatisation IA", "formation Midjourney", "formation IA entreprise", "formation IA éthique", "formation IA RGPD", "formation IA OPCO", "cahier des charges formation IA"]}
        jsonLd={servicesJsonLd}
      />

      {/* Hero */}
      <section className="relative py-14 sm:py-24 bg-ia-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid-dark" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80 animate-fade-in-up">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Programme
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 animate-fade-in-up animate-delay-100">
            Des formations IA générative pour un usage concret, immédiat
          </h1>
          <p className="text-xl text-white/75 mb-4 animate-fade-in-up animate-delay-200">
            Quatre compétences, adaptables à vos outils, votre secteur et votre niveau de départ
          </p>
          <p className="text-sm text-white/55 mb-8 animate-fade-in-up animate-delay-200">
            Formateur Professionnel d'Adultes certifié d'État depuis 2017
          </p>
          <div className="animate-fade-in-up animate-delay-300">
            <Link to="/contact" onClick={handleNavClick}>
              <Button size="lg" className="whitespace-normal text-center h-auto py-3">
                Construire mon programme de formation
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
            {services.map((service, index) => (
              <div
                key={service.title}
                className="card-surface relative overflow-hidden p-6 sm:p-8 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="index-numeral absolute top-4 right-6 select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl mb-5 ${service.tone}`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="relative font-display text-xl font-semibold text-foreground mb-2 pr-10">{service.title}</h3>
                <p className="relative text-muted-foreground mb-6">{service.description}</p>
                <p className="relative text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mb-3">Être capable de :</p>
                <ul className="relative space-y-2.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-warm mr-2.5 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {service.link && (
                  <Link to={service.link.to} className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                    {service.link.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Cross-cutting: responsible use, ethics, RGPD */}
          <div className="mt-5 sm:mt-6 relative overflow-hidden rounded-2xl border border-warm/25 bg-warm/5 p-6 sm:p-8">
            <div className="absolute inset-0 bg-dot-grid opacity-60" />
            <div className="relative flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warm text-warm-foreground shadow-glow-warm">
                <responsibleUse.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{responsibleUse.title}</h3>
                <p className="text-muted-foreground mb-6">{responsibleUse.description}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mb-3">Être capable de :</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 mb-5">
                  {responsibleUse.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-warm mr-2.5 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/diagnostic" className="inline-flex items-center gap-1.5 text-sm font-medium text-warm hover:underline">
                  Évaluer la maturité IA responsable de mon organisation
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
            eyebrow="Formats"
            title="Formats de formation"
            description="Choisissez le format qui convient le mieux à vos besoins"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {trainingFormats.map((format, index) => (
              <div
                key={format.title}
                className="card-surface p-6 sm:p-8 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-5">
                  <format.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">{format.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{format.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional / funded-training format */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Organismes financeurs"
            title="Un format compatible avec les exigences des financeurs"
            description="OPCO, employeurs publics, associations : chaque programme peut être structuré selon le cadre attendu par les financeurs de la formation professionnelle"
          />

          <div className="rounded-2xl border border-warm/20 bg-warm/5 p-6 sm:p-10">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
              {fundingChecklist.map((item) => (
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
          <SectionHeading eyebrow="Méthode" title="Une pédagogie pragmatique" className="mx-auto" />
          <div className="card-surface p-8 sm:p-10 text-left space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Chaque formation part de vos cas d'usage réels — pas d'exemples génériques. On travaille sur vos documents, vos processus et vos outils, pour que les compétences soient utilisables dès le lendemain.
            </p>
            <p>
              Cette approche « apprendre en faisant » est celle que j'applique depuis 2017 comme Formateur Professionnel d'Adultes certifié d'État, d'abord en anglais professionnel puis sur SAP : peu de théorie, beaucoup de pratique guidée, et un droit à l'erreur assumé pendant l'apprentissage.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-14 sm:py-24 bg-ia-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid-dark" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Un besoin spécifique ?</h2>
          <p className="text-xl mb-8 text-white/85">
            Décrivez votre contexte et je vous propose un programme adapté à vos outils et à votre secteur
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

export default Formations;
