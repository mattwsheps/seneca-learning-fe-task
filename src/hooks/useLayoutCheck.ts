import { useState, useRef, useCallback, useEffect } from 'react';
import { OptionModel } from "../models";

const useLayoutCheck = (options: OptionModel[], measureText: (text: string, font: string) => number) => {
  const [isStacked, setIsStacked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkLayout = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const buttonWidth = containerWidth / options.length;
      
      const buttonStyle = window.getComputedStyle(containerRef.current.querySelector('button') as HTMLElement);
      const font = `${buttonStyle.fontWeight} ${buttonStyle.fontSize} ${buttonStyle.fontFamily}`;

      const shouldStack = options.some(option => {
        const words = option.optionText.split(' ');
        return words.some(word => {
          const wordWidth = measureText(word, font);
          return wordWidth > buttonWidth - 40; // Subtracting 40px for padding
        });
      });

      setIsStacked(shouldStack);
    }
  }, [options, measureText]);

  useEffect(() => {
    checkLayout();
    window.addEventListener('resize', checkLayout);

    return () => {
      window.removeEventListener('resize', checkLayout);
    };
  }, [checkLayout]);

  return { containerRef, isStacked };
};

export default useLayoutCheck;