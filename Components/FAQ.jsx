'use client'

import { useState } from "react";
import Image from "next/image";

// FAQ Accordion Component
function FAQAccordion() {
  const [openItem, setOpenItem] = useState();

  const faqItems = [
    {
      id: 0,
      question: "What kind of drinks do you serve?",
      answer: "We serve a wide variety of bubble tea drinks including classic milk teas, fruit teas, specialty signature drinks, and seasonal favorites. All made with premium ingredients and real fruit flavors."
    },
    {
      id: 1,
      question: "What are your opening hours?",
      answer: "We're open Monday to Saturday from 11 AM to 9 PM, and Sunday from 12 PM to 7 PM. Come by any time during those hours for a sip!"
    },
    {
      id: 2,
      question: "Where are you located?",
      answer: "You can find us at 240 E 17th Ave. Eugene, OR 97401. We're conveniently located in the heart of Eugene with easy parking available."
    },
    {
      id: 3,
      question: "Can I order online?",
      answer: "Yes! We offer online ordering for pickup and delivery. You can place your order through our website or mobile app for a quick and convenient experience."
    },
    {
      id: 4,
      question: "Do you have dairy-free or vegan options?",
      answer: "Absolutely! We offer a variety of dairy-free alternatives including oat milk, almond milk, and coconut milk. Many of our fruit teas are naturally vegan, and we can customize most drinks to meet your dietary preferences."
    }
  ];

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div id="faq" className="space-y-5">
      {faqItems.map((item) => (
        <div
          key={item.id}
          className={`relative overflow-visible transition-all duration-700 ease-out ${
            openItem === item.id ? 'transform-gpu' : ''
          }`}
        >
          {/* Morphing container */}
          <div
            className={`relative overflow-hidden transition-all duration-700 ease-out transform-gpu ${
              openItem === item.id
                ? 'bg-orange-50 border border-primary-green hover:scale-100'
                : 'bg-transparent border border-black-200 hover:border-primary-green hover:scale-[1.02]'
            }`}
            style={{
              borderRadius: openItem === item.id ? '16px' : '50px',
              minHeight: openItem === item.id ? 'auto' : '60px',
              transformOrigin: 'center center'
            }}
          >
            {/* Question */}
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none transition-all duration-300 ease-in-out"
            >
              <span
                className={`text-lg md:text-xl font-medium leading-relaxed transition-all duration-300 ease-in-out ${
                  openItem === item.id ? 'text-black-900 font-bold' : 'text-black-500'
                }`}
              >
                {item.question}
              </span>

              <div className="flex-shrink-0 ml-6">
                <div className="transform transition-transform duration-300 ease-in-out">
                  {openItem === item.id ? (
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
                openItem === item.id 
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
  return (
    <section className="py-16 md:py-20 lg:py-24 px-6 md:px-16 lg:px-32 xl:px-36 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Title and Image */}
          <div className="space-y-12">
            <h2 className="font-quicksand font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight">
              Frequently Asked Questions
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