'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SpecialsPopup({ onTakeMeThere }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if popup has been shown in this session
    const hasSeenPopup = sessionStorage.getItem('specialsPopupShown');

    if (!hasSeenPopup) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('specialsPopupShown', 'true');
        // Trigger animation slightly after becoming visible
        setTimeout(() => setIsAnimating(true), 50);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleTakeMeThere = () => {
    setIsVisible(false);
    onTakeMeThere();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-500 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Popup Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`relative bg-black border-2 border-primary-green rounded-3xl shadow-2xl max-w-4xl w-full pointer-events-auto transform transition-all duration-500 ease-out ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute -top-3 -right-3 bg-primary-green text-black-900 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-90 transition-colors shadow-lg z-10"
            aria-label="Close popup"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="p-6 lg:p-8">
            {/* Grid Layout - 1 column on mobile/tablet, 2 columns on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Text & Button Column */}
              <div className="flex flex-col justify-center">
                {/* Header Text */}
                <div className="text-center lg:text-left mb-6">
                  <h2 className="font-quicksand font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-2">
                    Check Out Our December Specials!
                  </h2>
                  <p className="text-black-500 text-sm md:text-base lg:text-lg">
                    Exclusive seasonal drinks you won&apos;t want to miss
                  </p>
                </div>

                {/* Button */}
                <button
                  onClick={handleTakeMeThere}
                  className="w-full bg-primary-green text-black-900 h-14 lg:h-16 px-6 rounded-full font-bold text-lg lg:text-xl hover:bg-opacity-90 transition-colors shadow-lg"
                >
                  Take Me There
                </button>

                {/* Skip Text */}
                <button
                  onClick={handleClose}
                  className="w-full text-black-500 text-sm lg:text-base mt-4 hover:text-white transition-colors"
                >
                  Maybe later
                </button>
              </div>

              {/* Image Column */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden order-first lg:order-last">
                <Image
                  src="/Img/Specials_Flyer_December.jpg"
                  alt="December Specials - The Rabbit Hole Tea Bar"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
