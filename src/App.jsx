import React, { useEffect } from 'react';
import Header from './components/Header';
import TypingArea from './components/TypingArea';
import Timer from './components/Timer';
import Results from './components/Results';
import useEngine from './hooks/useEngine';

function App() {
  const { state, words, typed, timeLeft, timer, setTimer, setTyped, restart, totalTyped, errors } = useEngine();

  const calculateAccuracy = () => {
       if (totalTyped === 0) return 0;
       const correct = totalTyped - errors;
       return (correct / totalTyped) * 100;
  };

  return (
    <div className="bg-bg-dark min-h-screen text-text-sub font-mono flex flex-col p-8">
       <Header timeLeft={timeLeft} setTimer={setTimer} timer={timer} />
       
       <div className="flex-grow flex flex-col justify-center items-center py-12 relative">
          {state !== 'finish' && <Timer timeLeft={timeLeft} />}
          
          <TypingArea 
             words={words} 
             typed={typed} 
             timeLeft={timeLeft} 
             state={state} 
             setTyped={setTyped}
             restart={restart} 
          />
       </div>

       <div className="text-center text-sm opacity-50 mt-12">
            <p>Tab + Enter to restart</p>
       </div>

       <Results 
          state={state} 
          errors={errors} 
          accuracy={calculateAccuracy()} 
          total={totalTyped} 
          restart={restart}
       />
    </div>
  );
}

export default App;
