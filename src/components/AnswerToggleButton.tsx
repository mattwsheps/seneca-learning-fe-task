import { cn } from "../utils/cn";
import { OptionModel } from "../models";

interface AnswerToggleButtonProps {
  option: OptionModel;
  isAllCorrect: boolean;
  isSelected: boolean;
  handleToggle: (option: OptionModel) => void;
}

const AnswerToggleButton = ({
  option,
  isAllCorrect,
  isSelected,
  handleToggle,
}: AnswerToggleButtonProps) => {
  return (
    <>
      <button
        className={cn(
          isSelected ? "text-black opacity-30" : "hover:opacity-75",
          "relative z-10 w-1/2 font-bold md:text-2xl sm:text-xl text-md md:rounded-full rounded-lg md:p-6 p-4"
        )}
        disabled={isAllCorrect}
        onClick={() => handleToggle(option)}
      >
        {option.optionText}
      </button>
    </>
  );
};

export default AnswerToggleButton;
