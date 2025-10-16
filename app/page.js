'use client'

import { useState, useEffect } from 'react';
import AboutUs from "@/Components/AboutUs";
import Contact from "@/Components/Contact";
import FAQAccordion from "@/Components/FAQ";
import Reviews from "@/Components/Reviews";
import Trust from "@/Components/Trust";
import Menu from "@/Components/Menu";
import Cart from "@/Components/Cart";
import Image from "next/image";
import CTA from '../Components/CTA';
import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import Link from 'next/link';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    // Listen for cart updates from other components
    const handleCartUpdate = () => {
      const updatedCart = localStorage.getItem('cart');
      if (updatedCart) {
        setCartItems(JSON.parse(updatedCart));
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col">
        {/* Navigation */}
       <Header
         cartItemCount={cartItemCount}
         onCartClick={() => setIsCartOpen(true)}
       />

        {/* Hero Background Image */}
        <div className="absolute w-full md:w-[97%] md:left-1/2 md:-translate-x-1/2 inset-0 z-0">
          <Image
            src="https://api.builder.io/api/v1/image/assets/TEMP/51af8464867a420b04c85c9ef60d048c9ef62263?width=2720"
            alt="Bubble tea background"
            fill
            className="object-cover md:rounded-3xl md:rounded-[2rem]"
            style={{ objectPosition: 'center top' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 md:rounded-3xl md:rounded-[2rem]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full lg:w-1/2 justify-center flex items-center pt-12 pb-26">
        <div className='absolute w-full top-20 right-0'>
          <Image
          src={"/Img/Boba.png"}
          alt='Boba for bubble tea'
          fill
          className='absolute w-20 h-20'
          />
        </div>
          <div className="max-w-xl">
            <div className="relative mb-6 h-87">
              <h1 className=" font-quicksand font-bold text-6xl lg:text-7xl xl:text-8xl leading-tight text-white">
                Eugene&apos;s<br />
                Bubble Tea
              </h1>

              <div className="absolute font-quicksand font-bold text-6xl lg:text-7xl xl:text-8xl text-white lg:top-[81%] lg:left-[48%] lg:-translate-x-1/2 lg:-translate-y-1/2">
                Spot
              </div>

              <Image
                src="/Img/Rabbit1.jpg"
                alt="Person enjoying bubble tea"
                width={112}
                height={63}
                className="absolute rounded-full border-2 border-primary-green w-20 h-12 md:w-28 md:h-16 object-cover top-[47%] left-[45%] lg:top-[73%] lg:left-[3%]"
              />
              <Image
                src="/Img/Tea.jpg"
                alt="Person with bubble tea"
                width={124}
                height={71}
                className="absolute rounded-full border-2 border-primary-green w-24 h-16 md:w-32 md:h-20 object-cover top-[5%] right-[-12%] lg:top-[10%] lg:right-[-7%]"
              />
            </div>
            <p className="hidden lg:block text-white text-lg md:text-xl lg:text-2xl mb-10 max-w-md">
              Freshly brewed. Made with love
            </p>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col gap-3 w-[calc(100%-3rem)] sm:relative sm:bottom-auto sm:left-auto sm:translate-x-0 sm:flex-row sm:gap-5 sm:w-auto">
              <a href='#menu'>
              <button className="bg-primary-green text-black-900 h-14 px-5 rounded-full font-medium hover:bg-opacity-90 transition-colors min-w-[150px]">
                Order Online
              </button>
              </a>
               <a href='#menu'>
              <button className="border border-primary-green text-primary-green h-14 px-5 rounded-full font-medium hover:bg-primary-green hover:text-black-900 transition-colors min-w-[150px]">
                View Menu
              </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <Trust />

      {/* Menu Section */}
      <Menu />
      
      <AboutUs />
      <Reviews />
      <Contact />
      <FAQAccordion />

      <CTA />

      <Footer />

      {/* Cart Sidebar */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </div>
  );
}