import { QuestionModel } from "../models";
import { fetchQuestion } from "../services/questions";
import AnswerToggle from "./AnswerToggle";
import { useQuery } from "@tanstack/react-query";

const Question = () => {
  const {
    data: questionData,
    isLoading,
    isError,
  } = useQuery<QuestionModel, Error>({
    queryKey: ["quizData"],
    queryFn: fetchQuestion,
  });

  if (isLoading) {
    return <div>Loading quiz...</div>;
  }

  if (isError) {
    return <div>Error loading quiz data</div>;
  }

  return (
    <div className="bg-gradient-to-b from-incorrectStart to-incorrectEnd m-4 p-12 rounded-xl">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="font-bold text-3xl">{questionData?.questionText}</h1>
        <div className="w-full flex flex-col items-center justify-center gap-4">
          {questionData?.answers.map((answer) => (
            <AnswerToggle
              key={answer.id}
              options={answer.options}
            />
          ))}
        </div>
        <div className="font-bold text-2xl">The answer is incorrect</div>
      </div>
    </div>
  );
};

export default Question;
