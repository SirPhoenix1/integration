"use client";

import React, { useEffect, useState } from "react";
import { ColorResult, PhotoshopPicker, TwitterPicker } from "react-color";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CirclePlus, Droplet } from "lucide-react";

interface ColorPickerProps {
  color?: string;
  onChangeComplete: (selectedColor: ColorResult) => void;
  colors?: string[];
  handleNoneClick?: () => void;
}

const ColorPicker = ({
  color,
  colors = [],
  onChangeComplete,
  handleNoneClick,
}: ColorPickerProps) => {
  const [customOpen, setCustomOpen] = useState(false);
  const [customColor, setCustomColor] = useState<ColorResult>();

  useEffect(() => {
    const colorSwatch = document.querySelector(
      `div[title="${color}"]`
    ) as HTMLElement;
    if (colorSwatch) {
      colorSwatch.focus();
    }
  }, [color]);

  const toggleCustomOpen = () => {
    setCustomOpen(!customOpen);
  };

  const applyCustomColor = (selectedColor: ColorResult) => {
    setCustomColor(selectedColor);
    if (customColor) onChangeComplete(customColor);
  };

  return (
    <div className="color-picker-container">
      <TwitterPicker
        color={color}
        onChangeComplete={onChangeComplete}
        className="color-picker"
        colors={colors}
        triangle="hide"
        styles={{
          default: {
            input: { display: "none" },
            hash: { display: "none" },
          },
        }}
      />
      <div className="color-btn hover:bg-accent hover:text-accent-foreground">
        <button onClick={handleNoneClick}>
          <Droplet className="droplet-icon" />
          None
        </button>
      </div>
      <div className="color-btn hover:bg-accent hover:text-accent-foreground">
        <Popover modal>
          <PopoverTrigger>
            <button>
              <CirclePlus className="circle-plus-icon" />
              Custom
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <PhotoshopPicker
              onAccept={applyCustomColor}
              onCancel={toggleCustomOpen}
              color={customColor?.hex || color}
              onChange={(color: ColorResult) => {
                setCustomColor(color);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ColorPicker;
