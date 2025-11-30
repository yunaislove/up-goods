import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  quantity, 
  onIncrement, 
  onDecrement 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col border border-gray-100 h-full">
      {/* Product Image */}
      <div className="w-full aspect-square bg-gray-50 relative border-b border-gray-50">
        <img 
          src={product.imageSrc} 
          alt={product.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            // Fallback for missing local images
            e.currentTarget.src = `https://placehold.co/400x400/f1f5f9/334155?text=${encodeURIComponent(product.name.replace(/\(.*\)/, ''))}`;
          }}
        />
      </div>

      {/* Product Details & Controls */}
      <div className="p-3 md:p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-sm md:text-base font-bold text-gray-900 leading-snug break-keep line-clamp-2">
            {product.name}
          </h3>
          <p className="text-navy-900 font-bold mt-1 text-sm md:text-base">
            {product.price.toLocaleString()}원
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-end mt-3">
          <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => onDecrement(product.id)}
              className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md transition-colors ${
                quantity > 0 
                  ? 'bg-white shadow-sm text-navy-900 hover:bg-gray-50' 
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              disabled={quantity === 0}
              aria-label="Decrease quantity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
              </svg>
            </button>
            
            <span className="w-8 md:w-10 text-center font-bold text-gray-900 text-sm md:text-base">
              {quantity}
            </span>

            <button
              onClick={() => onIncrement(product.id)}
              className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md bg-white shadow-sm text-navy-900 hover:bg-gray-50"
              aria-label="Increase quantity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;