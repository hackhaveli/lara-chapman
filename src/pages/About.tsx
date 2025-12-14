import { motion } from 'framer-motion'
import { usePageContent } from '../hooks/usePageContent'

const About = () => {
  const { content, loading } = usePageContent();

  // Get dynamic content with fallbacks
  const pageTitle = content?.about?.pageTitle || 'Meet Lara Chapman';
  const pageSubtitle = content?.about?.pageSubtitle || 'Your trusted partner in Phoenix Valley real estate';
  const fullBio = content?.about?.fullBio || `I'm proud to be a native Phoenician and Realtor® with Bliss Realty. I've watched the Valley of the Sun grow and evolve into one of the most desirable places to live in the country. My deep roots in this community give me unique insights into neighborhood trends, market dynamics, and the lifestyle that makes Phoenix special.

My journey to real estate began with dual business degrees from Arizona State University, where I developed a strong foundation in financial analysis and market evaluation. This background allows me to help clients make informed decisions about what is often their largest investment. While in school, I worked in a variety of service roles that taught me the value of hard work and communication. I went on to a career in finance and operations management, and later built my own massage therapy practice, an experience that taught me the importance of listening, understanding individual needs, and providing personalized care. These skills translate perfectly to real estate, where every client has unique circumstances and dreams.

Along the way, I began investing in real estate. First with long-term rentals, then vacation properties, then fix-and-flips. With every project my passion for creating and connecting people to fantastic homes grew stronger. That same journey also introduced me to home staging. It developed naturally from my love of hospitality, interior design and understanding of how presentation impacts perception. I've seen firsthand how proper staging can transform a property, helping it sell faster and for more money.

Today, I combine all these experiences as a full-service Realtor® with Bliss Realty. Whether you're a first-time homebuyer, a growing family needing more space, or an investor building a portfolio, I bring expertise, integrity, and genuine care to every transaction.`;

  const philosophyTitle = content?.about?.philosophyTitle || "My Commitment to You";
  const philosophyText = content?.about?.philosophyText || "Real estate is more than just buying and selling property—it's about helping people transition to new chapters in their lives. I'm committed to making that transition as smooth, successful, and stress-free as possible.";
  const lifestyleTitle = content?.about?.lifestyleTitle || 'Living the Phoenix Valley Dream';
  const lifestyleText = content?.about?.lifestyleText || 'From desert hiking trails to world-class dining, let me help you find your perfect place in this incredible community.';

  // Split bio into paragraphs
  const bioParagraphs = fullBio.split('\n\n').filter((p: string) => p.trim());

  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-[#333333] mb-6 font-serif">{pageTitle}</h1>
          <p className="text-xl text-[#555555] max-w-2xl mx-auto">
            {pageSubtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ) : (
              <div className="space-y-4 text-[#555555] leading-relaxed">
                {bioParagraphs.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}

            <div className="bg-[#E76F51]/10 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-[#333333] mb-3">{philosophyTitle}</h3>
              <p className="text-[#555555]">
                {philosophyText}
              </p>
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-[#E76F51]/20 to-[#2A9D8F]/20 p-8 rounded-2xl">
              <img
                src="/profile.jpg"
                alt="Lara Chapman, Realtor"
                className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
              />
            </div>
            <div className="mt-8 space-y-2">
              <h3 className="text-2xl font-bold text-[#333333]">Lara Chapman</h3>
              <p className="text-[#E76F51] font-semibold">Realtor® | Investor | Home Stager</p>
              <p className="text-[#555555]">Bliss Realty</p>
            </div>
          </motion.div>
        </div>

        {/* Lifestyle Photo Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Phoenix Valley Lifestyle"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl mx-auto px-6">
                <h3 className="text-3xl font-bold mb-4 font-serif">{lifestyleTitle}</h3>
                <p className="text-xl">
                  {lifestyleText}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About