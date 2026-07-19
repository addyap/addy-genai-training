import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, RotateCcw } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { Button } from '../components/ui/button';

interface Question {
  id: string;
  question: string;
  options: { label: string; points: number }[];
}

const questions: Question[] = [
  {
    id: 'policy',
    question: "Votre organisation a-t-elle des consignes écrites sur l'usage de l'IA générative ?",
    options: [
      { label: "Non, aucune consigne", points: 0 },
      { label: "Des consignes informelles, orales", points: 1 },
      { label: "Oui, une politique écrite et diffusée", points: 2 },
    ],
  },
  {
    id: 'training',
    question: "Les collaborateurs qui utilisent l'IA générative ont-ils reçu une formation, même courte ?",
    options: [
      { label: "Non", points: 0 },
      { label: "Quelques-uns, de façon informelle", points: 1 },
      { label: "Oui, une formation structurée", points: 2 },
    ],
  },
  {
    id: 'data',
    question: "Savez-vous quelles données personnelles ou confidentielles sont (ou non) envoyées aux outils d'IA utilisés ?",
    options: [
      { label: "Non, pas de visibilité", points: 0 },
      { label: "Partiellement", points: 1 },
      { label: "Oui, c'est clairement défini", points: 2 },
    ],
  },
  {
    id: 'verification',
    question: "Les résultats produits par l'IA sont-ils relus et vérifiés avant utilisation ?",
    options: [
      { label: "Rarement", points: 0 },
      { label: "Parfois", points: 1 },
      { label: "Systématiquement", points: 2 },
    ],
  },
  {
    id: 'tools',
    question: "Savez-vous quels outils d'IA sont utilisés dans votre organisation, même de façon informelle ?",
    options: [
      { label: "Non", points: 0 },
      { label: "Partiellement", points: 1 },
      { label: "Oui, on a une visibilité claire", points: 2 },
    ],
  },
  {
    id: 'incident',
    question: "En cas de problème (donnée sensible exposée, erreur diffusée), un processus de réaction existe-t-il ?",
    options: [
      { label: "Non", points: 0 },
      { label: "On improviserait", points: 1 },
      { label: "Oui, un processus existe", points: 2 },
    ],
  },
];

const bands = [
  {
    max: 4,
    label: "Point de départ",
    message: "Vous êtes au tout début de votre réflexion sur l'IA responsable — c'est le moment idéal pour poser un cadre avant que les usages ne se multiplient de façon incontrôlée.",
    cta: "Discuter d'un premier cadrage",
  },
  {
    max: 8,
    label: "En construction",
    message: "Des bases existent, mais elles restent partielles ou informelles. Une formation ciblée peut structurer ces pratiques et les diffuser à toute l'équipe.",
    cta: "Voir les formations",
  },
  {
    max: 12,
    label: "Maîtrisé",
    message: "Votre organisation a posé un cadre solide. Le sujet à ce stade est souvent de le faire vivre dans la durée et de former les nouveaux arrivants.",
    cta: "Échanger sur la suite",
  },
];

const diagnosticJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Diagnostic IA responsable",
  "description": "Auto-évaluation gratuite de la maturité IA responsable d'une organisation",
  "inLanguage": "fr"
};

const Diagnostic = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionId: string, points: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: points }));
  };

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);
  const score = Object.values(answers).reduce((sum, p) => sum + p, 0);
  const band = bands.find((b) => score <= b.max) ?? bands[bands.length - 1];

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Diagnostic IA Responsable Gratuit | Antony Addy"
        description="Évaluez en 2 minutes la maturité IA responsable de votre organisation : politique d'usage, RGPD, formation. Résultat immédiat, aucune donnée transmise."
        keywords={["diagnostic IA responsable", "maturité IA entreprise", "auto-évaluation IA", "gouvernance IA RGPD"]}
        jsonLd={diagnosticJsonLd}
      />

      <section className="relative py-14 sm:py-20 bg-warm/5 overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid" />
        <div className="relative max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-5 rounded-full bg-warm/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-warm animate-fade-in-up">
            <span className="h-1.5 w-1.5 rounded-full bg-warm" />
            Diagnostic
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-in-up animate-delay-100">
            Où en est votre organisation sur l'IA responsable ?
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in-up animate-delay-200">
            6 questions, 2 minutes, résultat immédiat — rien n'est envoyé ni conservé, tout se passe dans votre navigateur
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {!submitted ? (
            <div className="space-y-6">
              {questions.map((q, index) => (
                <div key={q.id} className="card-surface p-6 sm:p-8">
                  <p className="font-display text-lg font-semibold text-foreground mb-4">
                    <span className="text-warm mr-2">{index + 1}.</span>{q.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {q.options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => handleAnswer(q.id, opt.points)}
                        className={`rounded-xl border p-3 text-sm text-left transition-all duration-200 ${
                          answers[q.id] === opt.points
                            ? 'border-primary bg-primary/10 text-primary font-medium'
                            : 'border-border text-muted-foreground hover:border-primary/30 hover:bg-secondary/40'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="text-center pt-4">
                <Button size="lg" disabled={!allAnswered} onClick={() => { setSubmitted(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Voir mon résultat
                  <ArrowRight className="h-4 w-4" />
                </Button>
                {!allAnswered && (
                  <p className="text-sm text-muted-foreground mt-3">Répondez aux 6 questions pour débloquer votre résultat</p>
                )}
              </div>
            </div>
          ) : (
            <div className="card-surface p-8 sm:p-12 text-center animate-fade-in-up">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-warm text-warm-foreground shadow-glow-warm mx-auto mb-6">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wider text-warm mb-2">{score} / 12</p>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">{band.label}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">{band.message}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/contact">
                  <Button size="lg">
                    {band.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4" />
                  Refaire le diagnostic
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Diagnostic;
