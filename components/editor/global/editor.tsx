import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import EditorToolbar from "@/components/editor/global/editor-toolbar";
import * as ext from "@/components/editor/global/extensions-output";
import Tooltips from "@/components/editor/global/tooltips";
import { DEFAULT_FONT_FAMILY } from "@/plugins/font-family-plugin";
import { DEFAULT_FONT_SIZE } from "@/plugins/font-size-plugin";
import "@/styles/editor/editor.css";
import WordCounter from "@/components/editor/global/word-counter";
import { Alignment } from "@/lib/utils";

interface EditorProps {
  content?: string;
  alignment?: Alignment;
  fontFamily?: string;
  fontSize?: string;
  placeholder?: string;
  editable?: boolean;
  onChange?: (content: string) => void;
}

const Editor = ({
  content = "",
  alignment = Alignment.LEFT,
  fontFamily = DEFAULT_FONT_FAMILY.className,
  fontSize = DEFAULT_FONT_SIZE + "pt",
  placeholder = "Write here...",
  editable = true,
  onChange,
}: EditorProps) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "min-h-[70vh] max-w-[100%] sm:text-sm md:text-base lg:text-lg focus:outline-none rounded-md rounded-tr-none rounded-tl-none border border-input border-t-0 bg-transparent px-6 py-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
      },
    },
    content: content,
    editable: editable,
    immediatelyRender: false,
    onUpdate({ editor }) {
      if (onChange) onChange(editor.getText());
    },
    extensions: [
      ext.Blockquote,
      ext.ListItem,
      ext.CodeBlock,
      ext.HardBreak,
      ext.Heading,
      ext.HorizontalRule,
      ext.Paragraph,
      ext.Document,
      ext.Text,
      ext.Bold,
      ext.Code,
      ext.ImageResize,
      ext.Italic,
      ext.Dropcursor,
      ext.Gapcursor,
      ext.History,
      ext.TextStyle,
      ext.Color,
      ext.Underline,
      ext.FontFamilyPlugin,
      ext.FontSizePlugin,
      ext.StrikePlugin,
      ext.LineHeightPlugin,
      ext.IndentPlugin,
      ext.CharacterCount,
      ext.TaskList.configure({
        HTMLAttributes: {
          class: "task-list",
        },
      }),
      ext.BulletList.configure({
        HTMLAttributes: {
          class: "bullet-list",
        },
      }),
      ext.OrderedList.configure({
        HTMLAttributes: {
          class: "ordered-list",
        },
      }),
      ext.Link.configure({
        HTMLAttributes: {
          class: "hyperlink",
        },
      }),
      ext.Highlight.configure({
        multicolor: true,
      }),
      ext.TaskItem.configure({
        nested: true,
      }),
      ext.Placeholder.configure({
        placeholder: placeholder,
      }),
      ext.TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: [
          Alignment.LEFT,
          Alignment.RIGHT,
          Alignment.CENTER,
          Alignment.JUSTIFY,
        ],
        defaultAlignment: alignment,
      }),
      ext.Image.configure({
        inline: true,
      }),
    ],
  });

  useEffect(() => {
    editor
      ?.chain()
      .focus()
      .setFontFamily(fontFamily)
      .setFontSize(fontSize)
      .run();
  }, [editor]);

  return (
    <>
      {editor && (
        <div className="relative">
          <EditorToolbar editor={editor} />
          <Tooltips />
          <EditorContent editor={editor} />
          <WordCounter editor={editor} />
        </div>
      )}
    </>
  );
};

export default Editor;
