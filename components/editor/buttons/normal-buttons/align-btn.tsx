import type { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { cn } from "@/lib/utils";

interface AlignButtonProps {
  editor: Editor;
}

const AlignButton = ({ editor }: AlignButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="toolBtn"
          variant="ghost"
          data-tooltip-id="alignTooltip"
          data-tooltip-content="Align"
          data-tooltip-place="bottom"
        >
          {editor.isActive({ textAlign: "left" }) && (
            <AlignLeft className="h-4 w-4" />
          )}
          {editor.isActive({ textAlign: "center" }) && (
            <AlignCenter className="h-4 w-4" />
          )}
          {editor.isActive({ textAlign: "right" }) && (
            <AlignRight className="h-4 w-4" />
          )}
          {editor.isActive({ textAlign: "justify" }) && (
            <AlignJustify className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="drop-horizontal-menu">
        <DropdownMenuItem
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={cn(
            "pr-0 pl-0",
            editor.isActive({ textAlign: "left" }) ? "is-active" : ""
          )}
          data-tooltip-id="alignLeftTooltip"
          data-tooltip-content="Align Left (Ctrl+Shift+L)"
          data-tooltip-place="bottom"
        >
          <AlignLeft className="h-4 w-4" />
        </DropdownMenuItem>
        <Tooltip id="alignLeftTooltip" />
        <DropdownMenuItem
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
          data-tooltip-id="alignCenterTooltip"
          data-tooltip-content="Align Center (Ctrl+Shift+E)"
          data-tooltip-place="bottom"
        >
          <AlignCenter className="h-4 w-4" />
        </DropdownMenuItem>
        <Tooltip id="alignCenterTooltip" />
        <DropdownMenuItem
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
          data-tooltip-id="alignRightTooltip"
          data-tooltip-content="Align Right (Ctrl+Shift+R)"
          data-tooltip-place="bottom"
        >
          <AlignRight className="h-4 w-4" />
        </DropdownMenuItem>
        <Tooltip id="alignRightTooltip" />
        <DropdownMenuItem
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
          }
          data-tooltip-id="alignJustifyTooltip"
          data-tooltip-content="Align Justify (Ctrl+Shift+J)"
          data-tooltip-place="bottom"
        >
          <AlignJustify className="h-4 w-4" />
        </DropdownMenuItem>
        <Tooltip id="alignJustifyTooltip" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AlignButton;
