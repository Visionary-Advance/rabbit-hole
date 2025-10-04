'use client';

import { useEffect, useRef, useState } from 'react';

export default function SquarePaymentForm({
  applicationId,
  locationId,
  onPaymentSuccess,
  amount,
  loading = false
}) {
  const [payments, setPayments] = useState(null);
  const [card, setCard] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const cardContainerRef = useRef(null);
  const applePayContainerRef = useRef(null);
  const googlePayContainerRef = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const initializeSquare = async () => {
      if (!window.Square) {
        const script = document.createElement('script');
        script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
        script.async = true;
        script.onload = () => initPayments();
        document.body.appendChild(script);
      } else {
        initPayments();
      }
    };

    const initPayments = async () => {
      try {
        const paymentsInstance = window.Square.payments(applicationId, locationId);
        setPayments(paymentsInstance);

        // Initialize Card
        const cardInstance = await paymentsInstance.card();
        await cardInstance.attach(cardContainerRef.current);
        setCard(cardInstance);

        // Initialize Apple Pay if available
        if (applePayContainerRef.current) {
          try {
            const paymentRequest = paymentsInstance.paymentRequest({
              countryCode: 'US',
              currencyCode: 'USD',
              total: {
                amount: (amount / 100).toFixed(2),
                label: 'Total',
              },
            });

            const applePay = await paymentsInstance.applePay(paymentRequest);
            
            // Attach Apple Pay button with event listener
            await applePay.attach(applePayContainerRef.current, {
              buttonColor: 'black',
              buttonType: 'plain',
            });

            // Add event listener for Apple Pay
            applePayContainerRef.current.addEventListener('click', async (event) => {
              event.preventDefault();
              await handlePayment(applePay);
            });
          } catch (e) {
            console.log('Apple Pay not available:', e);
            if (applePayContainerRef.current) {
              applePayContainerRef.current.style.display = 'none';
            }
          }
        }

        // Initialize Google Pay if available
        if (googlePayContainerRef.current) {
          try {
            const paymentRequest = paymentsInstance.paymentRequest({
              countryCode: 'US',
              currencyCode: 'USD',
              total: {
                amount: (amount / 100).toFixed(2),
                label: 'Total',
              },
            });

            const googlePay = await paymentsInstance.googlePay(paymentRequest);
            
            // Attach Google Pay button
            await googlePay.attach(googlePayContainerRef.current, {
              buttonColor: 'black',
              buttonType: 'long',
              buttonSizeMode: 'fill',
            });

            // Add event listener for Google Pay
            googlePayContainerRef.current.addEventListener('click', async (event) => {
              event.preventDefault();
              await handlePayment(googlePay);
            });
          } catch (e) {
            console.log('Google Pay not available:', e);
            if (googlePayContainerRef.current) {
              googlePayContainerRef.current.style.display = 'none';
            }
          }
        }
      } catch (error) {
        console.error('Failed to initialize Square:', error);
        setErrorMessage('Failed to load payment form. Please refresh the page.');
      }
    };

    const handlePayment = async (paymentMethod) => {
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
    };

    initializeSquare();
  }, [applicationId, locationId, amount, onPaymentSuccess]);

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

      {/* Apple Pay */}
      <div 
        ref={applePayContainerRef}
        style={{ minHeight: '48px' }}
      />

      {/* Google Pay */}
      <div 
        ref={googlePayContainerRef}
        style={{ minHeight: '48px' }}
      />

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-black-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-secondary text-black-500">Or pay with card</span>
        </div>
      </div>

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