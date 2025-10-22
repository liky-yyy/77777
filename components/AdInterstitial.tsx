import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdInterstitialProps {
  onClose: () => void;
}

const AdInterstitial: React.FC<AdInterstitialProps> = ({ onClose }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense Interstitial error:', err);
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-gray-800 p-4 rounded-lg w-full max-w-lg h-auto">
        <button 
          onClick={onClose}
          className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full text-lg font-bold z-10"
          aria-label="광고 닫기"
        >
          &times;
        </button>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-xxxxxxxxxxxxxxxx" // 여기에 실제 게시자 ID를 입력하세요.
          data-ad-slot="yyyyyyyyyy"             // 여기에 전면 광고용 슬롯 ID를 입력하세요.
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
};

export default AdInterstitial;
