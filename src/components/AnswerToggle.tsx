import { motion } from "framer-motion";
import AnswerToggleButton from "./AnswerToggleButton";
import { OptionModel } from "../models";
import { cn } from "../utils";
import useTextMeasurement from "../hooks/useTextMeasurement";
import useLayoutCheck from "../hooks/useLayoutCheck";
import useShuffledArray from "../hooks/useShuffledArray";

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
  const measureText = useTextMeasurement();
  const { containerRef, isStacked } = useLayoutCheck(options, measureText);

  const shuffledOptions = useShuffledArray(options);

  return (
    <div
      ref={containerRef}
      className={cn(
        options.length > 2 ? "w-full" : "w-full max-w-screen-lg",
        "relative border-2 border-white border-opacity-60 md:rounded-full rounded-3xl overflow-hidden"
      )}
    >
      <motion.div
        className={cn(
          "absolute bg-white bg-opacity-60",
          isStacked
            ? `w-full h-1/${shuffledOptions.length} rounded-none`
            : `w-1/${shuffledOptions.length} h-full md:rounded-full rounded-2xl`
        )}
        animate={{
          y: isStacked 
            ? `${shuffledOptions.findIndex(option => option.id === selectedOption?.id) * 100}%`
            : 0,
          x: isStacked 
            ? 0 
            : `${shuffledOptions.findIndex(option => option.id === selectedOption?.id) * 100}%`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
      />
      <div
        className={cn(
          "relative z-10",
          isStacked ? "grid grid-rows-2 h-full" : "flex flex-row"
        )}
      >
        {shuffledOptions.map((option) => (
          <AnswerToggleButton
            key={option.id}
            option={option}
            isAllCorrect={isAllCorrect}
            isSelected={
              selectedOption ? selectedOption.id === option.id : false
            }
            handleToggle={() => onToggle(option)}
            isStacked={isStacked}
          />
        ))}
      </div>
    </div>
  );
};

export default AnswerToggle;
