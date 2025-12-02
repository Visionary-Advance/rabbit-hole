'use client';

import { useState } from 'react';
import { useTranslation } from '@/app/i18n/client';

export default function Reviews() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reviews data array
  const reviews = [
    {
      id: 1,
      rating: 5,
      quote: "By far, THE BEST boba tea around. HANDS DOWN. The melon bubble tea is unlike anything you’ve ever had. I couldn’t recommend this place enough!!",
      initials: "CJ",
      name: "Cody James",
      location: "Customer",
      gradient: "from-primary-green to-secondary"
    },
    {
      id: 2,
      rating: 5,
      quote: "They have the best boba drinks in Eugene! Their honey milk tea is phenomenal with the grass jelly! The owner and staff are so sweet, this is my new go to spot!",
      initials: "E",
      name: "Emma",
      location: "Customer",
      gradient: "from-secondary to-primary-green"
    },
    {
      id: 3,
      rating: 5,
      quote: "Great boba and great customer service. Relaxing atmosphere with fun games to play while you drink your tea. Definitely my favorite bubble tea in Eugene.",
      initials: "MW",
      name: "Madeline Wallace",
      location: "Customer",
      gradient: "from-primary-green/80 to-secondary/80"
    },
    {
      id: 4,
      rating: 5,
      quote: "Staff is always very nice, the tea is really good, but my favorite would be the taro steamed buns. Absolutely delicious.",
      initials: "R",
      name: "Ryan",
      location: "Customer",
      gradient: "from-primary-green to-secondary/90"
    },
    {
      id: 5,
      rating: 5,
      quote: "Really good and it's not to sweet and the boba is so yummy and it's so cute inside and I would definitely recommend this place.",
      initials: "LC",
      name: "Limon Chica",
      location: "Customer",
      gradient: "from-secondary/90 to-primary-green"
    },
    {
      id: 6,
      rating: 5,
      quote: "This place is a must if you're looking for bubble tea in Eugene. Great atmosphere with lots of seating, and the staff is always very friendly!",
      initials: "RT",
      name: "Renee Taylor",
      location: "Customer",
      gradient: "from-primary-green/90 to-secondary"
    }
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      // On desktop (showing 3 cards), limit to reviews.length - 3
      // On mobile (showing 1 card), cycle through all reviews
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        return prev === 0 ? reviews.length - 3 : prev - 1;
      }
      return prev === 0 ? reviews.length - 1 : prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      // On desktop (showing 3 cards), limit to reviews.length - 3
      // On mobile (showing 1 card), cycle through all reviews
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        return prev >= reviews.length - 3 ? 0 : prev + 1;
      }
      return prev >= reviews.length - 1 ? 0 : prev + 1;
    });
  };

  // Get visible reviews based on screen size
  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(reviews[(currentIndex + i) % reviews.length]);
    }
    return visible;
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 px-6 md:px-16 lg:px-32 xl:px-36 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-16 mb-12 lg:mb-16">
          {/* Title */}
          <div className="flex-1">
            <h2 className="font-quicksand font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight max-w-lg">
              {t('reviews.title')}
            </h2>
          </div>

          {/* Divider - Hidden on mobile */}
          <div className="hidden lg:block w-px h-16 bg-black-300"></div>

          {/* Description */}
          <div className="flex-1 lg:max-w-xs">
            <p className="text-black-200 text-base leading-relaxed">
              {t('reviews.description')}
            </p>
          </div>

          {/* Divider - Hidden on mobile */}
          <div className="hidden lg:block w-px h-16 bg-black-300"></div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrevious}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-primary-green bg-white hover:bg-primary-green transition-all duration-300 group"
              aria-label="Previous reviews"
            >
              <svg className="w-6 h-6 text-primary-green group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none">
                <path d="M12.707 17.293L8.414 13H18V11H8.414L12.707 6.70697L11.293 5.29297L4.586 12L11.293 18.707L12.707 17.293Z" fill="currentColor"/>
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-primary-green bg-primary-green hover:bg-primary-green/90 transition-all duration-300"
              aria-label="Next reviews"
            >
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M11.293 17.293L12.707 18.707L19.414 12L12.707 5.29297L11.293 6.70697L15.586 11H6V13H15.586L11.293 17.293Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Desktop: 3 cards */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
            {getVisibleReviews().map((review, index) => (
              <div
                key={`${review.id}-${currentIndex}-${index}`}
                className="flex flex-col gap-6 p-6 rounded-xl border border-black-200 bg-gray-50 transition-all duration-500 ease-in-out animate-fadeIn"
                style={{
                  animation: 'slideIn 0.5s ease-out'
                }}
              >
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                        <path d="M9.0709 0.648363C9.41464 -0.216122 10.5854 -0.216121 10.9291 0.648365L12.9579 5.75071C13.1029 6.11516 13.4306 6.36417 13.8067 6.39571L19.0727 6.83732C19.9649 6.91215 20.3267 8.07684 19.6469 8.68594L15.6348 12.2809C15.3483 12.5378 15.223 12.9407 15.3106 13.3246L16.5364 18.6999C16.744 19.6106 15.7969 20.3305 15.033 19.8424L10.5246 16.9619C10.2025 16.7561 9.79752 16.7561 9.4755 16.9619L4.967 19.8424C4.20312 20.3305 3.25596 19.6106 3.46364 18.6999L4.68943 13.3246C4.77699 12.9407 4.65183 12.5378 4.36527 12.2809L0.353063 8.68594C-0.326719 8.07684 0.0350679 6.91215 0.927293 6.83732L6.19337 6.39571C6.56952 6.36417 6.89717 6.11516 7.04208 5.75071L9.0709 0.648363Z" fill="#FF9D00"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-black-500 text-sm">({review.rating})</span>
                </div>

                {/* Quote */}
                <blockquote className="text-black-500 text-base leading-relaxed flex-1">
                  &quot;{review.quote}&quot;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${review.gradient} flex items-center justify-center`}>
                    <span className="text-white font-semibold text-lg">{review.initials}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-black-900 text-lg">{review.name}</div>
                    <div className="text-black-500 text-sm">{review.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet: 1 card at a time */}
          <div className="lg:hidden">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="w-full flex-shrink-0 px-2"
                  >
                    <div className="flex flex-col gap-6 p-6 rounded-xl border border-black-200 bg-gray-50">
                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                              <path d="M9.0709 0.648363C9.41464 -0.216122 10.5854 -0.216121 10.9291 0.648365L12.9579 5.75071C13.1029 6.11516 13.4306 6.36417 13.8067 6.39571L19.0727 6.83732C19.9649 6.91215 20.3267 8.07684 19.6469 8.68594L15.6348 12.2809C15.3483 12.5378 15.223 12.9407 15.3106 13.3246L16.5364 18.6999C16.744 19.6106 15.7969 20.3305 15.033 19.8424L10.5246 16.9619C10.2025 16.7561 9.79752 16.7561 9.4755 16.9619L4.967 19.8424C4.20312 20.3305 3.25596 19.6106 3.46364 18.6999L4.68943 13.3246C4.77699 12.9407 4.65183 12.5378 4.36527 12.2809L0.353063 8.68594C-0.326719 8.07684 0.0350679 6.91215 0.927293 6.83732L6.19337 6.39571C6.56952 6.36417 6.89717 6.11516 7.04208 5.75071L9.0709 0.648363Z" fill="#FF9D00"/>
                            </svg>
                          ))}
                        </div>
                        <span className="text-black-500 text-sm">({review.rating})</span>
                      </div>

                      {/* Quote */}
                      <blockquote className="text-black-500 text-base leading-relaxed flex-1">
                        &quot;{review.quote}&quot;
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${review.gradient} flex items-center justify-center`}>
                          <span className="text-white font-semibold text-lg">{review.initials}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-black-900 text-lg">{review.name}</div>
                          <div className="text-black-500 text-sm">{review.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots indicator for mobile */}
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary-green w-8' 
                      : 'bg-black-300 hover:bg-black-400'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}