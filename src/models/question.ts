export interface OptionModel {
  id: string;
  optionText: string;
  isCorrect: boolean;
}

export interface AnswerModel {
  id: string;
  options: OptionModel[];
  correctSelected?: boolean;
}

export interface QuestionModel {
  id: string;
  questionText: string;
  answers: AnswerModel[];
}
