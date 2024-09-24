import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import useCorrectness from '../../src/hooks/useCorrectness';
import { QuestionModel } from '../../src/models';

describe('useCorrectness', () => {
  const mockQuestionData: QuestionModel = {
    id:'q-1',
    questionText: 'Test Question',
    answers: [
      {
        id: 'a-1',
        options: [
          { id: 'o-1', optionText: 'Option 1', isCorrect: true },
          { id: 'o-2', optionText: 'Option 2', isCorrect: false },
        ],
      },
      {
        id: 'a-2',
        options: [
          { id: 'o-3', optionText: 'Option 3', isCorrect: false },
          { id: 'o-4', optionText: 'Option 4', isCorrect: true },
        ],
      },
    ],
  };

  it('returns correct values when all answers are correct', () => {
    const selectedOptions = {
      'a-1': { id: 'o-1', optionText: 'Option 1', isCorrect: true },
      'a-2': { id: 'o-4', optionText: 'Option 4', isCorrect: true },
    };

    const { result } = renderHook(() => useCorrectness(mockQuestionData, selectedOptions));

    expect(result.current.isAllCorrect).toBe(true);
    expect(result.current.correctnessFactor).toBe(1);
  });

  it('returns correct values when some answers are incorrect', () => {
    const selectedOptions = {
      'a-1': { id: 'o-1', optionText: 'Option 1', isCorrect: true },
      'a-2': { id: 'o-3', optionText: 'Option 3', isCorrect: false },
    };

    const { result } = renderHook(() => useCorrectness(mockQuestionData, selectedOptions));

    expect(result.current.isAllCorrect).toBe(false);
    expect(result.current.correctnessFactor).toBe(0.5);
  });

  it('returns correct values when questionData is undefined', () => {
    const { result } = renderHook(() => useCorrectness(undefined, {}));

    expect(result.current.isAllCorrect).toBe(false);
    expect(result.current.correctnessFactor).toBe(0);
  });
});