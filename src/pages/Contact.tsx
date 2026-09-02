import { useState } from 'react';
import { MapPin, Mail, MessageCircle, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { useLocale, useT, type Locale } from '@/i18n';

const CONTENT = {
  fr: {
    seoTitle: 'Contact - Formation IA Générative | Antony Addy',
    seoDesc: "Contactez Antony Addy pour une formation en intelligence artificielle générative. Programmes sur site et à distance en France, animés en français ou en anglais.",
    keywords: ["contact", "formation IA générative", "devis formation", "consultation IA", "Antony Addy", "Fréjus", "formation IA en anglais"],
    badge: 'Contact',
    h1: 'Démarrons votre projet de formation IA',
    lede: "Prêt à intégrer l'IA générative dans votre quotidien ?",
    sub: "Discutons de vos besoins et construisons ensemble un programme de formation adapté",
    certified: "Formateur Professionnel d'Adultes certifié d'État depuis 2017",
    based: 'Basé à Fréjus, France',
    everywhere: 'Disponible partout en France',
    onsiteOrVideo: 'Présentiel ou visio',
    formTitle: 'Demander des informations',
    formSub: "Remplissez le formulaire ci-dessous et je vous répondrai dans les 24 heures avec une proposition adaptée",
    nameLabel: 'Nom complet *', namePlaceholder: 'Votre nom complet',
    emailLabel: 'Email *', emailPlaceholder: 'votre@email.com',
    companyLabel: 'Entreprise', companyPlaceholder: 'Nom de votre entreprise (si applicable)',
    messageLabel: 'Besoins de Formation *',
    messagePlaceholder: "Décrivez vos besoins : sujet (prompt engineering, création visuelle, automatisation, bureautique augmentée), nombre de participants, format préféré (présentiel/distanciel), planning, etc.",
    send: 'Envoyer la demande',
    toastTitle: 'Client email ouvert',
    toastDesc: "Votre client email par défaut devrait s'ouvrir avec le message pré-rempli.",
    infoTitle: 'Informations de contact',
    locationTitle: 'Localisation',
    locationBody: 'Fréjus, France',
    locationNote: 'Disponible pour la formation sur site en France et sessions en visio',
    emailTitle: 'Email', emailNote: 'Réponse sous 24 heures',
    whatsappTitle: 'WhatsApp', whatsappLink: 'Consultation rapide', whatsappNote: 'Messagerie instantanée pour les demandes urgentes',
    optionsTitle: 'Options de formation disponibles',
    options: [
      "Formation en présentiel (entreprises)",
      "Formation à distance",
      "Accompagnement individuel (indépendants)",
      "Sous-traitance pour centres de formation certifiés Qualiopi",
      "Programme sur-mesure selon vos outils",
      "Formation en français ou en anglais",
    ],
    quickWhatsApp: 'Consultation WhatsApp',
    quickEmail: 'Envoyer un email',
    subject: (name: string) => `Demande de formation IA générative de ${name}`,
    bodyLabels: { name: 'Nom', email: 'Email', company: 'Entreprise', request: "Demande de formation IA générative:" },
  },
  en: {
    seoTitle: 'Contact — Generative AI Training | Antony Addy',
    seoDesc: "Contact Antony Addy for generative-AI training. On-site and remote programmes across France, delivered in French or English.",
    keywords: ["contact", "generative AI training", "training quote", "AI consultation", "Antony Addy", "Fréjus", "AI training in English"],
    badge: 'Contact',
    h1: "Let's start your AI training project",
    lede: "Ready to bring generative AI into your everyday work?",
    sub: "Let's discuss your needs and build a training programme that fits",
    certified: "State-certified adult-education trainer since 2017",
    based: 'Based in Fréjus, France',
    everywhere: 'Available across France',
    onsiteOrVideo: 'On-site or video',
    formTitle: 'Request information',
    formSub: "Fill in the form below and I'll reply within 24 hours with a tailored proposal",
    nameLabel: 'Full name *', namePlaceholder: 'Your full name',
    emailLabel: 'Email *', emailPlaceholder: 'you@email.com',
    companyLabel: 'Company', companyPlaceholder: 'Your company name (if applicable)',
    messageLabel: 'Training needs *',
    messagePlaceholder: "Describe your needs: topic (prompt engineering, visual creation, automation, augmented office suite), number of participants, preferred format (on-site/remote), schedule, etc.",
    send: 'Send request',
    toastTitle: 'Email client opened',
    toastDesc: "Your default email client should open with the message pre-filled.",
    infoTitle: 'Contact information',
    locationTitle: 'Location',
    locationBody: 'Fréjus, France',
    locationNote: 'Available for on-site training across France and video sessions',
    emailTitle: 'Email', emailNote: 'Reply within 24 hours',
    whatsappTitle: 'WhatsApp', whatsappLink: 'Quick consultation', whatsappNote: 'Instant messaging for urgent enquiries',
    optionsTitle: 'Available training options',
    options: [
      "On-site training (companies)",
      "Remote training",
      "One-to-one coaching (independent professionals)",
      "Subcontracting for Qualiopi-certified training centres",
      "Tailor-made programme based on your tools",
      "Training in French or English",
    ],
    quickWhatsApp: 'WhatsApp consultation',
    quickEmail: 'Send an email',
    subject: (name: string) => `Generative AI training enquiry from ${name}`,
    bodyLabels: { name: 'Name', email: 'Email', company: 'Company', request: "Generative AI training request:" },
  },
} satisfies Record<Locale, unknown>;

const Contact = () => {
  const locale = useLocale();
  const t = useT(CONTENT) as typeof CONTENT['fr'];
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

    const L = t.bodyLabels;
    const subject = t.subject(formData.name);
    const body = `${L.name}: ${formData.name}
${L.email}: ${formData.email}
${L.company}: ${formData.company}

${L.request}
${formData.message}`;

    const mailtoLink = `mailto:formations@antonyaddy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    toast({
      title: t.toastTitle,
      description: t.toastDesc,
    });

    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": locale === 'en' ? "Contact — Generative AI Training" : "Contact - Formation IA Générative",
    "description": locale === 'en' ? "Contact Antony Addy for generative-AI training" : "Contactez Antony Addy pour une formation en intelligence artificielle générative",
    "mainEntity": {
      "@type": "Person",
      "name": "Antony Addy",
      "jobTitle": locale === 'en' ? "Generative AI Trainer" : "Formateur en IA Générative",
      "telephone": "+33649829826",
      "email": "formations@antonyaddy.com",
      "sameAs": ["https://www.linkedin.com/in/antonyaddy/"],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Fréjus",
        "addressCountry": "France"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+33649829826",
        "contactType": "Customer Service",
        "availableLanguage": ["French", "English"]
      }
    },
    "inLanguage": locale
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        keywords={t.keywords}
        jsonLd={contactJsonLd}
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
          <p className="text-xl text-primary mb-4 font-medium animate-fade-in-up animate-delay-200">
            {t.lede}
          </p>
          <p className="text-lg text-muted-foreground mb-6 animate-fade-in-up animate-delay-200">
            {t.sub}
          </p>
          <p className="text-sm text-muted-foreground mb-6 animate-fade-in-up animate-delay-200">
            {t.certified}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up animate-delay-300">
            <span className="inline-flex items-center gap-2 bg-white rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground shadow-card">
              <MapPin className="h-4 w-4 text-primary" /> {t.based}
            </span>
            <span className="inline-flex items-center gap-2 bg-white rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground shadow-card">
              {t.everywhere}
            </span>
            <span className="inline-flex items-center gap-2 bg-white rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground shadow-card">
              {t.onsiteOrVideo}
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
                <h2 className="font-display text-2xl font-semibold text-foreground mb-2">{t.formTitle}</h2>
                <p className="text-muted-foreground mb-6">
                  {t.formSub}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{t.nameLabel}</Label>
                      <Input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} placeholder={t.namePlaceholder} className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="email">{t.emailLabel}</Label>
                      <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} placeholder={t.emailPlaceholder} className="mt-1.5" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company">{t.companyLabel}</Label>
                    <Input id="company" name="company" type="text" value={formData.company} onChange={handleInputChange} placeholder={t.companyPlaceholder} className="mt-1.5" />
                  </div>

                  <div>
                    <Label htmlFor="message">{t.messageLabel}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="mt-1.5"
                      placeholder={t.messagePlaceholder}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    {t.send}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="animate-fade-in-up animate-delay-200 space-y-6">
              <div className="card-surface p-6 sm:p-8">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6">{t.infoTitle}</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{t.locationTitle}</h3>
                      <p className="text-muted-foreground">{t.locationBody}</p>
                      <p className="text-sm text-muted-foreground">{t.locationNote}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{t.emailTitle}</h3>
                      <a href="mailto:formations@antonyaddy.com" className="text-primary hover:underline">formations@antonyaddy.com</a>
                      <p className="text-sm text-muted-foreground mt-1">{t.emailNote}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600/10 text-green-600">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{t.whatsappTitle}</h3>
                      <a href="https://wa.me/33649829826" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                        {t.whatsappLink}
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">{t.whatsappNote}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Training Options */}
              <div className="card-surface p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-5">{t.optionsTitle}</h2>
                <ul className="space-y-3.5">
                  {t.options.map((option) => (
                    <li key={option} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-warm shrink-0" />
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
                    {t.quickWhatsApp}
                  </Button>
                </a>
                <a href="mailto:formations@antonyaddy.com" className="block flex-1">
                  <Button variant="outline" size="lg" className="w-full">
                    <Mail className="h-4 w-4" />
                    {t.quickEmail}
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
