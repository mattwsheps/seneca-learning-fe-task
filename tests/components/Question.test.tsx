import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Question from '../../src/components/Question';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchQuestion } from '../../src/services/questions';
import * as useCorrectnessModule from '../../src/hooks/useCorrectness';
import * as useSelectedOptionsModule from '../../src/hooks/useSelectedOptions';

vi.mock('../../src/services/questions');
vi.mock('../hooks/useCorrectness');
vi.mock('../hooks/useSelectedOptions');

const mockQuestionData = {
  id: 'q-1',
  questionText: 'Test Question',
  answers: [
    {
      id: 'a-1',
      options: [
        { id: 'o-1', optionText: 'Option 1', isCorrect: true },
        { id: 'o-2', optionText: 'Option 2', isCorrect: false },
      ],
    },
  ],
};

const queryClient = new QueryClient();

describe('Question Component', () => {
  beforeEach(() => {
    vi.mocked(fetchQuestion).mockResolvedValue(mockQuestionData);
  });

  it('renders loading state', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Question />
      </QueryClientProvider>
    );
    expect(screen.getByText('Loading quiz...')).toBeDefined();
  });

  it('renders question and options when data is loaded', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Question />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Question')).toBeDefined();
      expect(screen.getByText('Option 1')).toBeDefined();
      expect(screen.getByText('Option 2')).toBeDefined();
    });
  });

  it('updates correctness when an option is selected', async () => {
    const mockSetSelectedOptions = vi.fn();
    vi.spyOn(useSelectedOptionsModule, 'default').mockReturnValue({
      selectedOptions: {},
      setSelectedOptions: mockSetSelectedOptions,
      initialiseSelectedOptions: vi.fn(),
    });

    let correctCount = 0;
    const totalCount = 1;
    vi.spyOn(useCorrectnessModule, 'default').mockImplementation(() => ({
      isAllCorrect: correctCount === totalCount,
      correctCount,
      totalCount,
    }));

    const { rerender } = render(
      <QueryClientProvider client={queryClient}>
        <Question />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('The answer is incorrect')).toBeDefined();
    });

    const option1 = screen.getByText('Option 1');
    await userEvent.click(option1);

    // Simulate the change in correctness
    correctCount = 1;
    rerender(
      <QueryClientProvider client={queryClient}>
        <Question />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('The answer is correct')).toBeDefined();
    });

    expect(mockSetSelectedOptions).toHaveBeenCalled();
  });
});