import React, { useState, useMemo } from 'react';
import { PRODUCTS } from './constants';
import { CartState } from './types';
import ProductCard from './components/ProductCard';
import BottomBar from './components/BottomBar';
import OrderModal from './components/OrderModal';

const App: React.FC = () => {
  // State to track quantities: { productId: quantity }
  const [cart, setCart] = useState<CartState>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper to handle incrementing quantity
  const handleIncrement = (id: number) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // Helper to handle decrementing quantity
  const handleDecrement = (id: number) => {
    setCart((prev) => {
      const currentQty = prev[id] || 0;
      if (currentQty <= 0) return prev;
      const newQty = currentQty - 1;
      // If quantity becomes 0, we can either keep it as 0 or remove the key.
      // Keeping it as 0 is simpler for UI logic.
      return {
        ...prev,
        [id]: newQty,
      };
    });
  };

  // Calculate totals
  const totalQuantity = useMemo(() => {
    return Object.values(cart).reduce((sum: number, qty: number) => sum + qty, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return PRODUCTS.reduce((sum, product) => {
      const qty = cart[product.id] || 0;
      return sum + (product.price * qty);
    }, 0);
  }, [cart]);

  // Prepare items for the modal
  const cartItems = useMemo(() => {
    return PRODUCTS.filter((p) => (cart[p.id] || 0) > 0).map((p) => ({
      ...p,
      quantity: cart[p.id] || 0,
    }));
  }, [cart]);

  return (
    <div className="min-h-screen pb-32 flex flex-col items-center bg-[#f8fafc]">
      {/* Header */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <h1 className="text-xl md:text-2xl font-extrabold text-navy-900 text-center md:text-left break-keep">
            네꾸 스티커 & b급 감성 노트
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-2xl px-4 py-6 space-y-6">
        
        {/* Description Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-gray-700">
          <p className="font-bold text-navy-900 text-lg mb-3 leading-snug break-keep">
            11/28~12/06, 총 9일 동안만 구매할 수 있는<br className="hidden md:block"/>
            네꾸 스티커 & B급 감성 노트!
          </p>
          <div className="space-y-2 text-sm md:text-base leading-relaxed break-keep">
            <p>
              이번 굿즈는 재입고 예정 없이 이번 판매로만 만나보실 수 있어요 🤍
            </p>
            <p>
              모든 제품은 12/17일부로 배송을 시작합니다.
            </p>
            <p className="font-bold text-navy-800">
              카카오뱅크 79422 291245 (이홍범)
            </p>
            <p className="text-gray-500 text-xs pt-2">
              문의 사항은 univpt 공식 인스타그램으로 주시면 됩니다.
            </p>
          </div>
        </div>

        {/* Product List */}
        <div className="space-y-4">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cart[product.id] || 0}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          ))}
        </div>
      </main>

      {/* Sticky Bottom Bar */}
      <BottomBar
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
        onOrder={() => setIsModalOpen(true)}
      />

      {/* Order Confirmation Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={cartItems}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default App;