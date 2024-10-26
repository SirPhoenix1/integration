import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import React from "react";

interface MoreButtonProps {
  buttons: React.ReactNode[];
}

const MoreButton = ({ buttons }: MoreButtonProps) => {
  return (
    <>
      {buttons.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="toolBtn" variant="ghost">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="drop-horizontal-menu">
            {React.Children.map(buttons, (btn, index) => (
              <DropdownMenuItem key={index} className="more-item">
                {btn}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default MoreButton;
