
import { motion } from 'framer-motion'
import { Search, Eye, FileText, Key, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import MortgageCalculator from '../components/MortgageCalculator';

const SearchBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex justify-center mb-16"
    >
      <a
        href="https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-[#E76F51] text-white px-12 py-4 rounded-xl font-semibold uppercase tracking-wide hover:bg-[#E76F51]/90 transition-all duration-200 hover:scale-105 shadow-lg"
      >
        Search Homes for Sale
      </a>
    </motion.div>
  )
}

const BuyerSteps = () => {
  const steps = [
    {
      icon: FileText,
      title: 'Understanding Your Goals',
      description: 'We start with a detailed consultation to understand your needs, timeline, and budget.'
    },
    {
      icon: Search,
      title: 'Tailored Property Search',
      description: 'I create a customized search based on your criteria and send you listings as they hit the market.'
    },
    {
      icon: Eye,
      title: 'Guided Property Showings',
      description: 'Together, we tour properties with a critical eye, discussing pros, cons, and market positioning.'
    },
    {
      icon: FileText,
      title: 'Strategic Negotiation',
      description: 'I leverage market knowledge and negotiation skills to get you the best possible terms.'
    },
    {
      icon: Key,
      title: 'Managing Transaction Details',
      description: 'From inspections to appraisals, I coordinate all aspects to ensure a smooth process.'
    },
    {
      icon: Key,
      title: 'Closing & Beyond',
      description: 'I\'m with you through closing and available for any post-purchase questions or needs.'
    }
  ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24"
    >
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-[#333333] mb-6 font-serif">Your Home Buying Journey</h2>
        <p className="text-xl text-[#555555] max-w-2xl mx-auto">
          I guide you through every step of the process, making home buying as smooth and successful as possible.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {steps.map(({ icon: Icon, title, description }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex items-start space-x-6"
          >
            <div className="flex-shrink-0 bg-[#E76F51] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
              {index + 1}
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md flex-1 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-[#E76F51]/10 p-3 rounded-xl">
                  <Icon size={24} className="text-[#E76F51]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#333333] mb-2">{title}</h3>
                  <p className="text-[#555555] leading-relaxed">{description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

const NeighborhoodExploration = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white p-12 rounded-2xl shadow-md">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#333333] mb-6 font-serif">Explore Phoenix Valley Neighborhoods</h2>
            <p className="text-xl text-[#555555] mb-8 leading-relaxed">
              Every community in the Valley has its own character, lifestyle, and price points.
              Explore my neighborhood guides to find the area that feels like home.
            </p>
            <Link
              to="/neighborhoods"
              className="inline-block bg-[#2A9D8F] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#2A9D8F]/90 transition-colors"
            >
              View Neighborhood Guides
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

const ResourcesSection = () => {
  const handleDownload = (fileName: string) => {
    const link = document.createElement('a')
    link.href = `/${fileName}`
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const resources = [
    {
      icon: Home,
      title: 'Home Buying Guide',
      description: 'Download my comprehensive guide to buying your home in the Phoenix Valley.',
      action: 'Download Guide',
      onClick: () => handleDownload('buyers guide.pdf'),
      isDownload: true
    },
    {
      icon: FileText,
      title: 'Market Reports',
      description: 'Stay informed with the latest Phoenix Valley market data.',
      action: 'View Reports',
      link: '/neighborhoods',
      external: false,
      isDownload: false
    }
  ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-[#FAF9F6]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#333333] mb-6 font-serif">Helpful Resources</h2>
          <p className="text-xl text-[#555555] max-w-2xl mx-auto">
            Tools and information to help you make informed decisions throughout your home buying journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Mortgage Calculator Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <MortgageCalculator />
          </motion.div>

          {/* Other Resource Cards */}
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 text-center flex flex-col"
              >
                <div className="bg-[#2A9D8F]/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Icon size={28} className="text-[#2A9D8F]" />
                </div>
                <h3 className="text-2xl font-bold text-[#333333] mb-4">{resource.title}</h3>
                <p className="text-[#555555] mb-6 flex-grow">{resource.description}</p>
                {resource.isDownload ? (
                  <button
                    onClick={resource.onClick}
                    className="inline-block bg-[#2A9D8F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2A9D8F]/90 transition-colors mt-auto"
                  >
                    {resource.action}
                  </button>
                ) : resource.external ? (
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#2A9D8F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2A9D8F]/90 transition-colors mt-auto"
                  >
                    {resource.action}
                  </a>
                ) : (
                  <Link
                    to={resource.link || '/'}
                    className="inline-block bg-[#2A9D8F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2A9D8F]/90 transition-colors mt-auto"
                  >
                    {resource.action}
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#E76F51] text-white px-12 py-4 rounded-xl font-semibold uppercase tracking-wide hover:bg-[#E76F51]/90 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Start Your Home Search Today
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}

const Buy = () => {
  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-[#333333] mb-6 font-serif">Buying a Home in the Phoenix Valley</h1>
          <p className="text-xl text-[#555555] max-w-3xl mx-auto">
            Get access to the same MLS database that Realtors® use, updated every 15 minutes with the most accurate
            and up-to-date information available.
          </p>
        </motion.div>

        <SearchBar />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-md mb-16"
        >
          <p className="text-lg text-[#555555] text-center leading-relaxed">
            This is the same MLS Realtors® use — updated every 15 minutes and more accurate than Zillow, Realtor.com,
            or other consumer sites. Get the real story on pricing, availability, and market trends with professional-grade data.
          </p>
        </motion.div>

        <BuyerSteps />
        <NeighborhoodExploration />
        <ResourcesSection />
      </div>
    </div>
  )
}

export default Buy