import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
});

export interface req {
  context: string;
  prompt: string;
}

export const chosenModel = google("models/gemini-1.5-flash-latest");
