import { useCallback, useEffect, useMemo } from "react";
import { OptionModel, QuestionModel } from "../models";
import { fetchQuestion } from "../services/questions";
import AnswerToggle from "./AnswerToggle";
import { useQuery } from "@tanstack/react-query";
import useCorrectness from "../hooks/useCorrectness";
import useSelectedOptions from "../hooks/useSelectedOptions";

// Utility function to interpolate between two HSL colors
const interpolateHSL = (
  hsl1: number[],
  hsl2: number[],
  factor: number
): string => {
  const h = hsl1[0] + factor * (hsl2[0] - hsl1[0]);
  const s = hsl1[1] + factor * (hsl2[1] - hsl1[1]);
  const l = hsl1[2] + factor * (hsl2[2] - hsl1[2]);
  return `hsl(${h}, ${s}%, ${l}%)`;
};

// Utility function to create gradient based on correctness percentage
const createGradient = (factor: number): string => {
  const startIncorrectLower = [33, 89, 69];
  const endIncorrectLower = [22, 82, 55];

  const startIncorrectUpper = [50, 96, 69];
  const endIncorrectUpper = [33, 83, 56];

  const startCorrect = [162, 65, 67];
  const endCorrect = [189, 59, 60];

  let startColour, endColour;

  if (factor < 1) {
    // Interpolate between red and yellow for anything other than 100% correct
    startColour = interpolateHSL(
      startIncorrectLower,
      startIncorrectUpper,
      factor
    );
    endColour = interpolateHSL(endIncorrectLower, endIncorrectUpper, factor);
  } else {
    startColour = `hsl(${startCorrect[0]}, ${startCorrect[1]}%, ${startCorrect[2]}%)`;
    endColour = `hsl(${endCorrect[0]}, ${endCorrect[1]}%, ${endCorrect[2]}%)`;
  }
  console.log(`linear-gradient(to bottom, ${startColour}, ${endColour})`)

  return `linear-gradient(to bottom, ${startColour}, ${endColour})`;
};

const Question = () => {
  const {
    data: questionData,
    isLoading,
    isError,
  } = useQuery<QuestionModel, Error>({
    queryKey: ["quizData"],
    queryFn: fetchQuestion,
  });

  const { selectedOptions, setSelectedOptions, initialiseSelectedOptions } =
    useSelectedOptions();
  const { correctCount, totalCount, isAllCorrect } = useCorrectness(
    questionData,
    selectedOptions
  );

  // Initialisation of selectedOptions object when data is fetched
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

  const correctnessFactor = useMemo(() => {
    return totalCount > 0 ? correctCount / totalCount : 0;
  }, [correctCount, totalCount]);

  const backgroundStyle = useMemo(
    () => ({
      background: createGradient(correctnessFactor),
    }),
    [correctnessFactor]
  );

  if (isLoading) return <div>Loading quiz...</div>;
  if (isError) return <div>Error loading quiz data</div>;

  return (
    <div className="m-4 p-12 rounded-xl" style={backgroundStyle}>
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="font-bold text-3xl">{questionData?.questionText}</h1>
        <div className="w-full flex flex-col items-center justify-center gap-4">
          {questionData?.answers.map((answer) => (
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
        <div className="font-bold text-2xl">
          The answer is {isAllCorrect ? "correct" : "incorrect"}
        </div>
        <div className="font-bold text-2xl">{correctnessFactor}</div>
      </div>
    </div>
  );
};

export default Question;
