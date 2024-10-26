import type { Editor } from "@tiptap/react";
import { Highlighter } from "lucide-react";
import { useState } from "react";
import { ColorResult } from "react-color";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import ColorPicker from "@/components/editor/modals/color-picker";
import { stableColorList, MAX_COLORS, Color } from "@/lib/editor/coloring";

interface HighlightButtonProps {
  editor: Editor;
}

const HighlightButton = ({ editor }: HighlightButtonProps) => {
  const [color, setColor] = useState<string>(Color.YELLOW);
  const [colorList, setList] = useState<string[]>(stableColorList);
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const applyColor = (selectedColor: ColorResult) => {
    setColor(selectedColor.hex);
    editor.chain().focus().setHighlight({ color: selectedColor.hex }).run();

    const tempCustomColors: string[] = customColors;
    if (!colorList.includes(selectedColor.hex)) {
      if (colorList.length === MAX_COLORS) {
        tempCustomColors.shift();
      }
      tempCustomColors.push(selectedColor.hex);
      setCustomColors(tempCustomColors);

      setList(stableColorList.concat(customColors));
    }
  };

  const handleNoneClick = () => {
    setColor(Color.BLACK);
    editor.chain().focus().unsetHighlight().run();
  };

  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!showModal) e.stopPropagation();
  };

  return (
    <Popover modal open={showModal} onOpenChange={toggleShowModal}>
      <PopoverTrigger asChild>
        <Button
          className="toolBtn"
          variant="ghost"
          data-tooltip-id="highlightTooltip"
          data-tooltip-content="Highlight (Ctrl+Shift+H)"
          data-tooltip-place="bottom"
          onClick={handleClick}
        >
          <div className="flex items-center">
            <span
              className={"text-base border-b-2 pb-0 leading-none"}
              style={{
                borderBottom: `2px solid ${color}`,
              }}
            >
              <Highlighter className="h-4 w-4" />
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="color-picker-container">
        <ColorPicker
          color={color}
          colors={colorList}
          onChangeComplete={applyColor}
          handleNoneClick={handleNoneClick}
        />
      </PopoverContent>
    </Popover>
  );
};

export default HighlightButton;
