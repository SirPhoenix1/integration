"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full h-full max-w-[50%] py-16 mx-auto stretch items-center">
      <ScrollArea className="w-full h-full p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl text-center text-muted-foreground">
              Here you can use our AI to recall your content, receive advice,
              feedback, and more.
            </p>
          </div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              <div>
                <div className="font-bold text-lg">{m.role}</div>
                <p className="text-lg">{m.content}</p>
              </div>
            </div>
          ))
        )}
      </ScrollArea>

      <form
        onSubmit={handleSubmit}
        className="flex items-center mt-4 gap-3 max-w-lg min-w-[50%] max-h-lg min-h-[5%]"
      >
        <Input
          className="w-full h-full p-2 border border-gray-300 rounded-3xl shadow-xl text-lg"
          value={input}
          placeholder="Write here..."
          onChange={handleInputChange}
        />
        <Button type="submit" className="shadow-xl h-full rounded-3xl text-lg">
          Send
        </Button>
      </form>
    </div>
  );
}
