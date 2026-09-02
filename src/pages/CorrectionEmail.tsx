import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wand2, Loader2, Lightbulb, Copy, Check, ArrowRight, AlertCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { useLocale, localizePath, useT, type Locale } from '@/i18n';

interface EmailResult {
  corrected_text: string;
  improvements: string[];
}

const EXAMPLE = "Hello, I am writing you because I want to know if you are available for a meeting next week. Please tell me your disponibility.";

const CONTENT = {
  fr: {
    seoTitle: "Correcteur d'Email Professionnel en Anglais",
    seoDesc: "Collez un email professionnel en anglais, obtenez une version corrigée par IA avec une explication pédagogique de chaque amélioration.",
    keywords: ["correcteur email anglais", "améliorer anglais professionnel IA", "outil IA anglais des affaires"],
    badge: 'Démonstration',
    h1: "Correcteur d'email professionnel en anglais",
    lede: "Un aperçu concret de ce que l'IA générative permet, à la croisée de mes deux domaines de formation",
    fieldLabel: 'Votre email (en anglais)',
    correcting: 'Correction en cours…',
    improve: 'Améliorer mon email',
    genericError: 'Une erreur est survenue.',
    networkError: "Impossible de contacter le service. Vérifiez votre connexion et réessayez.",
    copied: 'Email copié',
    copyFailTitle: 'Copie impossible',
    copyFailDesc: 'Sélectionnez le texte manuellement.',
    correctedVersion: 'Version corrigée',
    copy: 'Copier',
    copiedShort: 'Copié',
    whatImproved: 'Ce qui a été amélioré',
    disclaimer: "Cet outil illustre une démarche pédagogique — vérifiez toujours un email sensible vous-même avant envoi. Pour aller plus loin en anglais professionnel, je propose aussi des formations dédiées.",
    talkTraining: "Discuter d'une formation",
  },
  en: {
    seoTitle: 'Professional English Email Corrector',
    seoDesc: "Paste a professional email in English and get an AI-corrected version with a teaching explanation of every improvement.",
    keywords: ["English email corrector", "improve business English with AI", "business English AI tool"],
    badge: 'Demonstration',
    h1: 'Professional English email corrector',
    lede: "A concrete glimpse of what generative AI makes possible, where my two training fields meet",
    fieldLabel: 'Your email (in English)',
    correcting: 'Correcting…',
    improve: 'Improve my email',
    genericError: 'An error occurred.',
    networkError: "Couldn't reach the service. Check your connection and try again.",
    copied: 'Email copied',
    copyFailTitle: 'Copy failed',
    copyFailDesc: 'Select the text manually.',
    correctedVersion: 'Corrected version',
    copy: 'Copy',
    copiedShort: 'Copied',
    whatImproved: 'What was improved',
    disclaimer: "This tool illustrates a teaching approach — always check a sensitive email yourself before sending. To go further in business English, I also offer dedicated training.",
    talkTraining: 'Talk about training',
  },
} satisfies Record<Locale, unknown>;

const CorrectionEmail = () => {
  const locale = useLocale();
  const t = useT(CONTENT) as typeof CONTENT['fr'];
  const lp = (href: string) => localizePath(href, locale);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EmailResult | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/correct-email', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text, locale }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t.genericError);
        return;
      }

      setResult(data);
    } catch {
      setError(t.networkError);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.corrected_text);
      setCopied(true);
      toast({ title: t.copied });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: t.copyFailTitle, description: t.copyFailDesc, variant: "destructive" });
    }
  };

  const correctorJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t.h1,
    "applicationCategory": "EducationalApplication",
    "description": t.seoDesc,
    "inLanguage": locale,
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        keywords={t.keywords}
        jsonLd={correctorJsonLd}
      />

      <section className="relative py-14 sm:py-20 bg-secondary/40 overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid" />
        <div className="relative max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary animate-fade-in-up">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-in-up animate-delay-100">
            {t.h1}
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in-up animate-delay-200">
            {t.lede}
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="card-surface p-6 sm:p-8">
            <Label htmlFor="email-text">{t.fieldLabel}</Label>
            <Textarea
              id="email-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              maxLength={3000}
              placeholder={EXAMPLE}
              className="mt-1.5"
              required
            />
            <p className="text-xs text-muted-foreground mt-1.5">{text.length} / 3000</p>

            <Button type="submit" size="lg" className="w-full mt-4" disabled={loading || text.trim().length < 15}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t.correcting}
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  {t.improve}
                </>
              )}
            </Button>

            {error && (
              <p className="flex items-start gap-2 text-sm text-destructive mt-4">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                {error}
              </p>
            )}
          </form>

          {result && (
            <div className="card-surface p-6 sm:p-8 mt-6 animate-fade-in-up">
              <div className="flex items-center justify-between gap-4 mb-3">
                <h2 className="font-display text-lg font-semibold text-foreground">{t.correctedVersion}</h2>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline shrink-0"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? t.copiedShort : t.copy}
                </button>
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap mb-6">
                {result.corrected_text}
              </div>

              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mb-3">
                <Lightbulb className="h-3.5 w-3.5 text-warm" /> {t.whatImproved}
              </p>
              <ul className="space-y-2.5">
                {result.improvements.map((imp) => (
                  <li key={imp} className="flex items-start text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-warm rounded-full mr-3 mt-2 flex-shrink-0" />
                    {imp}
                  </li>
                ))}
              </ul>

              <div className="border-t border-border mt-6 pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  {t.disclaimer}
                </p>
                <Link to={lp('/contact')}>
                  <Button size="lg">
                    {t.talkTraining}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CorrectionEmail;
