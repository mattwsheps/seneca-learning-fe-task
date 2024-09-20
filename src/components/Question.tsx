import React from "react";
import AnswerToggle from "./AnswerToggle";

const Question: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-incorrectStart to-incorrectEnd m-4 p-12 rounded-xl">
      <div className="flex flex-col items-center justify-center gap-12">
        <h1 className="font-bold text-3xl">An animal cell contains:</h1>
        <AnswerToggle />
        <div className="font-bold text-2xl">The answer is incorrect</div>
      </div>
    </div>
  );
};

export default Question;
