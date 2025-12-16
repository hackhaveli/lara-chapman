import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Home as HomeIcon, DollarSign, Palette, TrendingUp, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { usePageContent } from '../hooks/usePageContent'

// Declare YouTube Player API type
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<any>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { content } = usePageContent();

  // Get dynamic content with fallbacks
  const heroTitle = content?.home?.heroTitle || "I'm Lara Chapman, Realtor® with Bliss Realty.";
  const heroSubtitle = content?.home?.heroSubtitle || "Realtor®, investor, and home stager helping Phoenix Valley clients buy and sell with confidence.";
  const videoId = content?.home?.heroVideoId || 'DZfp99BamQk';
  const button1Text = content?.home?.heroButton1Text || 'Find Out What My Home is Worth';
  const button1Url = content?.home?.heroButton1Url || 'https://lstrep.co/0xcgPhSCLE';
  const button2Text = content?.home?.heroButton2Text || 'Search Homes for Sale';
  const button2Url = content?.home?.heroButton2Url || 'https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149';

  useEffect(() => {
    const initPlayer = () => {
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          loop: 1,
          modestbranding: 1,
          mute: 1,
          showinfo: 0,
          rel: 0,
          fs: 0,
          iv_load_policy: 3,
          playsinline: 1,
          start: 0,
          playlist: videoId
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          }
        }
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    return () => {
      if (playerRef.current) {
        try {
          if (typeof playerRef.current.destroy === 'function') {
            playerRef.current.destroy();
          }
        } catch (e) {
          console.error("Error destroying player", e);
        }
        playerRef.current = null;
      }
    };
  }, [videoId]);

  const toggleMute = () => {
    if (playerRef.current) {
      try {
        if (isMuted) {
          playerRef.current.unMute();
          playerRef.current.playVideo();
        } else {
          playerRef.current.mute();
        }
        setIsMuted(!isMuted);
      } catch (error) {
        console.error("Error toggling mute:", error);
      }
    }
  };

  return (
    <section className="relative h-screen flex items-center overflow-hidden hero-section">
      <div className="absolute inset-0 z-0" ref={videoContainerRef}>
        <div
          id="youtube-player"
          className="w-full h-full"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '177.78vh',
            height: '100vh',
            minWidth: '100%',
            minHeight: '56.25vw'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      </div>

      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-20 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 mt-32">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl font-bold text-white mb-6 font-serif leading-tight"
        >
          {heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={button1Url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#E76F51] text-white px-8 py-4 rounded-xl font-semibold uppercase tracking-wide hover:bg-[#E76F51]/90 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            {button1Text}
          </a>
          <a
            href={button2Url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#E76F51] text-white px-12 py-4 rounded-xl font-semibold uppercase tracking-wide hover:bg-[#E76F51]/90 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            {button2Text}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

const IntroBox = () => {
  const { content } = usePageContent();

  // Get dynamic content with fallback
  const bioExcerpt = content?.home?.bioExcerpt || "I'm Lara Chapman, a native Phoenician and REALTOR® who brings together operational leadership, hands-on service, and real estate experience. My background in finance taught me how to lead teams and navigate complex decisions, and owning a massage therapy business deepened my ability to listen closely and support people through important moments. Combined with my investing and home staging experience, this gives me a well-rounded approach that is both strategic and deeply client-focused. I truly care about the people I serve, and I'm here to help you buy, sell, or invest with confidence and clarity.";

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-12 rounded-2xl shadow-md text-center">
          <p className="text-lg text-[#555555] leading-relaxed">
            {bioExcerpt}
          </p>
        </div>
      </div>
    </motion.section>
  )
}

const ServicesGrid = () => {
  const { content } = usePageContent();

  // Get dynamic content with fallbacks
  const servicesTitle = content?.home?.servicesTitle || 'My Services';
  const servicesSubtitle = content?.home?.servicesSubtitle || 'From buying your first home to building an investment portfolio, I provide comprehensive real estate services.';

  // Icon mapping
  const iconMap: { [key: string]: any } = {
    HomeIcon,
    DollarSign,
    Palette,
    TrendingUp
  };

  // Default services as fallback
  const defaultServices = [
    {
      icon: 'HomeIcon',
      title: 'Buy',
      description: 'Find your dream home with personalized guidance through the Phoenix Valley market.',
      link: '/buy',
      internal: true
    },
    {
      icon: 'DollarSign',
      title: 'Sell',
      description: 'Get top dollar for your home with strategic marketing and expert negotiation.',
      link: '/sell',
      internal: true
    },
    {
      icon: 'Palette',
      title: 'Stage',
      description: "Professional home staging services to showcase your property's best features.",
      link: 'https://www.styleandstaging.com',
      internal: false
    },
    {
      icon: 'TrendingUp',
      title: 'Invest',
      description: 'Commercial real estate investment opportunities to help you diversify beyond residential.',
      link: 'https://www.orangedoorinvestmentgroup.com',
      internal: false
    }
  ];

  const services = content?.home?.services && content.home.services.length > 0
    ? content.home.services
    : defaultServices;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#333333] mb-6 font-serif">{servicesTitle}</h2>
          <p className="text-xl text-[#555555] max-w-2xl mx-auto">
            {servicesSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(({ icon, title, description, link, internal }, index) => {
            const Icon = iconMap[icon] || HomeIcon;
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="bg-[#E76F51]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#E76F51] transition-colors duration-200">
                  <Icon size={28} className="text-[#E76F51] group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 className="text-2xl font-bold text-[#333333] mb-4">{title}</h3>
                <p className="text-[#555555] mb-6 leading-relaxed">{description}</p>
                {internal ? (
                  <Link
                    to={link}
                    className="inline-flex items-center text-[#E76F51] font-semibold hover:text-[#E76F51]/80 transition-colors"
                  >
                    Learn More <ArrowRight size={16} className="ml-2" />
                  </Link>
                ) : (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#E76F51] font-semibold hover:text-[#E76F51]/80 transition-colors"
                  >
                    Learn More <ArrowRight size={16} className="ml-2" />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  )
}

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      quote: 'Lara made our home buying experience seamless and stress-free. Her knowledge of the Phoenix market is unmatched.',
      photo_url: null
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      quote: 'Professional, knowledgeable, and genuinely cares about her clients. Lara helped us sell our home above asking price.',
      photo_url: null
    },
    {
      id: 3,
      name: 'Jennifer Chen',
      quote: 'The staging services transformed our home completely. We had multiple offers within the first week!',
      photo_url: null
    }
  ])

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        if (data && data.length > 0) {
          setTestimonials(data)
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      }
    }

    fetchTestimonials()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 px-6 bg-[#FAF9F6]"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-[#333333] mb-16 font-serif">What My Clients Say</h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-12 rounded-2xl shadow-md"
            >
              <p className="text-xl text-[#555555] italic mb-8 leading-relaxed">
                "{testimonials[currentIndex]?.quote}"
              </p>
              <div className="font-bold text-[#333333] text-lg">
                {testimonials[currentIndex]?.name}
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft size={20} className="text-[#E76F51]" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronRight size={20} className="text-[#E76F51]" />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentIndex ? 'bg-[#E76F51]' : 'bg-[#E76F51]/30'
                }`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

const ClosingCTA = () => {
  const { content } = usePageContent();

  // Get dynamic content with fallbacks
  const ctaTitle = content?.home?.ctaTitle || "Ready to talk about your goals? Let's connect.";
  const ctaSubtitle = content?.home?.ctaSubtitle || "Whether you're buying, selling, or investing, I'm here to help you achieve your real estate dreams in the Phoenix Valley.";

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 px-6 bg-[#E76F51]"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-white mb-6 font-serif">
          {ctaTitle}
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          {ctaSubtitle}
        </p>
        <Link
          to="/contact"
          className="inline-block bg-white text-[#E76F51] px-12 py-4 rounded-xl font-semibold uppercase tracking-wide hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-lg"
        >
          Contact Me
        </Link>
      </div>
    </motion.section>
  )
}

const Home = () => {
  return (
    <div>
      <Hero />
      <IntroBox />
      <ServicesGrid />
      {/* <TestimonialsCarousel /> */}
      <ClosingCTA />
    </div>
  )
}

export default Home