import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'


// Neighborhood data structure
interface Neighborhood {
  id: string
  slug: string
  title: string
  description: string
  video_url: string | null
  highlights: string[]
  quick_facts: {
    homeValues: string
    costOfLiving: string
    lifestyle: string
  }
  didYouKnow: string
  schools: string
  summary: Array<{ feature: string, description: string }>
  ctaButtons: string[]
}

// Sample neighborhood data matching the text file content
const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: '1',
    slug: 'mesa',
    title: 'Mesa',
    description: "Mesa is one of the Valley's most eclectic and diverse cities, with deeply rooted communities and a creative spirit. It blends affordability with access to outdoor recreation, cultural amenities, and welcoming neighborhoods. You'll find everything from historic districts and mid-century homes to large master-planned communities.",
    video_url: 'https://www.youtube.com/watch?v=blxhocllSXk',
    highlights: [
      'Historic homes, master-planned communities, and 55+ neighborhoods',
      'Salt River, Usery Park, and mountain access nearby',
      'Theaters including the Mesa Arts Center and Mesa Amphitheater',
      'Lower home prices than many other areas in the Valley'
    ],
    quick_facts: {
      homeValues: 'Generally more affordable than Scottsdale or Paradise Valley; range from modest homes to luxury developments like Las Sendas and Eastmark.',
      costOfLiving: 'Housing is more affordable than many Valley cities; sales tax is 8.3%. Diverse dining is mostly mid-range pricing from chains to family-owned spots and diverse ethnic eateries. Retail skews toward discount and mid-range with fewer luxury options.',
      lifestyle: 'Mesa offers year-round outdoor activity with hiking, river sports, biking, and golf, plus a vibrant arts scene at the Mesa Arts Center and amphitheater. Its Asian District highlights the city\'s cultural diversity, while spring training baseball adds seasonal energy.'
    },
    didYouKnow: 'Mesa was founded in 1878 by Mormon pioneers who built canals based on ancient Hohokam designs - some of which still carry water today.',
    schools: 'Mesa is served by Mesa Public Schools, Arizona\'s largest district, along with many charter and private school options. Mesa Public Schools offers a wide range of programs, from STEM to arts.',
    summary: [
      { feature: 'Eclectic Mix', description: 'Historic homes, master-planned communities, and 55+ neighborhoods.' },
      { feature: 'Outdoors', description: 'Salt River, Usery Park, and mountain access nearby.' },
      { feature: 'Cultural Life', description: 'Theaters including the Mesa Arts Center and Mesa Amphitheater, museums and spring training baseball.' },
      { feature: 'Affordability', description: 'Lower home prices than many other areas in the Valley, with diverse housing options.' }
    ],
    ctaButtons: [
      'View the Mesa Market Report',
      'Search Homes in Mesa'
    ]
  },
  {
    id: '2',
    slug: 'gilbert',
    title: 'Gilbert',
    description: "Gilbert has grown from its agricultural roots into one of the Valley's most community-oriented areas. It retains a small-town feel with a thriving downtown and newer master-planned neighborhoods. It's consistently ranked among the safest cities in the U.S.",
    video_url: 'https://youtu.be/B0UJpA2XJzs?si=aoG3bNta6rBoenZs',
    highlights: [
      'Local events, parks, and schools anchor Gilbert\'s connected way of life',
      'Older homes downtown + new builds',
      'Mix of suburban comfort and lively downtown entertainment'
    ],
    quick_facts: {
      homeValues: 'Range from older homes near downtown to newer builds in master-planned communities.',
      costOfLiving: 'Moderate housing costs, with sales tax at 8.3%. Dining is mostly casual with some trendy restaurants in Downtown Gilbert and around San Tan Mall. Shopping is dominated by regional malls and mid-range retail; fewer luxury stores.',
      lifestyle: 'Gilbert is accessible and approachable, with outdoor spaces like Riparian Preserve and Freestone Park, lively community events, and dining along Downtown Gilbert\'s restaurant row. Agritopia adds a unique walkable hub with farms, local businesses, and gathering spots.'
    },
    didYouKnow: 'Once nicknamed the "Hay Shipping Capital of the World," Gilbert\'s farming roots are still reflected in places like Agritopia and the Riparian Preserve.',
    schools: 'Gilbert is served by Gilbert Public Schools and Higley Unified School District, along with charter and private schools. According to GreatSchools.org, many of the local schools are rated 8 or higher.',
    summary: [
      { feature: 'Community Oriented', description: 'Local events, parks, and schools anchor Gilbert\'s connected way of life.' },
      { feature: 'Housing Variety', description: 'Older homes downtown + new builds.' },
      { feature: 'Lifestyle', description: 'Mix of suburban comfort and lively downtown entertainment.' }
    ],
    ctaButtons: [
      'View the Gilbert Market Report',
      'Search Homes in Gilbert'
    ]
  },
  {
    id: '3',
    slug: 'south-tempe-chandler-ahwatukee',
    title: 'South Tempe / Chandler / Ahwatukee',
    description: "These southern suburbs of Phoenix share a suburban feel, modest affluence, strong schools, and easy freeway access. They offer larger lots, established neighborhoods, plus quick access to outdoor recreation on South Mountain's southern face. Shopping and dining are an everyday convenience, with retail centers and outlet malls nearby offering everything from high-end brands to local essentials. It's also one of the region's major employment hubs - home to tech, aerospace, and logistics companies such as Intel and Amazon - giving residents the advantage of shorter commutes and a strong local economy. Together, these features make the area attractive to those seeking comfort, connection, and opportunity in one place.",
    video_url: 'https://www.youtube.com/watch?v=MWkfeJP6gUc',
    highlights: [
      'Combines suburban comfort with strong connectivity across the Valley',
      'Access to parks, golf, and South Mountain trails',
      'Schools, parks, and recreation amenities support long-term residents',
      'Home to major employers, supporting stable local jobs and growth',
      'Offers everything from outlet shopping to dining and entertainment hubs'
    ],
    quick_facts: {
      homeValues: 'Established neighborhoods with larger but older homes; equestrian-style properties in some areas.',
      costOfLiving: 'Housing cost varies by neighborhood; sales tax ranges from 7.8% (Chandler) to 9.1% (Ahwatukee/Phoenix). Dining and shopping include outlets, regional malls, casual chains, and higher-end options.',
      lifestyle: 'Suburban comfort with outdoor recreation at South Mountain, Desert Breeze Park, Ocotillo Golf Club, and Kiwanis Recreation Center, plus regional attractions and shopping at Arizona Mills (IMAX, SeaLife Aquarium, Legoland, Bubble Planet).'
    },
    didYouKnow: 'Chandler is often called the "Silicon Desert" for its long history with Intel and growing cluster of tech and aerospace employers.',
    schools: 'This area is served by Tempe Union High School District, Kyrene School District in Ahwatukee, and Chandler Unified School District, along with charter and private school options. According to GreatSchools.org, many schools across these districts receive above-average ratings.',
    summary: [
      { feature: 'Balanced Living', description: 'Combines suburban comfort with strong connectivity across the Valley via close and easy freeway access.' },
      { feature: 'Recreation', description: 'Access to parks, golf, and South Mountain trails adds year-round activity.' },
      { feature: 'Strong Community Amenities', description: 'Schools, parks, and recreation amenities support long-term residents.' },
      { feature: 'Economic Strength', description: 'Home to major employers, supporting stable local jobs and growth.' },
      { feature: 'Lifestyle Mix', description: 'Offers everything from outlet shopping to dining and entertainment hubs.' }
    ],
    ctaButtons: [
      'View the South Tempe/Chandler/Ahwatukee Market Report',
      'Search Homes in South Tempe/Chandler/Ahwatukee'
    ]
  },
  {
    id: '4',
    slug: 'north-tempe-scottsdale',
    title: 'North Tempe / South Scottsdale',
    description: "North Tempe and South Scottsdale are energetic and urban, anchored by ASU's campus and Old Town Scottsdale. The area thrives on arts, culture, and nightlife, with events along Mill Avenue and popular destinations like Scottsdale Fashion Square. Outdoor recreation is also central, with Tempe Town Lake and Papago Park offering space for boating, biking, and hiking. Together, the mix of student energy, historic homes, and urban amenities creates one of the Valley's liveliest places to live.",
    video_url: 'https://www.youtube.com/watch?v=I0GyzW1Iam0',
    highlights: [
      'College-town feel with arts, culture, and nightlife',
      'Mix of condos, ranch homes, and new developments',
      'Papago Park, Botanical Garden, Phoenix Zoo and Tempe Town Lake',
      'Highly accessible with four major freeways and nearby Sky Harbor Airport'
    ],
    quick_facts: {
      homeValues: 'Wide range from student condos to high-value mid-century ranch homes.',
      costOfLiving: 'Housing varies widely: condos and older homes are more affordable, while properties near Old Town Scottsdale and Tempe Town Lake are priced above Valley averages. Sales tax is 8.0-8.1%. Restaurants and nightlife are mid- to high-priced, with shopping that includes both discount and luxury options.',
      lifestyle: 'This area is energetic and urban, with nightlife in Old Town Scottsdale, campus culture from ASU, and events along Mill Avenue. Outdoor recreation thrives at Tempe Town Lake and Papago Park, while Scottsdale Fashion Square adds major shopping.'
    },
    didYouKnow: 'Since 1951, the Parada del Sol Parade has rolled through Old Town Scottsdale each spring - billed as the world\'s largest horse-drawn parade.',
    schools: 'The area is served by Tempe Elementary and Tempe Union in Tempe, and Scottsdale Unified School District in South Scottsdale. Many charter and private schools operate nearby as well.',
    summary: [
      { feature: 'Energetic Vibe', description: 'College-town feel with arts, culture, and nightlife.' },
      { feature: 'Housing Variety', description: 'Mix of condos, ranch homes, and new developments.' },
      { feature: 'Outdoor Access', description: 'Papago Park, Botanical Garden, Phoenix Zoo and Tempe Town Lake.' },
      { feature: 'Central Hub', description: 'With four major freeways and nearby Sky Harbor Airport, the area is highly accessible. Light rail adds convenient transit across the East Valley and into downtown Phoenix.' }
    ],
    ctaButtons: [
      'View the North Tempe / South Scottsdale Market Report',
      'Search Homes in North Tempe / South Scottsdale'
    ]
  },
  {
    id: '5',
    slug: 'paradise-valley',
    title: 'Paradise Valley',
    description: "Paradise Valley combines scenic beauty with two distinct ways of living. The Town of Paradise Valley is an ultra-luxury retreat of estates and resorts, prized for privacy and exclusivity. Paradise Valley Village, part of Phoenix, delivers a more balanced lifestyle with established neighborhoods, local dining, and regional shopping centers alongside easy access to hiking and golf. Both areas benefit from dramatic views of Camelback and the Phoenix Mountain Preserve.",
    video_url: 'https://www.youtube.com/watch?v=_IX5dPK8Oeg',
    highlights: [
      'The Town of Paradise Valley is one of Arizona\'s most prestigious residential enclaves',
      'PV Village offers more housing diversity, from ranch homes to remodels',
      'Iconic views of Camelback, Mummy, and the Phoenix Mountain Preserve',
      'Town of PV is luxury-driven, while PV Village balances upscale living'
    ],
    quick_facts: {
      homeValues: 'Town of Paradise Valley has the highest housing prices in the state, commonly over $2M; Paradise Valley Village: a wider range of housing, from modest ranch homes to higher-end remodels.',
      costOfLiving: 'Town of Paradise Valley: ultra-luxury housing, sales tax 8.8%, dining and shopping heavily upscale. Paradise Valley Village: variety of options with mid to high pricing, sales tax 9.1%, with everyday retail centers, casual restaurants, and mid-range shopping alongside some higher-end options.',
      lifestyle: 'Scenic mountain views, hiking and golf, luxury resorts and spas with a blend of residential comfort and accessible amenities.'
    },
    didYouKnow: 'The Town of Paradise Valley was incorporated in 1961 to preserve its quiet, open desert character rather than being annexed by Phoenix or Scottsdale.',
    schools: 'The town of Paradise Valley is primarily served by Scottsdale Unified School District (SUSD). Paradise Valley Village (Phoenix) falls under Paradise Valley Unified School District (PVSchools). Charter and private options are also available in both areas.',
    summary: [
      { feature: 'Exclusivity', description: 'The Town of Paradise Valley is one of Arizona\'s most prestigious residential enclaves.' },
      { feature: 'Variety', description: 'PV Village offers more housing diversity, from ranch homes to remodels.' },
      { feature: 'Natural Beauty', description: 'Iconic views of Camelback, Mummy, and the Phoenix Mountain Preserve.' },
      { feature: 'Lifestyle Options', description: 'Town of PV is luxury-driven, while PV Village balances upscale living with everyday conveniences.' }
    ],
    ctaButtons: [
      'View the Paradise Valley Market Report',
      'Search Homes in Paradise Valley'
    ]
  },
  {
    id: '6',
    slug: 'north-scottsdale',
    title: 'North Scottsdale',
    description: "North Scottsdale blends serenity, exclusivity, and natural beauty. Residents enjoy sweeping mountain views, luxury master-planned communities, and a quieter pace compared to central Scottsdale and much of the Phoenix Valley. Amenities include resort-style golf courses, high-end shopping, and extensive hiking trails.",
    video_url: 'https://www.youtube.com/watch?v=0V65v-hhwl0',
    highlights: [
      'Recognized as one of the Valley\'s most desirable addresses',
      'Higher elevation and low-density communities provide a quieter lifestyle',
      'Desert preserves and mountain views define the area\'s character',
      'Housing and amenities are tailored to high-end tastes and lifestyles'
    ],
    quick_facts: {
      homeValues: 'Luxury homes often start near $1M, with estates far above that.',
      costOfLiving: 'Housing is among the highest in the Valley, with luxury communities dominating. Sales tax is 8.0%. Dining and shopping skew upscale, from fine dining to luxury retail at Scottsdale Quarter and Kierland Commons. Discount options are limited.',
      lifestyle: 'Upscale and nature-oriented, with luxury golf courses, fine dining, high-end shopping at Kierland Commons and Scottsdale Quarter, and desert trails in the McDowell Sonoran Preserve.'
    },
    didYouKnow: 'The McDowell Sonoran Preserve, spanning more than 30,000 acres, is the largest urban wilderness area in the United States.',
    schools: 'Served by Scottsdale Unified School District and Paradise Valley Unified School District, plus respected charter and private schools.',
    summary: [
      { feature: 'Prestige', description: 'Recognized as one of the Valley\'s most desirable addresses.' },
      { feature: 'Tranquility', description: 'Higher elevation and low-density communities provide a quieter lifestyle.' },
      { feature: 'Natural Setting', description: 'Desert preserves and mountain views define the area\'s character.' },
      { feature: 'Upscale Choices', description: 'Housing and amenities are tailored to high-end tastes and lifestyles.' }
    ],
    ctaButtons: [
      'View the North Scottsdale Market Report',
      'Search Homes in North Scottsdale'
    ]
  },
  {
    id: '7',
    slug: 'encanto-village',
    title: 'Encanto Village',
    description: "Encanto Village sits in the heart of Phoenix, just west of downtown. It's defined by tree-lined streets, historic neighborhoods, and a strong sense of community. Many homes here date back to the 1920s-1950s, with distinctive architecture ranging from red-brick bungalows to mid-century ranches, many of which have been thoughtfully restored. Encanto Park anchors the area, offering golf courses, a lagoon, and Enchanted Island Amusement Park - a rare expanse of green space in the middle of the city. The light rail runs along Central Avenue, providing easy access to downtown, uptown, and beyond. While it has an established feel, Encanto is also evolving, with new restaurants, local businesses, and cultural amenities adding to its character.",
    video_url: 'https://www.youtube.com/watch?v=QrY8l0QPLmU',
    highlights: [
      'The largest concentration of historic districts in Phoenix creates a distinct identity',
      'Encanto Park and nearby green spaces provide rare recreation in the city core',
      'Proximity to museums, theaters, and downtown adds depth beyond residential life'
    ],
    quick_facts: {
      homeValues: 'Mix of unique historic homes and larger remodels',
      costOfLiving: 'Higher housing costs than much of Phoenix; sales tax 9.1%. Dining ranges from local mid-range spots to affordable neighborhood options.',
      lifestyle: 'Encanto combines cultural access with community comfort - residents enjoy Encanto Park, museums and theaters nearby, light rail connections, and a suburban feel just steps from downtown.'
    },
    didYouKnow: 'Built in 1935, Encanto Park was a New Deal project and remains one of Phoenix\'s oldest and most beloved green spaces.',
    schools: 'The area is served by Phoenix Elementary School District for K-8 and Phoenix Union High School District for high schools. Charter and private schools are also options nearby.',
    summary: [
      { feature: 'Architectural Legacy', description: 'The largest concentration of historic districts in Phoenix creates a distinct identity.' },
      { feature: 'Green Oasis', description: 'Encanto Park and nearby green spaces provide rare recreation in the city core.' },
      { feature: 'Cultural Access', description: 'Proximity to museums, theaters, and downtown adds depth beyond residential life.' }
    ],
    ctaButtons: [
      'View the Encanto Village Market Report',
      'Search Homes in the Encanto Village Area of Phoenix'
    ]
  },
  {
    id: '8',
    slug: 'uptown-phoenix',
    title: 'Uptown Phoenix',
    description: "Uptown Phoenix blends mid-century charm with a funky, modern edge. Known for its tree-lined streets, vintage shops, and the Melrose District's LGBTQ+-friendly community vibe, it's an eclectic, creative area with strong neighborhood identity and central-city convenience.",
    video_url: 'https://www.youtube.com/watch?v=8-nMHGrFuJ0',
    highlights: [
      'Mix of arts, culture, and local businesses',
      'Historic ranch homes, remodels, and condos',
      'This community values diversity, individualism, and community support'
    ],
    quick_facts: {
      homeValues: 'Range from modest mid-century ranches to high-end remodels and newer condos.',
      costOfLiving: 'Housing is mixed: mid-century homes vary from modest to remodeled high-end. Sales tax is 9.1%. Dining is trendy but approachable with a mix of casual and creative options. Shopping is eclectic, ranging from vintage and discount shops to boutiques.',
      lifestyle: 'Eclectic and creative, with trendy restaurants, vintage shops, and the Melrose District\'s nightlife and cultural scene.'
    },
    didYouKnow: 'The Melrose District is home to Arizona\'s largest concentration of mid-century modern homes and has been featured in numerous films and TV shows.',
    schools: 'Served by Madison Elementary School District and Phoenix Union High School District. Charter and private schools also serve the area.',
    summary: [
      { feature: 'Eclectic Vibe', description: 'Mix of arts, culture, and local businesses.' },
      { feature: 'Housing Variety', description: 'Historic ranch homes, remodels, and condos.' },
      { feature: 'Local Flavor', description: 'This community values diversity, individualism, and community support. It\'s fun and funky with quirky retail, strong small businesses, and vibrant nightlife.' }
    ],
    ctaButtons: [
      'View the Uptown Market Report',
      'Search Homes in Uptown Phoenix'
    ]
  },
  {
    id: '9',
    slug: 'biltmore-arcadia',
    title: 'Biltmore / Arcadia',
    description: "Arcadia and the Biltmore Corridor are among Phoenix's most prestigious neighborhoods, blending historic character with modern sophistication. The Biltmore side is known for luxury resorts, golf, and high-end shopping at Biltmore Fashion Park, while Arcadia offers lush landscaping, citrus groves, and a strong sense of community. Together, they create a lifestyle that balances polished refinement with neighborhood warmth and everyday livability.",
    video_url: 'https://www.youtube.com/watch?v=TYxKicrBSGU',
    highlights: [
      'The Biltmore and Arcadia are among Phoenix\'s most sought-after neighborhoods',
      'Parks, schools and patio dining foster a connected, neighborly atmosphere',
      'Access to luxury resorts, spas, and championship golf courses',
      'Housing reflects both heritage and modern design'
    ],
    quick_facts: {
      homeValues: 'Arcadia homes often exceed $1M, however neighboring Arcadia Lite has more affordable options including condos and single-family homes; the Biltmore Corridor ranges from $400K condos to multimillion-dollar estates.',
      costOfLiving: 'Housing is among the priciest in Phoenix, especially for larger lots and remodels. Sales tax is 9.1%. Dining skews toward higher-end and trendy spots, with a few casual options. Shopping is polished, with Biltmore Fashion Park and upscale grocery stores dominating.',
      lifestyle: 'Biltmore and Arcadia together offer polished living with resort-style dining, upscale shopping, golf, and luxury amenities, balanced by Arcadia\'s popular parks, canal trails, and neighborhood eateries.'
    },
    didYouKnow: 'The Arizona Biltmore Resort opened in 1929 with design elements influenced by Frank Lloyd Wright - and has hosted every U.S. president from Herbert Hoover through George W. Bush.',
    schools: 'Arcadia is served by Scottsdale Unified School District (Arcadia High School). The Biltmore area is served by Creighton Elementary School District and Phoenix Union High School District. Private and charter schools are nearby.',
    summary: [
      { feature: 'Prestigious Address', description: 'The Biltmore and Arcadia are among Phoenix\'s most sought-after neighborhoods, carrying strong recognition across the Valley.' },
      { feature: 'Community Feel', description: 'Parks, schools and patio dining foster a connected, neighborly atmosphere.' },
      { feature: 'Resort Amenities', description: 'Access to luxury resorts, spas, and championship golf courses sets the area apart.' },
      { feature: 'Architectural Variety', description: 'From citrus-grove ranch homes and historic mansions to sleek new luxury builds, housing reflects both heritage and modern design.' }
    ],
    ctaButtons: [
      'View the Biltmore Corridor / Arcadia Market Report',
      'Search Homes in the Biltmore Corridor / Arcadia Areas of Phoenix'
    ]
  }
];

const NeighborhoodsMain = () => {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      try {
        // Try to fetch from API first
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${API_URL}/neighborhoods?active=true`);

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data && data.data.length > 0) {
            // Transform API data to match local format
            const apiNeighborhoods = data.data.map((n: any) => ({
              id: n._id,
              slug: n.slug,
              title: n.name,
              description: n.fullDescription,
              video_url: n.videoUrl || null,
              highlights: n.highlights || [],
              quick_facts: n.stats || { homeValues: '', costOfLiving: '', lifestyle: '' },
              didYouKnow: n.didYouKnow || '',
              schools: n.schools || '',
              summary: n.summary || [],
              ctaButtons: n.ctaButtons || []
            }));
            setNeighborhoods(apiNeighborhoods);
          } else {
            // Fall back to local data if API returns empty
            setNeighborhoods(NEIGHBORHOODS);
          }
        } else {
          // Fall back to local data if API fails
          setNeighborhoods(NEIGHBORHOODS);
        }
      } catch (error) {
        console.error('Error loading neighborhoods from API, using local data:', error)
        // Fall back to local data on error
        setNeighborhoods(NEIGHBORHOODS)
      } finally {
        setLoading(false)
      }
    }

    fetchNeighborhoods()
  }, [])

  if (loading) {
    return (
      <div className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-64 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-serif">Phoenix Valley Neighborhoods</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Phoenix is a vibrant and diverse city with neighborhoods that cater to every lifestyle. Whether you're drawn to the historic charm of Central Phoenix, the luxury of Scottsdale, the strong-community atmosphere of Chandler, or the up-and-coming energy of the West Valley, there's a perfect community waiting for you. Each area offers its own unique character, amenities, and opportunities to create the life you've always wanted in the Valley of the Sun.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {neighborhoods.map((neighborhood, index) => (
            <motion.div
              key={neighborhood.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-400 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{neighborhood.title}</h2>
                  <p className="text-blue-100">{neighborhood.highlights[0]}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-700 mb-6">{neighborhood.description}</p>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Highlights</h3>
                  <ul className="space-y-2">
                    {neighborhood.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      to={`/neighborhoods/${neighborhood.slug}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-center font-medium transition-colors"
                    >
                      Learn More
                    </Link>
                    <a
                      href="#"
                      className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-lg text-center font-medium transition-colors"
                      onClick={(e) => {
                        e.preventDefault()
                        // Handle search homes action
                      }}
                    >
                      View Homes
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

const NeighborhoodDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const [neighborhood, setNeighborhood] = useState<Neighborhood | null>(null)
  const [loading, setLoading] = useState(true)
  const [videoError, setVideoError] = useState(false)

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    try {
      // Handle youtu.be URLs (shortened YouTube links)
      if (url.includes('youtu.be/')) {
        return url.split('youtu.be/')[1].split(/[?&#]/)[0];
      }

      // Handle youtube.com URLs
      if (url.includes('youtube.com/watch')) {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v');
      }

      // Handle youtube.com/embed/ URLs
      if (url.includes('youtube.com/embed/')) {
        const match = url.match(/youtube\.com\/embed\/([^?&#]+)/);
        return match ? match[1] : null;
      }

      // Handle youtu.be with parameters
      if (url.includes('youtu.be/')) {
        const urlObj = new URL(url);
        return urlObj.pathname.split('/')[1];
      }

      return null;
    } catch (error) {
      console.error('Error parsing YouTube URL:', error);
      return null;
    }
  };

  const handleVideoError = () => {
    console.error('Failed to load video:', neighborhood?.video_url);
    setVideoError(true);
  };

  useEffect(() => {
    const fetchNeighborhood = async () => {
      if (!slug) return

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 200))
        // Find the neighborhood in our local array
        const foundNeighborhood = NEIGHBORHOODS.find(n => n.slug === slug) || null
        setNeighborhood(foundNeighborhood)
        // Reset video error state when neighborhood changes
        setVideoError(false)
      } catch (error) {
        console.error('Error loading neighborhood:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNeighborhood()
  }, [slug])

  if (loading) {
    return (
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-2xl mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-full mb-8"></div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 h-64 bg-gray-200 rounded-2xl"></div>
              <div className="h-64 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!neighborhood) {
    return (
      <div className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Neighborhood Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The neighborhood you're looking for doesn't exist or has been moved.</p>
          <Link
            to="/neighborhoods"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Neighborhoods
          </Link>
        </div>
      </div>
    )
  }

  // Determine if we should show the video or fallback
  const showVideo = neighborhood?.video_url && !videoError;
  const videoId = neighborhood?.video_url ? getYouTubeVideoId(neighborhood.video_url) : null;
  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&showinfo=0`
    : null;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-96 bg-gray-100 relative">
          {showVideo && embedUrl ? (
            <div className="absolute inset-0">
              <iframe
                key={videoId}
                src={embedUrl}
                className="w-full h-full object-cover brightness-110"
                title={`${neighborhood.title} Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onError={handleVideoError}
                frameBorder="0"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🏙️</div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Neighborhood Tour</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  {videoError
                    ? "We're having trouble loading the video tour. Please check back later."
                    : "Video tour coming soon for this neighborhood!"}
                </p>
                {videoError && (
                  <button
                    onClick={() => setVideoError(false)}
                    className="mt-4 px-6 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {neighborhood.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Why You Would Want to Live Here */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why You Would Want to Live Here</h2>
              <div className="prose prose-lg text-gray-700 max-w-none">
                <p>{neighborhood.description}</p>
              </div>
            </section>

            {/* Highlights */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Highlights</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {neighborhood.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-blue-600 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Did You Know */}
            <section className="bg-blue-50 p-6 rounded-xl mb-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Did You Know?</h3>
              <p className="text-gray-700">{neighborhood.didYouKnow}</p>
            </section>

            {/* Quick Facts */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Facts</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <dl className="space-y-6">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Home Values</dt>
                    <dd className="mt-1 text-gray-900 sm:col-span-2">{neighborhood.quick_facts.homeValues}</dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Cost of Living</dt>
                    <dd className="mt-1 text-gray-900 sm:col-span-2">{neighborhood.quick_facts.costOfLiving}</dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Lifestyle</dt>
                    <dd className="mt-1 text-gray-900 sm:col-span-2">{neighborhood.quick_facts.lifestyle}</dd>
                  </div>
                </dl>
              </div>
            </section>

            {/* Schools */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Schools</h2>
              <div className="prose prose-lg text-gray-700">
                <p>{neighborhood.schools}</p>
                <p className="mt-4">
                  <a href="https://www.greatschools.org/" target="_blank" rel="noopener noreferrer nofollow" className="text-blue-600 hover:text-blue-800 font-medium">
                    Find out more detailed information on GreatSchools.org →
                  </a>
                </p>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">At a Glance</h3>

              <div className="space-y-6">
                {neighborhood.summary.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <h4 className="font-semibold text-gray-900">{item.feature}</h4>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                {neighborhood.ctaButtons.map((button, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`block w-full text-center px-4 py-3 rounded-lg font-medium transition-colors ${index === 0
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    onClick={(e) => {
                      e.preventDefault()
                      // Handle button click
                    }}
                  >
                    {button}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to make {neighborhood.title} your home?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our local experts can help you find the perfect property in {neighborhood.title} that fits your lifestyle and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Contact Me
            </Link>
            <a
              href="https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg border border-blue-200 transition-colors"
            >
              Browse Homes
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const Neighborhoods = () => {
  const { slug } = useParams<{ slug: string }>()

  return slug ? <NeighborhoodDetail /> : <NeighborhoodsMain />
}

export default Neighborhoods