// Platforms Antony designed and built with AI, showcased on the homepage as
// proof of hands-on AI capability ("I don't just teach it — I ship with it").
// Descriptions and accents mirror the antonyaddy.com/ressources-en-ligne cards.

export interface Creation {
  name: string;
  url: string;
  tag: string;
  description: string;
  /** Tailwind gradient classes for the card's top band. */
  accent: string;
}

export const CREATIONS: Creation[] = [
  {
    name: 'Anglais à distance',
    url: 'https://anglaisadistance.fr',
    tag: 'Pour les francophones',
    description:
      "Plateforme d'exercices d'anglais pour francophones : des centaines d'activités interactives corrigées instantanément, pour progresser à son rythme.",
    accent: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Grammatica',
    url: 'https://grammatica.antonyaddy.com',
    tag: 'Guide multilingue',
    description:
      "Guide de grammaire anglaise multilingue : des explications claires, dans la langue maternelle de l'apprenant, pour enfin comprendre les règles qui bloquent.",
    accent: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'ListenUp',
    url: 'https://listening.antonyaddy.com',
    tag: 'Compréhension orale',
    description:
      "Entraînement à la compréhension orale : exercices audio interactifs, voix générées par IA, quiz et traductions en plus de dix langues.",
    accent: 'from-violet-500 to-purple-600',
  },
  {
    name: 'TOEIC Prep',
    url: 'https://toeic.antonyaddy.com',
    tag: 'Préparation TOEIC',
    description:
      "Préparation complète au TOEIC : entraînements ciblés, tests blancs au format réel et stratégies concrètes pour viser le score visé.",
    accent: 'from-amber-500 to-orange-600',
  },
  {
    name: 'CLOE Prep',
    url: 'https://cloe.antonyaddy.com',
    tag: 'Préparation CLOE',
    description:
      "Préparation dédiée à la certification CLOE : exercices calés sur le format de l'épreuve, pour aborder l'examen avec méthode et confiance.",
    accent: 'from-rose-500 to-pink-600',
  },
  {
    name: "Entraîneur d'anglais oral IA",
    url: 'https://speak.antonyaddy.com',
    tag: 'Expression orale',
    description:
      "Entraîneur d'expression orale propulsé par l'IA : dialoguez à voix haute et recevez un retour instantané sur votre prononciation et votre aisance.",
    accent: 'from-cyan-500 to-sky-600',
  },
];
