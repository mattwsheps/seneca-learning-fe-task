import { useCallback, useRef } from 'react';

const useTextMeasurement = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return useCallback((text: string, font: string) => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }
    const context = canvasRef.current.getContext('2d');
    if (context) {
      context.font = font;
      return context.measureText(text).width;
    }
    return 0;
  }, []);
};

export default useTextMeasurement;