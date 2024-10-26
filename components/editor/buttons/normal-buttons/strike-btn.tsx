import type { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { Strikethrough } from "lucide-react";
import { cn } from "@/lib/utils";

interface StrikeButtonProps {
  editor: Editor;
}

const StrikeButton = ({ editor }: StrikeButtonProps) => {
  return (
    <Toggle
      size="sm"
      pressed={editor.isActive("strike")}
      onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      className={cn("toolBtn", editor.isActive("strike") ? "is-active" : "")}
      data-tooltip-id="strikeTooltip"
      data-tooltip-content="Strike (Ctrl+Shift+S)"
      data-tooltip-place="bottom"
    >
      <Strikethrough className="h-4 w-4" />
    </Toggle>
  );
};

export default StrikeButton;
