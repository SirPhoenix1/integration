import type { Editor } from "@tiptap/react";
import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ImageLinkItem from "@/components/editor/modals/image-link-modal";
import { SingleImageDropzone } from "@/components/editor/modals/image-file-modal";
import CameraItem from "@/components/editor/modals/image-camera-modal";

interface ImageButtonProps {
  editor: Editor;
}

const ImageButton = ({ editor }: ImageButtonProps) => {
  const handleFile = (file?: File) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const url = reader.result as string;
      editor.chain().focus().setImage({ src: url, alt: "Image" }).run();
    };

    reader.readAsDataURL(file);
  };

  return (
    <DropdownMenu>
      {/** The toolbar button of the Image Button. */}
      <DropdownMenuTrigger asChild>
        <Button
          className="toolBtn"
          variant="ghost"
          data-tooltip-id="imageTooltip"
          data-tooltip-content="Insert Image"
          data-tooltip-place="bottom"
        >
          <Image className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      {/** Uploading an image from the computer's file explorer. */}
      <DropdownMenuContent>
        {/** Uploading an image from PC's file explorer. */}
        <DropdownMenuItem
          className="text-xs"
          onClick={(e) => e.preventDefault()}
        >
          <SingleImageDropzone onChange={handleFile} />
        </DropdownMenuItem>
        {/** Uploading an image from a link. */}
        <DropdownMenuItem
          className="text-xs"
          onClick={(e) => e.preventDefault()}
        >
          <ImageLinkItem editor={editor} />
        </DropdownMenuItem>
        {/** Uploading an image from the computer's camera. */}
        <DropdownMenuItem
          className="text-xs"
          onClick={(e) => e.preventDefault()}
        >
          <CameraItem editor={editor} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ImageButton;
