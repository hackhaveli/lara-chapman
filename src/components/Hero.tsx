import React, { useEffect, useState } from 'react';
import { Play, Award, Users, TrendingUp } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background Placeholder */}
      <div className="absolute inset-0">
        {/* Placeholder for video background */}
        <div className="w-full h-full bg-[url('https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')] bg-cover bg-center bg-no-repeat"></div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        
        {/* Video play button overlay */}
        <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300 cursor-pointer group">
          <Play className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" fill="white" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className={`transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Achievement badges */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm font-medium border border-white/20">
                <Award className="w-4 h-4 inline mr-2" />
                Top 1% Agent
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm font-medium border border-white/20">
                <Users className="w-4 h-4 inline mr-2" />
                500+ Happy Clients
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm font-medium border border-white/20">
                <TrendingUp className="w-4 h-4 inline mr-2" />
                $50M+ in Sales
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-playfair leading-tight">
            I'm Lara Chapman,<br />
            <span className="text-[#E67E22]">Realtor®</span> with Bliss Realty
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light max-w-3xl mx-auto leading-relaxed">
            Native Phoenician • Real Estate Investor • Professional Home Stager<br />
            <span className="text-lg md:text-xl text-white/80">Helping Phoenix Valley clients achieve their real estate dreams with unmatched local expertise</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <button className="bg-[#E67E22] hover:bg-[#D35400] text-white px-10 py-5 rounded-2xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl group relative overflow-hidden">
              <span className="relative z-10">
              Find Out What My Home is Worth
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#E67E22] to-[#D35400] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="border-2 border-white/80 text-white hover:bg-white hover:text-[#E67E22] px-10 py-5 rounded-2xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl backdrop-blur-sm">
              Search Homes for Sale
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#E67E22] rounded-full"></div>
              Licensed Arizona Realtor®
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#E67E22] rounded-full"></div>
              Bliss Realty Professional
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#E67E22] rounded-full"></div>
              Phoenix Valley Native
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;