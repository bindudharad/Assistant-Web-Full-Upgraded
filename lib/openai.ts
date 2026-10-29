import type { ChatCompletionRequestMessage } from 'openai';
import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.warn('OPENAI_API_KEY not set — OpenAI calls will fail until you set it in .env');
}

const client = new OpenAI({ apiKey: apiKey ?? '' });

export async function callOpenAI(messages: ChatCompletionRequestMessage[]) {
  // Wrapper: returns assistant reply text
  const resp = await client.chat.completions.create({
    model: 'gpt-4o-mini', // change if needed
    messages,
    max_tokens: 600,
  });
  const text = resp.choices?.[0]?.message?.content ?? '';
  return String(text);
}
