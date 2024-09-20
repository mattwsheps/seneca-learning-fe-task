const AnswerToggle = () => {
  return (
    <>
      <div className="flex w-full max-w-screen-lg items-center justify-between border-2 border-buttonBorder rounded-full">
        <button className="w-1/2 font-bold text-xl rounded-full p-4">Cell Wall</button>
        <button className="w-1/2 font-bold text-xl rounded-full p-4">Ribosomes</button>
      </div>
    </>
  );
};

export default AnswerToggle;
