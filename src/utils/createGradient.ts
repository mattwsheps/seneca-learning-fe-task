import interpolateHSL from "./interpolateHSL";

export const createGradient = (factor: number): string => {
  const startIncorrectLower = [33, 89, 69];
  const endIncorrectLower = [22, 82, 55];

  const startIncorrectUpper = [60, 96, 69];
  const endIncorrectUpper = [43, 83, 56];

  const startCorrect = [162, 65, 67];
  const endCorrect = [189, 59, 60];

  let startColour, endColour;

  if (factor < 1) {
    // Interpolate between red and yellow for anything other than 100% correct
    startColour = interpolateHSL(
      startIncorrectLower,
      startIncorrectUpper,
      factor
    );
    endColour = interpolateHSL(endIncorrectLower, endIncorrectUpper, factor);
  } else {
    startColour = `hsl(${startCorrect[0]}, ${startCorrect[1]}%, ${startCorrect[2]}%)`;
    endColour = `hsl(${endCorrect[0]}, ${endCorrect[1]}%, ${endCorrect[2]}%)`;
  }

  return `linear-gradient(to bottom, ${startColour}, ${endColour})`;
};
