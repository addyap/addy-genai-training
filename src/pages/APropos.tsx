import { Link } from 'react-router-dom';
import { MessageSquare, ImageIcon, Workflow, FileSpreadsheet } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { Button } from '../components/ui/button';

const expertise = [
  { title: "IA conversationnelle", description: "Usage quotidien de ChatGPT, Claude et Gemini pour la rédaction, la recherche et l'aide à la décision", icon: MessageSquare },
  { title: "Création visuelle", description: "Génération d'images et de vidéos pour la communication et le contenu", icon: ImageIcon },
  { title: "Automatisation", description: "Mise en place d'agents et d'automatisations pour gagner du temps sur les tâches répétitives", icon: Workflow },
  { title: "Bureautique augmentée", description: "Copilot et Gemini intégrés à Word, Excel, Outlook et Google Workspace", icon: FileSpreadsheet },
];

const qualifications = [
  "Formateur Professionnel d'Adultes (FPA), certifié d'État depuis 2017",
  "Pratique quotidienne des outils d'IA générative dans son activité de formateur",
  "Expérience de formation professionnelle en anglais des affaires et en SAP Gestion des Matériaux",
  "SIRET : 483 178 893 00028",
];

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "À propos d'Antony Addy - Formateur en IA Générative",
  "description": "Formateur Professionnel d'Adultes certifié d'État, utilisateur quotidien de l'IA générative, proposant des formations pratiques en France",
  "provider": {
    "@type": "Person",
    "name": "Antony Addy",
    "jobTitle": "Formateur en IA Générative"
  },
  "serviceType": "Formation IA Générative",
  "areaServed": ["France"],
  "inLanguage": "fr"
};

const APropos = () => {
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="À propos d'Antony Addy - Formateur en IA Générative"
        description="Antony Addy, Formateur Professionnel d'Adultes certifié d'État depuis 2017, utilisateur quotidien de l'IA générative, propose des formations pratiques en entreprise et pour indépendants."
        keywords={["Antony Addy", "formateur IA générative", "formateur professionnel d'adultes", "FPA", "Fréjus"]}
        jsonLd={aboutJsonLd}
      />

      {/* Hero */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-primary/10 to-[hsl(var(--ia-navy))]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Formateur professionnel, utilisateur quotidien de l'IA générative
            </h1>
            <p className="text-xl text-primary mb-8 font-medium">
              De l'anglais professionnel à SAP, puis à l'intelligence artificielle générative
            </p>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Formateur Professionnel d'Adultes certifié d'État depuis 2017, j'ai construit mon activité sur une conviction simple : une compétence ne s'acquiert vraiment qu'en la pratiquant sur des cas réels. C'est cette approche que j'ai appliquée à la formation en anglais professionnel, puis à la formation SAP Gestion des Matériaux.
              </p>
              <p>
                J'utilise aujourd'hui l'intelligence artificielle générative au quotidien dans mon activité : préparation de supports de cours, rédaction, automatisation de tâches administratives, création de contenus pédagogiques. Cette pratique intensive et concrète est le socle de cette nouvelle offre de formation.
              </p>
              <p>
                C'est une offre que je lance aujourd'hui : je n'ai pas encore d'historique de missions de formation dédiées à l'IA générative, mais j'y apporte la même rigueur pédagogique et la même exigence de résultats concrets que sur mes autres domaines de formation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Domaines Pratiqués</h2>
            <p className="text-xl text-gray-600">Des usages testés et utilisés dans mon activité, avant d'être enseignés</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {expertise.map((item, index) => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-6 text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Qualifications Professionnelles</h2>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Formation & Expérience</h3>
                <ul className="space-y-3">
                  {qualifications.map((qualification) => (
                    <li key={qualification} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600">{qualification}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Approche Pédagogique</h3>
                <p className="text-gray-600 mb-4">
                  Chaque formation part de vos cas d'usage réels : on travaille sur vos documents, vos outils et vos processus.
                </p>
                <p className="text-gray-600">
                  Formations personnalisées, adaptées à votre secteur d'activité et au niveau de départ des participants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-ia-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Envie d'échanger sur votre projet ?</h2>
          <p className="text-xl mb-8 text-white/85">
            Contactez-moi pour discuter de vos besoins et construire un programme sur mesure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" onClick={handleNavClick}>
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Contactez-moi
              </Button>
            </Link>
            <Link to="/formations" onClick={handleNavClick}>
              <Button variant="outline" size="lg" className="border-white text-white bg-white/10 hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold backdrop-blur-sm">
                Voir mes formations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default APropos;
