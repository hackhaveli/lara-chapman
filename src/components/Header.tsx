import React from 'react';
import { Phone, Mail, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#2F4F4F]/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl md:text-2xl font-bold text-[#2F4F4F] font-playfair">
              Lara Chapman
            </h1>
            <span className="text-[#E67E22] font-medium font-inter">| Bliss Realty</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#services" className="text-[#2F4F4F] hover:text-[#E67E22] transition-colors duration-200 font-medium font-inter">Services</a>
            <a href="#neighborhoods" className="text-[#2F4F4F] hover:text-[#E67E22] transition-colors duration-200 font-medium font-inter">Neighborhoods</a>
            <a href="#about" className="text-[#2F4F4F] hover:text-[#E67E22] transition-colors duration-200 font-medium font-inter">About</a>
            <a href="#testimonials" className="text-[#2F4F4F] hover:text-[#E67E22] transition-colors duration-200 font-medium font-inter">Reviews</a>
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="tel:+1234567890" 
              className="flex items-center space-x-2 text-[#2F4F4F] hover:text-[#E67E22] transition-colors duration-200 font-inter"
            >
              <Phone size={18} />
              <span>(623) 555-0123</span>
            </a>
            <a 
              href="mailto:lara@blissrealty.com" 
              className="flex items-center space-x-2 text-[#2F4F4F] hover:text-[#E67E22] transition-colors duration-200 font-inter"
            >
              <Mail size={18} />
              <span>lara@blissrealty.com</span>
            </a>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden bg-[#E67E22] text-white p-2 rounded-xl hover:bg-[#E67E22]/90 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-sm border-t border-[#2F4F4F]/10 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#services" className="text-[#2F4F4F] hover:text-[#E67E22] transition-colors duration-200 font-medium font-inter px-4 py-2">Services</a>
              <a href="#neighborhoods" className="text-[#2F4F4F] hover:text-[#E67E22] transition-colors duration-200 font-medium font-inter px-4 py-2">Neighborhoods</a>
              <a href="#about" className="text-[#2F4F4F] hover:text-[#E67E22] transition-colors duration-200 font-medium font-inter px-4 py-2">About</a>
              <a href="#testimonials" className="text-[#2F4F4F] hover:text-[#E67E22] transition-colors duration-200 font-medium font-inter px-4 py-2">Reviews</a>
              <div className="border-t border-[#2F4F4F]/10 pt-4 px-4">
                <a href="tel:+1234567890" className="flex items-center space-x-2 text-[#2F4F4F] hover:text-[#E67E22] transition-colors duration-200 font-inter mb-2">
                  <Phone size={16} />
                  <span>(623) 555-0123</span>
                </a>
                <a href="mailto:lara@blissrealty.com" className="flex items-center space-x-2 text-[#2F4F4F] hover:text-[#E67E22] transition-colors duration-200 font-inter">
                  <Mail size={16} />
                  <span>lara@blissrealty.com</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;