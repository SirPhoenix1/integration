import { useWordCounter } from "@/hooks/editor/use-word-counter";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";

interface WordCounterProps {
  editor: Editor;
}

const WordCounter = ({ editor }: WordCounterProps) => {
  const counter = useWordCounter();

  return (
    <div
      className={cn(
        "text-sm text-gray-600 absolute bottom-3 right-3",
        counter.isOpen ? "block" : "hidden"
      )}
    >
      {"Word Count: " + editor.storage.characterCount.words()}
    </div>
  );
};

export default WordCounter;
