import Image from "next/image";



export default function AboutUs(){




    return(


            <>
            
            
              <section id="about" className="relative px-6 bg-[#FFFAF4] w-full overflow-hidden">
  <div className="max-w-7xl mx-auto py-10 relative">
          <div className="flex flex-col mx-auto lg:flex-row items-center gap-12 ">
            {/* Left Column - Title and Tea Group */}
            <div className="relative flex-1 lg:max-w-xl">
              {/* Title positioned above the tea image */}
              <div className="mb-8 lg:mb-12">
                <h2 className="font-quicksand text-black font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
                  Brewed with Heart. Served with Joy.
                </h2>
              </div>

              {/* Tea Group Image */}
              <div className="relative flex justify-end lg:justify-start">
                <Image
                  src="/Img/Tea_Group.jpg"
                  alt="Variety of bubble tea drinks"
                  width={473}
                  height={540}
                  className="w-full max-w-md rounded-3xl object-cover"
                />
              </div>
            </div>

            {/* Right Column - People Image and Text */}
            <div className="flex-1 lg:max-w-lg space-y-8">
              {/* People Image */}
              <div className="relative">
                <Image
                  src="https://api.builder.io/api/v1/image/assets/TEMP/9ab0fe326b87670e3e858f0fdd2b4ff9a82b7bc6?width=1060"
                  alt="Young women enjoying bubble tea"
                  width={530}
                  height={367}
                  className="w-full rounded-3xl object-cover"
                />
              </div>

              {/* Text Content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-black text-base leading-relaxed">
                    We started our bubble tea journey with a simple mission: bring people together over drinks that are full of flavor, fun, and freshness.
                  </p>
                  <p className="text-black text-base leading-relaxed">
                    At our shop, every cup is handcrafted using premium teas, real ingredients, and a whole lot of love. Whether you&apos;re craving the creamy richness of a classic milk tea, the zing of fruity infusions, or the chewy perfection of boba.
                  </p>
                </div>

               
              </div>
            </div>
          </div>

        </div>
          {/* Decorative Coffee Bean Pattern Elements */}
          <div className="absolute bottom-4 right-4 w-44 h-44 opacity-60 hidden lg:block pointer-events-none">
            <svg width="178" height="171" viewBox="0 0 337 171" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M0 61H327.669V128.119V171H0V61Z" fill="url(#pattern0_41_730)"/>
              <path d="M418.178 0H162V52.4746V86H260.5V0H418.178Z" fill="url(#pattern1_41_730)"/>
              <defs>
                <pattern id="pattern0_41_730" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlinkHref="#image0_41_730" transform="matrix(0.000696686 0 0 0.0020753 -0.0184922 -6.69921)"/>
                </pattern>
                <pattern id="pattern1_41_730" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlinkHref="#image0_41_730" transform="matrix(0.000696686 0 0 0.0020753 -0.0184922 -6.69921)"/>
                </pattern>
              </defs>
            </svg>
          </div>

          {/* Coffee Bean Decorative Image */}
          <div className="absolute top-1/5 right-0 w-36 h-16 opacity-70 hidden lg:block pointer-events-none transform rotate-[35deg]">
            <Image
              src="https://api.builder.io/api/v1/image/assets/TEMP/b9476a924000e22bb4f7d32546efe40cf5759cf3?width=296"
              alt="Coffee beans decoration"
              width={148}
              height={67}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Additional Coffee Bean Pattern Left Side */}
          <div className="absolute bottom-16 -left-8 w-72 h-52 opacity-50 hidden lg:block pointer-events-none">
            <svg width="189" height="208" viewBox="0 0 189 208" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M-97.3256 53.2093L188.07 0V208L-90.0698 191.07L-97.3256 159.628L-102.163 113.674V106.419L-97.3256 53.2093Z" fill="url(#pattern0_41_734)"/>
              <defs>
                <pattern id="pattern0_41_734" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlinkHref="#image0_41_734" transform="matrix(0.000735692 0 0 0.00104366 -0.737705 -1.30233)"/>
                </pattern>
              </defs>
            </svg>
          </div>
      </section>
            
            
            
            </>



    );
}