import { useState } from 'react';
import { MapPin, Mail, MessageCircle, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

const trainingOptions = [
  "Formation en présentiel (entreprises)",
  "Formation à distance",
  "Accompagnement individuel (indépendants)",
  "Programme sur-mesure selon vos outils",
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `Demande de formation IA générative de ${formData.name}`;
    const body = `Nom: ${formData.name}
Email: ${formData.email}
Entreprise: ${formData.company}

Demande de formation IA générative:
${formData.message}`;

    const mailtoLink = `mailto:ia@antonyaddy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    toast({
      title: "Client email ouvert",
      description: "Votre client email par défaut devrait s'ouvrir avec le message pré-rempli.",
    });

    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact - Formation IA Générative",
    "description": "Contactez Antony Addy pour une formation en intelligence artificielle générative",
    "mainEntity": {
      "@type": "Person",
      "name": "Antony Addy",
      "jobTitle": "Formateur en IA Générative",
      "telephone": "+33649829826",
      "email": "ia@antonyaddy.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Fréjus",
        "addressCountry": "France"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+33649829826",
        "contactType": "Customer Service",
        "availableLanguage": ["French"]
      }
    },
    "inLanguage": "fr"
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Contact - Formation IA Générative | Antony Addy"
        description="Contactez Antony Addy pour une formation en intelligence artificielle générative. Disponible pour des programmes sur site et à distance en France."
        keywords={["contact", "formation IA générative", "devis formation", "consultation IA", "Antony Addy", "Fréjus"]}
        jsonLd={contactJsonLd}
      />

      {/* Hero */}
      <section className="relative py-14 sm:py-20 bg-secondary/40 overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary animate-fade-in-up">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Contact
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-in-up animate-delay-100">
            Démarrons votre projet de formation IA
          </h1>
          <p className="text-xl text-primary mb-4 font-medium animate-fade-in-up animate-delay-200">
            Prêt à intégrer l'IA générative dans votre quotidien ?
          </p>
          <p className="text-lg text-muted-foreground mb-6 animate-fade-in-up animate-delay-200">
            Discutons de vos besoins et construisons ensemble un programme de formation adapté
          </p>
          <p className="text-sm text-muted-foreground mb-6 animate-fade-in-up animate-delay-200">
            Formateur Professionnel d'Adultes certifié d'État depuis 2017
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up animate-delay-300">
            <span className="inline-flex items-center gap-2 bg-white rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground shadow-card">
              <MapPin className="h-4 w-4 text-primary" /> Basé à Fréjus, France
            </span>
            <span className="inline-flex items-center gap-2 bg-white rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground shadow-card">
              Disponible partout en France
            </span>
            <span className="inline-flex items-center gap-2 bg-white rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground shadow-card">
              Présentiel ou visio
            </span>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in-up">
              <div className="card-surface p-6 sm:p-8">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-2">Demander des informations</h2>
                <p className="text-muted-foreground mb-6">
                  Remplissez le formulaire ci-dessous et je vous répondrai dans les 24 heures avec une proposition adaptée
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} placeholder="Votre nom complet" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} placeholder="votre@email.com" className="mt-1.5" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company">Entreprise</Label>
                    <Input id="company" name="company" type="text" value={formData.company} onChange={handleInputChange} placeholder="Nom de votre entreprise (si applicable)" className="mt-1.5" />
                  </div>

                  <div>
                    <Label htmlFor="message">Besoins de Formation *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="mt-1.5"
                      placeholder="Décrivez vos besoins : sujet (prompt engineering, création visuelle, automatisation, bureautique augmentée), nombre de participants, format préféré (présentiel/distanciel), planning, etc."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Envoyer la demande
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="animate-fade-in-up animate-delay-200 space-y-6">
              <div className="card-surface p-6 sm:p-8">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Informations de contact</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">Localisation</h3>
                      <p className="text-muted-foreground">Fréjus, France</p>
                      <p className="text-sm text-muted-foreground">Disponible pour la formation sur site en France et sessions en visio</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">Email</h3>
                      <a href="mailto:ia@antonyaddy.com" className="text-primary hover:underline">ia@antonyaddy.com</a>
                      <p className="text-sm text-muted-foreground mt-1">Réponse sous 24 heures</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600/10 text-green-600">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">WhatsApp</h3>
                      <a href="https://wa.me/33649829826" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                        Consultation rapide
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">Messagerie instantanée pour les demandes urgentes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Training Options */}
              <div className="card-surface p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-5">Options de formation disponibles</h2>
                <ul className="space-y-3.5">
                  {trainingOptions.map((option) => (
                    <li key={option} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-muted-foreground">{option}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://wa.me/33649829826" target="_blank" rel="noopener noreferrer" className="block flex-1">
                  <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white shadow-none">
                    <MessageCircle className="h-4 w-4" />
                    Consultation WhatsApp
                  </Button>
                </a>
                <a href="mailto:ia@antonyaddy.com" className="block flex-1">
                  <Button variant="outline" size="lg" className="w-full">
                    <Mail className="h-4 w-4" />
                    Envoyer un email
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
