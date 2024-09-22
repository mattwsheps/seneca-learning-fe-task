export const interpolateHSL = (
  hsl1: number[],
  hsl2: number[],
  factor: number
): string => {
  const h = hsl1[0] + factor * (hsl2[0] - hsl1[0]);
  const s = hsl1[1] + factor * (hsl2[1] - hsl1[1]);
  const l = hsl1[2] + factor * (hsl2[2] - hsl1[2]);
  return `hsl(${h}, ${s}%, ${l}%)`;
};

export default interpolateHSL;