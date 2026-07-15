import { Link } from 'react-router-dom';
import { MessageSquare, ImageIcon, Workflow, FileSpreadsheet, ShieldCheck } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { Button } from '../components/ui/button';

const services = [
  {
    icon: MessageSquare,
    title: "IA conversationnelle & prompt engineering",
    description: "Utiliser ChatGPT, Claude ou Gemini comme de vrais outils de travail, pas comme des gadgets.",
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
    icon: "🏢",
  },
  {
    title: "Formation à Distance",
    description: "Sessions en visioconférence, aussi interactives et concrètes qu'en présentiel.",
    icon: "💻",
  },
  {
    title: "Accompagnement Individuel",
    description: "Pour les indépendants : un format resserré, centré sur votre activité et vos cas d'usage réels.",
    icon: "🎯",
  },
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
        title="Formations IA Générative : Prompt Engineering, Automatisation, Bureautique | Antony Addy"
        description="Détail des formations en intelligence artificielle générative : IA conversationnelle, création visuelle, automatisation et agents IA, IA intégrée à la bureautique. Pour entreprises et indépendants."
        keywords={["formation prompt engineering", "formation ChatGPT", "formation Copilot", "formation automatisation IA", "formation Midjourney", "formation IA entreprise", "formation IA éthique", "formation IA RGPD", "formation IA OPCO", "cahier des charges formation IA"]}
        jsonLd={servicesJsonLd}
      />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-[hsl(var(--ia-navy))]/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Des formations IA générative pour un usage concret, immédiat
          </h1>
          <p className="text-xl text-gray-600 mb-4 animate-fade-in-up animate-delay-100">
            Quatre compétences, adaptables à vos outils, votre secteur et votre niveau de départ
          </p>
          <p className="text-sm text-gray-600 mb-8 animate-fade-in-up animate-delay-100">
            Formateur Professionnel d'Adultes certifié d'État depuis 2017
          </p>
          <div className="animate-fade-in-up animate-delay-200">
            <Link to="/contact" onClick={handleNavClick}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                Construire mon programme de formation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services detail */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="bg-gray-50 rounded-xl p-8 shadow-lg hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-5">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Être capable de :</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm text-gray-600">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Cross-cutting: responsible use, ethics, RGPD */}
          <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-8">
            <div className="flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <responsibleUse.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{responsibleUse.title}</h3>
                <p className="text-gray-600 mb-6">{responsibleUse.description}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Être capable de :</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {responsibleUse.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm text-gray-600">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Formats */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Formats de Formation</h2>
            <p className="text-xl text-gray-600">Choisissez le format qui convient le mieux à vos besoins</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainingFormats.map((format, index) => (
              <div
                key={format.title}
                className="bg-white rounded-xl p-8 shadow-lg text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{format.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{format.title}</h3>
                <p className="text-gray-600">{format.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional / funded-training format */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Un format compatible avec les exigences des organismes financeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              OPCO, employeurs publics, associations : chaque programme peut être structuré selon le cadre attendu par les financeurs de la formation professionnelle
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 shadow-lg">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <li className="flex items-start text-gray-600">
                <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span>Objectifs pédagogiques formulés en compétences (« être capable de… »)</span>
              </li>
              <li className="flex items-start text-gray-600">
                <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span>Formats multi-journées avec intersession, pour mettre en pratique entre les sessions</span>
              </li>
              <li className="flex items-start text-gray-600">
                <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span>Groupes de 8 à 14 participants, en présentiel ou à distance</span>
              </li>
              <li className="flex items-start text-gray-600">
                <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span>Mises en situation, jeux de rôle et travail sur des cas vécus par les participants</span>
              </li>
              <li className="flex items-start text-gray-600">
                <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span>Évaluation à chaud (orale et écrite) et suivi à distance après la formation</span>
              </li>
              <li className="flex items-start text-gray-600">
                <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span>Programme adaptable au cahier des charges d'un appel d'offres ou d'un marché</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Une pédagogie pragmatique</h2>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 shadow-lg space-y-4 text-gray-600">
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
      <section className="py-20 bg-ia-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Un besoin spécifique ?</h2>
          <p className="text-xl mb-8 text-white/85">
            Décrivez votre contexte et je vous propose un programme adapté à vos outils et à votre secteur
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" onClick={handleNavClick}>
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Demander un devis
              </Button>
            </Link>
            <a href="https://wa.me/33649829826" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button variant="outline" size="lg" className="border-white text-white bg-white/10 hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold backdrop-blur-sm">
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
