import AnswerToggleButton from "./AnswerToggleButton";

const AnswerToggle = () => {
  return (
    <>
      <div className="flex w-full max-w-screen-lg items-center justify-between border-2 border-buttonBorder rounded-full">
        <AnswerToggleButton optionText="Cell Wall" />
        <AnswerToggleButton optionText="Ribosome" />
      </div>
    </>
  );
};

export default AnswerToggle;
