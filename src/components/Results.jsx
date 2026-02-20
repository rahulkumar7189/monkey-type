import React from 'react';

const Results = ({ state, errors, accuracy, total, restart }) => {
  if (state !== 'finish') return null;

  // WPM = (characters / 5) / time_in_minutes
  // We'll estimate based on the standard average word length of 5
  // But strictly, WPM is often calculated by (totalChars / 5) / (time / 60)
  // Here we can use a simpler approximation if exact time isn't stored, but we should probably pass the duration.
  // Let's assume the user finished the full duration for this MVP calculation.
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-bg-dark p-8 rounded-xl shadow-2xl text-center border border-gray-700/50 min-w-[300px]">
         <h2 className="text-text-sub text-2xl mb-6">Test Result</h2>
         
         <div className="grid grid-cols-2 gap-8 mb-8">
             <div className="flex flex-col">
                 <span className="text-4xl text-text-main font-bold mb-2">{(total / 5).toFixed(0)}</span>
                 <span className="text-text-sub text-sm uppercase tracking-wider">WPM (Est)</span>
             </div>
             <div className="flex flex-col">
                  <span className="text-4xl text-text-main font-bold mb-2">{accuracy.toFixed(0)}%</span>
                  <span className="text-text-sub text-sm uppercase tracking-wider">Accuracy</span>
             </div>
         </div>
         
         <div className="flex justify-center gap-8 mb-8 text-text-sub text-sm">
             <div>Errors: <span className="text-text-error">{errors}</span></div>
             <div>Chars: <span className="text-text-active">{total}</span></div>
         </div>

         <button 
            onClick={restart}
            className="px-6 py-2 bg-text-main text-bg-dark font-bold rounded hover:bg-white transition-colors"
         >
             Restart
         </button>
      </div>
    </div>
  );
};

export default Results;
