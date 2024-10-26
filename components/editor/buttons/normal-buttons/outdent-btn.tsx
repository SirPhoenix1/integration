import type { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { IndentDecrease } from "lucide-react";

interface UndoButtonProps {
  editor: Editor;
}

const OutdentButton = ({ editor }: UndoButtonProps) => {
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => editor.chain().focus().outdent().run()}
      data-tooltip-id="outdentTooltip"
      data-tooltip-content="Decrease Indent"
      data-tooltip-place="bottom"
      className="toolBtn"
    >
      <IndentDecrease className="h-4 w-4" />
    </Button>
  );
};

export default OutdentButton;
