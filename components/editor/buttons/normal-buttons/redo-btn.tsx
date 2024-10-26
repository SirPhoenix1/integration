import type { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Redo } from "lucide-react";

interface RedoButtonProps {
  editor: Editor;
}

const RedoButton = ({ editor }: RedoButtonProps) => {
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => editor.chain().focus().redo().run()}
      data-tooltip-id="redoTooltip"
      data-tooltip-content="Redo (Ctrl+Y)"
      data-tooltip-place="bottom"
      className="toolBtn"
    >
      <Redo className="h-4 w-4" />
    </Button>
  );
};

export default RedoButton;
