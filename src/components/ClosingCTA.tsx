import React from 'react';
import { Phone, Mail, MessageCircle, Calendar } from 'lucide-react';

const ClosingCTA = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#E67E22] to-[#D35400] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white rounded-full"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-playfair">
          Ready to Make Your Move?
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-8 font-inter">
          Whether you're buying, selling, or investing, let's create a personalized strategy for your success
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="bg-white text-[#E67E22] px-8 py-4 rounded-2xl font-semibold text-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 font-inter">
            <Calendar className="w-5 h-5" />
            <span>Schedule Free Consultation</span>
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-[#E67E22] px-8 py-4 rounded-2xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 font-inter">
            <MessageCircle className="w-5 h-5" />
            <span>Get Instant Market Analysis</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <a href="tel:+1234567890" className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-200 text-white">
            <Phone className="w-5 h-5" />
            <div className="text-left">
              <div className="font-semibold font-inter">(623) 555-0123</div>
              <div className="text-white/80 text-sm font-inter">Call or text anytime</div>
            </div>
          </a>
          <a href="mailto:lara@blissrealty.com" className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-200 text-white">
            <Mail className="w-5 h-5" />
            <div className="text-left">
              <div className="font-semibold font-inter">lara@blissrealty.com</div>
              <div className="text-white/80 text-sm font-inter">Quick response guaranteed</div>
            </div>
          </a>
        </div>

        <div className="mt-8 text-white/70 text-sm font-inter">
          Licensed Arizona Realtor® | Bliss Realty Professional | Phoenix Valley Native
        </div>
      </div>
    </section>
  );
};

export default ClosingCTA;