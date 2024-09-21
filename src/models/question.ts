export interface OptionModel {
  id: string;
  optionText: string;
  isCorrect: boolean;
}

export interface AnswerModel {
  id: string;
  options: OptionModel[];
}

export interface QuestionModel {
  id: string;
  questionText: string;
  answers: AnswerModel[];
}
