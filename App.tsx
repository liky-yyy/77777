
import React, { useState, useCallback } from 'react';
import Reel from './components/Reel';
import Lever from './components/Lever';
import ResultModal from './components/ResultModal';
import type { GameResult, Rank } from './types';

const REEL_COUNT = 5;
const REEL_TRANSITION_MS = 3000;
const REEL_STOP_DELAY_MS = 300;

const PRIZE_MONEY: { [key in Rank]: number } = {
  1: 77777,
  2: 7777,
  3: 777,
  4: 77,
};

const App: React.FC = () => {
  const [reels, setReels] = useState<number[]>([7, 7, 7, 7, 7]);
  const [spinningStates, setSpinningStates] = useState<boolean[]>(Array(REEL_COUNT).fill(false));
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [result, setResult] = useState<GameResult | null>(null);
  const [isLeverPulled, setIsLeverPulled] = useState(false);
  const [points, setPoints] = useState<number>(0);

  const checkResult = useCallback((finalReels: number[]) => {
    const counts: { [key: number]: number } = {};
    finalReels.forEach(num => {
      counts[num] = (counts[num] || 0) + 1;
    });

    const values = Object.values(counts);
    const maxCount = Math.max(...values);

    let rank: Rank | null = null;
    let message = "다음 기회에!";

    if (maxCount === 5) {
      if (finalReels.every(n => n === 7)) {
        rank = 1;
        message = "믿을 수 없어요! 77777 잭팟에 당첨되었습니다!";
      } else {
        rank = 2;
        message = "굉장해요! 파이브 오브 어 카인드!";
      }
    } else if (maxCount === 4) {
      rank = 3;
      message = "훌륭해요! 포 오브 어 카인드!";
    } else if (maxCount === 3) {
      rank = 4;
      message = "좋아요! 쓰리 오브 어 카인드!";
    }
    
    if (rank) {
      const prize = PRIZE_MONEY[rank];
      setPoints(prevPoints => prevPoints + prize);
      setTimeout(() => {
        setResult({ rank, message, numbers: finalReels, prize });
      }, 500);
    }
  }, []);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsLeverPulled(true);
    setTimeout(() => setIsLeverPulled(false), 300);

    setIsSpinning(true);
    setResult(null);

    const newReels = Array.from({ length: REEL_COUNT }, () => Math.floor(Math.random() * 10));
    
    setTimeout(() => {
        setReels(newReels);
        setSpinningStates(Array(REEL_COUNT).fill(true));

        setTimeout(() => {
            for (let i = 0; i < REEL_COUNT; i++) {
                setTimeout(() => {
                setSpinningStates(prev => {
                    const newStates = [...prev];
                    newStates[i] = false;
                    return newStates;
                });
                }, i * REEL_STOP_DELAY_MS);
            }
        }, 100);

        const lastReelStopCommandTime = (REEL_COUNT - 1) * REEL_STOP_DELAY_MS;
        const totalAnimationTime = lastReelStopCommandTime + REEL_TRANSITION_MS;
        
        setTimeout(() => {
            checkResult(newReels);
            setIsSpinning(false);
        }, totalAnimationTime + 500);
    }, 200);
  };

  const prizeInfo = [
    { rank: 1, text: '1등 (77777)', color: 'text-yellow-400' },
    { rank: 2, text: '2등 (숫자 5개)', color: 'text-gray-300' },
    { rank: 3, text: '3등 (숫자 4개)', color: 'text-orange-400' },
    { rank: 4, text: '4등 (숫자 3개)', color: 'text-blue-400' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 relative">
       <style>{`
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px #f59e0b, 0 0 20px #f59e0b, 0 0 30px #ef4444, 0 0 40px #ef4444; }
          50% { text-shadow: 0 0 20px #facc15, 0 0 30px #f59e0b, 0 0 40px #ef4444, 0 0 50px #ef4444; }
        }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
      `}</style>
      
      {/* Points Display */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-right bg-black/40 p-3 sm:p-4 rounded-lg shadow-lg border border-gray-700 z-10">
        <h2 className="text-sm sm:text-base font-bold text-yellow-400 tracking-widest uppercase">Points</h2>
        <p className="text-2xl sm:text-4xl font-black text-white">{points.toLocaleString()}<span className="text-lg sm:text-2xl ml-1 text-gray-400">원</span></p>
      </div>

      <div className="flex flex-col items-center justify-center w-full">
          <header className="text-center mb-4 sm:mb-8">
              <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 animate-glow">
              77777
              </h1>
          </header>
          
          <main className="bg-gradient-to-b from-gray-700 via-gray-800 to-black p-3 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border-4 border-gray-600 border-opacity-75">
              <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center gap-1 sm:gap-3 md:gap-5 p-2 sm:p-4 bg-black/30 rounded-2xl sm:rounded-3xl shadow-inner border-2 border-gray-900">
                  {reels.map((num, i) => (
                      <Reel 
                      key={i} 
                      finalNumber={num} 
                      isSpinning={spinningStates[i]} 
                      transitionDuration={REEL_TRANSITION_MS}
                      />
                  ))}
                  </div>
                  
                  <Lever onClick={handleSpin} disabled={isSpinning} isPulled={isLeverPulled} />
              </div>
          </main>

          <aside className="w-full max-w-2xl mt-10 bg-gray-800/50 p-4 sm:p-6 rounded-2xl border-2 border-gray-700 shadow-md">
              <h3 className="text-xl sm:text-2xl font-bold text-yellow-500 text-center mb-4 border-b-2 border-yellow-500/30 pb-2">당첨금 안내</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                  {prizeInfo.map(item => (
                      <li key={item.rank} className="p-3 rounded-md bg-black/20">
                          <span className={`block font-bold text-base sm:text-lg ${item.color}`}>{item.text}</span>
                          <span className="block font-semibold text-white text-lg sm:text-xl mt-1">{PRIZE_MONEY[item.rank as Rank].toLocaleString()}원</span>
                      </li>
                  ))}
              </ul>
          </aside>
      </div>

      <ResultModal result={result} onClose={() => setResult(null)} />
    </div>
  );
};

export default App;
