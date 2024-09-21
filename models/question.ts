export interface Option {
  id: string;
  optionText: string;
  isCorrect: boolean;
}

export interface Answer {
  id: string;
  options: Option[];
}

export interface Question {
  id: string;
  questionText: string;
  answers: Answer[];
}
