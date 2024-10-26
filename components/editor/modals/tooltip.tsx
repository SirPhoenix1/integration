import { Tooltip as ReactTooltip } from "react-tooltip";

interface TooltipProps {
  id: string;
}

const Tooltip = ({ id }: TooltipProps) => {
  return <ReactTooltip id={id} className="z-10" />;
};

export default Tooltip;
