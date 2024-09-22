import { useMemo } from 'react';
import { QuestionModel, OptionModel } from '../models';

interface SelectedOptions {
  [key: string]: OptionModel;
}

const useCorrectness = (questionData: QuestionModel | undefined, selectedOptions: SelectedOptions) => {
  const { correctCount, totalCount, isAllCorrect } = useMemo(() => {
    if (!questionData) return { correctCount: 0, totalCount: 0, isAllCorrect: false };

    const total = questionData.answers.length;
    const correct = questionData.answers.reduce((count, answer) => {
      const selectedOption = selectedOptions[answer.id];
      return selectedOption && selectedOption.isCorrect ? count + 1 : count;
    }, 0);

    return {
      correctCount: correct,
      totalCount: total,
      isAllCorrect: correct === total
    };
  }, [questionData, selectedOptions]);

  return { correctCount, totalCount, isAllCorrect };
};

export default useCorrectness;