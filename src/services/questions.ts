import { QuestionModel } from "../models";

export const fetchQuestion = async (): Promise<QuestionModel> => {
  try {
    const response = await fetch("/questionData-2.json");

    if (!response.ok) {
      throw new Error(`Failed to fetch question data: ${response.status} ${response.statusText}`);
    }

    const data: QuestionModel = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching quiz data:", error);

    throw error;
  }
};
