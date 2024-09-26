import { QuestionModel } from "../models";

let currentQuestionIndex = 0;

export const fetchQuestion = async (): Promise<QuestionModel> => {
  try {
    const response = await fetch("/questionData.json");

    if (!response.ok) {
      throw new Error(`Failed to fetch question data: ${response.status} ${response.statusText}`);
    }

    const data: QuestionModel[] = await response.json();
    
    // Get the next question
    const question = data[currentQuestionIndex];
    
    // Increment the index, wrapping around to 0 if we've reached the end
    currentQuestionIndex = (currentQuestionIndex + 1) % data.length;
    
    return question;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    throw error;
  }
};