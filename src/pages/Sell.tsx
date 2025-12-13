import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Camera, TrendingUp, FileText, Key, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'

const Sell = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const sellerSteps = [
    {
      icon: DollarSign,
      title: 'Strategic Pricing Analysis',
      description: 'I analyze recent sales, current market conditions, and your home\'s unique features to price it competitively for maximum return.'
    },
    {
      icon: Camera,
      title: 'Professional Staging & Photography',
      description: 'Transform your home with professional staging techniques and high-quality photography that showcases its best features.'
    },
    {
      icon: TrendingUp,
      title: 'Comprehensive Marketing Strategy',
      description: 'Multi-channel marketing including MLS, social media, professional networks, and targeted advertising to reach qualified buyers.'
    },
    {
      icon: FileText,
      title: 'Expert Negotiation',
      description: 'I handle all negotiations to secure the best possible terms, price, and timeline for your sale.'
    },
    {
      icon: CheckCircle,
      title: 'Transaction Management',
      description: 'From contract to closing, I coordinate inspections, appraisals, and all paperwork to ensure a smooth process.'
    },
    {
      icon: Key,
      title: 'Successful Closing',
      description: 'I\'m with you through closing day and beyond, ensuring all details are handled professionally.'
    }
  ]

  const stagingGallery = [
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

  const faqs = [
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
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-[#333333] mb-6 font-serif">Selling Your Home with Lara</h1>
          <p className="text-xl text-[#555555] max-w-3xl mx-auto">
            Get top dollar for your home with strategic pricing, professional staging, and expert marketing that reaches qualified buyers.
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
            <h2 className="text-5xl font-bold text-[#333333] mb-6 font-serif">Your Home Selling Journey</h2>
            <p className="text-xl text-[#555555] max-w-2xl mx-auto">
              I guide you through every step of the selling process to maximize your home's value and minimize stress.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sellerSteps.map(({ icon: Icon, title, description }, index) => (
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
                    <Icon size={32} className="text-[#E76F51]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-4">{title}</h3>
                <p className="text-[#555555] leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Staging Gallery Section */}
        <section className="py-16 bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#333333] mb-4">Staging Examples</h2>
              <p className="text-xl text-[#555555] max-w-3xl mx-auto">
                See how professional staging transforms spaces to appeal to potential buyers.
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
                Professional staging can help your home sell faster and for a higher price.
                As a certified home stager, I can help you prepare your home to make the best possible impression on buyers.
              </p>
              <a
                href="https://styleandstaging.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#E76F51] hover:bg-[#E76F51]/90 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Learn More About Staging Services
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
            <h2 className="text-5xl font-bold text-[#333333] mb-6 font-serif">Helpful Resources</h2>
            <p className="text-xl text-[#555555] max-w-2xl mx-auto">
              Download free guides and tools to help you prepare for selling your home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 text-center flex flex-col"
            >
              <div className="bg-[#E76F51]/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <FileText size={28} className="text-[#E76F51]" />
              </div>
              <h3 className="text-2xl font-bold text-[#333333] mb-4">Home Selling Guide</h3>
              <p className="text-[#555555] mb-6 flex-grow">
                Download my comprehensive guide to selling your home in the Phoenix Valley.
              </p>
              <button
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = '/sellers guide.pdf'
                  link.download = 'sellers guide.pdf'
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
                className="inline-block bg-[#E76F51] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#E76F51]/90 transition-colors mt-auto"
              >
                Download Guide
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 text-center flex flex-col"
            >
              <div className="bg-[#2A9D8F]/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <DollarSign size={28} className="text-[#2A9D8F]" />
              </div>
              <h3 className="text-2xl font-bold text-[#333333] mb-4">Free Home Value Estimate</h3>
              <p className="text-[#555555] mb-6 flex-grow">
                Get an accurate estimate of your home's current market value.
              </p>
              <a
                href="https://www.highway.ai/app/homereport/register/dTfLtaKXS3?creationSource=signup_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#2A9D8F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2A9D8F]/90 transition-colors mt-auto"
              >
                Get Estimate
              </a>
            </motion.div>
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
            <h2 className="text-5xl font-bold text-[#333333] mb-6 font-serif">Frequently Asked Questions</h2>
            <p className="text-xl text-[#555555] max-w-2xl mx-auto">
              Get answers to common questions about selling your home in the Phoenix Valley.
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
            <h2 className="text-4xl font-bold mb-6 font-serif">Ready to Sell Your Home?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get a free, no-obligation home value estimate and learn how I can help you achieve your selling goals.
            </p>
            <a
              href="https://www.highway.ai/app/homereport/register/dTfLtaKXS3?creationSource=signup_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#E76F51] px-12 py-4 rounded-xl font-semibold uppercase tracking-wide hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Request a Free Home Value Estimate Today
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Sell