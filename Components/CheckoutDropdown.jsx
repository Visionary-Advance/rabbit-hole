'use client';

import { useState } from 'react';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

const OrderSummaryDropdown = ({ cartItems, calculateSubtotal, calculateTip }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-primary-green text-black-900 text-left px-6 py-4 flex justify-between items-center transition-all ${
          isOpen ? 'rounded-t-3xl' : 'rounded-3xl'
        } hover:bg-opacity-90`}
      >
        <span className="font-semibold text-xl">
          {cartItems.reduce((acc, item) => acc + item.quantity, 0)} {cartItems.length === 1 ? 'Item' : 'Items'} in Cart
        </span>
        {isOpen ? <FaChevronUp className="w-5 h-5" /> : <FaChevronDown className="w-5 h-5" />}
      </button>

      {/* Dropdown Content with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-secondary rounded-b-3xl shadow-md"
          >
            <div className="p-6">
              <h2 className="font-quicksand text-2xl font-bold mb-4 text-black-900">Order Summary</h2>

              {/* Cart Items */}
              <div className="divide-y divide-black-200">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.size}-${item.temperature}`} className="py-4 flex">
                    <div className="h-16 w-16 rounded-full overflow-hidden mr-4 bg-black-200 flex-shrink-0">
                      <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium text-black-900">{item.name}</h3>
                        <p className="font-medium text-black-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>

                      <p className="text-sm text-black-500">
                        {item.size?.name} • {item.temperature === 'hot' ? 'Hot' : 'Iced'}
                        {item.modifiers?.length > 0 && (
                          <> • {item.modifiers.map(mod => mod.name).join(', ')}</>
                        )}
                      </p>

                      {item.specialInstructions && (
                        <p className="text-sm text-black-700 mt-1">
                          Note: {item.specialInstructions}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal */}
              <div className="mt-6 pt-4 border-t border-black-200">
                <div className="flex justify-between text-black-900 mb-2">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-semibold">${calculateSubtotal()}</span>
                </div>
                
                {calculateTip && calculateTip() > 0 && (
                  <div className="flex justify-between text-black-900 mb-2">
                    <span className="font-medium">Tip:</span>
                    <span className="font-semibold">${calculateTip().toFixed(2)}</span>
                  </div>
                )}
                
                {calculateTip && calculateTip() > 0 && (
                  <div className="flex justify-between text-black-900 text-lg font-bold pt-2 border-t border-black-200">
                    <span>Total:</span>
                    <span>${(parseFloat(calculateSubtotal()) + calculateTip()).toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderSummaryDropdown;