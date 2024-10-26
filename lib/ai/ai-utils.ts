// The following are functions and variables for the use of the ai.
// Any interaction with the ai api will require editing here.

import {
  system_prompt_tone_DARK,
  system_prompt_tone_DRAMATIC,
  system_prompt_tone_HUMOROUS,
  system_prompt_tone_MYSTERIOUS,
  system_prompt_tone_OPTIMISTIC,
  system_prompt_tone_PESSIMISTIC,
  system_prompt_tone_ROMANTIC,
  system_prompt_tone_SUSPENSEFUL,
} from "./system-prompts";

// SET TONE

// Tones for the reqTone function.
export enum Tone {
  HUMOROUS = "humorous",
  SUSPENSEFUL = "suspenseful",
  ROMANTIC = "romantic",
  DARK = "dark",
  OPTIMISTIC = "optimistic",
  PESSIMISTIC = "pessimistic",
  MYSTERIOUS = "mysterious",
  DRAMATIC = "dramatic",
}

// Descriptions for the prompt of the reqTone function.
const tonePrompts: Record<Tone, string> = {
  [Tone.HUMOROUS]: system_prompt_tone_HUMOROUS,
  [Tone.SUSPENSEFUL]: system_prompt_tone_SUSPENSEFUL,
  [Tone.ROMANTIC]: system_prompt_tone_ROMANTIC,
  [Tone.DARK]: system_prompt_tone_DARK,
  [Tone.OPTIMISTIC]: system_prompt_tone_OPTIMISTIC,
  [Tone.PESSIMISTIC]: system_prompt_tone_PESSIMISTIC,
  [Tone.MYSTERIOUS]: system_prompt_tone_MYSTERIOUS,
  [Tone.DRAMATIC]: system_prompt_tone_DRAMATIC,
};

// A mapping of a Tone and its description.
// The tone is used for convenience, the description for the prompt.
export const getTonePrompt = (tone: Tone): string => {
  return tonePrompts[tone];
};
