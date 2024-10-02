import { useCallback, useEffect, useMemo } from "react";
import { OptionModel, QuestionModel } from "../models";
import { fetchQuestion } from "../services/questions";
import AnswerToggle from "./AnswerToggle";
import { useQuery } from "@tanstack/react-query";
import useCorrectness from "../hooks/useCorrectness";
import useSelectedOptions from "../hooks/useSelectedOptions";
import { createGradient } from "../utils";
import useShuffledArray from "../hooks/useShuffledArray";

const Question = () => {
  const {
    data: questionData,
    isLoading,
    isError,
    refetch
  } = useQuery<QuestionModel, Error>({
    queryKey: ["quizData"],
    queryFn: fetchQuestion,
  });

  const { selectedOptions, setSelectedOptions, initialiseSelectedOptions } =
    useSelectedOptions();
  const { isAllCorrect, correctnessFactor } = useCorrectness(
    questionData,
    selectedOptions
  );
  const shuffledAnswers = useShuffledArray(questionData?.answers);

  useEffect(() => {
    if (questionData) {
      initialiseSelectedOptions(questionData.answers);
    }
  }, [questionData, initialiseSelectedOptions]);

  const handleToggle = useCallback(
    (answerId: string, selectedOption: OptionModel) => {
      setSelectedOptions((prev) => ({
        ...prev,
        [answerId]: selectedOption,
      }));
    },
    [setSelectedOptions]
  );

  const backgroundStyle = useMemo(
    () => ({
      background: createGradient(correctnessFactor),
    }),
    [correctnessFactor]
  );

  const handleNextQuestion = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <div>Loading quiz...</div>;
  if (isError) return <div>Error loading quiz data</div>;

  return (
    <div className="md:mx-4 md:p-12 py-12 px-4 md:rounded-xl text-center font-mulish text-white" style={backgroundStyle}>
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="font-bold md:text-3xl sm:text-2xl text-xl">{questionData?.questionText}</h1>
        <div className="w-full flex flex-col items-center justify-center gap-4">
          {shuffledAnswers.map((answer) => (
            <AnswerToggle
              key={answer.id}
              options={answer.options}
              selectedOption={selectedOptions[answer.id]}
              isAllCorrect={isAllCorrect}
              onToggle={(selectedOption) =>
                handleToggle(answer.id, selectedOption)
              }
            />
          ))}
        </div>
        <div className="font-bold md:text-2xl text-xl">
          The answer is {isAllCorrect ? "correct" : "incorrect"}
        </div>
        <button
          className="bg-white bg-opacity-40 hover:bg-opacity-50 text-white font-bold md:px-6 md:py-4 px-4 py-2 md:text-xl text-lg md:rounded-full rounded-3xl"
          onClick={handleNextQuestion}
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default Question;
