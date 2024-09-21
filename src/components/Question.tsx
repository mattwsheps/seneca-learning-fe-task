import { useEffect } from "react";
import { OptionModel, QuestionModel } from "../models";
import { fetchQuestion } from "../services/questions";
import AnswerToggle from "./AnswerToggle";
import { useQuery } from "@tanstack/react-query";
import useCorrectness from "../hooks/useCorrectness";
import useSelectedOptions from "../hooks/useSelectedOptions";

const Question = () => {
  const {
    data: questionData,
    isLoading,
    isError,
  } = useQuery<QuestionModel, Error>({
    queryKey: ["quizData"],
    queryFn: fetchQuestion,
  });

  const { selectedOptions, setSelectedOptions, initialiseSelectedOptions } = useSelectedOptions();
  const { isAllCorrect, checkIfCorrect } = useCorrectness(questionData, selectedOptions);

  useEffect(() => {
    if (questionData) {
      initialiseSelectedOptions(questionData.answers);
    }
  }, [questionData, initialiseSelectedOptions]);

  const handleToggles = (answerId: string, selectedOption: OptionModel) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [answerId]: selectedOption,
    }));
  };

  useEffect(() => {
    if (questionData && Object.keys(selectedOptions).length === questionData.answers.length) {
      checkIfCorrect();
    }
  }, [selectedOptions, questionData, checkIfCorrect]);

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
              isAllCorrect={isAllCorrect}
              onToggle={(selectedOption) =>
                handleToggles(answer.id, selectedOption)
              }
            />
          ))}
        </div>
        {isAllCorrect ? (
          <div className="font-bold text-2xl">The answer is correct</div>
        ) : (
          <div className="font-bold text-2xl">The answer is incorrect</div>
        )}
      </div>
    </div>
  );
};

export default Question;
