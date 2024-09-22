import { useState } from "react";
import AnswerToggleButton from "./AnswerToggleButton";
import { motion } from "framer-motion";
import { OptionModel } from "../models";

interface AnswerToggleProps {
  options: OptionModel[];
  isAllCorrect: boolean;
  onToggle?: (selectedOption: OptionModel) => void;
}

const AnswerToggle = ({ options, isAllCorrect, onToggle }: AnswerToggleProps) => {
  const [selectedOption, setSelectedOption] = useState<OptionModel>(options[0]);

  const handleToggle = (option: OptionModel) => {
    setSelectedOption(option);
    if (onToggle) {
      onToggle(option);
    }
  };

  return (
    <>
      <div className="relative flex w-full max-w-screen-lg items-center justify-between border-2 border-white border-opacity-60 rounded-full">
        <motion.div
          className="absolute h-full w-[calc(50%)] bg-white bg-opacity-60 rounded-full "
          animate={{
            x: selectedOption === options[0] ? "0px" : "calc(100%)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        {options.map((option) => (
          <AnswerToggleButton
          key={option.id}
          option={option}
          isAllCorrect={isAllCorrect}
          isSelected={selectedOption.id === option.id}
          handleToggle={handleToggle}
        />
        ))}
        
      </div>
    </>
  );
};

export default AnswerToggle;
