'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AboutUs from "@/Components/AboutUs";
import Contact from "@/Components/Contact";
import FAQAccordion from "@/Components/FAQ";
import Reviews from "@/Components/Reviews";
import Trust from "@/Components/Trust";
import Menu from "@/Components/Menu";
import Cart from "@/Components/Cart";
import Image from "next/image";
import CTA from '../../Components/CTA';
import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import Link from 'next/link';
import StructuredData from '@/Components/StructuredData';
import SpecialsPopup from '@/Components/SpecialsPopup';
import { useTranslation } from '@/app/i18n/client';

export default function Home() {
  const params = useParams();
  const locale = params?.locale || 'en';
  const { t } = useTranslation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [menuCategory, setMenuCategory] = useState('All Tea');
  const [menuCategoryKey, setMenuCategoryKey] = useState(0);

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

  const handleTakeMeThere = () => {
    // Set menu category to Specialties
    setMenuCategory('Specials');
    setMenuCategoryKey(prev => prev + 1);

    // Scroll to menu section
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <StructuredData />

      {/* Specials Popup */}
      <SpecialsPopup onTakeMeThere={handleTakeMeThere} />
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
            className="object-cover md:rounded-3xl "
            style={{ objectPosition: 'center top' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 md:rounded-3xl "></div>
        </div>

        {/* Hero Content */}
        <div className="relative flex-1 z-10 w-full lg:w-1/2 justify-left flex flex-col lg:items-center pt-12 pb-32 lg:pb-26 px-6 lg:px-0">
        <div className='absolute w-full top-20 right-0'>
          <Image
          src={"/Img/Boba.png"}
          alt='Boba for bubble tea'
          fill
          className='absolute w-20 h-20'
          />
        </div>
          <div className={`max-w-2xl flex-1 flex flex-col justify-center 
          ${locale === "zh" 
            ?  'max-w-2xl'
            :'max-w-3xl'
          }`}>
            <div className="relative mb-6 lg:h-87">
              <h1 className="font-quicksand font-bold text-6xl lg:text-7xl xl:text-8xl leading-tight text-white">
                {t('hero.title_line1')}<br />
                {t('hero.title_line2')}<br />
                <span className="lg:hidden">{t('hero.title_line3')}</span>
              </h1>

              <div className={`hidden lg:block absolute font-quicksand font-bold text-6xl lg:text-7xl xl:text-8xl text-white left-0 
                ${locale === "zh"
                  ? 'top-[72%]'
                  : 'top-[68%] left-[30%]'
                }`}>
                {t('hero.title_line3')}
              </div>

              <Image
                src="/Img/Rabbit1.jpg"
                alt="Person enjoying bubble tea"
                width={112}
                height={63}
                className={`absolute rounded-full border-2 border-primary-green w-20 h-12 md:w-28 md:h-16 object-cover ${
                  locale === 'zh'
                    ? 'top-[75%] left-[50%] lg:top-[80%] lg:left-[77%]'
                    : 'top-[75%] left-[40%] lg:top-[73%] lg:left-[3%]'
                }`}
              />
              <Image
                src="/Img/Tea.jpg"
                alt="Person with bubble tea"
                width={124}
                height={71}
                className={`absolute rounded-full border-2 border-primary-green w-24 h-16 md:w-32 md:h-20 object-cover ${
                  locale === 'zh'
                    ? 'top-[5%] right-[10%] lg:top-[10%] lg:-right-[36%]'
                    : 'top-[5%] right-[1%] lg:top-[10%] lg:right-[-7%]'
                }`}
              />
            </div>
            <p className="block text-white text-lg md:text-xl lg:text-2xl mb-10 max-w-md">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Buttons - Positioned at bottom on mobile for thumb-friendly access */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col gap-3 w-11/12 lg:relative lg:bottom-auto lg:left-auto lg:translate-x-7 lg:flex-row lg:gap-5 lg:max-w-xl">
            <a href='#menu' className="w-full lg:w-auto">
            <button className="w-full bg-primary-green text-black-900 h-14 px-5 rounded-full font-medium hover:bg-opacity-90 transition-colors lg:min-w-[150px]">
              {t('hero.order_online')}
            </button>
            </a>
             <a href='#menu' className="w-full lg:w-auto">
            <button className="w-full border border-primary-green text-primary-green h-14 px-5 rounded-full font-medium hover:bg-primary-green hover:text-black-900 transition-colors lg:min-w-[150px]">
              {t('hero.view_menu')}
            </button>
            </a>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <Trust />

      {/* Menu Section */}
      <Menu initialCategory={menuCategory} categoryKey={menuCategoryKey} />
      
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