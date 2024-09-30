export const getMotionDivClasses = (length: number, isStacked: boolean): string => {
  if (isStacked) {
    return length === 2 ? 'w-full h-1/2' : length === 3 ? 'w-full h-1/3' : 'w-full h-full';
  }
  return length === 2 ? 'w-1/2 h-full' : length === 3 ? 'w-1/3 h-full' : 'w-full h-full';
};