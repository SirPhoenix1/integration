import type { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DEFAULT_FONT_SIZE, font_sizes } from "@/plugins/font-size-plugin";

interface FontSizeButtonProps {
  editor: Editor;
}

const FontSizeButton = ({ editor }: FontSizeButtonProps) => {
  const [fSize, setFSize] = useState(DEFAULT_FONT_SIZE);

  useEffect(() => {
    const currentSize = font_sizes.find((size) =>
      editor.isActive({ fontSize: size + "pt" })
    );
    if (currentSize) setFSize(currentSize);
  }, [editor.state.selection, editor]);

  const itemClassName = (size: string) => {
    if (fSize === size) return "is-active";
  };

  const handleItemClick = (size: string) => {
    setFSize(size);
    editor
      .chain()
      .focus()
      .setFontSize(size + "pt")
      .run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="toolBtn"
          variant="ghost"
          data-tooltip-id="fontSizeTooltip"
          data-tooltip-content="Font Size"
          data-tooltip-place="bottom"
        >
          {fSize}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="scrollable-dropdown">
        {font_sizes.map((size) => (
          <DropdownMenuItem
            key={size}
            onClick={() => handleItemClick(size)}
            className={itemClassName(size)}
          >
            {size}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FontSizeButton;
