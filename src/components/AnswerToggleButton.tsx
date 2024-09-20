const AnswerToggleButton = ({ optionText }: { optionText: string }) => {
  return (
    <>
      <button className="w-1/2 font-bold text-xl rounded-full p-4 hover:opacity-75">
        {optionText}
      </button>
    </>
  );
};

export default AnswerToggleButton;
