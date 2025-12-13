import React, { useEffect, useRef, useState } from 'react';
import { Home, DollarSign, Paintbrush, TrendingUp, ArrowRight } from 'lucide-react';

const Services = () => {
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

  const services = [
    {
      icon: Home,
      title: 'Buy',
      description: 'Navigate the competitive Phoenix market with insider knowledge and strategic guidance to secure your perfect home.',
      features: ['Buyer representation', 'Market analysis', 'Negotiation expertise', 'Closing coordination'],
      link: '/buying'
    },
    {
      icon: DollarSign,
      title: 'Sell',
      description: 'Maximize your home\'s value with professional staging, strategic pricing, and proven marketing systems.',
      features: ['Market pricing analysis', 'Professional staging', 'Premium marketing', 'Expert negotiation'],
      link: '/sell'
    },
    {
      icon: Paintbrush,
      title: 'Stage',
      description: 'Transform your property with professional staging that highlights its best features and appeals to buyers.',
      features: ['Design consultation', 'Furniture placement', 'Decor selection', 'Market appeal optimization'],
      link: 'https://styleandstaging.com',
      external: true
    },
    {
      icon: TrendingUp,
      title: 'Invest',
      description: 'Build wealth through strategic real estate investments with guidance from an experienced investor.',
      features: ['Investment analysis', 'Market opportunities', 'ROI projections', 'Portfolio strategy'],
      link: 'https://orangedoorinvestmentgroup.com',
      external: true
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2F4F4F] font-playfair">
            Comprehensive Real Estate Services
          </h2>
          <p className="text-lg text-[#2F4F4F]/70 mt-4 max-w-2xl mx-auto font-inter">
            From first-time buyers to seasoned investors, I provide expert guidance at every step of your real estate journey
          </p>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <a
                key={service.title}
                href={service.link}
                target={service.external ? '_blank' : '_self'}
                rel={service.external ? 'noopener noreferrer' : ''}
                className={`group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 cursor-pointer border border-[#2F4F4F]/5 hover:border-[#E67E22]/20 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
                }}
              >
                <div className="text-center h-full flex flex-col">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E67E22] text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200">
                    <Icon size={24} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#2F4F4F] mb-4 font-playfair group-hover:text-[#E67E22] transition-colors duration-200">
                    {service.title}
                  </h3>
                  
                  <p className="text-[#2F4F4F]/70 leading-relaxed font-inter mb-6 flex-grow">
                    {service.description}
                  </p>

                  {/* Service features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-[#2F4F4F]/60">
                        <div className="w-1.5 h-1.5 bg-[#E67E22] rounded-full mr-2"></div>
                        <span className="font-inter">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn more link */}
                  <div className="flex items-center justify-center text-[#E67E22] font-semibold text-sm group-hover:text-[#D35400] transition-colors duration-200">
                    <span className="font-inter">Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Additional value proposition */}
        <div className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#2F4F4F] font-playfair mb-6">
                The Lara Chapman Advantage
              </h3>
              <p className="text-lg text-[#2F4F4F]/80 leading-relaxed mb-8 font-inter">
                When you work with me, you're not just getting a Realtor® - you're getting a trusted advisor 
                who understands the Phoenix Valley like no one else. My unique combination of local expertise, 
                investment knowledge, and staging skills ensures you get the best possible outcome.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#E67E22] mr-3" />
                  <span className="text-[#2F4F4F]/80 font-inter">Personalized strategy for every client</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#E67E22] mr-3" />
                  <span className="text-[#2F4F4F]/80 font-inter">Data-driven market analysis and pricing</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#E67E22] mr-3" />
                  <span className="text-[#2F4F4F]/80 font-inter">End-to-end support from search to closing</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#E67E22] mr-3" />
                  <span className="text-[#2F4F4F]/80 font-inter">Ongoing relationship beyond the transaction</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-[#E67E22] to-[#D35400] p-8 rounded-2xl text-white shadow-xl">
                <h4 className="text-2xl font-bold font-playfair mb-4">Ready to Get Started?</h4>
                <p className="text-white/90 mb-6 font-inter">
                  Let's discuss your real estate goals and create a personalized strategy for success.
                </p>
                <button className="bg-white text-[#E67E22] px-8 py-4 rounded-xl font-semibold hover:bg-[#FAF8F5] transition-all duration-200 transform hover:scale-105 shadow-lg font-inter">
                  Schedule Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;