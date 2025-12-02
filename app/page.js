'use client'

import { useState, useEffect } from 'react';
import AboutUs from "@/Components/AboutUs";
import Contact from "@/Components/Contact";
import FAQAccordion from "@/Components/FAQ";
import Reviews from "@/Components/Reviews";
import Trust from "@/Components/Trust";
import MenuServer from "@/Components/MenuServer";
import CTA from '@/Components/CTA';
import Footer from '@/Components/Footer';
import StructuredData from '@/Components/StructuredData';
import SpecialsPopup from '@/Components/SpecialsPopup';
import HomeClient from '@/Components/HomeClient';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [menuCategory, setMenuCategory] = useState('All Tea');

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
    setMenuCategory('Special Drinks');

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

      {/* Client-side interactive hero and cart */}
      <HomeClient />

      {/* Trust Section */}
      <Trust />

      {/* Menu Section - Server-rendered with 24-hour cache */}
      <MenuServer initialCategory={menuCategory} />

      <AboutUs />
      <Reviews />
      <Contact />
      <FAQAccordion />

      <CTA />

      <Footer />
    </div>
  );
}