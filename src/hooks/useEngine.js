import { useState, useEffect, useCallback } from 'react';

const generateWords = (count = 50) => {
  const words = [
    "the", "be", "of", "and", "a", "to", "in", "he", "have", "it", "that", "for", "they", "i", "with", "as", "not", "on", "she", "at", "by", "this", "we", "you", "do", "but", "from", "or", "which", "one", "would", "all", "will", "there", "say", "who", "make", "when", "can", "more", "if", "no", "man", "out", "other", "so", "what", "time", "up", "go", "about", "than", "into", "could", "state", "only", "new", "year", "some", "take", "come", "these", "know", "see", "use", "get", "like", "then", "first", "any", "work", "now", "may", "such", "give", "over", "think", "most", "even", "find", "day", "also", "after", "way", "many", "must", "look", "before", "great", "back", "through", "long", "where", "much", "should", "well", "people", "down", "own", "just", "because", "good", "each", "those", "feel", "seem", "how", "high", "too", "place", "little", "world", "very", "still", "nation", "hand", "old", "life", "tell", "write", "become", "here", "show", "house", "both", "between", "need", "mean", "call", "develop", "under", "last", "right", "move", "thing", "general", "school", "never", "same", "another", "begin", "while", "number", "part", "turn", "real", "leave", "might", "want", "point", "form", "off", "child", "few", "small", "since", "against", "ask", "late", "home", "interest", "large", "person", "end", "open", "public", "follow", "during", "present", "without", "again", "hold", "govern", "around", "possible", "head", "consider", "word", "program", "problem", "however", "lead", "system", "set", "order", "eye", "plan", "run", "keep", "face", "fact", "group", "play", "stand", "increase", "early", "course", "change", "help", "line"
  ];
  return new Array(count).fill(null).map(() => words[Math.floor(Math.random() * words.length)]).join(' ');
};

const countErrors = (actual, expected) => {
  const expectedChars = expected.split("");
  return actual.split("").reduce((errors, char, i) => {
    return errors + (char !== expectedChars[i] ? 1 : 0);
  }, 0);
};

const calculateAccuracy = (errors, total) => {
  if (total > 0) {
    const correct = total - errors;
    return (correct / total) * 100;
  }
  return 100;
};

const useEngine = () => {
  const [state, setState] = useState("start"); // start, run, finish
  const [words, setWords] = useState(generateWords());
  const [typed, setTyped] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [timer, setTimer] = useState(30); // Configurable duration
  const [errors, setErrors] = useState(0);

  const totalTyped = typed.length;

  const restart = useCallback(() => {
    setState("start");
    setWords(generateWords());
    setTyped("");
    setTimeLeft(timer);
    setErrors(0);
  }, [timer]);

  const updateWords = useCallback(() => {
      setWords(generateWords());
  }, []);

  const sumErrors = useCallback(() => {
      const errs = countErrors(typed, words.substring(0, typed.length));
      setErrors(errs);
  }, [typed, words]);

  useEffect(() => {
    if (state === "start" && typed.length > 0) {
      setState("run");
    }
    if (state === "run") {
        if (timeLeft > 0) {
           const intervalId = setInterval(() => {
               setTimeLeft((prev) => prev - 1);
           }, 1000);
           return () => clearInterval(intervalId);
        } else {
            setState("finish");
            sumErrors();
        }
    }
  }, [state, typed, timeLeft, sumErrors]);

  return {
    state,
    words,
    typed,
    timeLeft,
    timer,
    setTimer,
    setTyped,
    restart,
    totalTyped,
    errors,
    updateWords
  };
};

export default useEngine;
