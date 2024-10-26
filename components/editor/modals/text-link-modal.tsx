import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

interface LinkPopoverProps {
  url: string | undefined;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCancel: () => void;
  handleSubmit: () => void;
}

const LinkPopover = ({
  url,
  handleChange,
  handleCancel,
  handleSubmit,
}: LinkPopoverProps) => {
  return (
    <Popover modal>
      <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button
          size="sm"
          variant="ghost"
          data-tooltip-id="linkTooltip"
          data-tooltip-content="Insert Link"
          data-tooltip-place="bottom"
        >
          <Link2 className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent onClick={(e) => e.stopPropagation()}>
        <div>
          <h3>Enter URL</h3>
          <Input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={handleChange}
            className="my-3"
          />
          <div className="flex justify-between">
            <Button
              onClick={handleCancel}
              className="text-sm px-2 py-1 h-8 w-20"
            >
              Remove
            </Button>
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

export default LinkPopover;
