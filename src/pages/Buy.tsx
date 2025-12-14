
import { motion } from 'framer-motion'
import { Search, Eye, FileText, Key, Home, DollarSign, Camera, TrendingUp, CheckCircle, Star, Award, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import MortgageCalculator from '../components/MortgageCalculator';
import { usePageContent } from '../hooks/usePageContent';

// Icon mapping for dynamic content
const iconMap: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
  FileText, Search, Eye, Key, Home, DollarSign, Camera, TrendingUp, CheckCircle, Star, Award, Target
};

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

// Default steps for fallback
const defaultSteps = [
  { icon: 'FileText', title: 'Understanding Your Goals', text: 'We start with a detailed consultation to understand your needs, timeline, and budget.' },
  { icon: 'Search', title: 'Tailored Property Search', text: 'I create a customized search based on your criteria and send you listings as they hit the market.' },
  { icon: 'Eye', title: 'Guided Property Showings', text: 'Together, we tour properties with a critical eye, discussing pros, cons, and market positioning.' },
  { icon: 'FileText', title: 'Strategic Negotiation', text: 'I leverage market knowledge and negotiation skills to get you the best possible terms.' },
  { icon: 'Key', title: 'Managing Transaction Details', text: 'From inspections to appraisals, I coordinate all aspects to ensure a smooth process.' },
  { icon: 'Key', title: 'Closing & Beyond', text: 'I\'m with you through closing and available for any post-purchase questions or needs.' }
];

const BuyerSteps = () => {
  const { content, loading } = usePageContent();

  // Use API data if available, otherwise fall back to defaults
  const steps = content?.buy?.steps && content.buy.steps.length > 0
    ? content.buy.steps
    : defaultSteps;

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
        {loading ? (
          // Loading skeleton
          [...Array(6)].map((_, index) => (
            <div key={index} className="flex items-start space-x-6 animate-pulse">
              <div className="flex-shrink-0 bg-gray-300 w-12 h-12 rounded-full"></div>
              <div className="flex-1 bg-white p-6 rounded-2xl shadow-md">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))
        ) : (
          steps.map((step, index) => {
            const IconComponent = iconMap[step.icon] || FileText;
            return (
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
                      <IconComponent size={24} className="text-[#E76F51]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#333333] mb-2">{step.title}</h3>
                      <p className="text-[#555555] leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.section>
  )
}


const NeighborhoodExploration = () => {
  const { content } = usePageContent();

  // Get dynamic content with fallbacks
  const title = content?.buy?.neighborhoodTitle || 'Explore Phoenix Valley Neighborhoods';
  const text = content?.buy?.neighborhoodText || 'Every community in the Valley has its own character, lifestyle, and price points. Explore my neighborhood guides to find the area that feels like home.';

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
            <h2 className="text-4xl font-bold text-[#333333] mb-6 font-serif">{title}</h2>
            <p className="text-xl text-[#555555] mb-8 leading-relaxed">
              {text}
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
  const { content } = usePageContent();

  // Get dynamic content with fallbacks
  const introTitle = content?.buy?.introTitle || 'Buying a Home in the Phoenix Valley';
  const introText = content?.buy?.introText || 'Get access to the same MLS database that Realtors® use, updated every 15 minutes with the most accurate and up-to-date information available.';
  const mlsDescription = content?.buy?.mlsDescription || 'This is the same MLS Realtors® use — updated every 15 minutes and more accurate than Zillow, Realtor.com, or other consumer sites. Get the real story on pricing, availability, and market trends with professional-grade data.';

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

        <SearchBar />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-md mb-16"
        >
          <p className="text-lg text-[#555555] text-center leading-relaxed">
            {mlsDescription}
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