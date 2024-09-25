import { useState, useCallback } from 'react';
import { OptionModel, AnswerModel } from '../models';

interface SelectedOptions {
  [key: string]: OptionModel;
}

const useSelectedOptions = () => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const initialiseSelectedOptions = useCallback((answers: AnswerModel[]) => {
    const initialSelectedOptions: SelectedOptions = {};
    let hasIncorrectSelection = false;

    answers.forEach((answer, index) => {
      const options = answer.options;
      const randomOption = options[Math.floor(Math.random() * options.length)];
      
      if (!randomOption.isCorrect) {
        hasIncorrectSelection = true;
      }

      initialSelectedOptions[answer.id] = randomOption;

      // If we're at the last answer and still don't have an incorrect selection,
      // force an incorrect selection
      if (index === answers.length - 1 && !hasIncorrectSelection) {
        const incorrectOption = options.find(option => !option.isCorrect);
        if (incorrectOption) {
          initialSelectedOptions[answer.id] = incorrectOption;
        }
      }
    });

    setSelectedOptions(initialSelectedOptions);
  }, []);

  return { selectedOptions, setSelectedOptions, initialiseSelectedOptions };
};

export default useSelectedOptions;