import { useState, useCallback } from 'react';
import { OptionModel, AnswerModel } from '../models';

interface SelectedOptions {
  [key: string]: OptionModel;
}

const useSelectedOptions = () => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const initialiseSelectedOptions = useCallback((answers: AnswerModel[]) => {
    const initialSelectedOptions: SelectedOptions = {};
    answers.forEach((answer) => {
      initialSelectedOptions[answer.id] = answer.options[0];
    });
    setSelectedOptions(initialSelectedOptions);
  }, []);

  return { selectedOptions, setSelectedOptions, initialiseSelectedOptions };
};

export default useSelectedOptions;