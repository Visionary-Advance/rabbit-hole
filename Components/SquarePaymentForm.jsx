'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export default function SquarePaymentForm({
  applicationId,
  locationId,
  onPaymentSuccess,
  amount,
  loading = false
}) {
  const [payments, setPayments] = useState(null);
  const [card, setCard] = useState(null);
  const [applePay, setApplePay] = useState(null);
  const [googlePay, setGooglePay] = useState(null);
  const [applePayAvailable, setApplePayAvailable] = useState(false);
  const [googlePayAvailable, setGooglePayAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const cardContainerRef = useRef(null);
  const applePayContainerRef = useRef(null);
  const googlePayContainerRef = useRef(null);
  const isInitialized = useRef(false);
  const currentAmountRef = useRef(amount);

  // Keep amount ref updated
  useEffect(() => {
    currentAmountRef.current = amount;
  }, [amount]);

  // Handle payment tokenization with current amount
  const handlePayment = useCallback(async (paymentMethod) => {
    setErrorMessage('');

    try {
      const result = await paymentMethod.tokenize();

      if (result.status === 'OK') {
        await onPaymentSuccess(result.token, result.details);
      } else {
        setErrorMessage(result.errors?.[0]?.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setErrorMessage('Payment failed. Please try again.');
    }
  }, [onPaymentSuccess]);

  // Handle Apple Pay click - creates fresh payment request with current amount
  const handleApplePayClick = useCallback(async () => {
    if (!payments || !applePayAvailable) return;

    setErrorMessage('');

    try {
      // Create a new payment request with the current amount
      const paymentRequest = payments.paymentRequest({
        countryCode: 'US',
        currencyCode: 'USD',
        total: {
          amount: (currentAmountRef.current / 100).toFixed(2),
          label: 'The Rabbit Hole Tea Bar',
        },
      });

      const applePayInstance = await payments.applePay(paymentRequest);
      const result = await applePayInstance.tokenize();

      if (result.status === 'OK') {
        await onPaymentSuccess(result.token, result.details);
      } else {
        setErrorMessage(result.errors?.[0]?.message || 'Apple Pay failed');
      }
    } catch (error) {
      console.error('Apple Pay error:', error);
      if (error.message !== 'User cancelled') {
        setErrorMessage('Apple Pay failed. Please try again or use card.');
      }
    }
  }, [payments, applePayAvailable, onPaymentSuccess]);

  // Handle Google Pay click - creates fresh payment request with current amount
  const handleGooglePayClick = useCallback(async () => {
    if (!payments || !googlePayAvailable) return;

    setErrorMessage('');

    try {
      // Create a new payment request with the current amount
      const paymentRequest = payments.paymentRequest({
        countryCode: 'US',
        currencyCode: 'USD',
        total: {
          amount: (currentAmountRef.current / 100).toFixed(2),
          label: 'The Rabbit Hole Tea Bar',
        },
      });

      const googlePayInstance = await payments.googlePay(paymentRequest);
      const result = await googlePayInstance.tokenize();

      if (result.status === 'OK') {
        await onPaymentSuccess(result.token, result.details);
      } else {
        setErrorMessage(result.errors?.[0]?.message || 'Google Pay failed');
      }
    } catch (error) {
      console.error('Google Pay error:', error);
      if (error.message !== 'User cancelled') {
        setErrorMessage('Google Pay failed. Please try again or use card.');
      }
    }
  }, [payments, googlePayAvailable, onPaymentSuccess]);

  useEffect(() => {
    // Don't initialize if required props are missing
    if (!applicationId || !locationId) {
      console.log('Missing required props:', { applicationId, locationId });
      return;
    }

    if (isInitialized.current) return;
    isInitialized.current = true;

    const initializeSquare = async () => {
      if (!window.Square) {
        const script = document.createElement('script');
        script.src = 'https://web.squarecdn.com/v1/square.js';
        script.async = true;
        script.onload = () => initPayments();
        script.onerror = (error) => {
          console.error('Failed to load Square SDK:', error);
          setErrorMessage('Failed to load payment form. Please refresh the page.');
        };
        document.body.appendChild(script);
      } else {
        initPayments();
      }
    };

    const initPayments = async () => {
      try {
        if (!applicationId || !locationId) {
          throw new Error('Missing Square configuration');
        }

        const paymentsInstance = window.Square.payments(applicationId, locationId);
        setPayments(paymentsInstance);

        // Initialize Card
        const cardInstance = await paymentsInstance.card();
        await cardInstance.attach(cardContainerRef.current);
        setCard(cardInstance);

        // Check Apple Pay availability
        try {
          const testPaymentRequest = paymentsInstance.paymentRequest({
            countryCode: 'US',
            currencyCode: 'USD',
            total: { amount: '1.00', label: 'Test' },
          });
          const applePayTest = await paymentsInstance.applePay(testPaymentRequest);
          if (applePayTest) {
            setApplePayAvailable(true);
            console.log('Apple Pay is available');
          }
        } catch (e) {
          console.log('Apple Pay not available:', e.message);
          setApplePayAvailable(false);
          if (applePayContainerRef.current) {
            applePayContainerRef.current.style.display = 'none';
          }
        }

        // Check Google Pay availability
        try {
          const testPaymentRequest = paymentsInstance.paymentRequest({
            countryCode: 'US',
            currencyCode: 'USD',
            total: { amount: '1.00', label: 'Test' },
          });
          const googlePayTest = await paymentsInstance.googlePay(testPaymentRequest);
          if (googlePayTest) {
            setGooglePayAvailable(true);
            console.log('Google Pay is available');
          }
        } catch (e) {
          console.log('Google Pay not available:', e.message);
          setGooglePayAvailable(false);
          if (googlePayContainerRef.current) {
            googlePayContainerRef.current.style.display = 'none';
          }
        }
      } catch (error) {
        console.error('Failed to initialize Square:', error);
        let errorMsg = 'Failed to load payment form. Please refresh the page.';

        if (error.message?.includes('Invalid Application ID')) {
          errorMsg = 'Payment configuration error. Please contact support.';
        } else if (error.message?.includes('Invalid Location ID')) {
          errorMsg = 'Location configuration error. Please contact support.';
        }

        setErrorMessage(errorMsg);
        isInitialized.current = false;
      }
    };

    initializeSquare();

    return () => {
      if (card) {
        card.destroy?.();
      }
    };
  }, [applicationId, locationId]);

  const handleCardPayment = async (e) => {
    e.preventDefault();
    if (card && !loading) {
      setErrorMessage('');
      
      try {
        const result = await card.tokenize();
        
        if (result.status === 'OK') {
          await onPaymentSuccess(result.token, result.details);
        } else {
          setErrorMessage(result.errors?.[0]?.message || 'Payment failed');
        }
      } catch (error) {
        console.error('Payment error:', error);
        setErrorMessage('Payment failed. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-4 rounded-2xl border border-red-300">
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Apple Pay Button */}
      {applePayAvailable && (
        <button
          ref={applePayContainerRef}
          type="button"
          onClick={handleApplePayClick}
          disabled={loading || !payments}
          className="w-full h-12 bg-black text-white rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{ WebkitAppearance: 'none' }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
          <span className="font-medium">Pay with Apple Pay</span>
        </button>
      )}

      {/* Google Pay Button */}
      {googlePayAvailable && (
        <button
          ref={googlePayContainerRef}
          type="button"
          onClick={handleGooglePayClick}
          disabled={loading || !payments}
          className="w-full h-12 bg-white text-gray-800 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="font-medium">Pay with Google Pay</span>
        </button>
      )}

      {/* Divider - only show if digital wallets are available */}
      {(applePayAvailable || googlePayAvailable) && (
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-secondary text-black-500">Or pay with card</span>
          </div>
        </div>
      )}

      {/* Card Form */}
      <form onSubmit={handleCardPayment}>
        <div
          ref={cardContainerRef}
          className="mb-4"
          style={{ minHeight: '100px' }}
        />

        <button
          type="submit"
          disabled={loading || !card}
          className="w-full py-4 px-6 bg-primary-green text-black-900 rounded-full hover:bg-opacity-90 disabled:bg-black-300 disabled:cursor-not-allowed transition-colors text-lg font-semibold"
        >
          {loading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
        </button>
      </form>
    </div>
  );
}