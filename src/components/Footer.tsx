import React from 'react';
import { Facebook, Instagram, Linkedin, MapPin, Award, Users } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#2F4F4F] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold font-playfair mb-4">Lara Chapman</h3>
            <p className="text-white/80 mb-4 font-inter">
              Realtor® with Bliss Realty<br />
              Phoenix Valley Native & Expert
            </p>
            <div className="space-y-2 text-white/70 text-sm mb-4">
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2" />
                <span className="font-inter">Top 1% Agent</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span className="font-inter">500+ Happy Clients</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="font-inter">Phoenix Valley Native</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-[#E67E22] transition-colors duration-200">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-white/70 hover:text-[#E67E22] transition-colors duration-200">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-white/70 hover:text-[#E67E22] transition-colors duration-200">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 font-playfair">Services</h4>
            <ul className="space-y-2 font-inter">
              <li><a href="/buying" className="text-white/80 hover:text-[#E67E22] transition-colors duration-200">Buying a Home</a></li>
              <li><a href="/sell" className="text-white/80 hover:text-[#E67E22] transition-colors duration-200">Selling Your Home</a></li>
              <li><a href="/market-reports" className="text-white/80 hover:text-[#E67E22] transition-colors duration-200">Market Reports</a></li>
              <li><a href="/neighborhoods" className="text-white/80 hover:text-[#E67E22] transition-colors duration-200">Neighborhood Guides</a></li>
              <li><a href="https://styleandstaging.com" className="text-white/80 hover:text-[#E67E22] transition-colors duration-200">Home Staging</a></li>
              <li><a href="https://orangedoorinvestmentgroup.com" className="text-white/80 hover:text-[#E67E22] transition-colors duration-200">Investment Properties</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 font-playfair">Contact Info</h4>
            <div className="space-y-2 text-white/80 font-inter">
              <p>(623) 555-0123</p>
              <p>lara@blissrealty.com</p>
              <p>Serving the Greater Phoenix Valley</p>
              <p className="text-sm text-white/60 mt-4">
                Available 7 days a week<br />
                Response within 1 hour guaranteed
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p className="font-inter">
            © 2025 Lara Chapman | Bliss Realty. All rights reserved. | Licensed Arizona Realtor® | Equal Housing Opportunity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;