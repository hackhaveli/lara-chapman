import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react'
import { usePageContent } from '../hooks/usePageContent'

const Contact = () => {
  const { content } = usePageContent();

  // Get dynamic content with fallbacks
  const pageTitle = content?.contact?.pageTitle || "Let's Connect";
  const pageSubtitle = content?.contact?.pageSubtitle || "Ready to start your real estate journey? I'm here to help with all your buying, selling, and investing needs.";
  const formTitle = content?.contact?.formTitle || 'Send Me a Message';
  const profileBlurb = content?.contact?.profileBlurb || "I'm always available to help with your real estate questions. Whether you're buying, selling, or just exploring your options, I'd love to hear from you.";
  const phone = content?.contact?.phone || '(602) 405-8002';
  const email = content?.contact?.email || 'KeysPlease@LaraLovesPhoenix.com';
  const address = content?.contact?.address || 'Phoenix, Arizona';
  const officeHours = content?.contact?.officeHours || 'Serving the entire Valley';
  const socialBlurb = content?.contact?.socialBlurb || 'Get market updates, home tips, and behind-the-scenes content from my daily real estate adventures.';

  // Load the LeadConnector form embed script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://link.msgsndr.com/js/form_embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-[#333333] mb-6 font-serif">{pageTitle}</h1>
          <p className="text-xl text-[#555555] max-w-2xl mx-auto">
            {pageSubtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white p-12 rounded-2xl shadow-md">
              <h2 className="text-3xl font-bold text-[#333333] mb-8 font-serif">{formTitle}</h2>

              {/* LeadConnector Form Iframe */}
              <div className="w-full" style={{ minHeight: '1162px' }}>
                <iframe
                  src="https://api.leadconnectorhq.com/widget/form/WwaMxtyhjJ7ALAofQB2v"
                  style={{ width: '100%', height: '100%', minHeight: '1162px', border: 'none', borderRadius: '3px' }}
                  id="inline-WwaMxtyhjJ7ALAofQB2v"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Contact Me"
                  data-height="1162"
                  data-layout-iframe-id="inline-WwaMxtyhjJ7ALAofQB2v"
                  data-form-id="WwaMxtyhjJ7ALAofQB2v"
                  title="Contact Me"
                />
              </div>
            </div>
          </motion.div>

          {/* Contact Info & Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Photo & Info Card */}
            <div className="bg-white p-12 rounded-2xl shadow-md text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Lara Chapman, Realtor"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 25%' }}
                />
              </div>
              <h3 className="text-2xl font-bold text-[#333333] mb-2">Lara Chapman</h3>
              <p className="text-[#E76F51] font-semibold mb-6">Realtor® | Investor | Home Stager</p>
              <p className="text-[#555555] mb-8 leading-relaxed">
                {profileBlurb}
              </p>
            </div>

            {/* Contact Methods */}
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold text-[#333333] mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
                  <div className="bg-[#E76F51]/10 p-3 rounded-xl">
                    <Phone size={20} className="text-[#E76F51]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#333333]">{phone}</p>
                    <p className="text-sm text-[#555555]">Call or text anytime</p>
                  </div>
                </a>

                <a href={`mailto:${email}`} className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
                  <div className="bg-[#2A9D8F]/10 p-3 rounded-xl">
                    <Mail size={20} className="text-[#2A9D8F]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#333333]">{email}</p>
                    <p className="text-sm text-[#555555]">Email for quick questions</p>
                  </div>
                </a>

                <div className="flex items-center space-x-4">
                  <div className="bg-[#E76F51]/10 p-3 rounded-xl">
                    <MapPin size={20} className="text-[#E76F51]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#333333]">{address}</p>
                    <p className="text-sm text-[#555555]">{officeHours}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <div className="bg-white p-8 rounded-2xl shadow-md mt-8">
            <h3 className="text-xl font-bold text-[#333333] mb-6">Follow Me</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.facebook.com/LaraLovesPhoenix"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#4267B2]/10 p-3 rounded-xl hover:bg-[#4267B2] hover:text-white transition-colors group"
              >
                <Facebook size={20} className="text-[#4267B2] group-hover:text-white" />
              </a>
              <a
                href="https://www.instagram.com/laralovesphoenix/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E4405F]/10 p-3 rounded-xl hover:bg-[#E4405F] hover:text-white transition-colors group"
              >
                <Instagram size={20} className="text-[#E4405F] group-hover:text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/lara-chapman-b4b025357/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0077B5]/10 p-3 rounded-xl hover:bg-[#0077B5] hover:text-white transition-colors group"
              >
                <Linkedin size={20} className="text-[#0077B5] group-hover:text-white" />
              </a>
              <a
                href="https://www.youtube.com/@LaraLovesPhoenix"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FF0000]/10 p-3 rounded-xl hover:bg-[#FF0000] hover:text-white transition-colors group"
              >
                <Youtube size={20} className="text-[#FF0000] group-hover:text-white" />
              </a>
              <a
                href="https://x.com/larablissr1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1DA1F2]/10 p-3 rounded-xl hover:bg-[#1DA1F2] hover:text-white transition-colors group"
              >
                <Twitter size={20} className="text-[#1DA1F2] group-hover:text-white" />
              </a>
            </div>
            <p className="text-sm text-[#555555] mt-4">
              {socialBlurb}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact