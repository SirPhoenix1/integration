import type { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { IndentIncrease } from "lucide-react";

interface UndoButtonProps {
  editor: Editor;
}

const IndentButton = ({ editor }: UndoButtonProps) => {
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => editor.chain().focus().indent().run()}
      data-tooltip-id="indentTooltip"
      data-tooltip-content="Increase Indent"
      data-tooltip-place="bottom"
      className="toolBtn"
    >
      <IndentIncrease className="h-4 w-4" />
    </Button>
  );
};

export default IndentButton;
