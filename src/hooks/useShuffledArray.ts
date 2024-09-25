import { useMemo } from 'react';

function useShuffledArray<T>(array: T[] | undefined): T[] {
  return useMemo(() => {
    if (!array) return [];
    return [...array].sort(() => Math.random() - 0.5);
  }, [array]);
}

export default useShuffledArray;