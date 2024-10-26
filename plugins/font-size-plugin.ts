import { Extension } from "@tiptap/core";
import "@tiptap/extension-text-style";

type FontSizeOptions = {
  types: string[];
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size attribute
       */
      setFontSize: (size: string) => ReturnType;
      /**
       * Unset the font size attribute
       */
      unsetFontSize: () => ReturnType;
    };
  }
}

export const font_sizes = [
  "8",
  "9",
  "10",
  "11",
  "12",
  "14",
  "18",
  "24",
  "30",
  "36",
  "48",
  "60",
  "72",
  "96",
];

export const DEFAULT_FONT_SIZE = font_sizes[4];

const FontSizePlugin = Extension.create<FontSizeOptions>({
  name: "fontSize",

  addOptions(): FontSizeOptions {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: DEFAULT_FONT_SIZE + "pt",
            parseHTML: (element) =>
              element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});

export default FontSizePlugin;