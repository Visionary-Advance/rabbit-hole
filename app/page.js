import Image from "next/image";

export default function Home() {
  const menuItems = [
    {
      id: 1,
      name: "Brown Sugar Milk Tea",
      description: "A creamy milk tea infused with rich, caramelized brown sugar",
      price: "$6.00"
    },
    {
      id: 2,
      name: "Brown Sugar Milk Tea",
      description: "A creamy milk tea infused with rich, caramelized brown sugar",
      price: "$6.00"
    },
    {
      id: 3,
      name: "Brown Sugar Milk Tea",
      description: "A creamy milk tea infused with rich, caramelized brown sugar",
      price: "$6.00"
    },
    {
      id: 4,
      name: "Brown Sugar Milk Tea",
      description: "A creamy milk tea infused with rich, caramelized brown sugar",
      price: "$6.00"
    },
    {
      id: 5,
      name: "Brown Sugar Milk Tea",
      description: "A creamy milk tea infused with rich, caramelized brown sugar",
      price: "$6.00"
    },
    {
      id: 6,
      name: "Brown Sugar Milk Tea",
      description: "A creamy milk tea infused with rich, caramelized brown sugar",
      price: "$6.00"
    },
    {
      id: 7,
      name: "Brown Sugar Milk Tea",
      description: "A creamy milk tea infused with rich, caramelized brown sugar",
      price: "$6.00"
    },
    {
      id: 8,
      name: "Brown Sugar Milk Tea",
      description: "A creamy milk tea infused with rich, caramelized brown sugar",
      price: "$6.00"
    },
    {
      id: 9,
      name: "Brown Sugar Milk Tea",
      description: "A creamy milk tea infused with rich, caramelized brown sugar",
      price: "$6.00"
    },
    {
      id: 10,
      name: "Brown Sugar Milk Tea",
      description: "A creamy milk tea infused with rich, caramelized brown sugar",
      price: "$6.00"
    }
  ];

  const categories = ["All Tea", "Milk Teas", "Fruit Teas", "Signature Drinks", "Iced Teas"];

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
            <div className="flex items-center gap-1">
              <span className="text-black-900 font-medium text-sm">Cart</span>
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.2046 4.594C13.1666 3.97933 12.6566 3.5 12.0406 3.5C10.3413 3.5 5.65864 3.5 3.95931 3.5C3.34331 3.5 2.83331 3.97933 2.79531 4.594C2.67864 6.45667 2.33464 11.9607 2.21198 13.9273C2.19198 14.2487 2.30531 14.564 2.52598 14.7987C2.74664 15.0333 3.05398 15.1667 3.37598 15.1667H12.624C12.946 15.1667 13.2533 15.0333 13.474 14.7987C13.6946 14.564 13.808 14.2487 13.788 13.9273L13.2046 4.594ZM12.2066 4.656L12.79 13.9893C12.7926 14.0353 12.7766 14.0807 12.7453 14.114C12.714 14.1473 12.67 14.1667 12.624 14.1667H3.37598C3.32998 14.1667 3.28598 14.1473 3.25464 14.114C3.22331 14.0807 3.20731 14.0353 3.20998 13.9893L3.79331 4.656C3.79864 4.56867 3.87131 4.5 3.95931 4.5H12.0406C12.1286 4.5 12.2013 4.56867 12.2066 4.656Z" fill="#171B26"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M5 4.5H11L11.0213 4.498C11.1173 4.486 11.5 4.41267 11.5 4C11.5 2.25133 10.082 0.833332 8.33333 0.833332C8.112 0.833332 7.888 0.833332 7.66667 0.833332C5.918 0.833332 4.5 2.25133 4.5 4C4.5 4.13267 4.55267 4.26 4.64667 4.35333C4.74 4.44733 4.86733 4.5 5 4.5ZM10.442 3.5H5.558C5.78333 2.54467 6.642 1.83333 7.66667 1.83333H8.33333C9.358 1.83333 10.2167 2.54467 10.442 3.5Z" fill="#171B26"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M7.5 7.33333V11.3333C7.5 11.6093 7.724 11.8333 8 11.8333C8.276 11.8333 8.5 11.6093 8.5 11.3333V7.33333C8.5 7.05733 8.276 6.83333 8 6.83333C7.724 6.83333 7.5 7.05733 7.5 7.33333Z" fill="#171B26"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M6 9.83333H10C10.276 9.83333 10.5 9.60933 10.5 9.33333C10.5 9.05733 10.276 8.83333 10 8.83333H6C5.724 8.83333 5.5 9.05733 5.5 9.33333C5.5 9.60933 5.724 9.83333 6 9.83333Z" fill="#171B26"/>
              </svg>
              <span className="text-black-400">(0)</span>
            </div>
            <button className="bg-primary-green text-black-900 h-10 px-4 rounded-full font-medium text-sm hover:bg-opacity-90 transition-colors">
              Contact Us
            </button>
          </div>
        </nav>

        {/* Hero Background Image */}
        <div className="absolute w-11/12 left-1/2 -translate-x-1/2 inset-0 z-0">
          <Image
            src="https://api.builder.io/api/v1/image/assets/TEMP/51af8464867a420b04c85c9ef60d048c9ef62263?width=2720"
            alt="Bubble tea background"
            fill
            className="object-cover rounded-3xl md:rounded-[2rem]"
            style={{ objectPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 rounded-b-3xl md:rounded-b-[2rem]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex items-center px-6 md:px-16 lg:px-32 xl:px-36 pt-12 pb-20">
          <div className="max-w-xl">
            <div className="relative mb-6 h-80">
              {/* Main title - first two lines */}
              <h1 className="font-quicksand font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight text-white">
                Eugene's<br />
                Bubble Tea
              </h1>
              
              {/* "Spot" positioned absolutely - this is how drag-and-drop builders work */}
              <div className="absolute font-quicksand font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white" 
                   style={{ 
                     top: '140px', 
                     left: '280px',
                     transform: 'translateX(-50%) translateY(-50%)' 
                   }}>
                Spot
              </div>
              
              {/* Decorative Images - positioned absolutely like drag-and-drop */}
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/b6056ef1192c4329a92fc3365e4a81f7345cf294?width=224"
                alt="Person enjoying bubble tea"
                width={112}
                height={63}
                className="absolute rounded-full border-2 border-primary-green w-20 h-12 md:w-28 md:h-16 object-cover"
                style={{ 
                  top: '180px', 
                  left: '140px' 
                }}
              />
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/7d659ad0ab2d623fcb16c0d3a2a9b548b47a7652?width=248"
                alt="Person with bubble tea"
                width={124}
                height={71}
                className="absolute rounded-full border-2 border-primary-green w-24 h-16 md:w-32 md:h-20 object-cover"
                style={{ 
                  top: '60px', 
                  right: '100px' 
                }}
              />
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/f7956ba55688d67d0ea53b3256995107fcd577be?width=212"
                alt="Bubble tea decoration"
                width={106}
                height={106}
                className="absolute w-20 h-20 md:w-24 md:h-24"
                style={{ 
                  top: '200px', 
                  right: '50px' 
                }}
              />
            </div>
            
            <p className="text-white text-lg md:text-xl lg:text-2xl mb-10 max-w-md">
              Freshly brewed. Made with love.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
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
      <section className="py-12 md:py-16 px-6 md:px-16 lg:px-32 xl:px-36 bg-black">
        <div className="text-center mb-12">
          <h2 className="font-quicksand font-bold text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight max-w-lg mx-auto">
            Explore our number-one Bubble Tea picks and favorites.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Experience */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-5">
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
              <h3 className="text-white text-xl md:text-2xl font-medium">Experience</h3>
            </div>
            <div className="mb-3 flex items-baseline gap-1">
              <span className="font-bold text-4xl md:text-5xl lg:text-6xl text-white">8 Years</span>
              <span className="font-bold text-4xl md:text-5xl lg:text-6xl text-primary-green">+</span>
            </div>
            <p className="text-black-200">Experience We Have In this Field</p>
          </div>

          <div className="hidden md:block w-px bg-black-300 mx-auto"></div>

          {/* Served */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-5">
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
              <h3 className="text-white text-xl md:text-2xl font-medium">Served</h3>
            </div>
            <div className="mb-3 flex items-baseline gap-1">
              <span className="font-bold text-4xl md:text-5xl lg:text-6xl text-white">21k</span>
              <span className="font-bold text-4xl md:text-5xl lg:text-6xl text-primary-green">+</span>
            </div>
            <p className="text-black-200">Happy Customers we have served</p>
          </div>

          <div className="hidden md:block w-px bg-black-300 mx-auto"></div>

          {/* Items */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-5">
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
              <h3 className="text-white text-xl md:text-2xl font-medium">Item</h3>
            </div>
            <div className="mb-3 flex items-baseline gap-1">
              <span className="font-bold text-4xl md:text-5xl lg:text-6xl text-white">30</span>
              <span className="font-bold text-4xl md:text-5xl lg:text-6xl text-primary-green">+</span>
            </div>
            <p className="text-black-200">Specialty Bubble Tea Offered</p>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-12 md:py-16 px-6 md:px-16 lg:px-32 xl:px-36 bg-black">
        <div className="max-w-6xl mx-auto">
          {/* Menu Header */}
          <div className="text-center mb-8">
            <h2 className="font-quicksand font-bold text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4">
              Our Menu
            </h2>
            <p className="text-black-500 max-w-md mx-auto">
              Something for everyone. Milk teas, fruit teas, toppings & more.
            </p>
          </div>

          {/* Menu Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-secondary text-black-900'
                    : 'bg-black-200 text-black-900 hover:bg-secondary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl p-5 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-black text-lg md:text-xl mb-2">
                      {item.name}
                    </h3>
                    <p className="text-black text-sm md:text-base leading-relaxed pr-4">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-primary-green font-bold text-lg md:text-xl">
                    {item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3">
            <div className="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center">
              <span className="text-black-900 font-medium text-lg">1</span>
            </div>
            <div className="w-12 h-12 border border-secondary bg-white rounded-full flex items-center justify-center">
              <span className="text-black-400 font-medium text-lg">2</span>
            </div>
            <div className="w-12 h-12 border border-secondary bg-white rounded-full flex items-center justify-center">
              <span className="text-black-400 font-medium text-lg">3</span>
            </div>
            <button className="w-12 h-12 bg-primary-green border border-primary-green rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M11.293 17.293L12.707 18.707L19.414 12L12.707 5.29297L11.293 6.70697L15.586 11H6V13H15.586L11.293 17.293Z" fill="#171B26"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
