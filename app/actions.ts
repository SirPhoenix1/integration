"use server";

import { createStreamableValue } from "ai/rsc";
import { streamText } from "ai";
import { chosenModel } from "@/lib/ai/models";

const DEFAULT_MAX_LENGTH = 50;

export async function generateAIResponse(prompt: string) {
  const maxTokens =
    prompt.length > DEFAULT_MAX_LENGTH ? prompt.length : DEFAULT_MAX_LENGTH;

  const result = await streamText({
    model: chosenModel,
    prompt,
    maxTokens,
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}
