import type { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { Bold } from "lucide-react";

interface BoldButtonProps {
  editor: Editor;
}

const BoldButton = ({ editor }: BoldButtonProps) => {
  return (
    <Toggle
      size="sm"
      className="toolBtn"
      pressed={editor.isActive("bold")}
      onPressedChange={() => editor.chain().focus().toggleBold().run()}
      data-tooltip-id="boldTooltip"
      data-tooltip-content="Bold (Ctrl+B)"
      data-tooltip-place="bottom"
    >
      <Bold className="h-4 w-4" />
    </Toggle>
  );
};

export default BoldButton;
