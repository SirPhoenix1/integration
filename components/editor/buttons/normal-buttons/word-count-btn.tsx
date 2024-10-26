import { Toggle } from "@/components/ui/toggle";
import { useWordCounter } from "@/hooks/editor/use-word-counter";

const WordCountButton = () => {
  const counter = useWordCounter();

  const toggleCounter = () => {
    if (counter.isOpen) {
      counter.onClose();
    } else {
      counter.onOpen();
    }
  };

  return (
    <Toggle
      size="sm"
      pressed={counter.isOpen}
      onPressedChange={toggleCounter}
      data-tooltip-id="wordCountTooltip"
      data-tooltip-content="Word Count"
      data-tooltip-place="bottom"
      className="toolBtn"
    >
      <span className="text-base w-6">W</span>
    </Toggle>
  );
};

export default WordCountButton;
