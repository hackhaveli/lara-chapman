import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Bed, Bath, Square, Heart, Send } from 'lucide-react'
import { supabase } from '../lib/supabase'

const SearchHomes = () => {
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: '',
    propertyType: 'all'
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Save lead to database
      const { error: leadError } = await supabase
        .from('leads')
        .insert([
          {
            firstName: formData.name.split(' ')[0],
            lastName: formData.name.split(' ').slice(1).join(' ') || '',
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            source: 'Custom Search Request'
          }
        ])

      if (leadError) {
        console.error('Error saving to database:', leadError)
        // Continue even if database save fails
      }

      // Use FormSubmit.co to send email
      const formSubmitData = new FormData()
      formSubmitData.append('name', formData.name)
      formSubmitData.append('email', formData.email)
      formSubmitData.append('phone', formData.phone || 'Not provided')
      formSubmitData.append('message', formData.message)
      formSubmitData.append('_subject', `New Custom Search Request from ${formData.name}`)
      formSubmitData.append('_template', 'table')
      formSubmitData.append('_captcha', 'false')

      const response = await fetch('https://formsubmit.co/KeysPlease@LaraLovesPhoenix.com', {
        method: 'POST',
        body: formSubmitData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (!response.ok) throw new Error('Failed to send email')

      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const properties = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '$425,000',
      address: '1234 Desert Bloom Dr, Phoenix, AZ 85123',
      beds: 3,
      baths: 2.5,
      sqft: '2,140',
      description: 'Beautiful single-story home with mountain views'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '$535,000',
      address: '5678 Sunset Ridge Way, Scottsdale, AZ 85260',
      beds: 4,
      baths: 3,
      sqft: '2,650',
      description: 'Modern home in desirable Scottsdale neighborhood'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '$315,000',
      address: '9012 Valley View St, Tempe, AZ 85284',
      beds: 2,
      baths: 2,
      sqft: '1,850',
      description: 'Charming townhome near ASU campus'
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '$680,000',
      address: '3456 Mountain Peak Dr, Paradise Valley, AZ 85253',
      beds: 4,
      baths: 3.5,
      sqft: '3,200',
      description: 'Luxury home with pool and desert landscaping'
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '$395,000',
      address: '7890 Saguaro Cir, Gilbert, AZ 85296',
      beds: 3,
      baths: 2,
      sqft: '1,980',
      description: 'Family-friendly neighborhood with great schools'
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '$750,000',
      address: '2468 Camelback Vista, Phoenix, AZ 85018',
      beds: 5,
      baths: 4,
      sqft: '3,850',
      description: 'Executive home with stunning city views'
    }
  ]

  const handleFilterChange = (key: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const filteredProperties = properties.filter(property => {
    // Parse property price (remove $ and ,)
    const price = parseInt(property.price.replace(/[$,]/g, ''));

    // Filter by location
    if (searchFilters.location && !property.address.toLowerCase().includes(searchFilters.location.toLowerCase()) && !property.description.toLowerCase().includes(searchFilters.location.toLowerCase())) {
      return false;
    }

    // Filter by price
    if (searchFilters.minPrice && price < parseInt(searchFilters.minPrice)) return false;
    if (searchFilters.maxPrice && price > parseInt(searchFilters.maxPrice)) return false;

    // Filter by beds
    if (searchFilters.beds && property.beds < parseInt(searchFilters.beds)) return false;

    // Filter by baths
    if (searchFilters.baths && property.baths < parseInt(searchFilters.baths)) return false;

    return true;
  });

  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-[#333333] mb-6 font-serif">Search Phoenix Homes for Sale</h1>
          <p className="text-xl text-[#555555] max-w-3xl mx-auto">
            Direct from the MLS, updated every 15 minutes — more accurate than Zillow or Realtor.com
          </p>
        </motion.div>

        {/* Search Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-8 rounded-2xl shadow-md mb-12"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Location</label>
              <input
                type="text"
                placeholder="City, ZIP, or Neighborhood"
                value={searchFilters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Min Price</label>
              <select
                value={searchFilters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51] focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="200000">$200K</option>
                <option value="300000">$300K</option>
                <option value="400000">$400K</option>
                <option value="500000">$500K</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Max Price</label>
              <select
                value={searchFilters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51] focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="400000">$400K</option>
                <option value="500000">$500K</option>
                <option value="600000">$600K</option>
                <option value="800000">$800K+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Beds</label>
              <select
                value={searchFilters.beds}
                onChange={(e) => handleFilterChange('beds', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51] focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">Baths</label>
              <select
                value={searchFilters.baths}
                onChange={(e) => handleFilterChange('baths', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51] focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-[#E76F51] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#E76F51]/90 transition-colors flex items-center justify-center">
                <Search size={20} className="mr-2" />
                Search
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Property Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#333333]">{filteredProperties.length} Properties Found</h2>
              <div className="flex items-center space-x-4">
                <select className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]">
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                  <option>Square Feet</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="relative">
                    <img
                      src={property.image}
                      alt={property.address}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
                      <Heart size={18} className="text-[#E76F51]" />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="text-2xl font-bold text-[#E76F51] mb-2">{property.price}</div>
                    <div className="flex items-center text-[#555555] mb-3">
                      <MapPin size={16} className="mr-1" />
                      {property.address}
                    </div>
                    <p className="text-[#555555] mb-4">{property.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-[#555555]">
                      <div className="flex items-center">
                        <Bed size={16} className="mr-1" />
                        {property.beds} beds
                      </div>
                      <div className="flex items-center">
                        <Bath size={16} className="mr-1" />
                        {property.baths} baths
                      </div>
                      <div className="flex items-center">
                        <Square size={16} className="mr-1" />
                        {property.sqft} sqft
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-md sticky top-24"
            >
              <h3 className="text-2xl font-bold text-[#333333] mb-6">Need Help Finding Your Home?</h3>
              <div className="mb-6">
                <img
                  src="/profile.jpg"
                  alt="Lara Chapman"
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <p className="text-center text-[#555555] mb-4">
                  Let me create a personalized search and send you listings as they hit the market.
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-[#2A9D8F]/10 border border-[#2A9D8F]/20 text-[#2A9D8F] p-4 rounded-xl mb-6 text-sm">
                  Request sent! I'll be in touch shortly.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-sm">
                  Error sending request. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51] focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51] focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your Phone"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51] focus:border-transparent"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your ideal home..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51] focus:border-transparent resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#E76F51] text-white py-3 rounded-xl font-semibold hover:bg-[#E76F51]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Get My Custom Search
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-md mt-8"
            >
              <h3 className="text-xl font-bold text-[#333333] mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#333333] mb-2">Why is this more accurate than Zillow?</h4>
                  <p className="text-sm text-[#555555]">
                    This data comes directly from the MLS and updates every 15 minutes, while third-party sites may be days or weeks behind.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#333333] mb-2">Do I need to register?</h4>
                  <p className="text-sm text-[#555555]">
                    Registration is optional but recommended to save favorites and receive personalized alerts.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#333333] mb-2">Can I schedule showings?</h4>
                  <p className="text-sm text-[#555555]">
                    Yes! Contact me directly to schedule showings for any properties that interest you.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchHomes