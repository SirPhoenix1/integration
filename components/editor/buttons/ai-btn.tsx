import type { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tooltip } from "react-tooltip";
import { useAI } from "@/hooks/editor/use-ai";
import { ChangeEvent, useEffect, useState } from "react";
import { Tone } from "@/lib/ai/ai-utils";
import CustomPromptModal from "@/components/editor/modals/custom-prompt-modal";

interface AIButtonProps {
  editor: Editor;
}

const icon = (
  <svg
    width="30"
    zoomAndPan="magnify"
    viewBox="0 0 30 30.000001"
    height="30"
    preserveAspectRatio="xMidYMid meet"
    version="1.0"
  >
    <defs>
      <clipPath id="1ee39b5377">
        <path
          d="M 0.484375 0 L 29.515625 0 L 29.515625 29.03125 L 0.484375 29.03125 Z M 0.484375 0 "
          clip-rule="nonzero"
        />
      </clipPath>
    </defs>
    <g clip-path="url(#1ee39b5377)">
      <path
        stroke-linecap="round"
        transform="matrix(0.0219203, -0.0537679, 0.0537679, 0.0219203, 3.967538, 25.983332)"
        fill="none"
        stroke-linejoin="miter"
        d="M 33.480876 33.522911 L 420.407684 33.502613 "
        stroke="#4ba2ff"
        stroke-width="67"
        stroke-opacity="1"
        stroke-miterlimit="4"
      />
      <path
        stroke-linecap="round"
        transform="matrix(0.0219391, 0.0537602, -0.0537602, 0.0219391, 16.074523, 1.581378)"
        fill="none"
        stroke-linejoin="miter"
        d="M 33.493524 33.510449 L 420.346575 33.490786 "
        stroke="#4ba2ff"
        stroke-width="67"
        stroke-opacity="1"
        stroke-miterlimit="4"
      />
    </g>
    <path
      stroke-linecap="round"
      transform="matrix(0.725806, 0, 0, 0.725806, 2.819081, 16.083579)"
      fill="none"
      stroke-linejoin="miter"
      d="M 1.998398 1.999951 L 31.566802 1.999951 "
      stroke="#d64bff"
      stroke-width="4"
      stroke-opacity="1"
      stroke-miterlimit="4"
    />
  </svg>
);

const AIButton = ({ editor }: AIButtonProps) => {
  // The hook that serves the ai functions and interacts with the ai api.
  const ai = useAI();

  // Get the correct user selection in the editor as the context for the ai request.
  const getContext = () => {
    const { from, to } = editor.view.state.selection;
    const selection = editor.state.doc.textBetween(from, to, " ");
    return selection;
  };

  // Print the stream of words onto the editor.
  // Each time completion is updated, the buffer points to where in the completion the printing left off.

  const [resBuffer, setResBuffer] = useState(0);
  useEffect(() => {
    const newContent = ai.response;
    editor.commands.insertContent(newContent.substring(resBuffer));
    setResBuffer(newContent.length);
  }, [ai.response]);

  // Custom Prompt Button Functions
  const [customPrompt, setCustomPrompt] = useState<string>("");

  const handleCustomChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomPrompt(e.target.value);
  };

  const handleCustomSubmit = () => {
    if (customPrompt.trim().length === 0) return;
    ai.generateCustom(customPrompt, getContext());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="toolBtn h-[35px]"
          variant="ghost"
          data-tooltip-id="aiTooltip"
          data-tooltip-content="Author Desk's Specialty"
          data-tooltip-place="bottom"
        >
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          data-tooltip-id="ai-tone-tooltip"
          data-tooltip-content="Adjust Tone"
          data-tooltip-place="right"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="font-medium">
              <span>Set Tone</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-40">
              {Object.values(Tone).map((tone) => (
                <DropdownMenuItem
                  key={tone}
                  onClick={() => ai.generateTone(tone, getContext())}
                >
                  {tone}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </DropdownMenuItem>
        <Tooltip id="ai-tone-tooltip" />
        <DropdownMenuItem
          onClick={() => ai.generateGrammar(getContext())}
          data-tooltip-id="ai-grammar-tooltip"
          data-tooltip-content="Fix Spelling & Grammar"
          data-tooltip-place="right"
        >
          Fix Spelling & Grammar
        </DropdownMenuItem>
        <Tooltip id="ai-grammar-tooltip" />
        <DropdownMenuItem
          onClick={() => ai.generateExtend(getContext())}
          data-tooltip-id="ai-extend-tooltip"
          data-tooltip-content="Extend Text"
          data-tooltip-place="right"
        >
          Extend Text
        </DropdownMenuItem>
        <Tooltip id="ai-extend-tooltip" />
        <DropdownMenuItem
          onClick={() => ai.generateReduce(getContext())}
          data-tooltip-id="ai-reduce-tooltip"
          data-tooltip-content="Reduce Text"
          data-tooltip-place="right"
        >
          Reduce Text
        </DropdownMenuItem>
        <Tooltip id="ai-reduce-tooltip" />
        <DropdownMenuItem
          onClick={() => ai.generateContinue(getContext())}
          data-tooltip-id="ai-continue-tooltip"
          data-tooltip-content="Continue"
          data-tooltip-place="right"
        >
          Continue
        </DropdownMenuItem>
        <Tooltip id="ai-continue-tooltip" />
        <DropdownMenuItem
          onClick={() => ai.generateSummarize(getContext())}
          data-tooltip-id="ai-summarize-tooltip"
          data-tooltip-content="Summarize"
          data-tooltip-place="right"
        >
          Summarize
        </DropdownMenuItem>
        <Tooltip id="ai-summarize-tooltip" />
        <DropdownMenuItem
          onClick={() => ai.generateReview(getContext())}
          data-tooltip-id="ai-review-tooltip"
          data-tooltip-content="Review"
          data-tooltip-place="right"
        >
          Review
        </DropdownMenuItem>
        <Tooltip id="ai-review-tooltip" />
        <DropdownMenuItem
          data-tooltip-id="ai-custom-tooltip"
          data-tooltip-content="Write your own request"
          data-tooltip-place="right"
        >
          <CustomPromptModal
            prompt={customPrompt}
            handleChange={handleCustomChange}
            handleSubmit={handleCustomSubmit}
          />
        </DropdownMenuItem>
        <Tooltip id="ai-custom-tooltip" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AIButton;
