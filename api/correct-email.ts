import type { VercelRequest, VercelResponse } from '@vercel/node';
import { callAnthropicTool, AnthropicConfigError, AnthropicRequestError } from './_lib/anthropic.js';

const MIN_LENGTH = 15;
const MAX_LENGTH = 3000;

interface EmailCorrectionResult {
  corrected_text: string;
  improvements: string[];
}

const SYSTEM_PROMPT_FR = `Tu es un formateur professionnel d'adultes certifié d'État, spécialisé en anglais des affaires et en intelligence artificielle générative. On te soumet un email professionnel en anglais (parfois écrit par un francophone, avec des tournures françaises ou des erreurs). Tu dois produire une version corrigée et améliorée, dans un anglais professionnel naturel, en conservant le sens et le ton voulus par l'auteur (ne pas ajouter de contenu qui n'était pas demandé). Explique ensuite, en français et en quelques puces courtes et pédagogiques, les principales améliorations apportées (grammaire, formulations trop littéralement traduites du français, registre de politesse professionnel anglophone, clarté).`;

const SYSTEM_PROMPT_EN = `You are a state-certified adult-education trainer specialised in business English and generative AI. You are given a professional email in English (sometimes written by a non-native speaker, with awkward phrasing or errors). Produce a corrected, improved version in natural professional English, keeping the author's intended meaning and tone (do not add content that wasn't requested). Then explain, in English and in a few short, teaching-oriented bullet points, the main improvements made (grammar, over-literal phrasing, professional English politeness register, clarity).`;

const COPY = {
  fr: {
    method: 'Méthode non autorisée',
    tooShort: `Collez un texte d'au moins ${MIN_LENGTH} caractères.`,
    tooLong: `Merci de rester sous ${MAX_LENGTH} caractères.`,
    userMessage: (text: string) => `Email à corriger et améliorer :\n\n${text}`,
    improvementsDesc: 'Entre 2 et 5 explications courtes, en français, des principales corrections apportées',
    notConfigured: "Cet outil n'est pas encore configuré. Réessayez plus tard ou contactez-nous directement.",
    unavailable: "Le service de correction est momentanément indisponible. Réessayez dans quelques instants.",
    unexpected: "Une erreur inattendue est survenue.",
  },
  en: {
    method: 'Method not allowed',
    tooShort: `Paste text of at least ${MIN_LENGTH} characters.`,
    tooLong: `Please keep it under ${MAX_LENGTH} characters.`,
    userMessage: (text: string) => `Email to correct and improve:\n\n${text}`,
    improvementsDesc: 'Between 2 and 5 short explanations, in English, of the main corrections made',
    notConfigured: "This tool isn't configured yet. Try again later or contact us directly.",
    unavailable: "The correction service is momentarily unavailable. Try again in a few moments.",
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

  const text = typeof req.body?.text === 'string' ? req.body.text.trim() : '';

  if (text.length < MIN_LENGTH) {
    res.status(400).json({ error: c.tooShort });
    return;
  }

  if (text.length > MAX_LENGTH) {
    res.status(400).json({ error: c.tooLong });
    return;
  }

  try {
    const result = await callAnthropicTool<EmailCorrectionResult>({
      system: locale === 'en' ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_FR,
      userMessage: c.userMessage(text),
      toolName: 'correction_email',
      toolDescription: "Fournit une version anglaise professionnelle corrigée de l'email, avec une explication pédagogique des améliorations.",
      inputSchema: {
        type: 'object',
        properties: {
          corrected_text: { type: 'string', description: "Version corrigée et améliorée de l'email, en anglais professionnel" },
          improvements: {
            type: 'array',
            items: { type: 'string' },
            description: c.improvementsDesc,
          },
        },
        required: ['corrected_text', 'improvements'],
      },
      maxTokens: 900,
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
