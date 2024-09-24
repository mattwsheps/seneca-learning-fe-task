import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useSelectedOptions from '../../src/hooks/useSelectedOptions';
import { AnswerModel } from '../../src/models';

describe('useSelectedOptions', () => {
  const mockAnswers: AnswerModel[] = [
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
  ];

  it('initialises with an empty object', () => {
    const { result } = renderHook(() => useSelectedOptions());

    expect(result.current.selectedOptions).toEqual({});
  });

  it('initialises selected options correctly', () => {
    const { result } = renderHook(() => useSelectedOptions());

    act(() => {
      result.current.initialiseSelectedOptions(mockAnswers);
    });

    expect(result.current.selectedOptions).toEqual({
      'a-1': { id: 'o-1', optionText: 'Option 1', isCorrect: true },
      'a-2': { id: 'o-3', optionText: 'Option 3', isCorrect: false },
    });
  });

  it('updates selected options correctly', () => {
    const { result } = renderHook(() => useSelectedOptions());

    act(() => {
      result.current.initialiseSelectedOptions(mockAnswers);
    });

    act(() => {
      result.current.setSelectedOptions({
        ...result.current.selectedOptions,
        'a-2': { id: 'o-4', optionText: 'Option 4', isCorrect: true },
      });
    });

    expect(result.current.selectedOptions).toEqual({
      'a-1': { id: 'o-1', optionText: 'Option 1', isCorrect: true },
      'a-2': { id: 'o-4', optionText: 'Option 4', isCorrect: true },
    });
  });
});