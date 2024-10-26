import type { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BetweenHorizontalStart } from "lucide-react";
import { line_heights } from "@/plugins/line-height-plugin";
import { useEffect, useState } from "react";
import { DEFAULT_HEIGHT } from "@/plugins/line-height-plugin";

interface LineHeightButtonProps {
  editor: Editor;
}

const LineHeightButton = ({ editor }: LineHeightButtonProps) => {
  const [lineHeight, setLineHeight] = useState<string>(DEFAULT_HEIGHT);

  useEffect(() => {
    const lh = editor.getAttributes("textStyle").lineHeight;
    if (lh) {
      setLineHeight(lh);
    }
  }, [editor.getAttributes("textStyle").lineHeight, editor]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="toolBtn"
          variant="ghost"
          data-tooltip-id="lineHeightTooltip"
          data-tooltip-content="Line Spacing"
          data-tooltip-place="bottom"
        >
          <BetweenHorizontalStart className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="scrollable-dropdown">
        {line_heights.map((height) => (
          <DropdownMenuItem
            key={height}
            onClick={() => {
              setLineHeight(height);
              editor.chain().focus().setLineHeight(height).run();
            }}
            className={lineHeight === height ? "is-active" : ""}
          >
            {height}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LineHeightButton;
