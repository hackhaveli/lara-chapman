import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Home, DollarSign, Calendar, MapPin, BarChart3 } from 'lucide-react';

const MarketInsights = () => {
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

  const marketStats = [
    {
      icon: TrendingUp,
      value: "12%",
      label: "YoY Price Growth",
      description: "Phoenix Valley average"
    },
    {
      icon: Calendar,
      value: "18",
      label: "Days on Market",
      description: "Average selling time"
    },
    {
      icon: Home,
      value: "94%",
      label: "List to Sale Ratio",
      description: "Properties sell close to asking"
    },
    {
      icon: BarChart3,
      value: "$485K",
      label: "Median Home Price",
      description: "Phoenix Valley 2024"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#2F4F4F] to-[#1a3a3a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-playfair mb-4">
            Phoenix Valley Market Insights
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-inter">
            Stay informed with the latest market trends and data-driven insights from your local expert
          </p>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {marketStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
                }}
              >
                <div className="text-center">
                  <Icon className="w-8 h-8 text-[#E67E22] mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white font-playfair mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/90 font-semibold mb-1 font-inter">
                    {stat.label}
                  </div>
                  <div className="text-white/60 text-sm font-inter">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-playfair mb-4">
                Market Report & Trends
              </h3>
              <p className="text-white/80 text-lg leading-relaxed mb-6 font-inter">
                The Phoenix Valley continues to be one of the nation's most dynamic real estate markets. 
                With strong job growth, favorable tax policies, and year-round sunshine, our region attracts 
                buyers from across the country seeking both primary residences and investment opportunities.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-white/70">
                  <MapPin className="w-5 h-5 text-[#E67E22] mr-3" />
                  <span className="font-inter">Covering Mesa, Gilbert, Chandler, Scottsdale & Phoenix</span>
                </div>
                <div className="flex items-center text-white/70">
                  <DollarSign className="w-5 h-5 text-[#E67E22] mr-3" />
                  <span className="font-inter">Inventory levels stabilizing after historic lows</span>
                </div>
                <div className="flex items-center text-white/70">
                  <TrendingUp className="w-5 h-5 text-[#E67E22] mr-3" />
                  <span className="font-inter">Strong appreciation in family-friendly neighborhoods</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="bg-[#E67E22] hover:bg-[#D35400] text-white px-8 py-4 rounded-2xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-xl">
                Download Full Market Report
              </button>
              <p className="text-white/60 text-sm mt-3 font-inter">
                Updated monthly with the latest data
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;