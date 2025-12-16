import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Camera, TrendingUp, FileText, Key, CheckCircle, ChevronDown, ChevronUp, Search, Eye, Home, Star, Award, Target } from 'lucide-react'
import { usePageContent } from '../hooks/usePageContent';

// Icon mapping for dynamic content
const iconMap: { [key: string]: any } = {
  FileText, Search, Eye, Key, Home, DollarSign, Camera, TrendingUp, CheckCircle, Star, Award, Target
};

// Default seller steps for fallback
const defaultSellerSteps = [
  { icon: 'DollarSign', title: 'Strategic Pricing Analysis', text: 'I analyze recent sales, current market conditions, and your home\'s unique features to price it competitively for maximum return.' },
  { icon: 'Camera', title: 'Professional Staging & Photography', text: 'Transform your home with professional staging techniques and high-quality photography that showcases its best features.' },
  { icon: 'TrendingUp', title: 'Comprehensive Marketing Strategy', text: 'Multi-channel marketing including MLS, social media, professional networks, and targeted advertising to reach qualified buyers.' },
  { icon: 'FileText', title: 'Expert Negotiation', text: 'I handle all negotiations to secure the best possible terms, price, and timeline for your sale.' },
  { icon: 'CheckCircle', title: 'Transaction Management', text: 'From contract to closing, I coordinate inspections, appraisals, and all paperwork to ensure a smooth process.' },
  { icon: 'Key', title: 'Successful Closing', text: 'I\'m with you through closing day and beyond, ensuring all details are handled professionally.' }
];

const Sell = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { content, loading } = usePageContent();

  // Use API data if available, otherwise fall back to defaults
  const sellerSteps = content?.sell?.marketingPoints && content.sell.marketingPoints.length > 0
    ? content.sell.marketingPoints
    : defaultSellerSteps;

  const stagingGallery = content?.sell?.stagingGallery && content.sell.stagingGallery.length > 0 ? content.sell.stagingGallery : [
    {
      image: 'https://images.pexels.com/photos/2029695/pexels-photo-2029695.jpeg?auto=compress&cs=tinysrgb&w=800',
      room: 'Modern Kitchen',
      description: 'Transformed with sleek white cabinetry, stainless appliances, and strategic lighting to create an inviting culinary space.'
    },
    {
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
      room: 'Spacious Living Room',
      description: 'Clean lines, neutral tones, and carefully placed furniture create an open, welcoming atmosphere.'
    },
    {
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
      room: 'Grand Master Bedroom',
      description: 'Luxurious retreat with elegant furnishings, sophisticated color palette, and premium bedding.'
    },
    {
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
      room: 'Luxury Bathroom',
      description: 'Spa-like ambiance with modern fixtures, elegant vanity, and refined styling details.'
    },
  ];

  const faqs = content?.sell?.faqs && content.sell.faqs.length > 0 ? content.sell.faqs : [
    {
      question: 'How do you determine the right listing price for my home?',
      answer: 'I conduct a comprehensive market analysis looking at recent sales of similar homes, current market conditions, and your home\'s unique features. This data-driven approach ensures we price your home competitively to attract buyers while maximizing your return.'
    },
    {
      question: 'What staging services do you provide?',
      answer: 'I offer complete staging consultation including furniture arrangement, decluttering guidance, minor repairs recommendations, and professional photography coordination. For vacant homes, I can arrange furniture rental and full staging services.'
    },
    {
      question: 'How long does it typically take to sell a home?',
      answer: 'Every home and neighborhood is different, so there isn\'t a one-size-fits-all answer. Timing depends on factors like current buyer demand, pricing, and how well a home is presented. To get the clearest picture, check out the market reports under the Neighborhood tab, where you can see up-to-date stats on how quickly homes are selling in your specific area.'
    },
    {
      question: 'What are your commission rates?',
      answer: 'My commission structure is competitive and transparent. I believe in providing exceptional value through professional marketing, expert negotiation, and full-service support. Let\'s discuss your specific needs and I\'ll provide you with detailed information about costs and services.'
    },
    {
      question: 'Do you offer any guarantees?',
      answer: 'While I can\'t guarantee a specific sale price or timeline (as these depend on market conditions), I do guarantee professional service, transparent communication, and dedicated advocacy for your interests throughout the entire process.'
    }
  ];

  const resources = content?.sell?.resources && content.sell.resources.length > 0 ? content.sell.resources : [];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  // Get dynamic content with fallbacks
  const introTitle = content?.sell?.introTitle || 'Selling Your Home with Lara';
  const introText = content?.sell?.introText || 'Get top dollar for your home with strategic pricing, professional staging, and expert marketing that reaches qualified buyers.';
  const stepsTitle = content?.sell?.stepsTitle || 'Your Home Selling Journey';
  const stepsSubtitle = content?.sell?.stepsSubtitle || 'I guide you through every step of the selling process to maximize your home\'s value and minimize stress.';
  const stagingTitle = content?.sell?.stagingTitle || 'Staging Examples';
  const stagingSubtitle = content?.sell?.stagingSubtitle || 'See how professional staging transforms spaces to appeal to potential buyers.';
  const stagingCta = content?.sell?.stagingCta || 'Professional staging can help your home sell faster and for a higher price. As a certified home stager, I can help you prepare your home to make the best possible impression on buyers.';
  const stagingButtonText = content?.sell?.stagingButtonText || 'Learn More About Staging Services';
  const stagingButtonUrl = content?.sell?.stagingButtonUrl || 'https://styleandstaging.com';
  const resourcesTitle = content?.sell?.resourcesTitle || 'Helpful Resources';
  const resourcesSubtitle = content?.sell?.resourcesSubtitle || 'Download free guides and tools to help you prepare for selling your home.';
  const faqTitle = content?.sell?.faqTitle || 'Frequently Asked Questions';
  const faqSubtitle = content?.sell?.faqSubtitle || 'Get answers to common questions about selling your home in the Phoenix Valley.';
  const ctaTitle = content?.sell?.ctaTitle || 'Ready to Sell Your Home?';
  const ctaText = content?.sell?.ctaText || 'Get a free, no-obligation home value estimate and learn how I can help you achieve your selling goals.';
  const ctaButtonText = content?.sell?.ctaButtonText || 'Request a Free Home Value Estimate Today';
  const ctaButtonUrl = content?.sell?.ctaButtonUrl || 'https://www.highway.ai/app/homereport/register/dTfLtaKXS3?creationSource=signup_link';

  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-[#333333] mb-6 font-serif">{introTitle}</h1>
          <p className="text-xl text-[#555555] max-w-3xl mx-auto">
            {introText}
          </p>
        </motion.div>

        {/* Seller Process Steps */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#333333] mb-6 font-serif">{stepsTitle}</h2>
            <p className="text-xl text-[#555555] max-w-2xl mx-auto">
              {stepsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton
              [...Array(6)].map((_, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-md animate-pulse">
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
                    <div className="bg-gray-200 w-16 h-16 rounded-xl"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))
            ) : (
              sellerSteps.map((step, index) => {
                const IconComponent = iconMap[step.icon] || DollarSign;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-[#E76F51] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                      <div className="bg-[#E76F51]/10 w-16 h-16 rounded-xl flex items-center justify-center">
                        <IconComponent size={32} className="text-[#E76F51]" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#333333] mb-4">{step.title}</h3>
                    <p className="text-[#555555] leading-relaxed">{step.text}</p>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.section>

        {/* Staging Gallery Section */}
        <section className="py-16 bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#333333] mb-4">{stagingTitle}</h2>
              <p className="text-xl text-[#555555] max-w-3xl mx-auto">
                {stagingSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {stagingGallery.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.room}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#333333] mb-2">{item.room}</h3>
                    <p className="text-[#555555]">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-lg text-[#555555] mb-6 max-w-3xl mx-auto">
                {stagingCta}
              </p>
              <a
                href={stagingButtonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#E76F51] hover:bg-[#E76F51]/90 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                {stagingButtonText}
              </a>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#333333] mb-6 font-serif">{resourcesTitle}</h2>
            <p className="text-xl text-[#555555] max-w-2xl mx-auto">
              {resourcesSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {resources.map((resource, index) => {
              const IconComponent = iconMap[resource.icon] || FileText;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 text-center flex flex-col"
                >
                  <div className="bg-[#E76F51]/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent size={28} className="text-[#E76F51]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#333333] mb-4">{resource.title}</h3>
                  <p className="text-[#555555] mb-6 flex-grow">
                    {resource.description}
                  </p>
                  {resource.isDownload ? (
                    <button
                      onClick={() => {
                        const link = document.createElement('a')
                        link.href = resource.buttonUrl
                        link.download = resource.buttonUrl.replace('/', '')
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                      }}
                      className="inline-block bg-[#E76F51] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#E76F51]/90 transition-colors mt-auto"
                    >
                      {resource.buttonText}
                    </button>
                  ) : resource.isExternal ? (
                    <a
                      href={resource.buttonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[#2A9D8F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2A9D8F]/90 transition-colors mt-auto"
                    >
                      {resource.buttonText}
                    </a>
                  ) : (
                    <a
                      href={resource.buttonUrl}
                      className="inline-block bg-[#2A9D8F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2A9D8F]/90 transition-colors mt-auto"
                    >
                      {resource.buttonText}
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#333333] mb-6 font-serif">{faqTitle}</h2>
            <p className="text-xl text-[#555555] max-w-2xl mx-auto">
              {faqSubtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-[#333333] pr-4">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUp size={24} className="text-[#E76F51] flex-shrink-0" />
                  ) : (
                    <ChevronDown size={24} className="text-[#E76F51] flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-8 pb-6"
                  >
                    <p className="text-[#555555] leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-[#E76F51] p-16 rounded-2xl text-white">
            <h2 className="text-4xl font-bold mb-6 font-serif">{ctaTitle}</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {ctaText}
            </p>
            <a
              href={ctaButtonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#E76F51] px-12 py-4 rounded-xl font-semibold uppercase tracking-wide hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              {ctaButtonText}
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Sell