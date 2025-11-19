import AboutUs from "@/Components/AboutUs";
import Contact from "@/Components/Contact";
import FAQAccordion from "@/Components/FAQ";
import Reviews from "@/Components/Reviews";
import Trust from "@/Components/Trust";
import MenuServer from "@/Components/MenuServer";
import CTA from '@/Components/CTA';
import Footer from '@/Components/Footer';
import StructuredData from '@/Components/StructuredData';
import HomeClient from '@/Components/HomeClient';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <StructuredData />

      {/* Client-side interactive hero and cart */}
      <HomeClient />

      {/* Trust Section */}
      <Trust />

      {/* Menu Section - Server-rendered with 24-hour cache */}
      <MenuServer />

      <AboutUs />
      <Reviews />
      <Contact />
      <FAQAccordion />

      <CTA />

      <Footer />
    </div>
  );
}