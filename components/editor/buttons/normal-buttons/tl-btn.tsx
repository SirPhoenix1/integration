import type { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { ListTodo } from "lucide-react";

interface TaskListButtonProps {
  editor: Editor;
}

const TaskListButton = ({ editor }: TaskListButtonProps) => {
  return (
    <Toggle
      size="sm"
      pressed={editor.isActive("taskList")}
      onPressedChange={() => editor.chain().focus().toggleTaskList().run()}
      data-tooltip-id="tlTooltip"
      data-tooltip-content="Checklist (Ctrl+Shift+9)"
      data-tooltip-place="bottom"
      className="toolBtn"
    >
      <ListTodo className="h-4 w-4" />
    </Toggle>
  );
};

export default TaskListButton;
