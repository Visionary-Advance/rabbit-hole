'use client'

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from '@/app/i18n/client';

export default function Footer(){
  const { t } = useTranslation();




    return(
         <footer className="bg-black-900 py-16 md:py-20 lg:py-28 px-6 md:px-16 lg:px-32 xl:px-36">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-8 border-b border-black-700">
            {/* Brand Column */}
            <div className="space-y-5">
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/304ecfe71cf4ae861cd88fa5b8056f6f4c8af0a4?width=208"
                alt="Rabbit Hole Logo"
                width={150}
                height={59}
                className="w-32 h-auto"
              />
              <p className="text-black-300 text-base leading-relaxed">
                {t('footer.description')}
              </p>

              {/* Social Media Icons */}
              <div className="flex items-center gap-2">
                
                <Link href={"https://www.facebook.com/TheRabbitHoleTea/"} className="w-10 h-10 rounded-full bg-primary-green flex items-center justify-center hover:bg-opacity-90 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                    <path d="M8.01573 11.2917C7.93723 11.2917 6.29047 11.2922 5.53097 11.2915C5.13997 11.2912 5.00047 11.1507 5.00047 10.7572C4.99984 9.74645 4.99984 8.7357 5.00047 7.72494C5.00072 7.33644 5.14822 7.18819 5.53422 7.18794C6.29372 7.18744 7.93148 7.18769 8.01573 7.18769V4.98718C8.01623 3.99367 8.19348 3.04267 8.69824 2.17191C9.21499 1.28066 9.96699 0.670157 10.9307 0.317156C11.548 0.0909046 12.1888 0.000654265 12.8438 0.000154263C13.6633 -0.00034574 14.4828 0.000404256 15.3025 0.00190426C15.6548 0.00240427 15.811 0.158155 15.8118 0.512907C15.8133 1.46366 15.8133 2.41442 15.8118 3.36492C15.8113 3.72342 15.6615 3.86742 15.3013 3.87142C14.6295 3.87867 13.9573 3.87417 13.2863 3.90117C12.6085 3.90117 12.252 4.23217 12.252 4.93368C12.2358 5.67568 12.2453 6.41844 12.2453 7.18744C12.3088 7.18744 14.2375 7.18719 15.139 7.18744C15.5485 7.18744 15.6885 7.32819 15.6885 7.73994C15.6885 8.7452 15.6883 9.7507 15.6875 10.756C15.6873 11.1617 15.5558 11.2912 15.1438 11.2915C14.2423 11.292 12.321 11.2917 12.237 11.2917V19.428C12.237 19.8617 12.1005 20 11.6725 20H8.54174C8.16348 20 8.01598 19.853 8.01598 19.4747L8.01573 11.2917Z" fill="#171B26"/>
                  </svg>
                </Link>
                <Link href={"https://www.instagram.com/therabbitholetea/?hl=en"} className="w-10 h-10 rounded-full border border-primary-green flex items-center justify-center hover:bg-primary-green hover:border-primary-green transition-colors group">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                    <g clipPath="url(#clip0_instagram)">
                      <path d="M15 0H5C2.2 0 0 2.2 0 5V15C0 17.8 2.2 20 5 20H15C17.8 20 20 17.8 20 15V5C20 2.2 17.8 0 15 0ZM18 15C18 16.7 16.7 18 15 18H5C3.3 18 2 16.7 2 15V5C2 3.3 3.3 2 5 2H15C16.7 2 18 3.3 18 5V15Z" fill="#88AD89" className="group-hover:fill-black-900"/>
                      <path d="M10 5C7.2 5 5 7.2 5 10C5 12.8 7.2 15 10 15C12.8 15 15 12.8 15 10C15 7.2 12.8 5 10 5ZM10 13C8.3 13 7 11.7 7 10C7 8.3 8.3 7 10 7C11.7 7 13 8.3 13 10C13 11.7 11.7 13 10 13Z" fill="#88AD89" className="group-hover:fill-black-900"/>
                      <path d="M15 6C15.5523 6 16 5.55228 16 5C16 4.44772 15.5523 4 15 4C14.4477 4 14 4.44772 14 5C14 5.55228 14.4477 6 15 6Z" fill="#88AD89" className="group-hover:fill-black-900"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_instagram">
                        <rect width="20" height="20" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
                
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-2xl">{t('footer.quick_links')}</h3>
              <nav className="flex flex-col gap-3">
                <a href="#home" className="text-black-300 text-base hover:text-primary-green transition-colors">{t('footer.home')}</a>
                <a href="#menu" className="text-black-300 text-base hover:text-primary-green transition-colors">{t('footer.menu')}</a>
                <a href="#about" className="text-black-300 text-base hover:text-primary-green transition-colors">{t('footer.about_us')}</a>
                <a href="#faq" className="text-black-300 text-base hover:text-primary-green transition-colors">FAQs</a>
              </nav>
            </div>

            {/* Contact */}
            <div className="space-y-5">
              <h3 className="text-white font-bold text-2xl">{t('footer.contact')}</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 11 10" fill="none">
                      <path d="M5.33423 0C3.26673 0 1.58423 1.69417 1.58423 3.77708C1.58423 6.73667 4.98173 9.7925 5.12631 9.92083C5.1859 9.97375 5.26006 10 5.33423 10C5.4084 10 5.48256 9.97375 5.54215 9.92125C5.68673 9.7925 9.08423 6.73667 9.08423 3.77708C9.08423 1.69417 7.40173 0 5.33423 0ZM5.33423 5.83333C4.18548 5.83333 3.2509 4.89875 3.2509 3.75C3.2509 2.60125 4.18548 1.66667 5.33423 1.66667C6.48298 1.66667 7.41756 2.60125 7.41756 3.75C7.41756 4.89875 6.48298 5.83333 5.33423 5.83333Z" fill="#171B26"/>
                    </svg>
                  </div>
                  <p className="text-black-300 text-base opacity-80 flex-1">240 E 17th Ave, Eugene, OR 97401</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 11 10" fill="none">
                      <g clipPath="url(#clip0_email)">
                        <path d="M10.2452 1.98682L7.2124 5.00008L10.2452 8.01334C10.3 7.89875 10.3333 7.77207 10.3333 7.6368V2.36336C10.3333 2.22807 10.3 2.10141 10.2452 1.98682Z" fill="#171B26"/>
                        <path d="M9.45394 1.48438H1.21175C1.07646 1.48438 0.949795 1.51764 0.835205 1.57246L4.71144 5.42916C5.05417 5.77189 5.61151 5.77189 5.95425 5.42916L9.83048 1.57246C9.71589 1.51764 9.58923 1.48438 9.45394 1.48438Z" fill="#171B26"/>
                        <path d="M0.421338 1.98682C0.366514 2.10141 0.333252 2.22807 0.333252 2.36336V7.6368C0.333252 7.77209 0.366514 7.89877 0.421338 8.01334L3.45413 5.00008L0.421338 1.98682Z" fill="#171B26"/>
                        <path d="M6.79769 5.41406L6.36853 5.84322C5.79745 6.4143 4.86821 6.4143 4.29714 5.84322L3.868 5.41406L0.835205 8.42732C0.949795 8.48215 1.07646 8.51541 1.21175 8.51541H9.45394C9.58923 8.51541 9.71589 8.48215 9.83048 8.42732L6.79769 5.41406Z" fill="#171B26"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_email">
                          <rect width="10" height="10" fill="white" transform="translate(0.333252)"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <a href="mailto:TheRabbitHoletc@gmail.com" className="text-black-300 text-base opacity-80">TheRabbitHoletc@gmail.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 11 10" fill="none">
                      <g clipPath="url(#clip0_phone)">
                        <path d="M8.94914 6.96006C8.34504 6.44337 7.73197 6.1304 7.13529 6.6463L6.779 6.95811C6.51831 7.18445 6.03363 8.24201 4.15968 6.0863C2.28612 3.93332 3.40104 3.59811 3.66212 3.37372L4.02036 3.06152C4.61392 2.54445 4.38992 1.89352 3.96182 1.22347L3.70348 0.817618C3.27343 0.14913 2.80514 -0.289894 2.21002 0.226398L1.88846 0.507374C1.62543 0.698984 0.890215 1.32181 0.711873 2.50503C0.497239 3.92474 1.17431 5.5505 2.72553 7.3343C4.2748 9.11889 5.79168 10.0153 7.22856 9.99967C8.4227 9.98679 9.14387 9.34601 9.36943 9.11303L9.69217 8.83167C10.2857 8.31576 9.91695 7.7905 9.31246 7.27264L8.94914 6.96006Z" fill="#171B26"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_phone">
                          <rect width="10" height="10" fill="white" transform="translate(0.333252)"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <a href="tel:(541)-654-0425" className="text-black-300 text-base opacity-80">(541)-654-0425</a>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-2xl">{t('contact.opening_hours')}</h3>
              <div className="flex flex-col gap-3">
                <p className="text-black-300 text-base opacity-80">Monday - Friday: 11:00 AM - 8:00 PM</p>
                <p className="text-black-300 text-base opacity-80">Saturday - Sunday: 11:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
            <p className="text-black-300 text-base">{t('footer.copyright')}</p>
            <p className="text-black-300 text-base">Powered by <Link href={"https://visionaryadvance.com"} rel="nofollow" target="_blank">Visionary Advance</Link> </p>
          </div>
        </div>
      </footer>
    );
}