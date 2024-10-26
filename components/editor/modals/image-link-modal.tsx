import { Link2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { Editor } from "@tiptap/react";

interface ImageLinkItemProps {
  editor: Editor;
}

const urlRegex: RegExp =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const ImageLinkItem = ({ editor }: ImageLinkItemProps) => {
  const [url, setURL] = useState<string>();
  const [fURL, setFURL] = useState<string>();
  const [linkPopOpen, setLinkPopOpen] = useState<boolean>(false);

  const openLinkPop = () => {
    setLinkPopOpen(true);
  };

  const closeLinkPop = () => {
    setLinkPopOpen(false);
  };

  const formatLink = (link: string) => {
    if (link.startsWith("http://") || link.startsWith("https://")) return link;
    return "https://" + link;
  };

  const validateLink = (link: string) => {
    if (urlRegex.test(link)) return true;
    return false;
  };

  const handleLinkSubmit = () => {
    if (!url) return;
    setFURL(formatLink(url));
  };

  useEffect(() => {
    if (!fURL || !validateLink(fURL)) return;
    editor.chain().focus().setImage({ src: fURL, alt: "Image" }).run();
  }, [fURL]);

  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setURL(e.target.value);
  };
  return (
    <Popover open={linkPopOpen} modal>
      <PopoverTrigger asChild>
        <button onClick={openLinkPop}>
          <Link2 className="h-4 w-4 mr-2 inline" color="gray" />
          Upload From URL
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <h3>Enter URL</h3>
          <Input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={handleLinkChange}
            className="no-outline my-3"
          />
          <div className="flex justify-between">
            <Button
              onClick={closeLinkPop}
              className="text-sm px-2 py-1 h-8 w-20"
            >
              Cancel
            </Button>
            <Button
              onClick={handleLinkSubmit}
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
export default ImageLinkItem;
