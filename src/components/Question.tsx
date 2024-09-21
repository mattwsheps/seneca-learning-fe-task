import { useCallback, useEffect, useState } from "react";
import { OptionModel, QuestionModel } from "../models";
import { fetchQuestion } from "../services/questions";
import AnswerToggle from "./AnswerToggle";
import { useQuery } from "@tanstack/react-query";

interface SelectedOptions {
  [key: string]: OptionModel;
}

const Question = () => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [isAllCorrect, setIsAllCorrect] = useState<boolean>(false);

  const {
    data: questionData,
    isLoading,
    isError,
  } = useQuery<QuestionModel, Error>({
    queryKey: ["quizData"],
    queryFn: fetchQuestion,
  });

  useEffect(() => {
    if (questionData) {
      const initialSelectedOptions: SelectedOptions = {};
      questionData.answers.forEach((answer) => {
        initialSelectedOptions[answer.id] = answer.options[0];
      });
      setSelectedOptions(initialSelectedOptions);
    }
  }, [questionData]);

  const handleToggles = (answerId: string, selectedOption: OptionModel) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [answerId]: selectedOption,
    }));
  };

  const checkIfCorrect = useCallback(() => {
    if (!questionData) return false;
    
    return questionData.answers.every((answer) => {
      const selectedOption = selectedOptions[answer.id];
      return selectedOption && selectedOption.isCorrect;
    });
  }, [questionData, selectedOptions]);

  useEffect(() => {
    if (questionData && Object.keys(selectedOptions).length === questionData.answers.length) {
      const allCorrect = checkIfCorrect();
      setIsAllCorrect(allCorrect);
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
