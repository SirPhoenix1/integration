"use client";

import { generateAIResponse } from "@/app/actions";
import { getTonePrompt, Tone } from "@/lib/ai/ai-utils";
import {
  system_prompt_continue,
  system_prompt_extend,
  system_prompt_grammar,
  system_prompt_reduce,
  system_prompt_review,
  system_prompt_summarize,
} from "@/lib/ai/system-prompts";
import { readStreamableValue } from "ai/rsc";
import { useState } from "react";

export const useAI = () => {
  const [response, setResponse] = useState("");

  const generateTone = async (tone: Tone, context: string) => {
    if (context.trim().length === 0) return;

    const prompt = getTonePrompt(tone);
    const result = await generateAIResponse(prompt + " The text: " + context);
    for await (const content of readStreamableValue(result)) {
      setResponse(content as string);
    }
  };

  const generateGrammar = async (context: string) => {
    if (context.trim().length === 0) return;

    const prompt = system_prompt_grammar;
    const result = await generateAIResponse(prompt + " The text: " + context);
    for await (const content of readStreamableValue(result)) {
      setResponse(content as string);
    }
  };

  const generateExtend = async (context: string) => {
    if (context.trim().length === 0) return;

    const prompt = system_prompt_extend;
    const result = await generateAIResponse(prompt + " The text: " + context);
    for await (const content of readStreamableValue(result)) {
      setResponse(content as string);
    }
  };

  const generateReduce = async (context: string) => {
    if (context.trim().length === 0) return;

    const prompt = system_prompt_reduce;
    const result = await generateAIResponse(prompt + " The text: " + context);
    for await (const content of readStreamableValue(result)) {
      setResponse(content as string);
    }
  };

  const generateContinue = async (context: string) => {
    if (context.trim().length === 0) return;

    const prompt = system_prompt_continue;
    const result = await generateAIResponse(prompt + " The text: " + context);
    for await (const content of readStreamableValue(result)) {
      setResponse(content as string);
    }
  };

  const generateSummarize = async (context: string) => {
    if (context.trim().length === 0) return;

    const prompt = system_prompt_summarize;
    const result = await generateAIResponse(prompt + " The text: " + context);
    for await (const content of readStreamableValue(result)) {
      setResponse(content as string);
    }
  };

  const generateReview = async (context: string) => {
    if (context.trim().length === 0) return;

    const prompt = system_prompt_review;
    const result = await generateAIResponse(prompt + " The text: " + context);
    for await (const content of readStreamableValue(result)) {
      setResponse(content as string);
    }
  };

  const generateCustom = async (prompt: string, context?: string) => {
    if (context && context.trim().length !== 0) {
      const result = await generateAIResponse(prompt + " The text: " + context);
      for await (const content of readStreamableValue(result)) {
        setResponse(content as string);
      }
    } else {
      const result = await generateAIResponse(prompt);
      for await (const content of readStreamableValue(result)) {
        setResponse(content as string);
      }
    }
  };

  return {
    response,
    generateContinue,
    generateExtend,
    generateGrammar,
    generateReduce,
    generateSummarize,
    generateTone,
    generateReview,
    generateCustom,
  };
};

export type AI = {
  response: string;
  generateTone: (tone: Tone, context: string) => Promise<void>;
  generateGrammar: (context: string) => Promise<void>;
  generateExtend: (context: string) => Promise<void>;
  generateReduce: (context: string) => Promise<void>;
  generateContinue: (context: string) => Promise<void>;
  generateSummarize: (context: string) => Promise<void>;
  generateReview: (context: string) => Promise<void>;
};
