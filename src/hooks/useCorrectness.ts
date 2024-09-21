import { useState, useCallback } from 'react';
import { QuestionModel, OptionModel } from '../models';

interface SelectedOptions {
  [key: string]: OptionModel;
}

const useCorrectness = (questionData: QuestionModel | undefined, selectedOptions: SelectedOptions) => {
  const [isAllCorrect, setIsAllCorrect] = useState<boolean>(false);

  const checkIfCorrect = useCallback(() => {
    if (!questionData) return;
    
    const allCorrect = questionData.answers.every((answer) => {
      const selectedOption = selectedOptions[answer.id];
      return selectedOption && selectedOption.isCorrect;
    });

    setIsAllCorrect(allCorrect);
  }, [questionData, selectedOptions]);

  return { isAllCorrect, checkIfCorrect };
};

export default useCorrectness;