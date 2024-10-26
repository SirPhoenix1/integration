import { Extension } from "@tiptap/core";

interface LineHeightOptions {
  types: string[];
  heights: string[];
  defaultHeight: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lineHeight: {
      /**
       * Set the line height attribute
       */
      setLineHeight: (height: string) => ReturnType;
      /**
       * Unset the line height attribute
       */
      unsetLineHeight: () => ReturnType;
    };
  }
}

export const line_heights = ["1", "1.15", "1.5", "2", "2.5", "3"];
export const DEFAULT_HEIGHT = "1";

const LineHeightPlugin = Extension.create<LineHeightOptions>({
  name: "lineHeight",

  addOptions() {
    return {
      types: ["heading", "paragraph"],
      heights: line_heights,
      defaultHeight: DEFAULT_HEIGHT,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultHeight,
            parseHTML: (element: HTMLElement) =>
              element.style.lineHeight || this.options.defaultHeight,
            renderHTML: (attributes: any) => {
              if (attributes.lineHeight === this.options.defaultHeight) {
                return {};
              }

              return { style: `line-height: ${attributes.lineHeight}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineHeight:
        (height: string) =>
        ({ commands }: any) => {
          if (!this.options.heights.includes(height)) {
            return false;
          }

          return this.options.types.every((type: string) =>
            commands.updateAttributes(type, { lineHeight: height })
          );
        },

      unsetLineHeight:
        () =>
        ({ commands }: any) => {
          return this.options.types.every((type: string) =>
            commands.resetAttributes(type, "lineHeight")
          );
        },
    };
  },
});

export default LineHeightPlugin;
