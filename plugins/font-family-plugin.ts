import FontFamily from "@tiptap/extension-font-family";

import { fontList } from "@/lib/fonts";

export const DEFAULT_FONT_FAMILY = fontList[0];

const FontFamilyPlugin = FontFamily.extend({
  name: "fontFamily",

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontFamily: {
            default: DEFAULT_FONT_FAMILY.className,
            parseHTML: (element) =>
              element.style.fontFamily?.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontFamily) {
                return {};
              }

              return {
                class: `${attributes.fontFamily}`,
              };
            },
          },
        },
      },
    ];
  },
});

export default FontFamilyPlugin;
