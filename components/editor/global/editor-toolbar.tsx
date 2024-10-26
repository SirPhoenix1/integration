import type { Editor } from "@tiptap/react";
import * as Buttons from "@/components/editor/global/buttons-output";
import { useEffect, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import "@/styles/editor/toolbar.css";

interface EditorToolbarProps {
  editor: Editor;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  const [visibleButtons, setVisibleButtons] = useState<string[]>([]);
  const [dropdownButtons, setDropdownButtons] = useState<string[]>([]);

  const buttonComponents = [
    <Buttons.AIButton editor={editor} key={"aiBtn"} />,
    <Buttons.UndoButton editor={editor} key={"undoBtn"} />,
    <Buttons.RedoButton editor={editor} key={"redoBtn"} />,
    <Buttons.HeadingButton editor={editor} key={"headingBtn"} />,
    <Buttons.FontFamilyButton editor={editor} key={"fontFamilyBtn"} />,
    <Buttons.FontSizeButton editor={editor} key={"fontSizeBtn"} />,
    <Buttons.BoldButton editor={editor} key={"boldBtn"} />,
    <Buttons.ItalicButton editor={editor} key={"italicBtn"} />,
    <Buttons.UnderlineButton editor={editor} key={"underlineBtn"} />,
    <Buttons.ColorButton editor={editor} key={"colorBtn"} />,
    <Buttons.HighlightButton editor={editor} key={"highlightBtn"} />,
    <Buttons.LinkButton editor={editor} key={"linkBtn"} />,
    <Buttons.ImageButton editor={editor} key={"imageBtn"} />,
    <Buttons.AlignButton editor={editor} key={"alignBtn"} />,
    <Buttons.LineHeightButton editor={editor} key={"lineHeightBtn"} />,
    <Buttons.TaskListButton editor={editor} key={"tlButton"} />,
    <Buttons.UnorderedListButton editor={editor} key={"ulBtn"} />,
    <Buttons.OrderedListButton editor={editor} key={"olBtn"} />,
    <Buttons.StrikeButton editor={editor} key={"strikeBtn"} />,
    <Buttons.QuoteButton editor={editor} key={"quoteBtn"} />,
    <Buttons.OutdentButton editor={editor} key={"outdentBtn"} />,
    <Buttons.IndentButton editor={editor} key={"indentBtn"} />,
    <Buttons.WordCountButton key={"wordCountBtn"} />,
  ];

  const updateButtonVisibility = () => {
    const width = window.innerWidth;
    const visibleCount = width / 80 - 2;

    const visible = buttonComponents
      .slice(0, visibleCount)
      .map((button) => (button.key ? button.key : ""));
    const dropdown = buttonComponents
      .slice(visibleCount)
      .map((button) => (button.key ? button.key : ""));

    setVisibleButtons(visible);
    setDropdownButtons(dropdown);
  };

  useEffect(() => {
    updateButtonVisibility();
    window.addEventListener("resize", updateButtonVisibility);
    return () => window.removeEventListener("resize", updateButtonVisibility);
  }, []);

  const btnMap = buttonComponents.reduce(
    (map, btn) => {
      map[btn.key as string] = btn;
      return map;
    },
    {} as Record<string, React.ReactElement>
  );

  return (
    <div className="relative border border-input bg-transparent rounded-md rounded-br-none rounded-bl-none p-1 flex flex-row items-center gap-1 overflow-hidden justify-left px-6">
      {visibleButtons.map((key) => btnMap[key])}
      <Buttons.MoreButton buttons={dropdownButtons.map((key) => btnMap[key])} />
    </div>
  );
};

export default EditorToolbar;
