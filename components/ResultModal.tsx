import React from 'react';
import type { GameResult } from '../types';

interface ResultModalProps {
  result: GameResult | null;
  onClose: () => void;
}

const rankInfo = {
  1: { title: '잭팟!', color: 'text-yellow-400', shadow: 'shadow-yellow-400/50', border: 'border-yellow-400' },
  2: { title: '2등!', color: 'text-gray-300', shadow: 'shadow-gray-300/50', border: 'border-gray-300' },
  3: { title: '3등!', color: 'text-orange-400', shadow: 'shadow-orange-400/50', border: 'border-orange-400' },
  4: { title: '4등!', color: 'text-blue-400', shadow: 'shadow-blue-400/50', border: 'border-blue-400' },
};

const ResultModal: React.FC<ResultModalProps> = ({ result, onClose }) => {
  if (!result) return null;

  const { rank, message, numbers, prize } = result;
  const info = rankInfo[rank];

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <style>{`
        .modal-enter {
          opacity: 0;
          transform: scale(0.9);
        }
        .modal-enter-active {
          opacity: 1;
          transform: scale(1);
          transition: opacity 300ms, transform 300ms;
        }
      `}</style>
      <div
        className={`bg-gray-800 rounded-2xl p-6 sm:p-8 border-4 ${info.border} w-full max-w-md text-center transform shadow-2xl ${info.shadow} modal-enter modal-enter-active`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`text-4xl sm:text-5xl font-black mb-2 ${info.color} tracking-wider`}>{info.title}</h2>
        <p className="text-2xl font-bold text-green-400 mb-4">+ {prize.toLocaleString()}원</p>
        <p className="text-lg sm:text-xl text-gray-200 mb-6 font-sans">{message}</p>
        <div className="flex justify-center items-center space-x-2 bg-gray-900/50 p-3 sm:p-4 rounded-lg mb-8">
          {numbers.map((n, i) => (
            <span 
              key={i} 
              className={`text-3xl sm:text-4xl font-bold ${n === 7 ? 'text-yellow-400' : 'text-white'}`}
            >
              {n}
            </span>
          ))}
        </div>
        <button
          onClick={onClose}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full transition-colors duration-300 text-base sm:text-lg"
        >
          이어하기
        </button>
      </div>
    </div>
  );
};

export default ResultModal;