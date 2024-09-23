import { cn } from "../utils/cn";
import { OptionModel } from "../models";
import { useRef } from "react";

interface AnswerToggleButtonProps {
  option: OptionModel;
  isAllCorrect: boolean;
  isSelected: boolean;
  handleToggle: (option: OptionModel) => void;
  isStacked: boolean;
}

const AnswerToggleButton = ({
  option,
  isAllCorrect,
  isSelected,
  handleToggle,
  isStacked,
}: AnswerToggleButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={buttonRef}
      className={cn(
        isSelected ? "text-black opacity-30" : "hover:opacity-75",
        isAllCorrect && !isSelected && "hover:opacity-100",
        isStacked ? "w-full" : "w-1/2", 
        "relative z-10 font-bold md:text-2xl text-lg md:rounded-full rounded-lg p-4",
      )}
      disabled={isAllCorrect}
      onClick={() => handleToggle(option)}
    >
      {option.optionText}
    </button>
  );
};

export default AnswerToggleButton;