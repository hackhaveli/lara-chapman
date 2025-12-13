import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "Lara's expertise is unmatched. She helped us navigate a competitive market and secure our dream home in Gilbert. Her staging advice for our previous home resulted in multiple offers and a sale price $25K above asking. We couldn't be happier!",
      name: "Sarah & Mike Johnson",
      location: "Gilbert, AZ • Bought & Sold",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150"
    },
    {
      quote: "As real estate investors, we've worked with many agents, but Lara stands out. Her investment knowledge helped us identify undervalued properties in Mesa, and her staging expertise maximized our rental income. She's our go-to for all future deals.",
      name: "David Rodriguez",
      location: "Mesa, AZ • Investment Portfolio",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150"
    },
    {
      quote: "Selling our North Scottsdale home was seamless with Lara. Her professional photography, strategic pricing, and staging consultation resulted in a sale within 10 days at full asking price. Her attention to detail is extraordinary.",
      name: "Jennifer Chen",
      location: "North Scottsdale, AZ • Luxury Sale",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150"
    },
    {
      quote: "As first-time buyers, we were overwhelmed by the process. Lara educated us every step of the way, helped us understand the market, and negotiated an amazing deal on our Chandler home. She made our dream of homeownership a reality.",
      name: "Alex & Maria Garcia",
      location: "Chandler, AZ • First-Time Buyers",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150"
    },
    {
      quote: "Lara's market knowledge is incredible. She predicted market trends that saved us thousands and helped us time our purchase perfectly. Her staging business transformed our old home into a showpiece that sold in days.",
      name: "Robert & Linda Thompson",
      location: "Phoenix, AZ • Move-Up Buyers",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150"
    },
    {
      quote: "Working with Lara felt like having a trusted friend in the industry. Her honesty, integrity, and dedication to our success made all the difference. She goes above and beyond for every client.",
      name: "Michelle Davis",
      location: "Tempe, AZ • Luxury Condo Sale",
      image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2F4F4F] font-playfair">
            Client Success Stories
          </h2>
          <p className="text-lg text-[#2F4F4F]/70 mt-4 font-inter">
            Real results from real clients across the Phoenix Valley
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gradient-to-br from-[#FAF8F5] to-white p-8 md:p-12 rounded-2xl shadow-xl h-full border border-[#2F4F4F]/5">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#E67E22] text-[#E67E22]" />
                      ))}
                    </div>
                    
                    <blockquote className="text-[#2F4F4F]/80 text-lg md:text-xl leading-relaxed mb-8 font-inter italic">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-[#E67E22]/20"
                      />
                      <div>
                        <div className="font-bold text-[#2F4F4F] text-lg font-playfair">
                          {testimonial.name}
                        </div>
                        <div className="text-[#E67E22] font-medium font-inter">
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white shadow-xl rounded-full p-4 hover:bg-[#E67E22] hover:text-white transition-all duration-200 z-10 border border-[#2F4F4F]/10"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white shadow-xl rounded-full p-4 hover:bg-[#E67E22] hover:text-white transition-all duration-200 z-10 border border-[#2F4F4F]/10"
          >
            <ChevronRight size={24} />
          </button>

          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 hover:scale-125 ${
                  currentIndex === index ? 'bg-[#E67E22] scale-125' : 'bg-[#2F4F4F]/20 hover:bg-[#2F4F4F]/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;