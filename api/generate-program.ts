import type { VercelRequest, VercelResponse } from '@vercel/node';
import { callAnthropicTool, AnthropicConfigError, AnthropicRequestError } from './_lib/anthropic.js';

const MIN_LENGTH = 15;
const MAX_LENGTH = 600;

interface ProgramResult {
  titre: string;
  objectifs: string[];
  duree_suggeree: string;
  format_suggere: string;
  points_cles: string[];
}

const SYSTEM_PROMPT_FR = `Tu es un formateur professionnel d'adultes certifié d'État, spécialisé en intelligence artificielle générative (ChatGPT, Claude, Gemini, Copilot, automatisation, création visuelle par IA). On te décrit un besoin de formation en une ou deux phrases. Tu dois proposer un aperçu de programme de formation, en français, réaliste et actionnable — pas une liste marketing vague. Les objectifs pédagogiques doivent être formulés en compétences ("être capable de..."), dans le style utilisé par les organismes de formation français. Reste concret et propose un contenu qui correspond précisément au public et au besoin décrits, pas un programme générique.`;

const SYSTEM_PROMPT_EN = `You are a state-certified adult-education trainer specialised in generative AI (ChatGPT, Claude, Gemini, Copilot, automation, AI visual creation). You are given a training need in one or two sentences. Propose a realistic, actionable training-programme outline, in English — not a vague marketing list. Learning objectives must be phrased as competencies ("be able to..."). Stay concrete and propose content that precisely matches the audience and need described, not a generic programme.`;

const COPY = {
  fr: {
    method: 'Méthode non autorisée',
    tooShort: `Décrivez votre besoin en au moins ${MIN_LENGTH} caractères.`,
    tooLong: `Merci de rester sous ${MAX_LENGTH} caractères.`,
    userMessage: (c: string) => `Besoin décrit par le visiteur : "${c}"`,
    notConfigured: "Cet outil n'est pas encore configuré. Réessayez plus tard ou contactez-nous directement.",
    unavailable: "Le service de génération est momentanément indisponible. Réessayez dans quelques instants.",
    unexpected: "Une erreur inattendue est survenue.",
  },
  en: {
    method: 'Method not allowed',
    tooShort: `Describe your need in at least ${MIN_LENGTH} characters.`,
    tooLong: `Please keep it under ${MAX_LENGTH} characters.`,
    userMessage: (c: string) => `Need described by the visitor: "${c}"`,
    notConfigured: "This tool isn't configured yet. Try again later or contact us directly.",
    unavailable: "The generation service is momentarily unavailable. Try again in a few moments.",
    unexpected: "An unexpected error occurred.",
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const locale: 'fr' | 'en' = req.body?.locale === 'en' ? 'en' : 'fr';
  const c = COPY[locale];

  if (req.method !== 'POST') {
    res.status(405).json({ error: c.method });
    return;
  }

  const context = typeof req.body?.context === 'string' ? req.body.context.trim() : '';

  if (context.length < MIN_LENGTH) {
    res.status(400).json({ error: c.tooShort });
    return;
  }

  if (context.length > MAX_LENGTH) {
    res.status(400).json({ error: c.tooLong });
    return;
  }

  try {
    const result = await callAnthropicTool<ProgramResult>({
      system: locale === 'en' ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_FR,
      userMessage: c.userMessage(context),
      toolName: 'programme_formation',
      toolDescription: "Structure un aperçu de programme de formation en IA générative adapté au besoin décrit.",
      inputSchema: {
        type: 'object',
        properties: {
          titre: { type: 'string', description: 'Titre court du programme proposé' },
          objectifs: {
            type: 'array',
            items: { type: 'string' },
            description: 'Entre 3 et 5 objectifs pédagogiques formulés en "être capable de..."',
          },
          duree_suggeree: { type: 'string', description: 'Durée suggérée, ex: "1 jour (7h)" ou "2 jours avec intersession"' },
          format_suggere: { type: 'string', description: 'Format suggéré, ex: "Présentiel en entreprise" ou "Accompagnement individuel à distance"' },
          points_cles: {
            type: 'array',
            items: { type: 'string' },
            description: 'Entre 3 et 5 points de contenu concrets qui seraient abordés',
          },
        },
        required: ['titre', 'objectifs', 'duree_suggeree', 'format_suggere', 'points_cles'],
      },
      maxTokens: 700,
    });

    res.status(200).json(result);
  } catch (err) {
    if (err instanceof AnthropicConfigError) {
      res.status(503).json({ error: c.notConfigured });
      return;
    }
    if (err instanceof AnthropicRequestError) {
      res.status(502).json({ error: c.unavailable });
      return;
    }
    res.status(500).json({ error: c.unexpected });
  }
}
