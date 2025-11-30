import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { BANK_INFO, SHIPPING_FEE, GOOGLE_SCRIPT_URL } from '../constants';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalPrice: number; // This is purely product total
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, items, totalPrice }) => {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false); // Success View State
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    detailAddress: '',
    initial: '',
    batch32Name: '' // Name for 32nd batch verification
  });

  const [isBatch32, setIsBatch32] = useState(false);

  // Check if any item contains "스티커"
  const hasSticker = items.some(item => item.name.includes('스티커'));

  // Derived Calculations
  const currentShippingFee = isBatch32 ? 0 : SHIPPING_FEE;
  const finalTotalPrice = totalPrice + currentShippingFee;

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        contact: '',
        address: '',
        detailAddress: '',
        initial: '',
        batch32Name: ''
      });
      setIsBatch32(false);
      setCopied(false);
      setIsSubmitting(false);
      setOrderSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyAccount = () => {
    const textToCopy = `${BANK_INFO.name} ${BANK_INFO.accountNumber} ${BANK_INFO.holder}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompleteOrder = async () => {
    // 1. Validation
    if (!formData.name.trim()) {
      alert('주문자 성함(배송받는 분)을 입력해주세요.');
      return;
    }
    if (!formData.contact.trim()) {
      alert('연락처를 입력해주세요.');
      return;
    }
    
    // Address is mandatory ONLY if NOT 32nd batch
    if (!isBatch32) {
      if (!formData.address.trim()) {
        alert('도로명 주소를 입력해주세요.');
        return;
      }
      if (!formData.detailAddress.trim()) {
        alert('상세 주소를 입력해주세요.');
        return;
      }
    }
    
    // 32nd Batch Validation
    if (isBatch32 && !formData.batch32Name.trim()) {
      alert('32기 부원 인증을 위해 본인 이름을 입력해주세요.');
      return;
    }

    // Sticker Initial Validation
    if (hasSticker && !formData.initial.trim()) {
      alert('스티커 상품이 포함되어 있습니다. 이니셜을 입력해주세요.');
      return;
    }

    // 2. Prepare Data for Google Apps Script
    const orderItemsSummary = items
      .map(item => `${item.name} (${item.quantity}개)`)
      .join(', ');

    const orderData = {
      name: formData.name,
      phone: formData.contact,
      address: isBatch32 ? '32기 수령' : formData.address,
      detailAddress: isBatch32 ? '' : formData.detailAddress,
      isMember: isBatch32,
      memberName: isBatch32 ? formData.batch32Name : '',
      orderItems: orderItemsSummary,
      initial: hasSticker ? formData.initial : '',
      totalPrice: `${finalTotalPrice.toLocaleString()}원`
    };

    setIsSubmitting(true);

    try {
      // 3. Send POST request
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script Web App
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(orderData),
      });

      // 4. Success handling: Switch to Success View
      setOrderSuccess(true);
      setIsSubmitting(false);

    } catch (error) {
      console.error('Order submission failed:', error);
      alert('주문 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      setIsSubmitting(false);
    }
  };

  // --- Success View ---
  if (orderSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        />
        <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 flex flex-col items-center animate-scale-up">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-navy-900 mb-2">주문이 접수되었습니다!</h2>
          <p className="text-gray-500 text-center text-sm mb-6">
            아래 계좌로 금액을 입금해주시면<br/>주문이 최종 완료됩니다.
          </p>

          <div className="w-full bg-navy-50 rounded-xl p-5 border border-navy-100 mb-6 text-center">
            <p className="text-sm text-navy-800 mb-1">입금하실 금액</p>
            <p className="text-2xl font-bold text-navy-900 mb-4">{finalTotalPrice.toLocaleString()}원</p>
            
            <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
               <div className="text-xs text-gray-500 mb-1">{BANK_INFO.name}</div>
               <div className="text-lg font-bold text-gray-900 tracking-wide select-all">{BANK_INFO.accountNumber}</div>
               <div className="text-sm text-gray-700 mt-1">예금주: {BANK_INFO.holder}</div>
            </div>
            
            <button 
              onClick={handleCopyAccount}
              className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                copied 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white border border-navy-200 text-navy-900 hover:bg-gray-50'
              }`}
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>
                  복사 완료
                </>
              ) : (
                '계좌번호 복사하기'
              )}
            </button>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-navy-900 text-white rounded-xl font-bold text-lg hover:bg-navy-800 transition-colors"
          >
            확인 (종료)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={isSubmitting ? undefined : onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md md:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden animate-slide-up md:animate-scale-up flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-navy-900 p-4 text-white flex justify-between items-center shrink-0">
          <h2 className="text-lg font-bold">주문 작성</h2>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white p-1"
            disabled={isSubmitting}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto overflow-x-hidden no-scrollbar">
          
          {/* 32nd Batch Verification */}
          <div className="mb-6">
             <label className="flex items-center gap-3 p-3 border border-navy-100 rounded-xl bg-white shadow-sm cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={isBatch32}
                  onChange={(e) => setIsBatch32(e.target.checked)}
                  disabled={isSubmitting}
                  className="w-5 h-5 text-navy-900 rounded focus:ring-navy-500 border-gray-300"
                />
                <span className="font-bold text-navy-900 text-sm">
                  저는 32기 부원입니다
                </span>
             </label>
             
             {/* Conditional Input for Batch Name */}
             {isBatch32 && (
                <div className="mt-2 animate-fade-in pl-2">
                   <input
                      type="text"
                      name="batch32Name"
                      value={formData.batch32Name}
                      onChange={handleInputChange}
                      placeholder="32기 본인 이름을 입력해주세요"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg border border-navy-200 focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition-all text-sm bg-navy-50"
                   />
                </div>
             )}
          </div>

          {/* Order Summary */}
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h3 className="text-sm font-bold text-gray-500 mb-2">주문 내역 요약</h3>
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 space-y-1">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span className="font-medium">{(item.price * item.quantity).toLocaleString()}원</span>
                </div>
              ))}
              
              <div className="border-t border-gray-200 my-2 pt-2 space-y-1">
                <div className="flex justify-between text-gray-500">
                   <span>상품 합계</span>
                   <span>{totalPrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-gray-500">
                   <span>배송비</span>
                   <span>
                     {isBatch32 ? <span className="text-red-500 font-bold">0원 (32기 무료)</span> : `${SHIPPING_FEE.toLocaleString()}원`}
                   </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-navy-900 text-base">
                <span>총 결제 금액</span>
                <span className="text-lg">{finalTotalPrice.toLocaleString()}원</span>
              </div>
            </div>
          </div>

          {/* Delivery Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-navy-900 flex items-center gap-2">
              주문 정보 입력
              <span className="text-xs font-normal text-red-500">*필수</span>
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">주문자 성함</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="홍길동"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="010-0000-0000"
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition-all"
              />
            </div>

            {/* Address Fields - Only show if NOT 32nd batch */}
            {!isBatch32 && (
              <div className="flex flex-col gap-2 animate-fade-in">
                <label className="block text-sm font-medium text-gray-700">배송지 주소</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="도로명 주소 (예: 서울시 강남구 테헤란로 123)"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition-all"
                />
                <input
                  type="text"
                  name="detailAddress"
                  value={formData.detailAddress}
                  onChange={handleInputChange}
                  placeholder="상세 주소 (예: 101동 101호)"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition-all"
                />
              </div>
            )}

            {/* Conditional Initial Input */}
            {hasSticker && (
              <div className="animate-fade-in bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                <label className="block text-sm font-bold text-yellow-800 mb-1">
                  ✨ 이니셜 입력 (영문)
                  <span className="block text-xs font-normal text-yellow-700 mt-0.5">
                    스티커 상품이 포함되어 있습니다. 원하시는 이니셜을 적어주세요.
                  </span>
                </label>
                <input
                  type="text"
                  name="initial"
                  value={formData.initial}
                  onChange={handleInputChange}
                  placeholder="예: H.G.D"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 mt-2 rounded-lg border border-yellow-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all bg-white"
                />
              </div>
            )}
          </div>

          <div className="h-4"></div>
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-gray-100 bg-white shrink-0 safe-area-bottom">
          <button
            onClick={handleCompleteOrder}
            disabled={isSubmitting}
            className={`w-full py-4 bg-navy-900 text-white rounded-xl font-bold text-lg shadow-lg shadow-navy-900/20 hover:bg-navy-800 active:scale-95 transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                접수 중...
              </>
            ) : (
              `주문하기`
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderModal;