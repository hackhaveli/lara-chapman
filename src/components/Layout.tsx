import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Home,
  User,
  ShoppingCart,
  Search,
  Building,
  FileText,
  Phone,
  Calculator,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home', icon: Home, external: false },
    { to: '/about', label: 'About', icon: User, external: false },
    { to: '/buy', label: 'Buy', icon: ShoppingCart, external: false },
    { to: 'https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149', label: 'Search Homes', icon: Search, external: true },
    { to: '/sell', label: 'Sell', icon: Building, external: false },
    { to: '/neighborhoods', label: 'Neighborhoods', icon: Building, external: false },
    { to: '/calculators', label: 'Calculators', icon: Calculator, external: false },
    // { to: '/resources', label: 'Resources', icon: FileText },
    { to: '/contact', label: 'Contact', icon: Phone, external: false },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-[#FAF9F6] shadow-md border-b border-[#E76F51]/20'
        : 'bg-[#FAF9F6]/95 backdrop-blur-sm'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold font-serif text-[#E76F51]">
              Lara Chapman
            </div>
            <div className="text-sm text-[#555555] font-medium">
              Realtor®
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map(({ to, label, external }) => (
              external ? (
                <a
                  key={to}
                  href={to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium transition-colors duration-200 hover:text-[#E76F51] relative group text-[#333333]"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E76F51] transition-all duration-200 group-hover:w-full" />
                </a>
              ) : (
                <Link
                  key={to}
                  to={to}
                  className={`font-medium transition-colors duration-200 hover:text-[#E76F51] relative group ${location.pathname === to ? 'text-[#E76F51]' : 'text-[#333333]'
                    }`}
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E76F51] transition-all duration-200 group-hover:w-full" />
                </Link>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-[#333333] hover:text-[#E76F51] transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FAF9F6] border-t border-[#E76F51]/20"
          >
            <div className="px-6 py-4 space-y-2">
              {navLinks.map(({ to, label, icon: Icon, external }) => (
                external ? (
                  <a
                    key={to}
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 py-3 px-4 rounded-xl transition-colors duration-200 text-[#333333] hover:bg-[#E76F51]/10 hover:text-[#E76F51]"
                  >
                    <Icon size={20} />
                    <span className="font-medium">{label}</span>
                  </a>
                ) : (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 py-3 px-4 rounded-xl transition-colors duration-200 ${location.pathname === to
                      ? 'bg-[#E76F51] text-white'
                      : 'text-[#333333] hover:bg-[#E76F51]/10 hover:text-[#E76F51]'
                      }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{label}</span>
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

const Footer = () => {
  return (
    <footer className="bg-[#2A9D8F] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-bold font-serif mb-4">
              Lara Chapman
            </div>
            <p className="text-white/90 mb-6">
              Realtor®, investor, and home stager helping Phoenix Valley clients buy and sell with confidence.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/LaraLovesPhoenix"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/laralovesphoenix/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://x.com/larablissr1"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://www.youtube.com/@LaraLovesPhoenix"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/lara-chapman-b4b025357/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <span className="w-1 h-6 bg-[#E76F51] mr-2"></span>
              Quick Links
            </h3>
            <div className="space-y-3">
              <Link to="/" className="flex items-center text-white/80 hover:text-white transition-colors">
                <Home size={16} className="mr-2" /> Home
              </Link>
              <Link to="/about" className="flex items-center text-white/80 hover:text-white transition-colors">
                <User size={16} className="mr-2" /> About
              </Link>
              <Link to="/buy" className="flex items-center text-white/80 hover:text-white transition-colors">
                <ShoppingCart size={16} className="mr-2" /> Buy a Home
              </Link>
              <a href="https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149" target="_blank" rel="noopener noreferrer" className="flex items-center text-white/80 hover:text-white transition-colors">
                <Search size={16} className="mr-2" /> Search Homes
              </a>
              <Link to="/sell" className="flex items-center text-white/80 hover:text-white transition-colors">
                <Building size={16} className="mr-2" /> Sell Your Home
              </Link>
              <Link to="/neighborhoods" className="flex items-center text-white/80 hover:text-white transition-colors">
                <MapPin size={16} className="mr-2" /> Neighborhoods
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <span className="w-1 h-6 bg-[#E76F51] mr-2"></span>
              Resources
            </h3>
            <div className="space-y-3">
              <Link to="/calculators" className="flex items-center text-white/80 hover:text-white transition-colors">
                <Calculator size={16} className="mr-2" /> Calculators
              </Link>
              <Link to="/resources" className="flex items-center text-white/80 hover:text-white transition-colors">
                <FileText size={16} className="mr-2" /> Buyer & Seller Guides
              </Link>
              <a
                href="https://styleandstaging.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center text-white/80 hover:text-white transition-colors"
              >
                <Home size={16} className="mr-2" /> Home Staging Services
              </a>
              <a
                href="https://orangedoorinvestmentgroup.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center text-white/80 hover:text-white transition-colors"
              >
                <Building size={16} className="mr-2" /> Investment Properties
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <span className="w-1 h-6 bg-[#E76F51] mr-2"></span>
              Contact Me
            </h3>
            <div className="space-y-4 text-white/80">
              <div className="flex items-start">
                <MapPin size={18} className="mt-1 mr-3 flex-shrink-0" />
                <p>Phoenix, Arizona<br />Serving the entire Phoenix Valley</p>
              </div>
              <a href="mailto:KeysPlease@LaraLovesPhoenix.com" className="flex items-center hover:text-white transition-colors">
                <Mail size={18} className="mr-3 flex-shrink-0" />
                KeysPlease@LaraLovesPhoenix.com
              </a>
              <a href="tel:602-405-8002" className="flex items-center hover:text-white transition-colors">
                <Phone size={18} className="mr-3 flex-shrink-0" />
                (602) 405-8002
              </a>
              <Link
                to="/contact"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-block mt-4 bg-[#E76F51] hover:bg-[#E76F51]/90 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 hover:shadow-lg"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p> 2025 Lara Chapman, Realtor | Bliss Realty</p>
            <div className="mt-4 md:mt-0 space-x-4">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Use
              </Link>
              <Link to="/accessibility" className="hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
          <p className="mt-4 text-xs">
            The data relating to real estate for sale on this web site comes in part from the Internet Data Exchange (IDX) program of the Arizona Regional Multiple Listing Service, Inc. Real estate listings held by brokerage firms other than Bliss Realty are marked with the IDX logo. Information about a property's sale history, including the listing and sale prices, may be found on the property details page. All information provided is deemed reliable but is not guaranteed and should be independently verified. Some properties which appear for sale on this web site may subsequently have sold and may no longer be available. The listing broker's offer of compensation is made only to participants of the MLS where the listing is filed.
          </p>
        </div>
      </div>
    </footer>
  )
}

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans">
      <Navigation />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout