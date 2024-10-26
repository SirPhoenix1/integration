import type { Editor } from "@tiptap/react";
import { ChangeEvent, useEffect, useState } from "react";
import LinkPopover from "@/components/editor/modals/text-link-modal";

interface LinkButtonProps {
  editor: Editor;
}

const urlRegex: RegExp =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const LinkButton = ({ editor }: LinkButtonProps) => {
  const [url, setURL] = useState<string>();
  const [fURL, setFURL] = useState<string>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setURL(e.target.value);
  };

  const formatLink = (link: string) => {
    if (link.startsWith("http://") || link.startsWith("https://")) return link;
    return "https://" + link;
  };

  const validateLink = (link: string) => {
    if (urlRegex.test(link)) return true;
    return false;
  };

  const handleSubmit = () => {
    if (!url) return;
    setFURL(formatLink(url));
  };

  useEffect(() => {
    if (!fURL || !validateLink(fURL)) return;
    editor.chain().focus().setLink({ href: fURL }).run();
  }, [fURL, editor]);

  const handleCancel = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
  };

  return (
    <LinkPopover
      url={url}
      handleChange={handleChange}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
    />
  );
};

export default LinkButton;
