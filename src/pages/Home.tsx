import { Link } from 'react-router-dom';
import { MessageSquare, ImageIcon, Workflow, FileSpreadsheet, Building2, User, ShieldCheck } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import HeroSection from '../components/home/HeroSection';
import { Button } from '../components/ui/button';

const pillars = [
  {
    icon: MessageSquare,
    title: "IA conversationnelle & prompt engineering",
    description: "Utiliser ChatGPT, Claude ou Gemini efficacement : formuler les bonnes consignes, structurer un échange et obtenir des résultats fiables pour la rédaction, la recherche et l'aide à la décision.",
  },
  {
    icon: ImageIcon,
    title: "Création visuelle par IA",
    description: "Générer des images et des vidéos avec des outils comme Midjourney, DALL·E ou Sora pour la communication, le marketing et la création de contenu, sans compétences graphiques préalables.",
  },
  {
    icon: Workflow,
    title: "Automatisation & agents IA",
    description: "Connecter l'IA à vos outils du quotidien pour automatiser les tâches répétitives — tri d'emails, comptes rendus, veille, reporting — grâce à des agents simples à mettre en place.",
  },
  {
    icon: FileSpreadsheet,
    title: "IA intégrée à la bureautique",
    description: "Exploiter Copilot (Microsoft 365) ou Gemini (Google Workspace) directement dans Word, Excel, Outlook ou Docs pour rédiger, synthétiser et analyser plus vite.",
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
        title="Formation IA Générative pour Entreprises et Indépendants | Antony Addy"
        description="Formations pratiques en intelligence artificielle générative (ChatGPT, Claude, Copilot, automatisation) par un formateur professionnel d'adultes certifié d'État. Entreprises et indépendants, en France."
        keywords={["formation IA générative", "formation ChatGPT entreprise", "formateur intelligence artificielle", "prompt engineering formation", "Copilot formation", "formation IA responsable", "formation IA RGPD", "formation IA OPCO", "formation IA Fréjus"]}
        jsonLd={homeJsonLd}
      />

      <HeroSection />

      {/* Pillars */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Quatre compétences clés, quatre usages concrets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chaque formation part d'un besoin réel : gagner du temps, produire plus vite, décider mieux
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className="bg-white rounded-xl p-8 shadow-lg hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-5">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{pillar.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>

          {/* Cross-cutting: responsible use, ethics, RGPD */}
          <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 animate-fade-in-up animate-delay-300">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Un cadre responsable, à chaque formation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Risques éthiques et juridiques, protection des données personnelles (RGPD), fiabilité des réponses générées : chaque module intègre un temps dédié pour développer un regard critique et un usage sécurisé de l'IA, pas seulement sa prise en main technique.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/formations" onClick={handleNavClick}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                Découvrir le détail des formations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Audience split */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pour qui ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deux publics, deux approches — un même objectif : rendre l'IA générative utile au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-gray-200 p-8 hover-lift animate-fade-in-up">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-5">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Entreprises</h3>
              <p className="text-gray-600 mb-4">
                Formez vos équipes à un usage sûr et productif de l'IA générative : cadrage des usages, ateliers pratiques adaptés à chaque métier (RH, marketing, support, direction) et montée en compétence collective.
              </p>
              <p className="text-sm text-gray-500">Formations en intra, sur site ou à distance.</p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-8 hover-lift animate-fade-in-up animate-delay-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-5">
                <User className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Indépendants</h3>
              <p className="text-gray-600 mb-4">
                Gagnez du temps et de la clarté dans votre activité : apprenez à utiliser l'IA générative pour la rédaction, la création de contenu et l'organisation, avec un accompagnement individuel adapté à votre métier.
              </p>
              <p className="text-sm text-gray-500">Sessions individuelles, en visio ou en présentiel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach teaser */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Une nouvelle offre, portée par une pratique quotidienne de l'IA
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            J'utilise l'intelligence artificielle générative au quotidien dans mon activité de formateur — préparation de supports, automatisation de tâches administratives, création de contenus pédagogiques. Je lance aujourd'hui une offre de formation dédiée pour transmettre ces usages concrets, avec la même exigence pédagogique que j'applique depuis 2017 comme Formateur Professionnel d'Adultes certifié d'État, d'abord en anglais professionnel puis en SAP.
          </p>
          <Link to="/a-propos" onClick={handleNavClick}>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground mt-4">
              En savoir plus sur mon parcours
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ia-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Prêt à passer à l'action avec l'IA générative ?
          </h2>
          <p className="text-xl mb-8 text-white/85">
            Discutons de vos besoins et construisons ensemble un programme de formation sur mesure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" onClick={handleNavClick}>
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Demander un devis
              </Button>
            </Link>
            <a href="https://wa.me/33649829826" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button variant="outline" size="lg" className="border-white text-white bg-white/10 hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold backdrop-blur-sm">
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
