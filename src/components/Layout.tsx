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
  Linkedin,
  Clock
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { usePageContent } from '../hooks/usePageContent'

const getIconForLabel = (label: string) => {
  const l = (label || '').toLowerCase();
  if (l.includes('home')) return Home;
  if (l.includes('about')) return User;
  if (l.includes('buy') && !l.includes('guide')) return ShoppingCart;
  if (l.includes('search')) return Search;
  if (l.includes('sell')) return Building;
  if (l.includes('neighborhood')) return MapPin;
  if (l.includes('calc')) return Calculator;
  if (l.includes('contact')) return Phone;
  return FileText;
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const { content } = usePageContent()

  const logoText = content?.header?.logoText || 'Lara Chapman'
  const logoSubtext = content?.header?.logoSubtext || 'Realtor®'

  // Dynamic Navigation Helper
  const searchHomesUrl = content?.footer?.searchHomesUrl || 'https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = content?.header?.menuItems && content.header.menuItems.length > 0
    ? content.header.menuItems
    : [
      { label: 'Home', path: '/', isExternal: false },
      { label: 'About', path: '/about', isExternal: false },
      { label: 'Buy', path: '/buy', isExternal: false },
      { label: 'Search Homes', path: searchHomesUrl, isExternal: true },
      { label: 'Sell', path: '/sell', isExternal: false },
      { label: 'Neighborhoods', path: '/neighborhoods', isExternal: false },
      { label: 'Calculators', path: '/calculators', isExternal: false },
      { label: 'Contact', path: '/contact', isExternal: false }
    ];

  const navLinks = menuItems.map(item => ({
    to: item.path,
    label: item.label,
    icon: getIconForLabel(item.label),
    external: item.isExternal
  }));

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
              {logoText}
            </div>
            <div className="text-sm text-[#555555] font-medium">
              {logoSubtext}
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
  const { content } = usePageContent()

  const footerLogoText = content?.footer?.logoText || 'Lara Chapman'
  const footerTagline = content?.footer?.tagline || 'Realtor®, investor, and home stager helping Phoenix Valley clients buy and sell with confidence.'
  const copyrightText = content?.footer?.copyrightText || '© 2025 Lara Chapman, Realtor | Bliss Realty'
  const disclaimerText = content?.footer?.disclaimerText || 'The data relating to real estate for sale on this web site comes in part from the Internet Data Exchange (IDX) program...'

  const facebookUrl = content?.contact?.facebookUrl || 'https://www.facebook.com/LaraLovesPhoenix'
  const instagramUrl = content?.contact?.instagramUrl || 'https://www.instagram.com/laralovesphoenix/'
  const twitterUrl = content?.contact?.twitterUrl || 'https://x.com/larablissr1'
  const youtubeUrl = content?.contact?.youtubeUrl || 'https://www.youtube.com/@LaraLovesPhoenix'
  const linkedinUrl = content?.contact?.linkedinUrl || 'https://www.linkedin.com/in/lara-chapman-b4b025357/'

  const email = content?.footer?.email || content?.contact?.email || 'KeysPlease@LaraLovesPhoenix.com'
  const phone = content?.footer?.phone || content?.contact?.phone || '(602) 405-8002'
  const address = content?.footer?.address || content?.contact?.address || 'Phoenix, Arizona'
  const officeHours = content?.footer?.officeHours || content?.contact?.officeHours || 'Monday - Friday: 9:00 AM - 6:00 PM'

  const quickLinksTitle = content?.footer?.quickLinksTitle || 'Quick Links'
  const resourcesTitle = content?.footer?.resourcesTitle || 'Resources'
  const contactTitle = content?.footer?.contactTitle || 'Contact Me'
  const consultationButtonText = content?.footer?.consultationButtonText || 'Schedule a Consultation'

  // Dynamic Lists with Defaults
  const quickLinks = content?.footer?.quickLinks && content.footer.quickLinks.length > 0
    ? content.footer.quickLinks
    : [
      { label: 'Home', path: '/', isExternal: false },
      { label: 'About Lara', path: '/about', isExternal: false },
      { label: 'Buy a Home', path: '/buy', isExternal: false },
      { label: 'Search Homes', path: 'https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149', isExternal: true },
      { label: 'Sell Your Home', path: '/sell', isExternal: false },
      { label: 'Neighborhoods', path: '/neighborhoods', isExternal: false }
    ];

  const resourceLinks = content?.footer?.resourceLinks && content.footer.resourceLinks.length > 0
    ? content.footer.resourceLinks
    : [
      { label: 'Mortgage Calculators', path: '/calculators', isExternal: false },
      { label: 'Buyer & Seller Guides', path: '#', isExternal: false },
      { label: 'Home Staging Services', path: 'https://styleandstaging.com', isExternal: true },
      { label: 'Investment Properties', path: 'https://orangedoorinvestmentgroup.com', isExternal: true }
    ];

  const privacyPolicyLinkText = content?.footer?.privacyPolicyLinkText || 'Privacy Policy'
  const termsLinkText = content?.footer?.termsLinkText || 'Terms of Use'
  const accessibilityLinkText = content?.footer?.accessibilityLinkText || 'Accessibility'

  return (
    <footer className="bg-[#2A9D8F] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-bold font-serif mb-4">
              {footerLogoText}
            </div>
            <p className="text-white/90 mb-6">
              {footerTagline}
            </p>
            <div className="flex space-x-4">
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer nofollow" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Facebook"><Facebook size={20} /></a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer nofollow" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Instagram"><Instagram size={20} /></a>
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer nofollow" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="X (formerly Twitter)"><Twitter size={20} /></a>
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer nofollow" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="YouTube"><Youtube size={20} /></a>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer nofollow" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <span className="w-1 h-6 bg-[#E76F51] mr-2"></span>
              {quickLinksTitle}
            </h3>
            <div className="space-y-3">
              {quickLinks.map((link, idx) => {
                const Icon = getIconForLabel(link.label);
                return link.isExternal ? (
                  <a key={idx} href={link.path} target="_blank" rel="noopener noreferrer" className="flex items-center text-white/80 hover:text-white transition-colors">
                    <Icon size={16} className="mr-2" /> {link.label}
                  </a>
                ) : (
                  <Link key={idx} to={link.path} className="flex items-center text-white/80 hover:text-white transition-colors">
                    <Icon size={16} className="mr-2" /> {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <span className="w-1 h-6 bg-[#E76F51] mr-2"></span>
              {resourcesTitle}
            </h3>
            <div className="space-y-3">
              {resourceLinks.map((link, idx) => {
                const Icon = getIconForLabel(link.label);
                return link.isExternal ? (
                  <a key={idx} href={link.path} target="_blank" rel="noopener noreferrer" className="flex items-center text-white/80 hover:text-white transition-colors">
                    <Icon size={16} className="mr-2" /> {link.label}
                  </a>
                ) : (
                  <Link key={idx} to={link.path} className="flex items-center text-white/80 hover:text-white transition-colors">
                    <Icon size={16} className="mr-2" /> {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <span className="w-1 h-6 bg-[#E76F51] mr-2"></span>
              {contactTitle}
            </h3>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1 text-[#E76F51]" />
                <span className="text-white/80">{address}</span>
              </div>

              {/* Hours */}
              <div className="flex items-start">
                <Clock size={20} className="mr-3 mt-1 text-[#E76F51]" />
                <span className="text-white/80">{officeHours}</span>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <Mail size={20} className="mr-3 text-[#E76F51]" />
                <a href={`mailto:${email}`} className="text-white/80 hover:text-white transition-colors">{email}</a>
              </div>

              {/* Phone */}
              <div className="flex items-center">
                <Phone size={20} className="mr-3 text-[#E76F51]" />
                <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-white/80 hover:text-white transition-colors">{phone}</a>
              </div>

              <Link to="/contact" className="inline-block bg-[#E76F51] text-white px-6 py-2 rounded-full font-medium hover:bg-[#D65D40] transition-colors mt-2">
                {consultationButtonText}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p className="mb-4 md:mb-0">{copyrightText}</p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors">{privacyPolicyLinkText}</Link>
            <Link to="/terms" className="hover:text-white transition-colors">{termsLinkText}</Link>
            <Link to="/accessibility" className="hover:text-white transition-colors">{accessibilityLinkText}</Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-white/10 text-xs text-white/40 text-center">
          <p>{disclaimerText}</p>
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