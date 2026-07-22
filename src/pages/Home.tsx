import { Link } from 'react-router-dom';
import { MessageSquare, ImageIcon, Workflow, FileSpreadsheet, Building2, User, ShieldCheck, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import HeroSection from '../components/home/HeroSection';
import SectionHeading from '../components/SectionHeading';
import { Button } from '../components/ui/button';

const pillars = [
  {
    icon: MessageSquare,
    title: "IA conversationnelle & prompt engineering",
    description: "Utiliser ChatGPT, Claude ou Gemini efficacement : formuler les bonnes consignes, structurer un échange et obtenir des résultats fiables pour la rédaction, l'organisation du travail et l'aide à la décision.",
    tone: "bg-primary/10 text-primary",
    link: { to: "/generateur-programme", label: "Essayer le générateur de programme" },
  },
  {
    icon: ImageIcon,
    title: "Création visuelle par IA",
    description: "Générer des images et des vidéos avec des outils comme Midjourney, DALL·E ou Sora pour la communication, le marketing et la création de contenu, sans compétences graphiques préalables.",
    tone: "bg-fuchsia-500/10 text-fuchsia-600",
    link: { to: "/ressources#prompt-visuel", label: "Guide : bien prompter le visuel" },
  },
  {
    icon: Workflow,
    title: "Automatisation & agents IA",
    description: "Connecter l'IA à vos outils du quotidien pour automatiser les tâches répétitives — tri d'emails, comptes rendus, veille, reporting — grâce à des agents simples à mettre en place.",
    tone: "bg-indigo-500/10 text-indigo-600",
    link: { to: "/ressources#automatisation", label: "Guide : identifier une tâche à automatiser" },
  },
  {
    icon: FileSpreadsheet,
    title: "IA intégrée à la bureautique",
    description: "Exploiter Copilot (Microsoft 365) ou Gemini (Google Workspace) directement dans Word, Excel, Outlook ou Docs pour rédiger, synthétiser et analyser plus vite.",
    tone: "bg-sky-500/10 text-sky-600",
    link: { to: "/ressources#bureautique", label: "Bibliothèque de prompts" },
  },
];

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Antony Addy — Formation IA Générative",
  "description": "Formations en intelligence artificielle générative pour entreprises et indépendants",
  "url": "https://ia.antonyaddy.com",
  "founder": {
    "@type": "Person",
    "name": "Antony Addy",
    "jobTitle": "Formateur en IA Générative"
  },
  "areaServed": ["France"],
  "serviceType": "Formation IA Générative",
  "inLanguage": "fr"
};

const Home = () => {
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Formation IA Générative en Entreprise | Antony Addy"
        description="Formations pratiques en IA générative (ChatGPT, Claude, Copilot) pour entreprises et indépendants, par un formateur certifié d'État. Basé en France."
        keywords={["formation IA générative", "formation ChatGPT entreprise", "formateur intelligence artificielle", "prompt engineering formation", "Copilot formation", "formation IA responsable", "formation IA RGPD", "formation IA OPCO", "formation IA Fréjus"]}
        jsonLd={homeJsonLd}
      />

      <HeroSection />

      {/* Pillars */}
      <section className="relative py-14 sm:py-24 bg-white overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-96 bg-dot-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Compétences"
            title="Quatre compétences clés, quatre usages concrets"
            description="Chaque formation part d'un besoin réel : gagner du temps, produire plus vite, décider mieux"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className="card-surface relative overflow-hidden p-6 sm:p-8 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="index-numeral absolute top-4 right-6 select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl mb-5 ${pillar.tone}`}>
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="relative font-display text-lg font-semibold text-foreground mb-3 pr-10">{pillar.title}</h3>
                <p className="relative text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                {pillar.link && (
                  <Link to={pillar.link.to} className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                    {pillar.link.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Cross-cutting: responsible use, ethics, RGPD */}
          <div className="mt-5 sm:mt-6 relative overflow-hidden rounded-2xl border border-warm/25 bg-warm/5 p-6 sm:p-8 animate-fade-in-up animate-delay-300">
            <div className="absolute inset-0 bg-dot-grid opacity-60" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warm text-warm-foreground shadow-glow-warm">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">Un cadre responsable, à chaque formation</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  Risques éthiques et juridiques, protection des données personnelles (RGPD), fiabilité des réponses générées : chaque module intègre un temps dédié pour développer un regard critique et un usage sécurisé de l'IA, pas seulement sa prise en main technique.
                </p>
                <Link to="/diagnostic" onClick={handleNavClick} className="inline-flex items-center gap-1.5 text-sm font-medium text-warm hover:underline">
                  Évaluer la maturité IA responsable de mon organisation
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/formations" onClick={handleNavClick}>
              <Button size="lg">
                Découvrir le détail des formations
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
            eyebrow="Pour qui"
            title="Deux publics, une même exigence"
            description="Deux approches — un même objectif : rendre l'IA générative utile au quotidien"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="card-surface p-8 sm:p-10 animate-fade-in-up">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6">
                <Building2 className="h-7 w-7" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-3">Entreprises</h3>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Formez vos équipes à un usage sûr et productif de l'IA générative : cadrage des usages, ateliers pratiques adaptés à chaque métier (RH, marketing, support, direction) et montée en compétence collective.
              </p>
              <p className="text-sm font-medium text-primary">Formations en intra, sur site ou à distance →</p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-ia-navy p-8 sm:p-10 text-white shadow-card-hover animate-fade-in-up animate-delay-100">
              <div className="absolute inset-0 bg-dot-grid-dark" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-white mb-6">
                  <User className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-white mb-3">Indépendants</h3>
                <p className="text-white/70 leading-relaxed mb-5">
                  Gagnez du temps et de la clarté dans votre activité : apprenez à utiliser l'IA générative pour la rédaction, la création de contenu et l'organisation, avec un accompagnement individuel adapté à votre métier.
                </p>
                <p className="text-sm font-medium text-primary-foreground/90">Sessions individuelles, en visio ou en présentiel →</p>
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
                Mon parcours
              </div>
              <p className="font-display text-2xl sm:text-3xl font-semibold text-foreground leading-snug mb-6">
                « J'utilise l'intelligence artificielle générative au quotidien dans mon activité de formateur — préparation de supports, automatisation de tâches administratives, création de contenus pédagogiques. »
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Je lance aujourd'hui une offre de formation dédiée pour transmettre ces usages concrets, avec la même exigence pédagogique que j'applique depuis 2017 comme Formateur Professionnel d'Adultes certifié d'État, d'abord en anglais professionnel puis en SAP.
              </p>
              <Link to="/a-propos" onClick={handleNavClick} className="inline-block mt-6">
                <Button variant="outline" size="lg">
                  En savoir plus sur mon parcours
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="lg:col-span-4">
              <div className="card-surface p-8 text-center">
                <div className="font-display text-5xl font-bold text-gradient mb-2">2017</div>
                <p className="text-sm text-muted-foreground">Formateur Professionnel d'Adultes certifié d'État</p>
                <div className="h-px bg-border my-6" />
                <div className="font-display text-5xl font-bold text-gradient-warm mb-2">2026</div>
                <p className="text-sm text-muted-foreground">Lancement de l'offre IA générative</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-14 sm:py-24 bg-ia-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid-dark" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Prêt à passer à l'action avec l'IA générative ?
          </h2>
          <p className="text-xl mb-8 text-white/85">
            Discutons de vos besoins et construisons ensemble un programme de formation sur mesure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" onClick={handleNavClick}>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-none">
                Demander un devis
              </Button>
            </Link>
            <a href="https://wa.me/33649829826" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button variant="outline" size="lg" className="border-white/30 text-white bg-white/10 hover:bg-white hover:text-primary backdrop-blur-sm">
                Consultation WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
