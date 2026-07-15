import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';

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
    <div className="min-h-screen pt-20">
      <SEOHead
        title="Contact - Formation IA Générative | Antony Addy"
        description="Contactez Antony Addy pour une formation en intelligence artificielle générative. Disponible pour des programmes sur site et à distance en France."
        keywords={["contact", "formation IA générative", "devis formation", "consultation IA", "Antony Addy", "Fréjus"]}
        jsonLd={contactJsonLd}
      />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-in-up">
            Démarrons votre projet de formation IA
          </h1>
          <p className="text-xl text-primary mb-4 font-medium animate-fade-in-up animate-delay-100">
            Prêt à intégrer l'IA générative dans votre quotidien ?
          </p>
          <p className="text-lg text-muted-foreground mb-6 animate-fade-in-up animate-delay-200">
            Discutons de vos besoins et construisons ensemble un programme de formation adapté
          </p>
          <p className="text-sm text-muted-foreground mb-6 animate-fade-in-up animate-delay-200">
            Formateur Professionnel d'Adultes certifié d'État depuis 2017
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up animate-delay-300">
            <span className="inline-flex items-center gap-2 bg-white rounded-full border border-primary/20 px-4 py-2 text-sm font-medium text-foreground shadow-sm">
              <span aria-hidden="true">📍</span> Basé à Fréjus, France
            </span>
            <span className="inline-flex items-center gap-2 bg-white rounded-full border border-primary/20 px-4 py-2 text-sm font-medium text-foreground shadow-sm">
              <span aria-hidden="true">🌍</span> Disponible partout en France
            </span>
            <span className="inline-flex items-center gap-2 bg-white rounded-full border border-primary/20 px-4 py-2 text-sm font-medium text-foreground shadow-sm">
              <span aria-hidden="true">💻</span> Sessions en présentiel ou en visio
            </span>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in-up">
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Demander des Informations</CardTitle>
                  <CardDescription>
                    Remplissez le formulaire ci-dessous et je vous répondrai dans les 24 heures avec une proposition adaptée
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} placeholder="Votre nom complet" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} placeholder="votre@email.com" className="mt-1" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company">Entreprise</Label>
                      <Input id="company" name="company" type="text" value={formData.company} onChange={handleInputChange} placeholder="Nom de votre entreprise (si applicable)" className="mt-1" />
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
                        className="mt-1"
                        placeholder="Décrivez vos besoins : sujet (prompt engineering, création visuelle, automatisation, bureautique augmentée), nombre de participants, format préféré (présentiel/distanciel), planning, etc."
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Envoyer la Demande
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="animate-fade-in-up animate-delay-200">
              <div className="space-y-8">
                <Card className="shadow-xl border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl text-foreground">Informations de Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xl" role="img" aria-label="Localisation">
                        📍
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Localisation</h3>
                        <p className="text-muted-foreground">Fréjus, France</p>
                        <p className="text-sm text-muted-foreground">Disponible pour la formation sur site en France et sessions en visio</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xl" role="img" aria-label="Email">
                        📧
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Email</h3>
                        <a href="mailto:ia@antonyaddy.com" className="text-primary hover:underline">ia@antonyaddy.com</a>
                        <p className="text-sm text-muted-foreground mt-1">Réponse sous 24 heures</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white text-xl" role="img" aria-label="WhatsApp">
                        💬
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">WhatsApp</h3>
                        <a href="https://wa.me/33649829826" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                          Consultation Rapide
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">Messagerie instantanée pour les demandes urgentes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Training Options */}
                <Card className="shadow-xl border-0">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">Options de Formation Disponibles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">Formation en Présentiel (entreprises)</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">Formation à Distance</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">Accompagnement Individuel (indépendants)</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">Programme sur-mesure selon vos outils</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="space-y-4">
                  <a href="https://wa.me/33649829826" target="_blank" rel="noopener noreferrer" className="block">
                    <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                      💬 Consultation WhatsApp
                    </Button>
                  </a>
                  <a href="mailto:ia@antonyaddy.com" className="block">
                    <Button variant="outline" size="lg" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      📧 Envoyer un Email
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
