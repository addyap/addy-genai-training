const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const DEFAULT_MODEL = 'claude-haiku-4-5-20251001';

export interface ToolCallOptions {
  system: string;
  userMessage: string;
  toolName: string;
  toolDescription: string;
  inputSchema: Record<string, unknown>;
  maxTokens?: number;
}

export class AnthropicConfigError extends Error {}
export class AnthropicRequestError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// Calls the Anthropic Messages API with a forced tool call so the response
// is guaranteed-structured JSON rather than free-form text we'd have to parse.
export async function callAnthropicTool<T>(options: ToolCallOptions): Promise<T> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new AnthropicConfigError('ANTHROPIC_API_KEY is not configured');
  }

  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || DEFAULT_MODEL,
      max_tokens: options.maxTokens ?? 800,
      system: options.system,
      messages: [{ role: 'user', content: options.userMessage }],
      tools: [
        {
          name: options.toolName,
          description: options.toolDescription,
          input_schema: options.inputSchema,
        },
      ],
      tool_choice: { type: 'tool', name: options.toolName },
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new AnthropicRequestError(`Anthropic API error (${response.status}): ${errText.slice(0, 300)}`, response.status);
  }

  const data = await response.json();
  const toolUse = (data.content || []).find((block: { type: string }) => block.type === 'tool_use');

  if (!toolUse) {
    throw new AnthropicRequestError('No structured response returned by the model', 502);
  }

  return toolUse.input as T;
}
