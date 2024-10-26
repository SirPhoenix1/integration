import type { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Font, fontList } from "@/lib/fonts";
import { DEFAULT_FONT_FAMILY } from "@/plugins/font-family-plugin";

interface FontFamilyButtonProps {
  editor: Editor;
}

const FontFamilyButton = ({ editor }: FontFamilyButtonProps) => {
  const [fontFamily, setFontFamily] = useState(DEFAULT_FONT_FAMILY);

  useEffect(() => {
    const currentFamily = fontList.find((family) =>
      editor.isActive({ fontFamily: family.className })
    );
    if (currentFamily) setFontFamily(currentFamily);
  }, [editor.state.selection, editor]);

  const itemClassName = (font: Font) => {
    if (fontFamily.name === font.name) return font.className + " is-active";
    return font.className;
  };

  const handleItemClick = (font: Font) => {
    setFontFamily(font);
    editor.chain().focus().setFontFamily(font.className).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={`toolBtn font-family-btn ${fontFamily.className}`}
          variant="ghost"
          data-tooltip-id="fontFamilyTooltip"
          data-tooltip-content="Font Family"
          data-tooltip-place="bottom"
        >
          {fontFamily.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="scrollable-dropdown">
        {fontList.map((font) => (
          <DropdownMenuItem
            key={font.name}
            onClick={() => handleItemClick(font)}
            className={itemClassName(font)}
          >
            {font.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FontFamilyButton;
