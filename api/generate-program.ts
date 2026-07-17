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

const SYSTEM_PROMPT = `Tu es un formateur professionnel d'adultes certifié d'État, spécialisé en intelligence artificielle générative (ChatGPT, Claude, Gemini, Copilot, automatisation, création visuelle par IA). On te décrit un besoin de formation en une ou deux phrases. Tu dois proposer un aperçu de programme de formation, en français, réaliste et actionnable — pas une liste marketing vague. Les objectifs pédagogiques doivent être formulés en compétences ("être capable de..."), dans le style utilisé par les organismes de formation français. Reste concret et propose un contenu qui correspond précisément au public et au besoin décrits, pas un programme générique.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Méthode non autorisée' });
    return;
  }

  const context = typeof req.body?.context === 'string' ? req.body.context.trim() : '';

  if (context.length < MIN_LENGTH) {
    res.status(400).json({ error: `Décrivez votre besoin en au moins ${MIN_LENGTH} caractères.` });
    return;
  }

  if (context.length > MAX_LENGTH) {
    res.status(400).json({ error: `Merci de rester sous ${MAX_LENGTH} caractères.` });
    return;
  }

  try {
    const result = await callAnthropicTool<ProgramResult>({
      system: SYSTEM_PROMPT,
      userMessage: `Besoin décrit par le visiteur : "${context}"`,
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
      res.status(503).json({ error: "Cet outil n'est pas encore configuré. Réessayez plus tard ou contactez-nous directement." });
      return;
    }
    if (err instanceof AnthropicRequestError) {
      res.status(502).json({ error: "Le service de génération est momentanément indisponible. Réessayez dans quelques instants." });
      return;
    }
    res.status(500).json({ error: "Une erreur inattendue est survenue." });
  }
}
