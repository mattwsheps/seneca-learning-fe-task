import { useEffect, useState, useRef, useCallback } from 'react';
import AnswerToggleButton from "./AnswerToggleButton";
import { motion } from "framer-motion";
import { OptionModel } from "../models";
import { cn } from "../utils";

interface AnswerToggleProps {
  options: OptionModel[];
  selectedOption: OptionModel | undefined;
  isAllCorrect: boolean;
  onToggle: (selectedOption: OptionModel) => void;
}

const AnswerToggle = ({
  options,
  selectedOption,
  isAllCorrect,
  onToggle,
}: AnswerToggleProps) => {
  const [isStacked, setIsStacked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const measureText = useCallback((text: string, font: string) => {
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

  // Safely determine if the first option is selected
  const isFirstOptionSelected = selectedOption ? selectedOption.id === options[0].id : true;

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full max-w-screen-lg border-2 border-white border-opacity-60 md:rounded-full rounded-3xl overflow-hidden"
      )}
    >
      <motion.div
        className={cn(
          "absolute bg-white bg-opacity-60 md:rounded-full rounded-2xl",
          isStacked ? "w-full" : "w-1/2",
          isStacked ? "h-1/2" : "h-full"
        )}
        animate={{
          y: isStacked ? (isFirstOptionSelected ? "0%" : "100%") : 0,
          x: isStacked ? 0 : isFirstOptionSelected ? "0%" : "100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      <div 
        className={cn(
          "relative z-10",
          isStacked ? "grid grid-rows-2 h-full" : "flex flex-row"
        )}
      >
        {options.map((option) => (
          <AnswerToggleButton
            key={option.id}
            option={option}
            isAllCorrect={isAllCorrect}
            isSelected={selectedOption ? selectedOption.id === option.id : false}
            handleToggle={() => onToggle(option)}
            isStacked={isStacked}
          />
        ))}
      </div>
    </div>
  );
};

export default AnswerToggle;