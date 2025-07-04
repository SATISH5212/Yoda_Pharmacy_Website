import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type SlowTypingProps = {
  text: string;
  className?: string;
  cursorColor?: string;
};

function SlowTypingText({ text, className = "", cursorColor = "black" }: SlowTypingProps) {
  const [currentChar, setCurrentChar] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentChar === text) {
        clearInterval(intervalId);
        setIsTyping(false);
      } else {
        setCurrentChar(currentChar + text[currentChar.length]);
      }
    }, 100); // Adjust typing speed here

    return () => clearInterval(intervalId);
  }, [text, currentChar]);

  return (
    <div className="relative">
      <motion.span
        className={`text-sm font-normal ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {currentChar}
      </motion.span>
      {isTyping && (
        <span
          className={`absolute top-0 right-0 h-full w-1 bg-${cursorColor}-900`}
          style={{ animation: 'blink 1s infinite' }}
        />
      )}
    </div>
  );
}

export default SlowTypingText;