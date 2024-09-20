interface AnswerToggleButtonProps {
  optionText: string;
  handleToggle: (option: string) => void;
}

const AnswerToggleButton = ({
  optionText,
  handleToggle,
}: AnswerToggleButtonProps) => {
  return (
    <>
      <button
        className="relative z-10 w-1/2 font-bold text-xl rounded-full p-4 hover:opacity-75"
        onClick={() => handleToggle(optionText)}
      >
        {optionText}
      </button>
    </>
  );
};

export default AnswerToggleButton;
