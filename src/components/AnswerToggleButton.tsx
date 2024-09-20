import { cn } from "../lib/utils";

interface AnswerToggleButtonProps {
  optionText: string;
  isSelected: boolean;
  handleToggle: (option: string) => void;
}

const AnswerToggleButton = ({
  optionText,
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
        onClick={() => handleToggle(optionText)}
      >
        {optionText}
      </button>
    </>
  );
};

export default AnswerToggleButton;
