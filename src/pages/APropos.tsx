import { Link } from 'react-router-dom';
import { MessageSquare, ImageIcon, Workflow, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SectionHeading from '../components/SectionHeading';
import { Button } from '../components/ui/button';

const expertise = [
  { title: "IA conversationnelle", description: "Usage quotidien de ChatGPT, Claude et Gemini pour la rédaction, l'organisation du travail et l'aide à la décision", icon: MessageSquare, tone: "bg-primary/10 text-primary" },
  { title: "Création visuelle", description: "Génération d'images et de vidéos pour la communication et le contenu", icon: ImageIcon, tone: "bg-fuchsia-500/10 text-fuchsia-600" },
  { title: "Automatisation", description: "Mise en place d'agents et d'automatisations pour gagner du temps sur les tâches répétitives", icon: Workflow, tone: "bg-indigo-500/10 text-indigo-600" },
  { title: "Bureautique augmentée", description: "Copilot et Gemini intégrés à Word, Excel, Outlook et Google Workspace", icon: FileSpreadsheet, tone: "bg-sky-500/10 text-sky-600" },
];

const qualifications = [
  "Formateur Professionnel d'Adultes (FPA), certifié d'État depuis 2017",
  "Pratique quotidienne des outils d'IA générative dans son activité de formateur",
  "Expérience de formation professionnelle en anglais des affaires et en SAP Gestion des Matériaux",
  "Organisme de formation déclaré — NDA 93830738883 (DREETS Provence-Alpes-Côte d'Azur)",
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
        description="Formateur Professionnel d'Adultes certifié d'État depuis 2017, utilisateur quotidien de l'IA générative. Formations en entreprise et pour indépendants."
        keywords={["Antony Addy", "formateur IA générative", "formateur professionnel d'adultes", "FPA", "Fréjus"]}
        jsonLd={aboutJsonLd}
      />

      {/* Hero */}
      <section className="relative py-14 sm:py-24 bg-ia-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid-dark" />
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-5 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              À propos
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Formateur professionnel, utilisateur quotidien de l'IA générative
            </h1>
            <p className="text-xl text-gradient-light font-medium mb-8">
              De l'anglais professionnel à SAP, puis à l'intelligence artificielle générative
            </p>
            <div className="space-y-6 text-lg text-white/75 leading-relaxed">
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
      <section className="py-14 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Expertise"
            title="Domaines pratiqués"
            description="Des usages testés et utilisés dans mon activité, avant d'être enseignés"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {expertise.map((item, index) => (
              <div key={item.title} className="card-surface p-6 text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl mx-auto mb-4 ${item.tone}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-14 sm:py-24 bg-secondary/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Qualifications" title="Qualifications professionnelles" className="mx-auto" />

          <div className="card-surface p-6 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-5">Formation & Expérience</h3>
                <ul className="space-y-3.5">
                  {qualifications.map((qualification) => (
                    <li key={qualification} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-warm mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{qualification}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-5">Approche Pédagogique</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Chaque formation part de vos cas d'usage réels : on travaille sur vos documents, vos outils et vos processus.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Formations personnalisées, adaptées à votre secteur d'activité et au niveau de départ des participants.
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Envie d'échanger sur votre projet ?</h2>
          <p className="text-xl mb-8 text-white/85">
            Contactez-moi pour discuter de vos besoins et construire un programme sur mesure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" onClick={handleNavClick}>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-none">
                Contactez-moi
              </Button>
            </Link>
            <Link to="/formations" onClick={handleNavClick}>
              <Button variant="outline" size="lg" className="border-white/30 text-white bg-white/10 hover:bg-white hover:text-primary backdrop-blur-sm">
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
