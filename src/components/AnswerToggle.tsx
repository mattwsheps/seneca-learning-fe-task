import AnswerToggleButton from "./AnswerToggleButton";
import { motion } from "framer-motion";
import { OptionModel } from "../models";
import { useCallback, useEffect, useState, useRef } from "react";
import { cn } from "../utils";

interface AnswerToggleProps {
  options: OptionModel[];
  selectedOption: OptionModel;
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

  const currentSelectedOption = selectedOption || options[0];

  const checkOverflow = useCallback(() => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current;
      setIsStacked(scrollWidth > clientWidth);
    }
  }, []);

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [checkOverflow]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        isStacked ? 'flex-col' : 'flex-row',
        "relative flex w-full max-w-screen-lg items-center justify-between border-2 border-white border-opacity-60 md:rounded-full rounded-3xl overflow-hidden"
      )}
    >
      <motion.div
        className={cn(
          isStacked ? "w-full" : "w-1/2",
          "absolute h-full bg-white bg-opacity-60 md:rounded-full rounded-2xl"
        )}
        animate={{
          y: isStacked ? (selectedOption === options[0] ? "0%" : "100%") : 0,
          x: isStacked ? 0 : selectedOption === options[0] ? "0%" : "100%",
          height: isStacked ? "50%" : "100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      {options.map((option) => (
        <AnswerToggleButton
          key={option.id}
          option={option}
          isAllCorrect={isAllCorrect}
          isSelected={currentSelectedOption.id === option.id}
          handleToggle={() => onToggle(option)}
          isStacked={isStacked}
        />
      ))}
    </div>
  );
};

export default AnswerToggle;