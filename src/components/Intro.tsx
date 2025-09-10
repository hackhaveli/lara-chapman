import React, { useEffect, useRef, useState } from 'react';

const Intro = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={ref}
          className={`bg-white p-8 md:p-12 rounded-2xl shadow-lg transform transition-all duration-800 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2F4F4F] mb-8 font-playfair">
              Your Phoenix Valley Expert
            </h2>
            
            <p className="text-lg md:text-xl text-[#2F4F4F]/80 leading-relaxed font-inter">
              I'm Lara Chapman — a native Phoenician and Realtor® with Bliss Realty. 
              Along with years of experience as a real estate investor and home stager, 
              I bring local insight and practical know-how to help clients buy and sell 
              with confidence throughout the Phoenix Valley.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E67E22] font-playfair">Native</div>
                <div className="text-[#2F4F4F]/70 font-inter">Phoenician</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E67E22] font-playfair">Licensed</div>
                <div className="text-[#2F4F4F]/70 font-inter">Realtor®</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E67E22] font-playfair">Expert</div>
                <div className="text-[#2F4F4F]/70 font-inter">Staging & Investment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;