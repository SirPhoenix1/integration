import type { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { ListOrdered } from "lucide-react";

interface OrderedListButtonProps {
  editor: Editor;
}

const OrderedListButton = ({ editor }: OrderedListButtonProps) => {
  return (
    <Toggle
      size="sm"
      pressed={editor.isActive("orderedList")}
      onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      data-tooltip-id="olTooltip"
      data-tooltip-content="Numbered List (Ctrl+Shift+7)"
      data-tooltip-place="bottom"
      className="toolBtn"
    >
      <ListOrdered className="h-4 w-4" />
    </Toggle>
  );
};

export default OrderedListButton;
