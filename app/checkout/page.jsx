'use client';

import { useState, useEffect } from 'react';
import { isShopOpen, getShopStatus } from '@/lib/businessHours';
import SquarePaymentForm from '@/Components/SquarePaymentForm';
import OrderSummaryDropdown from '@/Components/OrderSummaryDropdown';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [paymentResult, setPaymentResult] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [selectedTip, setSelectedTip] = useState(null); 
  const [customTip, setCustomTip] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [nameError, setNameError] = useState('');

  const shopStatus = getShopStatus();
  const appId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || 'L3ZBNPD54KQT1';

  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  useEffect(() => {
    if (paymentMethod === 'instore') {
      setSelectedTip(null);
      setCustomTip('');
    }
  }, [paymentMethod]);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const subtotal = parseFloat(calculateSubtotal());
  
  const getTipAmount = () => {
    if (paymentMethod !== 'online') return 0;
    if (selectedTip === 'custom') return parseFloat(customTip) || 0;
    if (selectedTip && subtotal > 0) {
      return +(subtotal * (parseFloat(selectedTip) / 100)).toFixed(2);
    }
    return 0;
  };

  const totalWithTip = (subtotal + getTipAmount()).toFixed(2);
  const amountWithTipCents = Math.round((subtotal + getTipAmount()) * 100);

  const validateName = (name) => {
    if (!name.trim()) return 'Please enter your name for the order';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    return '';
  };

  const handleInStorePayment = async () => {
    const nameValidationError = validateName(customerName);
    if (nameValidationError) {
      setNameError(nameValidationError);
      return;
    }

    if (!isShopOpen()) {
      setPaymentError("Sorry, we're currently closed and cannot process orders.");
      setPaymentStatus('error');
      return;
    }

    setPaymentStatus('processing');
    setPaymentError(null);
    setNameError('');

    try {
      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          customerName: customerName.trim(),
          paymentMethod: 'instore',
          locationId,
          orderDetails: {
            items: cartItems.map(item => ({
              id: item.id,
              name: item.name,
              size: item.size,
              temperature: item.temperature,
              quantity: item.quantity,
              unitPrice: item.price,
              modifiers: item.modifiers || [],
              specialInstructions: item.specialInstructions || '' 
            }))
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          throw new Error(`Server error (${response.status}): ${errorText || 'Unknown error'}`);
        }
        throw new Error(errorData.message || `Order failed with status: ${response.status}`);
      }

      const responseText = await response.text();
      const result = JSON.parse(responseText);

      setPaymentResult({
        id: result.orderId,
        orderId: result.orderId,
        status: result.status,
        amount: result.totalAmount,
        paymentMethod: 'instore',
        customerName: customerName.trim(),
        orderSummary: result.orderSummary,
        message: result.message
      });
      setPaymentStatus('success');
      localStorage.removeItem('cart');
      setCartItems([]);
      
    } catch (error) {
      console.error("Order error:", error);
      setPaymentError(error.message);
      setPaymentStatus('error');
    }
  };

  const handleOnlinePayment = async (token, buyer) => {
    const nameValidationError = validateName(customerName);
    if (nameValidationError) {
      setNameError(nameValidationError);
      return;
    }

    if (!isShopOpen()) {
      setPaymentError("Sorry, we're currently closed and cannot process orders.");
      setPaymentStatus('error');
      return;
    }
    
    setPaymentStatus('processing');
    setPaymentError(null);
    setNameError('');

    try {
      const response = await fetch('/api/submit-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          sourceId: token,
          customerName: customerName.trim(),
          paymentMethod: 'online',
          locationId,
          amount: amountWithTipCents,
          orderDetails: {
            items: cartItems.map(item => ({
              id: item.id,
              name: item.name,
              size: item.size,
              temperature: item.temperature,
              quantity: item.quantity,
              unitPrice: item.price,
              modifiers: item.modifiers || [],
              specialInstructions: item.specialInstructions || '' 
            }))
          }
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Payment failed with status: ${response.status}`);
      }

      const result = await response.json();
      setPaymentResult({
        ...result,
        paymentMethod: 'online',
        customerName: customerName.trim()
      });
      setPaymentStatus('success');
      localStorage.removeItem('cart');
      setCartItems([]);
      
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError(error.message);
      setPaymentStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center py-16 px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-green border-t-transparent mb-4"></div>
          <p className="text-xl text-white">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && paymentStatus !== 'success') {
    return (
      <div className="min-h-screen bg-black py-16 px-4">
        <div className="max-w-lg mx-auto">
          <h1 className="font-quicksand text-4xl md:text-5xl font-bold text-white text-center mb-8">Checkout</h1>
          <div className="bg-secondary rounded-3xl shadow-md p-8 text-center">
            <p className="text-xl text-black-900 mb-6">Your cart is empty</p>
            <a 
              href="/"
              className="inline-block py-3 px-8 bg-primary-green text-black-900 rounded-full font-medium hover:bg-opacity-90 transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'success' && paymentResult) {
    return (
      <div className="min-h-screen bg-black py-16 px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-secondary rounded-3xl shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="font-quicksand text-3xl font-bold mb-2 text-black-900">
              {paymentResult.paymentMethod === 'online' ? 'Order Confirmed!' : 'Order Received!'}
            </h2>
            <p className="text-black-500 mb-6">
              {paymentResult.paymentMethod === 'online' 
                ? 'Thank you for your purchase.' 
                : 'Please pay when you arrive to pick up your order.'
              }
            </p>
            
            <div className="bg-white p-6 rounded-2xl mb-6 text-left border border-black-200">
              <p className="mb-2 text-black-900"><strong>Customer:</strong> {paymentResult.customerName}</p>
              <p className="mb-2 text-black-900"><strong>Order ID:</strong> {paymentResult.id || paymentResult.orderId}</p>
              {paymentResult.paymentMethod === 'online' && (
                <>
                  <p className="mb-2 text-black-900"><strong>Status:</strong> {paymentResult.status}</p>
                  <p className="mb-2 text-black-900"><strong>Amount:</strong> ${parseFloat(paymentResult.amount) / 100}</p>
                </>
              )}
              {paymentResult.paymentMethod === 'instore' && (
                <p className="mb-2 text-black-900"><strong>Payment:</strong> Pay in-store (${subtotal.toFixed(2)})</p>
              )}
              <p className="mb-2 text-black-900">
                <strong>Payment Method:</strong> {paymentResult.paymentMethod === 'online' ? 'Paid Online' : 'Pay In-Store'}
              </p>
              {paymentResult.receiptUrl && (
                <a 
                  href={paymentResult.receiptUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-green hover:underline block mt-2"
                >
                  View Receipt
                </a>
              )}
            </div>
            
            <a 
              href="/"
              className="inline-block py-3 px-8 bg-primary-green text-black-900 rounded-full font-medium hover:bg-opacity-90 transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!shopStatus.isOpen) {
    return (
      <div className="min-h-screen bg-black py-16 px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-secondary rounded-3xl p-8 text-center border-2 border-primary-green">
            <div className="w-16 h-16 bg-primary-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary-green">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="font-quicksand text-2xl font-bold mb-2 text-black-900">We're Currently Closed</h2>
            <p className="text-black-500 mb-6">{shopStatus.message}</p>
            <a 
              href="/"
              className="inline-block py-3 px-8 bg-primary-green text-black-900 rounded-full font-medium hover:bg-opacity-90 transition-colors"
            >
              Browse Menu
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-quicksand text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-12">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Order Summary */}
          <div>
            <OrderSummaryDropdown 
              cartItems={cartItems} 
              calculateTip={getTipAmount} 
              calculateSubtotal={calculateSubtotal}
            />
            
            <div className="bg-secondary rounded-3xl shadow-md p-6 mt-6">
              <h3 className="font-quicksand text-xl font-bold mb-4 text-black-900">Pickup Information</h3>
              <p className="mb-4 text-black-700">Your order will be ready for pickup within 15-20 minutes.</p>
              <p className="text-black-700">
                <strong>The Rabbit Hole</strong><br />
                240 E 17th Ave<br />
                Eugene, OR 97401
              </p>
            </div>
          </div>
          
          {/* Right Column - Customer Info & Payment */}
          <div>
            {/* Customer Name */}
            <div className="bg-secondary rounded-3xl shadow-md p-6 mb-6">
              <h3 className="font-quicksand text-xl font-bold mb-4 text-black-900">Customer Information</h3>
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-black-700 mb-2">
                  Name for Order *
                </label>
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (nameError) setNameError('');
                  }}
                  className={`w-full bg-white p-3 border rounded-full focus:ring-2 focus:ring-primary-green focus:border-transparent ${
                    nameError ? 'border-red-500' : 'border-black-200'
                  }`}
                  placeholder="Enter your name"
                  required
                />
                {nameError && (
                  <p className="mt-1 text-sm text-red-600">{nameError}</p>
                )}
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-secondary rounded-3xl shadow-md p-6 mb-6">
              <h3 className="font-quicksand text-xl font-bold mb-4 text-black-900">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex bg-white items-center p-4 border-2 rounded-2xl cursor-pointer hover:bg-white/50 transition-colors border-black-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3 text-primary-green bg-white focus:ring-primary-green"
                  />
                  <div>
                    <div className="font-medium text-black-900">Pay Online</div>
                    <div className="text-sm text-black-500">Pay now with card, Apple Pay, or Google Pay</div>
                  </div>
                </label>
                
                <label className="flex items-center bg-white p-4 border-2 rounded-2xl cursor-pointer hover:bg-white/50 transition-colors border-black-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="instore"
                    checked={paymentMethod === 'instore'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3 text-primary-green bg-white focus:ring-primary-green"
                  />
                  <div>
                    <div className="font-medium text-black-900">Pay In-Store</div>
                    <div className="text-sm text-black-500">Order now, pay when you pick up</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Tip Selection - Only for online payments */}
            {paymentMethod === 'online' && (
              <div className="bg-secondary rounded-3xl p-6 mb-6">
                <h2 className="font-quicksand text-center text-2xl font-bold mb-4 text-black-900">Add a Tip</h2>
                <div className="grid grid-cols-4 gap-3">
                  {['10', '15', '20'].map(percent => (
                    <button
                      key={percent}
                      onClick={() => {
                        setSelectedTip(percent);
                        setCustomTip('');
                      }}
                      className={`p-4 rounded-2xl shadow text-center transition-colors ${
                        selectedTip === percent 
                          ? 'bg-primary-green text-white' 
                          : 'bg-white text-black-900 hover:bg-white/80 border border-black-200'
                      }`}
                    >
                      <div className="text-2xl font-semibold">{percent}%</div>
                      <div className="text-sm">${(subtotal * (parseInt(percent) / 100)).toFixed(2)}</div>
                    </button>
                  ))}

                  <button
                    onClick={() => setSelectedTip('custom')}
                    className={`p-4 rounded-2xl shadow text-center transition-colors ${
                      selectedTip === 'custom' 
                        ? 'bg-primary-green text-white' 
                        : 'bg-white text-black-900 hover:bg-white/80 border border-black-200'
                    }`}
                  >
                    <div className="text-xl font-semibold">Custom</div>
                  </button>
                </div>

                {selectedTip === 'custom' && (
                  <div className="mt-4">
                    <label htmlFor="customTip" className="block mb-1 text-sm text-black-900 font-medium">
                      Enter Custom Tip Amount
                    </label>
                    <input
                      id="customTip"
                      type="number"
                      step="0.01"
                      min="0"
                      value={customTip}
                      onChange={(e) => setCustomTip(e.target.value)}
                      className="w-full p-3 border border-black-200 rounded-full focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      placeholder="e.g. 1.50"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Payment Processing Section */}
            <div className="bg-secondary rounded-3xl p-6">
              {paymentStatus === 'error' && (
                <div className="bg-red-100 text-red-700 p-4 rounded-2xl mb-6 border border-red-300">
                  <p className="font-medium">
                    {paymentMethod === 'online' ? 'Payment failed' : 'Order failed'}
                  </p>
                  <p>{paymentError}</p>
                </div>
              )}

              {paymentMethod === 'online' ? (
                <>
                  <h2 className="font-quicksand text-2xl text-black-900 text-center font-bold mb-4">Payment Options</h2>
                  
                  {paymentMethod === 'online' && getTipAmount() > 0 && (
                    <div className="bg-primary-green/10 border-l-4 border-primary-green p-4 mb-6 rounded-lg">
                      <h3 className="text-sm font-medium text-black-900 mb-2">
                        Payment Total Notice
                      </h3>
                      <div className="text-sm text-black-700">
                        <p className="font-semibold">
                          You will be charged ${totalWithTip} total
                        </p>
                        <p className="mt-1">• Order: ${subtotal.toFixed(2)}</p>
                        <p>• Tip ({selectedTip === 'custom' ? 'Custom' : selectedTip + '%'}): ${getTipAmount().toFixed(2)}</p>
                      </div>
                    </div>
                  )}

                  <SquarePaymentForm
                    applicationId={appId}
                    locationId={locationId}
                    amount={amountWithTipCents}
                    onPaymentSuccess={handleOnlinePayment}
                    loading={paymentStatus === 'processing'}
                  />
                </>
              ) : (
                <div className="text-center">
                  <h2 className="font-quicksand text-2xl text-black-900 font-bold mb-6">Confirm Your Order</h2>
                  <div className="bg-white rounded-2xl p-6 mb-6 border border-black-200">
                    <div className="text-black-700 mb-4">
                      <p className="text-lg mb-2">Your order will be prepared and ready for pickup.</p>
                      <p>Please pay when you arrive at the store.</p>
                    </div>
                    <div className="text-2xl font-bold text-primary-green">
                      Total: ${subtotal.toFixed(2)}
                    </div>
                  </div>
                  <button
                    onClick={handleInStorePayment}
                    disabled={paymentStatus === 'processing' || !customerName.trim()}
                    className="w-full py-4 px-6 bg-primary-green text-black-900 rounded-full hover:bg-opacity-90 disabled:bg-black-300 disabled:cursor-not-allowed transition-colors text-lg font-semibold"
                  >
                    {paymentStatus === 'processing' ? 'Confirming Order...' : 'Confirm Order'}
                  </button>
                </div>
              )}
            </div>

            {/* Total Summary */}
            <div className="mt-6 bg-primary-green rounded-3xl p-6 text-center">
              <h3 className="font-quicksand text-3xl text-black-900 font-bold">
                {paymentMethod === 'online' ? (
                  <>
                    Total: ${totalWithTip}
                    {getTipAmount() > 0 && (
                      <span className="text-lg text-black-700 block mt-1">
                        (Subtotal: ${subtotal.toFixed(2)} + Tip: ${getTipAmount().toFixed(2)})
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    Total: ${subtotal.toFixed(2)}
                    <span className="text-lg text-black-700 block mt-1">(Pay in-store + add tip in person)</span>
                  </>
                )}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}