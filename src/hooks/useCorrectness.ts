import { useState, useCallback } from 'react';
import { QuestionModel, OptionModel } from '../models';

interface SelectedOptions {
  [key: string]: OptionModel;
}

const useCorrectness = (questionData: QuestionModel | undefined, selectedOptions: SelectedOptions) => {
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const checkCorrectness = useCallback(() => {
    if (!questionData) return;
    
    let correct = 0;
    const total = questionData.answers.length;

    questionData.answers.forEach((answer) => {
      const selectedOption = selectedOptions[answer.id];
      if (selectedOption && selectedOption.isCorrect) {
        correct++;
      }
    });

    setCorrectCount(correct);
    setTotalCount(total);
    setIsAllCorrect(correct === total);
  }, [questionData, selectedOptions]);

  return { correctCount, totalCount, isAllCorrect, checkCorrectness };
};

export default useCorrectness;