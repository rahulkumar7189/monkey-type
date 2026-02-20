import React, { useRef, useEffect } from 'react';

const TypingArea = ({ words, typed, timeLeft, state, setTyped, restart }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (state === 'start' || state === 'run') {
       inputRef.current.focus();
    }
  }, [state]);

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        restart();
    }
  };

  const handleChange = (e) => {
      if (state === 'finish') return;
      setTyped(e.target.value);
  };

  const letters = words.split("");
  const typedLetters = typed.split("");

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-12" onClick={() => inputRef.current.focus()}>
      <div className="text-2xl leading-relaxed break-all font-mono tracking-wide relative">
        {/* Hidden Input */}
        <input
            ref={inputRef}
            type="text"
            className="absolute opacity-0 top-0 left-0 w-full h-full cursor-default"
            value={typed}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
        />

        {/* Text Display */}
        {letters.map((char, index) => {
            let className = "text-text-sub transition-colors duration-200";
            if (index < typedLetters.length) {
                className = typedLetters[index] === char ? "text-text-active" : "text-text-error";
            }
            if (index === typedLetters.length) {
                // Active letter / Caret
                return <span key={index} className="text-text-main border-l-2 border-text-main animate-pulse">{char}</span>;
            }
            return <span key={index} className={className}>{char}</span>;
        })}
      </div>
    </div>
  );
};

export default TypingArea;
