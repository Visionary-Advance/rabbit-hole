'use client'

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from '@/app/i18n/client';

// FAQ Accordion Component
function FAQAccordion() {
  const { t } = useTranslation();
  const [openItem, setOpenItem] = useState();

  const faqItems = t('faq.items', { returnObjects: true });

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  // Add safety check for faqItems
  if (!Array.isArray(faqItems)) {
    return null;
  }

  return (
    <div id="faq" className="space-y-5">
      {faqItems.map((item, index) => (
        <div
          key={index}
          className={`relative overflow-visible transition-all duration-700 ease-out ${
            openItem === index ? 'transform-gpu' : ''
          }`}
        >
          {/* Morphing container */}
          <div
            className={`relative overflow-hidden transition-all duration-700 ease-out transform-gpu ${
              openItem === index
                ? 'bg-orange-50 border border-primary-green hover:scale-100'
                : 'bg-transparent border border-black-200 hover:border-primary-green hover:scale-[1.02]'
            }`}
            style={{
              borderRadius: openItem === index ? '16px' : '50px',
              minHeight: openItem === index ? 'auto' : '60px',
              transformOrigin: 'center center'
            }}
          >
            {/* Question */}
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none transition-all duration-300 ease-in-out"
            >
              <span
                className={`text-lg md:text-xl font-medium leading-relaxed transition-all duration-300 ease-in-out ${
                  openItem === index ? 'text-black-900 font-bold' : 'text-black-500'
                }`}
              >
                {item.question}
              </span>

              <div className="flex-shrink-0 ml-6">
                <div className="transform transition-transform duration-300 ease-in-out">
                  {openItem === index ? (
                    <svg className="w-5 h-5 rotate-0" viewBox="0 0 20 20" fill="none">
                      <path d="M16.6666 10H3.33331" stroke="#FBFBFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 rotate-0" viewBox="0 0 20 20" fill="none">
                      <path d="M9.99998 3.3335V16.6668M16.6666 10.0002H3.33331" stroke="#FBFBFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
            </button>

            {/* Answer - grows with the bubble */}
            <div
              className={`overflow-hidden transition-all duration-700 ease-out ${
                openItem === index 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-5 md:px-6 pb-5 md:pb-6">
                <div className="text-base text-black-500 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Main FAQ Section Component
export default function FAQSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-20 lg:py-24 px-6 md:px-16 lg:px-32 xl:px-36 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Title and Image */}
          <div className="space-y-12">
            <h2 className="font-quicksand font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight">
              {t('faq.title')}
            </h2>
            
            <div className="relative">
              <Image
                src="/Img/Holding_Tea.jpg"
                alt="Person holding bubble tea"
                width={496}
                height={331}
                className="w-full max-w-md rounded-3xl object-cover"
              />
            </div>
          </div>
          
          {/* Right Column - FAQ Accordion */}
          <div className="space-y-5">
            <FAQAccordion />
          </div>
        </div>
      </div>
    </section>
  );
}