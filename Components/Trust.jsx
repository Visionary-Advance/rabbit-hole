'use client'

import { useTranslation } from '@/app/i18n/client';

export default function Trust(){
  const { t } = useTranslation();

return(

    <>


     <section className="py-12 md:py-16 place-items-center bg-black ">
  <div className="text-center mb-12">
    <h2 className="font-quicksand font-bold text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight max-w-4xl my-4 mx-auto">
      {t('trust.title')}
    </h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 my-10 mx-auto  w-9/12 ">
    {/* Experience */}
    <div className="text-center relative">
      <div className="flex items-center justify-left gap-3 mb-5 ">
        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
            <path d="M7.01246 12.975C6.04163 13.7375 5.41663 14.9208 5.41663 16.25V17.5H2.91663C2.22496 17.5 1.66663 16.9417 1.66663 16.25V15.4167C1.66663 13.8042 2.97079 12.5 4.58329 12.5H5.41663C6.00829 12.5 6.55413 12.675 7.01246 12.975Z" fill="#FBFBFB"/>
            <path d="M15 12.5C16.0355 12.5 16.875 11.6605 16.875 10.625C16.875 9.58947 16.0355 8.75 15 8.75C13.9645 8.75 13.125 9.58947 13.125 10.625C13.125 11.6605 13.9645 12.5 15 12.5Z" fill="#FBFBFB"/>
            <path d="M5 12.5C6.03553 12.5 6.875 11.6605 6.875 10.625C6.875 9.58947 6.03553 8.75 5 8.75C3.96447 8.75 3.125 9.58947 3.125 10.625C3.125 11.6605 3.96447 12.5 5 12.5Z" fill="#FBFBFB"/>
            <path d="M18.3334 15.4167V16.25C18.3334 16.9417 17.775 17.5 17.0834 17.5H14.5834V16.25C14.5834 14.9208 13.9584 13.7375 12.9875 12.975C13.4459 12.675 13.9917 12.5 14.5834 12.5H15.4167C17.0292 12.5 18.3334 13.8042 18.3334 15.4167Z" fill="#FBFBFB"/>
            <path d="M10 12.9166C11.2657 12.9166 12.2917 11.8906 12.2917 10.625C12.2917 9.35933 11.2657 8.33331 10 8.33331C8.73439 8.33331 7.70837 9.35933 7.70837 10.625C7.70837 11.8906 8.73439 12.9166 10 12.9166Z" fill="#FBFBFB"/>
            <path d="M10.4167 12.9167H9.58333C7.74542 12.9167 6.25 14.4121 6.25 16.25V17.5C6.25 18.1892 6.81083 18.75 7.5 18.75H12.5C13.1892 18.75 13.75 18.1892 13.75 17.5V16.25C13.75 14.4121 12.2546 12.9167 10.4167 12.9167Z" fill="#FBFBFB"/>
            <path d="M16.0416 6.95167L15.0362 7.30917C14.7508 7.41042 14.4529 7.19417 14.4612 6.89125L14.4904 5.82458L13.8395 4.97875C13.6549 4.73875 13.7687 4.38833 14.0591 4.3025L15.0829 4.00083L15.6862 3.12042C15.8574 2.87083 16.2258 2.87083 16.397 3.12042L17.0004 4.00083L18.0241 4.3025C18.3145 4.38792 18.4283 4.73875 18.2437 4.97875L17.5929 5.82458L17.622 6.89125C17.6304 7.19375 17.332 7.41042 17.047 7.30917L16.0416 6.95167Z" fill="#FBFBFB"/>
            <path d="M3.95836 6.95167L2.95294 7.30917C2.66752 7.41042 2.36961 7.19417 2.37794 6.89125L2.40711 5.82458L1.75627 4.97875C1.57169 4.73875 1.68544 4.38833 1.97586 4.3025L2.99961 4.00083L3.60294 3.12042C3.77419 2.87083 4.14252 2.87083 4.31377 3.12042L4.91711 4.00083L5.94086 4.3025C6.23127 4.38792 6.34502 4.73875 6.16044 4.97875L5.50961 5.82458L5.53877 6.89125C5.54711 7.19375 5.24877 7.41042 4.96377 7.30917L3.95836 6.95167Z" fill="#FBFBFB"/>
            <path d="M9.99998 6.01414L8.8079 6.43789C8.46957 6.55831 8.11623 6.30122 8.12623 5.94247L8.16082 4.67789L7.38915 3.67497C7.1704 3.39039 7.3054 2.97497 7.64957 2.8733L8.86332 2.51539L9.57873 1.47164C9.78165 1.17539 10.2187 1.17539 10.4216 1.47164L11.1371 2.51539L12.3508 2.8733C12.695 2.97497 12.83 3.39039 12.6112 3.67497L11.8396 4.67789L11.8741 5.94247C11.8841 6.30122 11.5304 6.55831 11.1925 6.43789L9.99998 6.01414Z" fill="#FBFBFB"/>
          </svg>
        </div>
        <h3 className="text-white text-xl md:text-2xl font-medium">{t('trust.experience.title')}</h3>
      </div>
      <div className="mb-3 flex items-baseline justify-left gap-1">
        <span className="font-bold text-4xl md:text-5xl lg:text-6xl text-white">{t('trust.experience.value')}</span>
        <span className="font-bold text-4xl md:text-5xl lg:text-6xl text-primary-green">+</span>
      </div>
      <p className="text-black-200 text-left">{t('trust.experience.description')}</p>

      {/* Right border - hidden on mobile, visible on md+ except for last item */}
      <div className="hidden md:block absolute right-0 top-0 h-full w-px bg-gray-600"></div>
    </div>

    {/* Served */}
    <div className="text-left relative">
      <div className="flex items-center justify-left gap-3 mb-5">
        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
          <svg className="w-5 h-5" viewBox="0 0 21 20" fill="none">
            <g clipPath="url(#clip0_41_683)">
              <path d="M10.3572 9.63406C11.6808 9.63406 12.8269 9.15936 13.7633 8.22278C14.6997 7.28635 15.1744 6.14057 15.1744 4.81688C15.1744 3.49364 14.6997 2.34771 13.7632 1.41097C12.8266 0.474699 11.6806 0 10.3572 0C9.03354 0 7.88776 0.474699 6.95132 1.41113C6.01489 2.34756 5.54004 3.49349 5.54004 4.81688C5.54004 6.14057 6.01489 7.2865 6.95148 8.22293C7.88806 9.1592 9.034 9.63406 10.3572 9.63406Z" fill="#FBFBFB"/>
              <path d="M18.7863 15.379C18.7593 14.9893 18.7047 14.5642 18.6242 14.1152C18.5431 13.663 18.4385 13.2354 18.3134 12.8447C18.1842 12.4408 18.0084 12.0419 17.7911 11.6597C17.5656 11.2629 17.3007 10.9175 17.0034 10.6332C16.6926 10.3358 16.3121 10.0967 15.872 9.9223C15.4335 9.74881 14.9475 9.66092 14.4276 9.66092C14.2234 9.66092 14.026 9.74469 13.6447 9.99295C13.41 10.146 13.1355 10.323 12.8291 10.5188C12.5671 10.6857 12.2122 10.8421 11.7738 10.9837C11.3461 11.1221 10.9118 11.1923 10.4832 11.1923C10.0546 11.1923 9.62048 11.1221 9.19232 10.9837C8.75439 10.8422 8.39948 10.6858 8.13779 10.5189C7.83429 10.325 7.55963 10.148 7.32144 9.9928C6.94058 9.74454 6.74298 9.66077 6.53882 9.66077C6.0188 9.66077 5.53296 9.74881 5.09457 9.92245C4.65482 10.0966 4.27411 10.3357 3.96298 10.6334C3.66589 10.9178 3.40085 11.2631 3.17563 11.6597C2.9585 12.0419 2.78271 12.4406 2.65332 12.8448C2.52835 13.2356 2.42383 13.663 2.34265 14.1152C2.26224 14.5635 2.20761 14.9888 2.1806 15.3794C2.15405 15.7621 2.14062 16.1593 2.14062 16.5605C2.14062 17.6045 2.4725 18.4496 3.12695 19.073C3.77332 19.688 4.62857 20.0001 5.66861 20.0001H15.2987C16.3388 20.0001 17.1937 19.6882 17.8402 19.073C18.4948 18.4501 18.8267 17.6048 18.8267 16.5603C18.8266 16.1573 18.813 15.7598 18.7863 15.379Z" fill="#FBFBFB"/>
            </g>
            <defs>
              <clipPath id="clip0_41_683">
                <rect width="20" height="20" fill="white" transform="translate(0.5)"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <h3 className="text-white text-xl md:text-2xl font-medium">{t('trust.served.title')}</h3>
      </div>
      <div className="mb-3 flex items-baseline justify-left gap-1">
        <span className="font-bold text-4xl md:text-5xl lg:text-6xl text-white">{t('trust.served.value')}</span>
        <span className="font-bold text-4xl md:text-5xl lg:text-6xl text-primary-green">+</span>
      </div>
      <p className="text-black-200">{t('trust.served.description')}</p>

      {/* Right border - hidden on mobile, visible on md+ except for last item */}
      <div className="hidden md:block absolute right-0 top-0 h-full w-px bg-gray-600"></div>
    </div>

    {/* Items - No border on the last item */}
    <div className="text-left">
      <div className="flex items-center justify-left gap-3 mb-5">
        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
          <svg className="w-5 h-5" viewBox="0 0 21 20" fill="none">
            <g clipPath="url(#clip0_41_695)">
              <path d="M10.5 0.208313C5.09165 0.208313 0.708313 4.59165 0.708313 9.99998C0.708313 15.4083 5.09165 19.7916 10.5 19.7916C15.9083 19.7916 20.2916 15.4083 20.2916 9.99998C20.2916 4.59165 15.9083 0.208313 10.5 0.208313ZM6.67081 6.80831C7.91248 6.80831 8.92081 7.81665 8.92081 9.05831H8.29581C8.29581 8.16248 7.56665 7.43331 6.67081 7.43331C5.77498 7.43331 5.04581 8.16248 5.04581 9.05831H4.42081C4.42081 7.82081 5.42915 6.80831 6.67081 6.80831ZM10.5 16.7125C8.12081 16.7125 5.94998 15.3291 4.96665 13.1916L5.53331 12.9291C6.41665 14.8458 8.36248 16.0875 10.5 16.0875C12.6375 16.0875 14.5833 14.8458 15.4666 12.9291L16.0333 13.1916C15.05 15.3291 12.8791 16.7125 10.5 16.7125ZM15.95 9.05831C15.95 8.16248 15.2208 7.43331 14.325 7.43331C13.4291 7.43331 12.7 8.16248 12.7 9.05831H12.075C12.075 7.81665 13.0833 6.80831 14.325 6.80831C15.5666 6.80831 16.575 7.81665 16.575 9.05831H15.95Z" fill="#FBFBFB"/>
            </g>
            <defs>
              <clipPath id="clip0_41_695">
                <rect width="20" height="20" fill="white" transform="translate(0.5)"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <h3 className="text-white text-xl md:text-2xl font-medium">{t('trust.items.title')}</h3>
      </div>
      <div className="mb-3 flex items-baseline justify-left gap-1">
        <span className="font-bold text-4xl md:text-5xl lg:text-6xl text-white">{t('trust.items.value')}</span>
        <span className="font-bold text-4xl md:text-5xl lg:text-6xl text-primary-green">+</span>
      </div>
      <p className="text-black-200">{t('trust.items.description')}</p>
    </div>
  </div>
</section>

    </>

);
}
