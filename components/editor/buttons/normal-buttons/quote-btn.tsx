import type { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { Quote } from "lucide-react";

interface QuoteButtonProps {
  editor: Editor;
}

const QuoteButton = ({ editor }: QuoteButtonProps) => {
  return (
    <Toggle
      size="sm"
      pressed={editor.isActive("blockQuote")}
      onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      data-tooltip-id="quoteTooltip"
      data-tooltip-content="Quote Block"
      data-tooltip-place="bottom"
      className="toolBtn"
    >
      <Quote className="h-4 w-4" />
    </Toggle>
  );
};

export default QuoteButton;
