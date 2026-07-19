import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wand2, Loader2, Lightbulb, Copy, Check, ArrowRight, AlertCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

interface EmailResult {
  corrected_text: string;
  improvements: string[];
}

const EXAMPLE = "Hello, I am writing you because I want to know if you are available for a meeting next week. Please tell me your disponibility.";

const correctorJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Correcteur d'email professionnel en anglais",
  "applicationCategory": "EducationalApplication",
  "description": "Outil qui corrige et améliore un email professionnel en anglais, avec explication pédagogique des corrections",
  "inLanguage": "fr"
};

const CorrectionEmail = () => {
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
        body: JSON.stringify({ text }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue.");
        return;
      }

      setResult(data);
    } catch {
      setError("Impossible de contacter le service. Vérifiez votre connexion et réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.corrected_text);
      setCopied(true);
      toast({ title: "Email copié" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Copie impossible", description: "Sélectionnez le texte manuellement.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Correcteur d'Email Professionnel en Anglais"
        description="Collez un email professionnel en anglais, obtenez une version corrigée par IA avec une explication pédagogique de chaque amélioration."
        keywords={["correcteur email anglais", "améliorer anglais professionnel IA", "outil IA anglais des affaires"]}
        jsonLd={correctorJsonLd}
      />

      <section className="relative py-14 sm:py-20 bg-secondary/40 overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid" />
        <div className="relative max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary animate-fade-in-up">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Démonstration
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-in-up animate-delay-100">
            Correcteur d'email professionnel en anglais
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in-up animate-delay-200">
            Un aperçu concret de ce que l'IA générative permet, à la croisée de mes deux domaines de formation
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="card-surface p-6 sm:p-8">
            <Label htmlFor="email-text">Votre email (en anglais)</Label>
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
                  Correction en cours…
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Améliorer mon email
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
                <h2 className="font-display text-lg font-semibold text-foreground">Version corrigée</h2>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline shrink-0"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copié' : 'Copier'}
                </button>
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap mb-6">
                {result.corrected_text}
              </div>

              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mb-3">
                <Lightbulb className="h-3.5 w-3.5 text-warm" /> Ce qui a été amélioré
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
                  Cet outil illustre une démarche pédagogique — vérifiez toujours un email sensible vous-même avant envoi. Pour aller plus loin en anglais professionnel, je propose aussi des formations dédiées.
                </p>
                <Link to="/contact">
                  <Button size="lg">
                    Discuter d'une formation
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
