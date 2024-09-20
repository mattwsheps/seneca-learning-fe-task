import { useState } from "react";
import AnswerToggleButton from "./AnswerToggleButton";
import { motion } from "framer-motion";

interface AnswerToggleProps {
  option1: string;
  option2: string;
  onToggle?: (selectedOption: string) => void;
}

const AnswerToggle = ({ option1, option2, onToggle }: AnswerToggleProps) => {
  const [selectedOption, setSelectedOption] = useState<string>(option1);

  const handleToggle = (option: string) => {
    setSelectedOption(option);
    if (onToggle) {
      onToggle(option);
    }
  };

  return (
    <>
      <div className="relative flex w-full max-w-screen-lg items-center justify-between border-2 border-buttonBorder rounded-full">
        <motion.div
          className="absolute h-full w-[calc(50%)] bg-buttonBorder rounded-full"
          animate={{
            x: selectedOption === option1 ? "0px" : "calc(100%)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <AnswerToggleButton optionText={option1} handleToggle={handleToggle} />
        <AnswerToggleButton optionText={option2} handleToggle={handleToggle} />
      </div>
    </>
  );
};

export default AnswerToggle;
