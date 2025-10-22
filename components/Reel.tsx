import React from 'react';

interface ReelProps {
  finalNumber: number;
  isSpinning: boolean;
  transitionDuration: number;
}

// Optimized: Reduced the strip length by half to improve rendering performance.
const NUMBER_STRIP = [0,1,2,3,4,5,6,7,8,9, 0,1,2,3,4,5,6,7,8,9];
const NUMBER_HEIGHT_REM = 10; // Corresponds to h-40, the height of the number elements

const Reel: React.FC<ReelProps> = ({ finalNumber, isSpinning, transitionDuration }) => {
  // Calculate the final resting position of the number strip.
  // We land on a number in the second set of 0-9 for a good visual buffer.
  const finalIndex = (NUMBER_STRIP.length - 10) + finalNumber;
  const finalTranslateY = `-${finalIndex * NUMBER_HEIGHT_REM}rem`;

  // During spinning, we translate to a very large negative value to simulate spinning upwards.
  const spinningTranslateY = `-${(NUMBER_STRIP.length * NUMBER_HEIGHT_REM * 2)}rem`;

  return (
    // The container acts as a mask, its size is responsive
    <div className="w-16 h-24 sm:w-20 sm:h-32 md:w-28 md:h-40 bg-gray-800 rounded-xl overflow-hidden shadow-lg border-2 border-gray-700 relative">
      <div
        className="transition-transform ease-out"
        style={{
          transform: isSpinning ? `translateY(${spinningTranslateY})` : `translateY(${finalTranslateY})`,
          transitionDuration: `${isSpinning ? transitionDuration * 2 : transitionDuration}ms`
        }}
      >
        {NUMBER_STRIP.map((num, i) => (
          <div
            key={i}
            // The number elements maintain a fixed height for consistent animation calculation
            className="w-full h-40 flex items-center justify-center text-6xl sm:text-7xl md:text-8xl font-black"
            style={{
              color: num === 7 ? '#facc15' : '#e5e7eb', // Gold for 7
              textShadow: num === 7 ? '0 0 15px rgba(250, 204, 21, 0.8), 0 0 25px rgba(245, 158, 11, 0.6)' : 'none'
            }}
          >
            {num}
          </div>
        ))}
      </div>
      {/* Static overlays for depth and focus */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-gray-900/90 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-gray-900/90 to-transparent pointer-events-none" />
    </div>
  );
};

export default Reel;