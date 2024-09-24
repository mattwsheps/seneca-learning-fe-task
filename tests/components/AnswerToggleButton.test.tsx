import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AnswerToggleButton from "../../src/components/AnswerToggleButton";

const mockOption = {
  id: "test-id",
  optionText: "Test Option",
  isCorrect: true,
};

describe("AnswerToggleButton Component", () => {
  it("renders option text correctly", () => {
    render(
      <AnswerToggleButton
        option={mockOption}
        isAllCorrect={false}
        isSelected={false}
        handleToggle={() => {}}
        isStacked={false}
      />
    );

    expect(screen.getByText("Test Option")).toBeDefined();
  });

  it("calls handleToggle when clicked", async () => {
    const mockHandleToggle = vi.fn();
    render(
      <AnswerToggleButton
        option={mockOption}
        isAllCorrect={false}
        isSelected={false}
        handleToggle={mockHandleToggle}
        isStacked={false}
      />
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(mockHandleToggle).toHaveBeenCalledWith(mockOption);
  });

  it("is disabled when isAllCorrect is true", () => {
    render(
      <AnswerToggleButton
        option={mockOption}
        isAllCorrect={true}
        isSelected={false}
        handleToggle={() => {}}
        isStacked={false}
      />
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("has correct styling when selected", () => {
    render(
      <AnswerToggleButton
        option={mockOption}
        isAllCorrect={false}
        isSelected={true}
        handleToggle={() => {}}
        isStacked={false}
      />
    );

    const button = screen.getByRole("button");
    expect(button.className).toContain("text-black opacity-30");
  });
});
