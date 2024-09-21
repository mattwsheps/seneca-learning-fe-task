import { cn } from "../lib/utils";
import { OptionModel } from "../models";

interface AnswerToggleButtonProps {
  option: OptionModel;
  isSelected: boolean;
  handleToggle: (option: OptionModel) => void;
}

const AnswerToggleButton = ({
  option,
  isSelected,
  handleToggle,
}: AnswerToggleButtonProps) => {
  return (
    <>
      <button
        className={cn(
          isSelected ? "text-unselected" : "hover:opacity-75",
          "relative z-10 w-1/2 font-bold text-2xl rounded-full p-6"
        )}
        onClick={() => handleToggle(option)}
      >
        {option.optionText}
      </button>
    </>
  );
};

export default AnswerToggleButton;
