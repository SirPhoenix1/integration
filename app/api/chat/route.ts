import { createResource } from "@/lib/actions/resources";
import { convertToCoreMessages, streamText, tool } from "ai";
import { z } from "zod";
import { chosenModel } from "@/lib/ai/models";
import { ConvexHttpClient } from "convex/browser";

const maxDuration = 30;
const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const SYSTEM_PROMPT = `You are a helpful assistant. Check your knowledge base before answering any questions.
    Only respond to questions using information from tool calls.
    if no relevant information is found in the tool calls, respond, "Sorry, I don't know."`;
const schema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["system", "user", "assistant"]),
      content: z.string(),
    })
  ),
});

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = schema.parse(body);

  const result = await streamText({
    model: chosenModel,
    system: SYSTEM_PROMPT,
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
