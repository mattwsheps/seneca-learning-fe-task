import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import useShuffledArray from "../../src/hooks/useShuffledArray";

describe("useShuffledArray", () => {
  const originalMathRandom = Math.random;
  beforeEach(() => {
    vi.spyOn(Math, "random");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Math.random = originalMathRandom;
  });

  it("returns an empty array when input is undefined", () => {
    const { result } = renderHook(() => useShuffledArray(undefined));
    expect(result.current).toEqual([]);
  });

  it("returns an empty array when input is an empty array", () => {
    const { result } = renderHook(() => useShuffledArray([]));
    expect(result.current).toEqual([]);
  });

  it("uses Math.random for shuffling", () => {
    const input = [1, 2, 3, 4, 5];
    renderHook(() => useShuffledArray(input));

    expect(Math.random).toHaveBeenCalled();
  });

  it("reverses the order of the input array when Math.random always returns < 0.5", () => {
    Math.random = vi.fn(() => 0.49);
    const input = [1, 2, 3, 4, 5];
    const { result } = renderHook(() => useShuffledArray(input));

    expect(result.current).toEqual([5, 4, 3, 2, 1]);
  });

  it("maintains the order of the input array when Math.random always returns >= 0.5", () => {
    Math.random = vi.fn(() => 0.5);
    const input = [1, 2, 3, 4, 5];
    const { result } = renderHook(() => useShuffledArray(input));

    expect(result.current).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns the same shuffled array on re-renders if the input hasnt changed", () => {
    const input = [1, 2, 3, 4, 5];
    const { result, rerender } = renderHook(() => useShuffledArray(input));

    const firstResult = result.current;
    rerender();
    expect(result.current).toEqual(firstResult);
  });

  it("returns a new shuffled array when the input changes", () => {
    const { result, rerender } = renderHook(
      ({ array }) => useShuffledArray(array),
      { initialProps: { array: [1, 2, 3] } }
    );

    const firstResult = result.current;
    rerender({ array: [1, 2, 3, 4] });
    expect(result.current).not.toEqual(firstResult);
  });

  it("shuffles array with objects correctly", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const { result } = renderHook(() => useShuffledArray(input));

    expect(result.current).toHaveLength(input.length);
    expect(result.current).toEqual(expect.arrayContaining(input));
  });
});
