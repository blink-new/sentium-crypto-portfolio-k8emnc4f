import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface SwapNotificationProps {
  type: 'swap' | 'receive' | 'send';
  fromAmount?: string;
  fromToken?: string;
  toAmount?: string;
  toToken?: string;
  onClose: () => void;
}

export const SwapNotification = ({ type, fromAmount, fromToken, toAmount, toToken, onClose }: SwapNotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4500);

    // Cleanup function to clear the timer if the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, []); // Empty dependency array since we only want this to run once when mounted

  return (
    <div className="fixed bottom-20 left-6 z-50 animate-slide-up">
      <div className="bg-[#1A1B1E] border border-[#0066ff33] rounded-lg p-4 shadow-lg min-w-[300px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[#98A1C0] hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[#0066ff] flex items-center justify-center">
            <Check className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-[#40B66B] text-sm font-medium mb-1">Transaction Completed</div>
            <div className="text-[#E2EBFB] text-sm">
              {type === 'swap' && `Swapped ${fromAmount} ${fromToken} → ${toAmount} ${toToken}`}
              {type === 'receive' && `Received ${toAmount} ${toToken}`}
              {type === 'send' && `Sent ${fromAmount} ${fromToken}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};