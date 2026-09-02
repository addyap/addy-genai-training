// Platforms Antony designed and built with AI, showcased on the homepage as
// proof of hands-on AI capability ("I don't just teach it — I ship with it").
// Descriptions and accents mirror the antonyaddy.com/ressources-en-ligne cards.

import type { Locale } from '@/i18n';

export interface Creation {
  name: string;
  url: string;
  tag: string;
  description: string;
  /** Tailwind gradient classes for the card's top band. */
  accent: string;
}

interface CreationSource {
  name: string;
  url: string;
  accent: string;
  tag: Record<Locale, string>;
  description: Record<Locale, string>;
}

const SOURCE: CreationSource[] = [
  {
    name: 'Anglais à distance',
    url: 'https://anglaisadistance.fr',
    accent: 'from-blue-500 to-indigo-600',
    tag: { fr: 'Pour les francophones', en: 'For French speakers' },
    description: {
      fr: "Plateforme d'exercices d'anglais pour francophones : des centaines d'activités interactives corrigées instantanément, pour progresser à son rythme.",
      en: 'An English-practice platform for French speakers: hundreds of interactive activities graded instantly, to progress at your own pace.',
    },
  },
  {
    name: 'Grammatica',
    url: 'https://grammatica.antonyaddy.com',
    accent: 'from-emerald-500 to-teal-600',
    tag: { fr: 'Guide multilingue', en: 'Multilingual guide' },
    description: {
      fr: "Guide de grammaire anglaise multilingue : des explications claires, dans la langue maternelle de l'apprenant, pour enfin comprendre les règles qui bloquent.",
      en: "A multilingual English-grammar guide: clear explanations in the learner's own language, to finally grasp the rules that get in the way.",
    },
  },
  {
    name: 'ListenUp',
    url: 'https://listening.antonyaddy.com',
    accent: 'from-violet-500 to-purple-600',
    tag: { fr: 'Compréhension orale', en: 'Listening skills' },
    description: {
      fr: "Entraînement à la compréhension orale : exercices audio interactifs, voix générées par IA, quiz et traductions en plus de dix langues.",
      en: 'Listening practice: interactive audio exercises, AI-generated voices, quizzes and translations in more than ten languages.',
    },
  },
  {
    name: 'TOEIC Prep',
    url: 'https://toeic.antonyaddy.com',
    accent: 'from-amber-500 to-orange-600',
    tag: { fr: 'Préparation TOEIC', en: 'TOEIC preparation' },
    description: {
      fr: "Préparation complète au TOEIC : entraînements ciblés, tests blancs au format réel et stratégies concrètes pour viser le score visé.",
      en: 'Complete TOEIC preparation: targeted drills, full mock tests in the real format and concrete strategies to reach your target score.',
    },
  },
  {
    name: 'CLOE Prep',
    url: 'https://cloe.antonyaddy.com',
    accent: 'from-rose-500 to-pink-600',
    tag: { fr: 'Préparation CLOE', en: 'CLOE preparation' },
    description: {
      fr: "Préparation dédiée à la certification CLOE : exercices calés sur le format de l'épreuve, pour aborder l'examen avec méthode et confiance.",
      en: 'Dedicated CLOE-certification prep: exercises matched to the exam format, to approach the test with method and confidence.',
    },
  },
  {
    name: "Entraîneur d'anglais oral IA",
    url: 'https://speak.antonyaddy.com',
    accent: 'from-cyan-500 to-sky-600',
    tag: { fr: 'Expression orale', en: 'Speaking practice' },
    description: {
      fr: "Entraîneur d'expression orale propulsé par l'IA : dialoguez à voix haute et recevez un retour instantané sur votre prononciation et votre aisance.",
      en: 'An AI-powered speaking coach: talk out loud and get instant feedback on your pronunciation and fluency.',
    },
  },
];

/** Localized creation cards for the given locale. */
export function getCreations(locale: Locale): Creation[] {
  return SOURCE.map((c) => ({
    name: c.name,
    url: c.url,
    accent: c.accent,
    tag: c.tag[locale],
    description: c.description[locale],
  }));
}

/** French default kept for any legacy import. */
export const CREATIONS: Creation[] = getCreations('fr');
