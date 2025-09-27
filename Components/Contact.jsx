import Image from "next/image";
import ContactForm from "./ContactForm";


export default function Contact(){





    return(


        <>
        
        
        
      {/* Contact & Location Section */}
      <section className="py-5 md:py-5 lg:py-5 px-6 md:px-16 lg:px-32 xl:px-36 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-quicksand font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
              Find or Message Us
            </h2>
            <p className="text-black-200 text-base leading-relaxed max-w-lg mx-auto">
              Something for everyone. Milk teas, fruit teas, toppings & more.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-16">
            {/* Phone */}
            <div className="flex flex-col gap-6 p-6 rounded-3xl bg-secondary">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-cream flex items-center justify-center">
                  <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                    <path d="M25.7189 20.44C24.9541 19.7986 20.4689 16.9584 19.7234 17.0888C19.3734 17.1509 19.1056 17.4493 18.389 18.3041C18.0576 18.7249 17.6936 19.119 17.3005 19.4827C16.5802 19.3088 15.8829 19.0503 15.2233 18.7127C12.6361 17.4532 10.5461 15.3625 9.28725 12.775C8.94971 12.1153 8.69125 11.4181 8.51725 10.6978C8.88101 10.3046 9.2751 9.94066 9.69588 9.60925C10.5499 8.89263 10.8491 8.62662 10.9113 8.27487C11.0416 7.52762 8.19875 3.04413 7.56 2.27938C7.29225 1.96263 7.049 1.75 6.7375 1.75C5.8345 1.75 1.75 6.8005 1.75 7.455C1.75 7.50838 1.8375 12.7663 8.47788 19.5221C15.2338 26.1625 20.4916 26.25 20.545 26.25C21.1995 26.25 26.25 22.1655 26.25 21.2625C26.25 20.951 26.0374 20.7078 25.7189 20.44Z" fill="#171B26"/>
                    <path d="M20.125 13.125H21.875C21.8729 11.2691 21.1347 9.48986 19.8224 8.17755C18.5101 6.86525 16.7309 6.12708 14.875 6.125V7.875C16.267 7.87639 17.6015 8.42996 18.5858 9.41422C19.57 10.3985 20.1236 11.733 20.125 13.125Z" fill="#171B26"/>
                    <path d="M24.5 13.125H26.25C26.2465 10.1092 25.047 7.21797 22.9145 5.0855C20.782 2.95302 17.8908 1.75347 14.875 1.75V3.5C17.4268 3.50301 19.8732 4.51804 21.6776 6.32242C23.482 8.12681 24.497 10.5732 24.5 13.125Z" fill="#171B26"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-black-900 text-2xl md:text-3xl lg:text-4xl">Phone</h3>
              </div>
              <p className="text-black-700 text-lg md:text-xl lg:text-2xl font-medium">
                (541) 654-0425
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-6 p-6 rounded-3xl bg-secondary">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-cream flex items-center justify-center">
                  <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                    <g clipPath="url(#clip0_email)">
                      <path d="M18.1429 15.1621L15.7978 17.5151C14.8469 18.4694 13.1736 18.49 12.2021 17.5151L9.85695 15.1621L1.4342 23.6122C1.74773 23.7572 2.09341 23.8437 2.46091 23.8437H25.539C25.9065 23.8437 26.2521 23.7573 26.5655 23.6123L18.1429 15.1621Z" fill="#171B26"/>
                      <path d="M25.539 4.15625H2.46092C2.09342 4.15625 1.74774 4.24277 1.43433 4.38774L10.4346 13.4179C10.4352 13.4185 10.4359 13.4186 10.4365 13.4192C10.4371 13.4198 10.4373 13.4206 10.4373 13.4206L13.3637 16.3568C13.6746 16.6677 14.3255 16.6677 14.6363 16.3568L17.5622 13.4211C17.5622 13.4211 17.5629 13.4198 17.5635 13.4192C17.5635 13.4192 17.5648 13.4185 17.5654 13.4179L26.5655 4.38769C26.2521 4.24266 25.9065 4.15625 25.539 4.15625Z" fill="#171B26"/>
                      <path d="M0.261734 5.53516C0.0995312 5.86317 0 6.22728 0 6.61731V21.3829C0 21.773 0.0994219 22.1371 0.26168 22.4651L8.69903 14.0004L0.261734 5.53516Z" fill="#171B26"/>
                      <path d="M27.7383 5.53516L19.301 14.0005L27.7383 22.4653C27.9005 22.1373 28 21.7732 28 21.383V6.61742C28 6.22728 27.9005 5.86317 27.7383 5.53516Z" fill="#171B26"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_email">
                        <rect width="28" height="28" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h3 className="font-semibold text-black-900 text-2xl md:text-3xl lg:text-4xl">Email</h3>
              </div>
              <p className="text-black-700 text-lg md:text-xl lg:text-2xl font-medium">
                TheRabbitHoletc@gmail.com
              </p>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-6 p-6 rounded-3xl bg-secondary">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-cream flex items-center justify-center">
                  <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                    <g clipPath="url(#clip0_location)">
                      <path d="M25.6117 19.6313C25.2145 19.4132 24.7159 19.5583 24.4978 19.9553C24.2797 20.3524 24.4247 20.8511 24.8218 21.0692C25.7989 21.6061 26.3594 22.2012 26.3594 22.702C26.3594 23.3145 25.4915 24.2639 23.0555 25.0915C20.649 25.9092 17.433 26.3594 14 26.3594C10.567 26.3594 7.35098 25.9092 4.94446 25.0915C2.50852 24.264 1.64062 23.3145 1.64062 22.702C1.64062 22.2012 2.20106 21.6061 3.17822 21.0692C3.5753 20.8511 3.72034 20.3523 3.50219 19.9553C3.28404 19.5582 2.78545 19.4131 2.38826 19.6313C1.29877 20.2298 0 21.2485 0 22.702C0 23.8162 0.766281 25.4048 4.41667 26.645C6.98873 27.5188 10.3922 28.0001 14 28.0001C17.6078 28.0001 21.0113 27.5188 23.5833 26.645C27.2337 25.4048 28 23.8162 28 22.702C28 21.2485 26.7012 20.2298 25.6117 19.6313Z" fill="#171B26"/>
                      <path d="M14 21.3628C14.7303 21.3628 15.3936 20.9907 15.7745 20.3674C18.4438 16.0002 21.6256 10.2446 21.6256 7.62557C21.6256 3.42081 18.2048 0 14 0C9.7952 0 6.37439 3.42081 6.37439 7.62557C6.37439 10.2446 9.55627 16.0002 12.2255 20.3674C12.6065 20.9907 13.2698 21.3628 14 21.3628ZM10.9349 7.10199C10.9349 5.41198 12.31 4.03703 14 4.03703C15.6901 4.03703 17.0651 5.41198 17.0651 7.10199C17.0651 8.79206 15.6901 10.167 14 10.167C12.31 10.167 10.9349 8.79211 10.9349 7.10199Z" fill="#171B26"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_location">
                        <rect width="28" height="28" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h3 className="font-semibold text-black-900 text-2xl md:text-3xl lg:text-4xl">Location</h3>
              </div>
              <p className="text-black-700 text-lg md:text-xl lg:text-2xl font-medium">
                240 E 17th Ave. Eugene, OR 97401
              </p>
            </div>

            {/* Opening Hours */}
            <div className="flex flex-col gap-6 p-6 rounded-3xl bg-secondary">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-cream flex items-center justify-center">
                  <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                    <path d="M22.1667 5.63225V3.5C22.7853 3.49938 23.3784 3.25335 23.8159 2.8159C24.2534 2.37845 24.4994 1.78532 24.5 1.16667V0.583333C24.5 0.506716 24.485 0.430842 24.4557 0.360049C24.4264 0.289255 24.3834 0.224932 24.3292 0.170755C24.2751 0.116579 24.2107 0.0736126 24.14 0.0443131C24.0692 0.0150136 23.9933 -4.43783e-05 23.9167 9.82396e-08H4.08333C4.00672 -4.43783e-05 3.93084 0.0150136 3.86005 0.0443131C3.78926 0.0736126 3.72493 0.116579 3.67076 0.170755C3.61658 0.224932 3.57361 0.289255 3.54431 0.360049C3.51501 0.430842 3.49996 0.506716 3.5 0.583333V1.16667C3.50062 1.78532 3.74665 2.37845 4.1841 2.8159C4.62155 3.25335 5.21468 3.49938 5.83333 3.5V5.63225C5.82739 6.75366 6.04458 7.86505 6.47226 8.90172C6.89993 9.93839 7.52955 10.8796 8.32446 11.6707L10.7131 14L8.32446 16.3293C7.52955 17.1204 6.89993 18.0616 6.47226 19.0983C6.04458 20.135 5.82739 21.2463 5.83333 22.3678V24.5C5.21468 24.5006 4.62155 24.7466 4.1841 25.1841C3.74665 25.6215 3.50062 26.2147 3.5 26.8333V27.4167C3.49996 27.4933 3.51501 27.5692 3.54431 27.64C3.57361 27.7107 3.61658 27.7751 3.67076 27.8292C3.72493 27.8834 3.78926 27.9264 3.86005 27.9557C3.93084 27.985 4.00672 28 4.08333 28H23.9167C23.9933 28 24.0692 27.985 24.14 27.9557C24.2107 27.9264 24.2751 27.8834 24.3292 27.8292C24.3834 27.7751 24.4264 27.7107 24.4557 27.64C24.485 27.5692 24.5 27.4933 24.5 27.4167V26.8333C24.4994 26.2147 24.2534 25.6215 23.8159 25.1841C23.3784 24.7466 22.7853 24.5006 22.1667 24.5V22.3678C22.1726 21.2463 21.9554 20.135 21.5277 19.0983C21.1001 18.0616 20.4704 17.1204 19.6755 16.3293L17.2869 14L19.6755 11.6707C20.4704 10.8796 21.1001 9.93839 21.5277 8.90172C21.9554 7.86505 22.1726 6.75366 22.1667 5.63225Z" fill="#171B26"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-black-900 text-2xl md:text-3xl lg:text-4xl">Opening Hours</h3>
              </div>
              <p className="text-black-700 text-lg md:text-xl lg:text-2xl font-medium">
                Monday - Friday: 7:00 AM - 8:00 PM
              </p>
            </div>
          </div>

          {/* Map and Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Map */}
            <div className="relative rounded-3xl overflow-hidden bg-gray-200 h-96 lg:h-[546px]">
            <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41526.22502070711!2d-123.16675077936897!3d44.042091058677215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54c11e46bca78d15%3A0x787f6b638d96e2b!2sThe%20Rabbit%20Hole!5e1!3m2!1sen!2sus!4v1758944642724!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg shadow-lg"
      />
              {/* Map Controls */}
         

              
            </div>
<ContactForm />
          </div>
        </div>
      </section>
        
        
        
        </>


    );
}