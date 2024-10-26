import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

interface PromptModalProps {
  prompt: string | undefined;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

const placeholder = "Ex. Change to first person POV.";

const CustomPromptModal = ({
  prompt,
  handleChange,
  handleSubmit,
}: PromptModalProps) => {
  return (
    <Popover modal>
      <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
        <button className="font-medium">Custom</button>
      </PopoverTrigger>
      <PopoverContent onClick={(e) => e.stopPropagation()}>
        <div>
          <h3>Enter Prompt</h3>
          <Input
            type="text"
            placeholder={placeholder}
            value={prompt}
            onChange={handleChange}
            className="my-3"
          />
          <div className="flex justify-between">
            <Button
              onClick={handleSubmit}
              className="text-sm px-2 py-1 h-8 w-20"
            >
              Enter
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomPromptModal;
