import React from 'react';

interface LeverProps {
  onClick: () => void;
  disabled: boolean;
  isPulled: boolean;
}

const Lever: React.FC<LeverProps> = ({ onClick, disabled, isPulled }) => {
  const leverClasses = `
    absolute top-1/2 left-1/2 w-2 h-20 sm:w-3 sm:h-24 bg-gray-500 rounded-full
    transform -translate-x-1/2 -translate-y-full
    transition-transform duration-200 ease-in-out
    origin-bottom
    group-hover:bg-gray-400
    ${disabled ? '' : 'group-active:rotate-45'}
    ${isPulled ? 'rotate-45' : 'rotate-0'}
  `;

  const ballClasses = `
    absolute -top-3 sm:-top-4 left-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-b from-red-500 to-red-700 rounded-full
    transform -translate-x-1/2
    shadow-lg border-2 border-red-800
    group-hover:from-red-400 group-hover:to-red-600
  `;

  return (
    <div className="relative w-20 h-40 sm:w-24 sm:h-52 flex items-end justify-center ml-1 sm:ml-2">
      {/* Lever Base */}
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-inner">
        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-800 rounded-full border-2 border-gray-900" />
      </div>
      
      {/* Lever Arm and Ball */}
      <button
        onClick={onClick}
        disabled={disabled}
        className="absolute bottom-6 sm:bottom-8 w-8 h-20 sm:h-24 group focus:outline-none disabled:cursor-not-allowed"
        aria-label="슬롯 돌리기 레버"
      >
        <div className={leverClasses}>
          <div className={ballClasses} />
        </div>
      </button>
    </div>
  );
};

export default Lever;