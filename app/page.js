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
        <nav className="relative z-20 flex justify-between items-center px-6 md:px-16 lg:px-32 xl:px-36 py-5 bg-white">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-6">
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/304ecfe71cf4ae861cd88fa5b8056f6f4c8af0a4?width=208"
                alt="Rabbit Hole Logo"
                width={104}
                height={59}
                className="w-20 h-auto md:w-26"
              />
              <div className="w-px h-5 bg-black-400"></div>
              <div className="hidden md:flex items-center gap-8">
                <div className="flex items-center justify-center px-2 py-1 border border-black-300 rounded">
                  <span className="text-black-900 font-medium">Home</span>
                </div>
                <span className="text-black-500">Menu</span>
                <span className="text-black-500">About Us</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <span className="text-black-900 font-medium text-sm">Cart</span>
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.2046 4.594C13.1666 3.97933 12.6566 3.5 12.0406 3.5C10.3413 3.5 5.65864 3.5 3.95931 3.5C3.34331 3.5 2.83331 3.97933 2.79531 4.594C2.67864 6.45667 2.33464 11.9607 2.21198 13.9273C2.19198 14.2487 2.30531 14.564 2.52598 14.7987C2.74664 15.0333 3.05398 15.1667 3.37598 15.1667H12.624C12.946 15.1667 13.2533 15.0333 13.474 14.7987C13.6946 14.564 13.808 14.2487 13.788 13.9273L13.2046 4.594ZM12.2066 4.656L12.79 13.9893C12.7926 14.0353 12.7766 14.0807 12.7453 14.114C12.714 14.1473 12.67 14.1667 12.624 14.1667H3.37598C3.32998 14.1667 3.28598 14.1473 3.25464 14.114C3.22331 14.0807 3.20731 14.0353 3.20998 13.9893L3.79331 4.656C3.79864 4.56867 3.87131 4.5 3.95931 4.5H12.0406C12.1286 4.5 12.2013 4.56867 12.2066 4.656Z" fill="#171B26"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M5 4.5H11L11.0213 4.498C11.1173 4.486 11.5 4.41267 11.5 4C11.5 2.25133 10.082 0.833332 8.33333 0.833332C8.112 0.833332 7.888 0.833332 7.66667 0.833332C5.918 0.833332 4.5 2.25133 4.5 4C4.5 4.13267 4.55267 4.26 4.64667 4.35333C4.74 4.44733 4.86733 4.5 5 4.5ZM10.442 3.5H5.558C5.78333 2.54467 6.642 1.83333 7.66667 1.83333H8.33333C9.358 1.83333 10.2167 2.54467 10.442 3.5Z" fill="#171B26"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M7.5 7.33333V11.3333C7.5 11.6093 7.724 11.8333 8 11.8333C8.276 11.8333 8.5 11.6093 8.5 11.3333V7.33333C8.5 7.05733 8.276 6.83333 8 6.83333C7.724 6.83333 7.5 7.05733 7.5 7.33333Z" fill="#171B26"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M6 9.83333H10C10.276 9.83333 10.5 9.60933 10.5 9.33333C10.5 9.05733 10.276 8.83333 10 8.83333H6C5.724 8.83333 5.5 9.05733 5.5 9.33333C5.5 9.60933 5.724 9.83333 6 9.83333Z" fill="#171B26"/>
              </svg>
              <span className="text-black-400">({cartItemCount})</span>
            </button>
            <button className="bg-primary-green text-black-900 h-10 px-4 rounded-full font-medium text-sm hover:bg-opacity-90 transition-colors">
              Contact Us
            </button>
          </div>
        </nav>

        {/* Hero Background Image */}
        <div className="absolute w-[97%] left-1/2 -translate-x-1/2 inset-0 z-0">
          <Image
            src="https://api.builder.io/api/v1/image/assets/TEMP/51af8464867a420b04c85c9ef60d048c9ef62263?width=2720"
            alt="Bubble tea background"
            fill
            className="object-cover rounded-3xl md:rounded-[2rem]"
            style={{ objectPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 rounded-3xl md:rounded-[2rem]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full lg:w-1/2  justify-center flex items-center pt-12 pb-26">
        <div className='absolute w-full top-20 right-0'>
          <Image 
          src={"/Img/Boba.png"}
          alt='Boba for bubble tea'
          fill
          className='absolute w-20 h-20'
          />
        </div>
          <div className="max-w-xl ">
            <div className="relative mb-6 h-87">
              <h1 className=" font-quicksand font-bold text-6xl lg:text-7xl xl:text-8xl leading-tight text-white">
                Eugene&apos;s<br />
                Bubble Tea
              </h1>
              
              <div className="absolute font-quicksand font-bold text-6xl lg:text-7xl xl:text-8xl text-white lg:top-[81%] lg:left-[48%] lg:-translate-x-1/2 lg:-translate-y-1/2">
                Spot
              </div>
              
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/b6056ef1192c4329a92fc3365e4a81f7345cf294?width=224"
                alt="Person enjoying bubble tea"
                width={112}
                height={63}
                className="absolute rounded-full border-2 border-primary-green w-20 h-12 md:w-28 md:h-16 object-cover top-[47%] left-[45%] lg:top-[73%] lg:left-[3%]"
              />
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/7d659ad0ab2d623fcb16c0d3a2a9b548b47a7652?width=248"
                alt="Person with bubble tea"
                width={124}
                height={71}
                className="absolute rounded-full border-2 border-primary-green w-24 h-16 md:w-32 md:h-20 object-cover top-[5%] right-[-12%] lg:top-[10%] lg:right-[-7%]"
              />
            </div>
            <p className="hidden lg:block text-white text-lg md:text-xl lg:text-2xl mb-10 max-w-md">
              Freshly brewed. Made with love
            </p>
            
            <div className=" p-4 bg-black/80 backdrop-blur-sm flex flex-col gap-3 sm:relative sm:bg-transparent sm:backdrop-blur-none sm:p-0 sm:flex-row sm:gap-5">
              <button className="bg-primary-green text-black-900 h-14 px-5 rounded-full font-medium hover:bg-opacity-90 transition-colors min-w-[150px]">
                Order Online
              </button>
              <button className="border border-primary-green text-primary-green h-14 px-5 rounded-full font-medium hover:bg-primary-green hover:text-black-900 transition-colors min-w-[150px]">
                View Menu
              </button>
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