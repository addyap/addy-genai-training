import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Loader2, CheckCircle2, Clock, MapPin, ArrowRight, AlertCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';

interface ProgramResult {
  titre: string;
  objectifs: string[];
  duree_suggeree: string;
  format_suggere: string;
  points_cles: string[];
}

const EXAMPLE = "10 personnes de l'équipe marketing, aucune expérience de l'IA, elles veulent produire du contenu plus vite sans perdre en qualité.";

const generatorJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Générateur de programme de formation IA",
  "applicationCategory": "EducationalApplication",
  "description": "Outil qui génère un aperçu de programme de formation IA générative à partir d'un besoin décrit en langage naturel",
  "inLanguage": "fr"
};

const GenerateurProgramme = () => {
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ProgramResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/generate-program', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ context }),
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

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Générateur de Programme de Formation IA (démo) | Antony Addy"
        description="Décrivez votre équipe et votre besoin, obtenez en quelques secondes un aperçu de programme de formation en IA générative — une démonstration de prompt engineering appliqué."
        keywords={["générateur programme formation IA", "démo prompt engineering", "outil IA gratuit formation"]}
        jsonLd={generatorJsonLd}
      />

      <section className="relative py-14 sm:py-20 bg-secondary/40 overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid" />
        <div className="relative max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary animate-fade-in-up">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Démonstration
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-in-up animate-delay-100">
            Générateur de programme de formation
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in-up animate-delay-200">
            Décrivez votre équipe et votre besoin, obtenez un premier aperçu de programme en quelques secondes
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="card-surface p-6 sm:p-8">
            <Label htmlFor="context">Votre équipe et votre besoin</Label>
            <Textarea
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={4}
              maxLength={600}
              placeholder={EXAMPLE}
              className="mt-1.5"
              required
            />
            <p className="text-xs text-muted-foreground mt-1.5">{context.length} / 600</p>

            <Button type="submit" size="lg" className="w-full mt-4" disabled={loading || context.trim().length < 15}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Génération en cours…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Générer un aperçu de programme
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
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">{result.titre}</h2>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1.5 text-sm font-medium">
                  <Clock className="h-3.5 w-3.5" /> {result.duree_suggeree}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1.5 text-sm font-medium">
                  <MapPin className="h-3.5 w-3.5" /> {result.format_suggere}
                </span>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mb-3">Objectifs pédagogiques — être capable de :</p>
              <ul className="space-y-2.5 mb-6">
                {result.objectifs.map((obj) => (
                  <li key={obj} className="flex items-start text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-warm mr-2.5 mt-0.5 flex-shrink-0" />
                    {obj}
                  </li>
                ))}
              </ul>

              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mb-3">Contenu abordé :</p>
              <ul className="space-y-2.5">
                {result.points_cles.map((pt) => (
                  <li key={pt} className="flex items-start text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="border-t border-border mt-6 pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Aperçu généré automatiquement à titre indicatif — chaque programme réel est affiné ensemble, sur vos outils et vos cas d'usage précis.
                </p>
                <Link to="/contact">
                  <Button size="lg">
                    Affiner ce programme avec moi
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

export default GenerateurProgramme;
