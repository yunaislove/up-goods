import React from 'react';

interface BottomBarProps {
  totalQuantity: number;
  totalPrice: number;
  onOrder: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ totalQuantity, totalPrice, onOrder }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] p-4 pb-6 md:pb-4 safe-area-bottom z-40">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
        
        {/* Total Summary */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">총 수량 {totalQuantity}개</span>
          <span className="text-xl font-bold text-navy-900">
            {totalPrice.toLocaleString()}원
          </span>
        </div>

        {/* Order Button */}
        <button
          onClick={onOrder}
          disabled={totalQuantity === 0}
          className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
            totalQuantity > 0
              ? 'bg-navy-900 text-white shadow-lg shadow-navy-900/30 hover:bg-navy-800 active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          주문하기
        </button>
      </div>
    </div>
  );
};

export default BottomBar;