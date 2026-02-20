import React from 'react';

const Header = ({ timeLeft, setTimer, timer }) => {
    return (
        <div className="w-full max-w-5xl mx-auto flex justify-between items-center py-8 text-text-sub text-lg font-mono">
            <div className="flex items-center gap-2">
                 <span className="text-text-main text-2xl font-bold">monkeytype</span>
            </div>
            <div className="flex gap-4 p-2 bg-gray-800/20 rounded-lg">
                {[15, 30, 60].map((t) => (
                    <button
                        key={t}
                        onClick={() => setTimer(t)}
                        className={`hover:text-text-active transition-colors ${timer === t ? 'text-text-main' : ''}`}
                    >
                        {t}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Header;
