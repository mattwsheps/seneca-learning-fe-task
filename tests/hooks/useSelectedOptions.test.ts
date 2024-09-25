import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useSelectedOptions from '../../src/hooks/useSelectedOptions';
import { AnswerModel } from '../../src/models';

describe('useSelectedOptions', () => {
  const originalMathRandom = Math.random;
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
  
  beforeEach(() => {
    vi.spyOn(Math, 'random');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Math.random = originalMathRandom;
  });
  

  it('initialises with an empty object', () => {
    const { result } = renderHook(() => useSelectedOptions());

    expect(result.current.selectedOptions).toEqual({});
  });

  it('initialises selected options randomly', () => {
    Math.random = vi.fn(() => 0.7);

    const { result } = renderHook(() => useSelectedOptions());

    act(() => {
      result.current.initialiseSelectedOptions(mockAnswers);
    });

    expect(result.current.selectedOptions).toEqual({
      'a-1': { id: 'o-2', optionText: 'Option 2', isCorrect: false },
      'a-2': { id: 'o-4', optionText: 'Option 4', isCorrect: true },
    });
  });

  it('ensures at least one incorrect selection', () => {
    Math.random = vi.fn(() => 0.2); // This would normally select all correct answers

    const { result } = renderHook(() => useSelectedOptions());

    act(() => {
      result.current.initialiseSelectedOptions(mockAnswers);
    });

    const selectedOptions = result.current.selectedOptions;
    const hasIncorrectSelection = Object.values(selectedOptions).some(option => !option.isCorrect);
    expect(hasIncorrectSelection).toBe(true);
  });

  it('updates selected options correctly', () => {
    Math.random = vi.fn(() => 0.2);

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