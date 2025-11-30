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
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row p-4 gap-4 border border-gray-100">
      {/* Product Image */}
      <div className="w-full sm:w-32 h-64 sm:h-32 flex-shrink-0">
        <img 
          src={product.imageSrc} 
          alt={product.name} 
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Product Details & Controls */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
          <p className="text-navy-900 font-medium mt-1">
            {product.price.toLocaleString()}원
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-end mt-4 sm:mt-0">
          <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => onDecrement(product.id)}
              className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
                quantity > 0 
                  ? 'bg-white shadow-sm text-navy-900 hover:bg-gray-50' 
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              disabled={quantity === 0}
              aria-label="Decrease quantity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
              </svg>
            </button>
            
            <span className="w-10 text-center font-bold text-gray-900">
              {quantity}
            </span>

            <button
              onClick={() => onIncrement(product.id)}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm text-navy-900 hover:bg-gray-50"
              aria-label="Increase quantity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
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