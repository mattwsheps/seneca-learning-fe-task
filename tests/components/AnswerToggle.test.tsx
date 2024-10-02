import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AnswerToggle from "../../src/components/AnswerToggle";
import '@testing-library/jest-dom';

const mockOptions = [
  { id: "o-1", optionText: "Option 1", isCorrect: true },
  { id: "o-2", optionText: "Option 2", isCorrect: false },
];

describe("AnswerToggle Component", () => {
  it("renders options correctly", () => {
    render(
      <AnswerToggle
        options={mockOptions}
        selectedOption={mockOptions[0]}
        isAllCorrect={false}
        onToggle={() => {}}
      />
    );

    expect(screen.getByText("Option 1")).toBeDefined();
    expect(screen.getByText("Option 2")).toBeDefined();
  });

  it("calls onToggle when an option is clicked", async () => {
    const mockOnToggle = vi.fn();
    render(
      <AnswerToggle
        options={mockOptions}
        selectedOption={mockOptions[0]}
        isAllCorrect={false}
        onToggle={mockOnToggle}
      />
    );

    const optionB = screen.getByText("Option 2");
    await userEvent.click(optionB);

    expect(mockOnToggle).toHaveBeenCalledWith(mockOptions[1]);
  });

  it("disables buttons when isAllCorrect is true", () => {
    render(
      <AnswerToggle
        options={mockOptions}
        selectedOption={mockOptions[0]}
        isAllCorrect={true}
        onToggle={() => {}}
      />
    );

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});
