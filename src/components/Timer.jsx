import React from 'react';

const Timer = ({ timeLeft }) => {
  return (
    <div className="text-text-main text-2xl font-mono mb-4 text-left max-w-5xl mx-auto">
      {timeLeft}
    </div>
  );
};

export default Timer;
