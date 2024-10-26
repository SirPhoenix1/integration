import type { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { List } from "lucide-react";

interface UnorderedListButtonProps {
  editor: Editor;
}

const UnorderedListButton = ({ editor }: UnorderedListButtonProps) => {
  return (
    <Toggle
      size="sm"
      pressed={editor.isActive("bulletList")}
      onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      data-tooltip-id="ulTooltip"
      data-tooltip-content="Bullet List (Ctrl+Shift+B)"
      data-tooltip-place="bottom"
      className="toolBtn"
    >
      <List className="h-4 w-4" />
    </Toggle>
  );
};

export default UnorderedListButton;
