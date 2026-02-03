"use client";

import { useState, useEffect } from "react";

interface TypingPlaceholderProps {
  texts: string[];
  interval?: number;
  typingSpeed?: number;
}

export const TypingPlaceholder = ({
  texts,
  interval = 3000,
  typingSpeed = 50,
}: TypingPlaceholderProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[currentTextIndex];

    if (isTyping) {
      if (charIndex < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, interval - (currentText.length * typingSpeed));
        return () => clearTimeout(timeout);
      }
    } else {
      const timeout = setTimeout(() => {
        setIsTyping(true);
        setCharIndex(0);
        setDisplayText("");
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, isTyping, currentTextIndex, texts, interval, typingSpeed]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};
