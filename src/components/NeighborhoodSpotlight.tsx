import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, DollarSign, Users, GraduationCap, TreePine, ShoppingBag } from 'lucide-react';

const NeighborhoodSpotlight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const neighborhoods = [
    {
      name: "Gilbert",
      subtitle: "Where big-city access meets small-town charm",
      image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      description: "Gilbert strikes the perfect balance between community, affordability, and modern amenities. As one of Arizona's safest cities with award-winning schools and a thriving economy, it's ideal for families and professionals alike.",
      highlights: [
        { icon: Users, text: "275K+ residents in a family-focused community" },
        { icon: DollarSign, text: "$550K median home price with strong appreciation" },
        { icon: GraduationCap, text: "Top-rated schools and educational opportunities" },
        { icon: ShoppingBag, text: "SanTan Village and Heritage District shopping" }
      ],
      quickFacts: {
        population: "275K+ residents",
        homePrice: "$550K median home price",
        schools: "Served by Gilbert Public Schools and Higley Unified"
      }
    },
    {
      name: "North Scottsdale",
      subtitle: "Luxury living in the high Sonoran Desert",
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      description: "North Scottsdale offers unparalleled luxury with sweeping mountain views, exclusive communities, and resort-style living. Home to prestigious neighborhoods like DC Ranch and Grayhawk.",
      highlights: [
        { icon: MapPin, text: "Elevated desert location with cooler temperatures" },
        { icon: DollarSign, text: "$1M+ luxury homes with mountain views" },
        { icon: TreePine, text: "McDowell Sonoran Preserve access" },
        { icon: ShoppingBag, text: "Kierland Commons and Scottsdale Quarter" }
      ],
      quickFacts: {
        population: "Premium low-density living",
        homePrice: "$1M+ luxury market",
        schools: "Scottsdale Unified and Paradise Valley districts"
      }
    },
    {
      name: "Mesa",
      subtitle: "Arizona's third-largest city with endless opportunity",
      image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      description: "Mesa combines affordability with urban amenities, offering diverse housing options and a growing job market. The Mesa Arts Center and vibrant downtown create a rich cultural scene.",
      highlights: [
        { icon: Users, text: "500K+ residents in Arizona's 3rd largest city" },
        { icon: DollarSign, text: "$420K median with excellent value" },
        { icon: GraduationCap, text: "Mesa Public Schools and ASU Polytechnic" },
        { icon: TreePine, text: "Red Mountain Park and Usery Mountain trails" }
      ],
      quickFacts: {
        population: "500K+ residents",
        homePrice: "$420K median home price",
        schools: "Mesa Public Schools district"
      }
    }
  ];

  const nextNeighborhood = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === neighborhoods.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevNeighborhood = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? neighborhoods.length - 1 : prevIndex - 1
    );
  };

  const currentNeighborhood = neighborhoods[currentIndex];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2F4F4F] font-playfair mb-4">
            Neighborhood Spotlight
          </h2>
          <p className="text-lg text-[#2F4F4F]/70 max-w-3xl mx-auto font-inter">
            Discover what makes each Phoenix Valley community unique with insider insights from your local expert
          </p>
        </div>

        <div 
          ref={ref}
          className={`transform transition-all duration-800 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Main neighborhood showcase */}
          <div className="bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image side */}
              <div className="relative h-64 lg:h-auto">
                <img 
                  src={currentNeighborhood.image} 
                  alt={currentNeighborhood.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold font-playfair">{currentNeighborhood.name}</h3>
                  <p className="text-white/90 font-inter">{currentNeighborhood.subtitle}</p>
                </div>
              </div>

              {/* Content side */}
              <div className="p-8 lg:p-12">
                <h3 className="text-3xl font-bold text-[#2F4F4F] font-playfair mb-6">
                  Why You'd Want to Live in {currentNeighborhood.name}
                </h3>
                
                <p className="text-[#2F4F4F]/80 text-lg leading-relaxed mb-8 font-inter">
                  {currentNeighborhood.description}
                </p>

                <div className="space-y-4 mb-8">
                  {currentNeighborhood.highlights.map((highlight, index) => {
                    const Icon = highlight.icon;
                    return (
                      <div key={index} className="flex items-center">
                        <div className="w-10 h-10 bg-[#E67E22]/10 rounded-full flex items-center justify-center mr-4">
                          <Icon className="w-5 h-5 text-[#E67E22]" />
                        </div>
                        <span className="text-[#2F4F4F]/80 font-inter">{highlight.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Quick facts table */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h4 className="text-lg font-semibold text-[#2F4F4F] font-playfair mb-4">Quick Facts</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-[#2F4F4F]/10">
                      <span className="text-[#2F4F4F]/70 font-inter">Population</span>
                      <span className="font-semibold text-[#2F4F4F] font-inter">{currentNeighborhood.quickFacts.population}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[#2F4F4F]/10">
                      <span className="text-[#2F4F4F]/70 font-inter">Home Price</span>
                      <span className="font-semibold text-[#2F4F4F] font-inter">{currentNeighborhood.quickFacts.homePrice}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-[#2F4F4F]/70 font-inter">Schools</span>
                      <span className="font-semibold text-[#2F4F4F] font-inter text-right">{currentNeighborhood.quickFacts.schools}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button className="bg-[#E67E22] hover:bg-[#D35400] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 font-inter">
                    View {currentNeighborhood.name} Market Report
                  </button>
                  <button className="border-2 border-[#E67E22] text-[#E67E22] hover:bg-[#E67E22] hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 font-inter">
                    Search Homes in {currentNeighborhood.name}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-4">
            <button 
              onClick={prevNeighborhood}
              className="bg-white shadow-lg rounded-full p-3 hover:bg-[#E67E22] hover:text-white transition-all duration-200 transform hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex space-x-2">
              {neighborhoods.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentIndex === index ? 'bg-[#E67E22] scale-125' : 'bg-[#2F4F4F]/20 hover:bg-[#2F4F4F]/40'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextNeighborhood}
              className="bg-white shadow-lg rounded-full p-3 hover:bg-[#E67E22] hover:text-white transition-all duration-200 transform hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodSpotlight;