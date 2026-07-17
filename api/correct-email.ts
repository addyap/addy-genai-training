import type { VercelRequest, VercelResponse } from '@vercel/node';
import { callAnthropicTool, AnthropicConfigError, AnthropicRequestError } from './_lib/anthropic.js';

const MIN_LENGTH = 15;
const MAX_LENGTH = 3000;

interface EmailCorrectionResult {
  corrected_text: string;
  improvements: string[];
}

const SYSTEM_PROMPT = `Tu es un formateur professionnel d'adultes certifié d'État, spécialisé en anglais des affaires et en intelligence artificielle générative. On te soumet un email professionnel en anglais (parfois écrit par un francophone, avec des tournures françaises ou des erreurs). Tu dois produire une version corrigée et améliorée, dans un anglais professionnel naturel, en conservant le sens et le ton voulus par l'auteur (ne pas ajouter de contenu qui n'était pas demandé). Explique ensuite, en français et en quelques puces courtes et pédagogiques, les principales améliorations apportées (grammaire, formulations trop littéralement traduites du français, registre de politesse professionnel anglophone, clarté).`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Méthode non autorisée' });
    return;
  }

  const text = typeof req.body?.text === 'string' ? req.body.text.trim() : '';

  if (text.length < MIN_LENGTH) {
    res.status(400).json({ error: `Collez un texte d'au moins ${MIN_LENGTH} caractères.` });
    return;
  }

  if (text.length > MAX_LENGTH) {
    res.status(400).json({ error: `Merci de rester sous ${MAX_LENGTH} caractères.` });
    return;
  }

  try {
    const result = await callAnthropicTool<EmailCorrectionResult>({
      system: SYSTEM_PROMPT,
      userMessage: `Email à corriger et améliorer :\n\n${text}`,
      toolName: 'correction_email',
      toolDescription: "Fournit une version anglaise professionnelle corrigée de l'email, avec une explication pédagogique des améliorations.",
      inputSchema: {
        type: 'object',
        properties: {
          corrected_text: { type: 'string', description: "Version corrigée et améliorée de l'email, en anglais professionnel" },
          improvements: {
            type: 'array',
            items: { type: 'string' },
            description: 'Entre 2 et 5 explications courtes, en français, des principales corrections apportées',
          },
        },
        required: ['corrected_text', 'improvements'],
      },
      maxTokens: 900,
    });

    res.status(200).json(result);
  } catch (err) {
    if (err instanceof AnthropicConfigError) {
      res.status(503).json({ error: "Cet outil n'est pas encore configuré. Réessayez plus tard ou contactez-nous directement." });
      return;
    }
    if (err instanceof AnthropicRequestError) {
      res.status(502).json({ error: "Le service de correction est momentanément indisponible. Réessayez dans quelques instants." });
      return;
    }
    res.status(500).json({ error: "Une erreur inattendue est survenue." });
  }
}
