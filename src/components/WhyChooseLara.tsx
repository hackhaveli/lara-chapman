import React, { useEffect, useRef, useState } from 'react';
import { Award, Users, TrendingUp, Heart, Clock, Shield, Star, CheckCircle } from 'lucide-react';

const WhyChooseLara = () => {
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

  const achievements = [
    {
      icon: Award,
      title: "Top 1% Agent",
      description: "Consistently ranked in the top 1% of Phoenix Valley agents"
    },
    {
      icon: Users,
      title: "500+ Happy Clients",
      description: "Families and investors who trust Lara with their biggest investment"
    },
    {
      icon: TrendingUp,
      title: "$50M+ in Sales",
      description: "Proven track record of successful transactions"
    },
    {
      icon: Clock,
      title: "15+ Years Experience",
      description: "Deep market knowledge through multiple market cycles"
    }
  ];

  const differentiators = [
    {
      icon: Heart,
      title: "Native Phoenix Expertise",
      description: "Born and raised in the Valley with intimate knowledge of every neighborhood, school district, and market trend."
    },
    {
      icon: Shield,
      title: "Triple Expertise",
      description: "Realtor®, investor, and professional stager - bringing multiple perspectives to every transaction."
    },
    {
      icon: Star,
      title: "Concierge-Level Service",
      description: "White-glove treatment from initial consultation through closing and beyond, with 24/7 availability."
    },
    {
      icon: CheckCircle,
      title: "Proven Marketing System",
      description: "Professional photography, staging consultation, and strategic pricing that gets homes sold faster and for more money."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FAF8F5] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2F4F4F] font-playfair mb-4">
            Why Choose Lara Chapman?
          </h2>
          <p className="text-xl text-[#2F4F4F]/70 max-w-3xl mx-auto font-inter">
            Experience the difference that comes from working with a true Phoenix Valley expert
          </p>
        </div>

        {/* Achievement stats */}
        <div 
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.title}
                className={`text-center transform transition-all duration-600 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
                }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#E67E22] to-[#D35400] text-white rounded-2xl mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#2F4F4F] font-playfair mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-[#2F4F4F]/70 text-sm font-inter leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed differentiators */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: isVisible ? `${(index + 4) * 150}ms` : '0ms'
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#E67E22]/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#E67E22]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2F4F4F] font-playfair mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#2F4F4F]/80 leading-relaxed font-inter">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#E67E22] to-[#D35400] p-8 rounded-3xl text-white shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold font-playfair mb-4">
              Ready to Experience the Lara Chapman Difference?
            </h3>
            <p className="text-white/90 text-lg mb-6 font-inter max-w-2xl mx-auto">
              Join hundreds of satisfied clients who've achieved their real estate goals with personalized, expert guidance.
            </p>
            <button className="bg-white text-[#E67E22] px-8 py-4 rounded-2xl font-semibold text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-inter">
              Schedule Your Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseLara;