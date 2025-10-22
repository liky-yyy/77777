
import React from 'react';

interface SpinnerButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const SpinnerButton: React.FC<SpinnerButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-48 h-20 text-3xl font-black text-white rounded-full
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-4 focus:ring-yellow-400/50
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg shadow-black/50
        relative overflow-hidden
        bg-gradient-to-r from-red-600 to-yellow-500
        hover:from-red-700 hover:to-yellow-600
        disabled:from-gray-600 disabled:to-gray-700 disabled:shadow-none
        transform hover:scale-105 active:scale-100
      `}
    >
      <span className="relative z-10 tracking-widest">SPIN</span>
      {!disabled && <div className="absolute inset-0 bg-white/20 animate-pulse"></div>}
    </button>
  );
};

export default SpinnerButton;
