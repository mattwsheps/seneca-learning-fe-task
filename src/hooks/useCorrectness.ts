import { useMemo } from 'react';
import { QuestionModel, OptionModel } from '../models';

interface SelectedOptions {
  [key: string]: OptionModel;
}

const useCorrectness = (questionData: QuestionModel | undefined, selectedOptions: SelectedOptions) => {
  const { correctCount, totalCount, isAllCorrect } = useMemo(() => {
    if (!questionData) return { correctCount: 0, totalCount: 0, isAllCorrect: false };

    let correct = 0;
    const total = questionData.answers.length;

    questionData.answers.forEach((answer) => {
      const selectedOption = selectedOptions[answer.id];
      if (selectedOption && selectedOption.isCorrect) {
        correct++;
      }
    });

    return {
      correctCount: correct,
      totalCount: total,
      isAllCorrect: correct === total
    };
  }, [questionData, selectedOptions]);

  const correctnessFactor = useMemo(() => {
    return totalCount > 0 ? correctCount / totalCount : 0;
  }, [correctCount, totalCount]);

  return { isAllCorrect, correctnessFactor };
};

export default useCorrectness;