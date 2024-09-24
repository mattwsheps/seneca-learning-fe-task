import React from "react";
import { motion } from "framer-motion";
import AnswerToggleButton from "./AnswerToggleButton";
import { OptionModel } from "../models";
import { cn } from "../utils";
import useTextMeasurement from "../hooks/useTextMeasurement";
import useLayoutCheck from "../hooks/useLayoutCheck";

interface AnswerToggleProps {
  options: OptionModel[];
  selectedOption: OptionModel | undefined;
  isAllCorrect: boolean;
  onToggle: (selectedOption: OptionModel) => void;
}

const AnswerToggle: React.FC<AnswerToggleProps> = ({
  options,
  selectedOption,
  isAllCorrect,
  onToggle,
}) => {
  const measureText = useTextMeasurement();
  const { containerRef, isStacked } = useLayoutCheck(options, measureText);

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
          "absolute bg-white bg-opacity-60",
          isStacked
            ? "w-full h-1/2 rounded-none"
            : "w-1/2 h-full md:rounded-full rounded-2xl"
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
