


export default function Reviews(){




    return(

        <>
        
        
        
         <section className="py-16 md:py-20 lg:py-24 px-6 md:px-16 lg:px-32 xl:px-36 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-16 mb-12 lg:mb-16">
            {/* Title */}
            <div className="flex-1">
              <h2 className="font-quicksand font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight max-w-lg">
                Our Customers Say It Best
              </h2>
            </div>

            {/* Divider - Hidden on mobile */}
            <div className="hidden lg:block w-px h-16 bg-black-300"></div>

            {/* Description */}
            <div className="flex-1 lg:max-w-xs">
              <p className="text-black-200 text-base leading-relaxed">
                From first sips to long-time favorites, here&apos;s what people are saying about their bubble tea moments with us.
              </p>
            </div>

            {/* Divider - Hidden on mobile */}
            <div className="hidden lg:block w-px h-16 bg-black-300"></div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4">
              <button className="flex items-center justify-center w-12 h-12 rounded-full border border-primary-green bg-white hover:bg-primary-green transition-colors group">
                <svg className="w-6 h-6 text-primary-green group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none">
                  <path d="M12.707 17.293L8.414 13H18V11H8.414L12.707 6.70697L11.293 5.29297L4.586 12L11.293 18.707L12.707 17.293Z" fill="currentColor"/>
                </svg>
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full border border-primary-green bg-primary-green hover:bg-primary-green/90 transition-colors">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                  <path d="M11.293 17.293L12.707 18.707L19.414 12L12.707 5.29297L11.293 6.70697L15.586 11H6V13H15.586L11.293 17.293Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Testimonial 1 */}
            <div className="flex flex-col gap-6 p-6 rounded-xl border border-black-200 bg-gray-50">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                      <path d="M9.0709 0.648363C9.41464 -0.216122 10.5854 -0.216121 10.9291 0.648365L12.9579 5.75071C13.1029 6.11516 13.4306 6.36417 13.8067 6.39571L19.0727 6.83732C19.9649 6.91215 20.3267 8.07684 19.6469 8.68594L15.6348 12.2809C15.3483 12.5378 15.223 12.9407 15.3106 13.3246L16.5364 18.6999C16.744 19.6106 15.7969 20.3305 15.033 19.8424L10.5246 16.9619C10.2025 16.7561 9.79752 16.7561 9.4755 16.9619L4.967 19.8424C4.20312 20.3305 3.25596 19.6106 3.46364 18.6999L4.68943 13.3246C4.77699 12.9407 4.65183 12.5378 4.36527 12.2809L0.353063 8.68594C-0.326719 8.07684 0.0350679 6.91215 0.927293 6.83732L6.19337 6.39571C6.56952 6.36417 6.89717 6.11516 7.04208 5.75071L9.0709 0.648363Z" fill="#FF9D00"/>
                    </svg>
                  ))}
                </div>
                <span className="text-black-500 text-sm">(4.5)</span>
              </div>

              {/* Quote */}
              <blockquote className="text-black-500 text-base leading-relaxed flex-1">
                &quot;The staff is super friendly and the vibe inside is so cute. Plus, their seasonal drinks are always on point.&quot;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-green to-secondary flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">JC</span>
                </div>
                <div>
                  <div className="font-semibold text-black-900 text-lg">Jane Cooper</div>
                  <div className="text-black-500 text-sm">CA, Canada</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="flex flex-col gap-6 p-6 rounded-xl border border-black-200 bg-gray-50">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                      <path d="M9.0709 0.648363C9.41464 -0.216122 10.5854 -0.216121 10.9291 0.648365L12.9579 5.75071C13.1029 6.11516 13.4306 6.36417 13.8067 6.39571L19.0727 6.83732C19.9649 6.91215 20.3267 8.07684 19.6469 8.68594L15.6348 12.2809C15.3483 12.5378 15.223 12.9407 15.3106 13.3246L16.5364 18.6999C16.744 19.6106 15.7969 20.3305 15.033 19.8424L10.5246 16.9619C10.2025 16.7561 9.79752 16.7561 9.4755 16.9619L4.967 19.8424C4.20312 20.3305 3.25596 19.6106 3.46364 18.6999L4.68943 13.3246C4.77699 12.9407 4.65183 12.5378 4.36527 12.2809L0.353063 8.68594C-0.326719 8.07684 0.0350679 6.91215 0.927293 6.83732L6.19337 6.39571C6.56952 6.36417 6.89717 6.11516 7.04208 5.75071L9.0709 0.648363Z" fill="#FF9D00"/>
                    </svg>
                  ))}
                </div>
                <span className="text-black-500 text-sm">(4.5)</span>
              </div>

              {/* Quote */}
              <blockquote className="text-black-500 text-base leading-relaxed flex-1">
                &quot;I love that they offer dairy-free options. The coconut matcha is my go-to every time!&quot;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-primary-green flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">AL</span>
                </div>
                <div>
                  <div className="font-semibold text-black-900 text-lg">Ariana L.</div>
                  <div className="text-black-500 text-sm">CA, Canada</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="flex flex-col gap-6 p-6 rounded-xl border border-black-200 bg-gray-50">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                      <path d="M9.0709 0.648363C9.41464 -0.216122 10.5854 -0.216121 10.9291 0.648365L12.9579 5.75071C13.1029 6.11516 13.4306 6.36417 13.8067 6.39571L19.0727 6.83732C19.9649 6.91215 20.3267 8.07684 19.6469 8.68594L15.6348 12.2809C15.3483 12.5378 15.223 12.9407 15.3106 13.3246L16.5364 18.6999C16.744 19.6106 15.7969 20.3305 15.033 19.8424L10.5246 16.9619C10.2025 16.7561 9.79752 16.7561 9.4755 16.9619L4.967 19.8424C4.20312 20.3305 3.25596 19.6106 3.46364 18.6999L4.68943 13.3246C4.77699 12.9407 4.65183 12.5378 4.36527 12.2809L0.353063 8.68594C-0.326719 8.07684 0.0350679 6.91215 0.927293 6.83732L6.19337 6.39571C6.56952 6.36417 6.89717 6.11516 7.04208 5.75071L9.0709 0.648363Z" fill="#FF9D00"/>
                    </svg>
                  ))}
                </div>
                <span className="text-black-500 text-sm">(4.5)</span>
              </div>

              {/* Quote */}
              <blockquote className="text-black-500 text-base leading-relaxed flex-1">
                &quot;I ordered online and my drink was ready within minutes. Super smooth experience and delicious every time!&quot;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-green/80 to-secondary/80 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">DC</span>
                </div>
                <div>
                  <div className="font-semibold text-black-900 text-lg">Derek C.</div>
                  <div className="text-black-500 text-sm">CA, Canada</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        
        
        </>



    );
}