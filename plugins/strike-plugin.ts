import Strike from "@tiptap/extension-strike";

const StrikePlugin = Strike.extend({
  name: "strike",

  parseHTML() {
    return [
      { tag: 'span[style*="text-decoration:line-through"]' },
      { tag: "s" },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      { ...HTMLAttributes, style: "text-decoration:line-through" },
      0,
    ];
  },

  addCommands() {
    return {
      toggleStrike:
        () =>
        ({ commands, state, dispatch }) => {
          const { from, to } = state.selection;
          const tr = state.tr;

          // Check if the selection has the strikethrough mark applied
          let hasMark = false;
          state.doc.nodesBetween(from, to, (node) => {
            if (node.marks.some((mark) => mark.type.name === this.name)) {
              hasMark = true;
            }
          });

          if (hasMark) {
            // Remove the strikethrough mark
            state.doc.nodesBetween(from, to, (node, pos) => {
              node.marks.forEach((mark) => {
                if (mark.type.name === this.name) {
                  tr.removeMark(pos, pos + node.nodeSize, this.type);
                  tr.removeStoredMark(this.type);
                }
              });
            });
          } else {
            // Apply the strikethrough mark
            tr.addMark(
              from,
              to,
              this.type.create({ style: "text-decoration:line-through" })
            );
          }

          if (dispatch) {
            dispatch(tr);
          }

          return true;
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-s": () => this.editor.commands.toggleStrike(),
    };
  },
});

export default StrikePlugin;
