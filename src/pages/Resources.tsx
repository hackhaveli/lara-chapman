import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, User, Mail } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { usePageContent } from '../hooks/usePageContent'
import { getResources, Resource } from '../lib/api'

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { content } = usePageContent()

  const pageTitle = content?.resources?.pageTitle || 'Helpful Resources'
  const pageSubtitle = content?.resources?.pageSubtitle || 'Download free guides, checklists, and reports to help you navigate the Phoenix Valley real estate market with confidence.'
  const ctaSectionTitle = content?.resources?.ctaSectionTitle || 'Need More Information?'
  const ctaSectionText = content?.resources?.ctaSectionText || 'These resources are just the beginning. I\'m here to provide personalized guidance and answer any questions you have about buying, selling, or investing in Phoenix Valley real estate.'
  const email = content?.contact?.email || 'lara@blissrealty.com'
  const phone = content?.contact?.phone || '(480) 555-0123'

  // Default fallback resources (only used if API fails)
  const defaultResources: Partial<Resource>[] = [
    {
      title: content?.resources?.resource1Title || 'Your Guide to Buying a Home in the Phoenix Valley',
      description: content?.resources?.resource1Description || 'Process overview, financing options, timeline, and essential tips for home buyers.',
      fileUrl: content?.resources?.resource1Url || "/Buyers_Guide.pdf",
      category: 'Buyer Guide' as any,
      fileType: 'PDF' as any,
      isActive: true,
      requiresEmail: true,
    },
    {
      title: content?.resources?.resource2Title || 'Your Guide to Selling Your Phoenix Valley Home',
      description: content?.resources?.resource2Description || 'Pricing strategies, preparation, staging, marketing, and handling offers.',
      fileUrl: content?.resources?.resource2Url || "/Sellers_Guide.pdf",
      category: 'Seller Guide' as any,
      fileType: 'PDF' as any,
      isActive: true,
      requiresEmail: true,
    },
    {
      title: content?.resources?.resource3Title || 'Staging Checklist - Make Your Home Show-Ready',
      description: content?.resources?.resource3Description || 'Room-by-room preparation tips to maximize your home\'s appeal to potential buyers.',
      fileUrl: content?.resources?.resource3Url || "/Staging_Checklist.pdf",
      category: 'Checklist' as any,
      fileType: 'PDF' as any,
      isActive: true,
      requiresEmail: true,
    },
    {
      title: content?.resources?.resource4Title || 'Monsoon Prep Tips - Protecting Your Phoenix Home',
      description: content?.resources?.resource4Description || 'Essential maintenance for roof/gutters, yard, AC, and flood safety during monsoon season.',
      fileUrl: content?.resources?.resource4Url || "/Monsoon_Prep_Tips.pdf",
      category: 'Safety' as any,
      fileType: 'PDF' as any,
      isActive: true,
      requiresEmail: true,
    }
  ]

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await getResources(true) // Get only active resources

        if (response.success && response.data && response.data.length > 0) {
          // Use resources from database
          setResources(response.data)
        } else {
          // Fall back to default resources if none in database
          console.log('No resources in database, using defaults')
          setResources(defaultResources as Resource[])
        }
      } catch (error) {
        console.error('Error fetching resources:', error)
        // Fall back to default resources on error
        setResources(defaultResources as Resource[])
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [content])

  const handleDownloadClick = (resource: Resource) => {
    setSelectedResource(resource)
    setShowForm(true)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Try to save lead to database (optional - won't fail download if this fails)
      try {
        const { error } = await supabase
          .from('leads')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              message: `Downloaded resource: ${selectedResource?.title}`,
              created_at: new Date().toISOString()
            }
          ])

        if (error) {
          console.warn('Could not save lead to database:', error)
          // Continue anyway - download should still work
        }
      } catch (dbError) {
        console.warn('Database error (continuing with download):', dbError)
        // Continue anyway
      }

      // Download the file
      if (selectedResource?.fileUrl) {
        const link = document.createElement('a')
        link.href = selectedResource.fileUrl
        link.download = selectedResource.title || 'resource'
        link.target = '_blank' // Open in new tab if direct download fails
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }

      // Reset form and close modal
      setFormData({ name: '', email: '' })
      setShowForm(false)
      setSelectedResource(null)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error processing your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (loading) {
    return (
      <div className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-64 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
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
          <h1 className="text-6xl font-bold text-[#333333] mb-6 font-serif">{pageTitle}</h1>
          <p className="text-xl text-[#555555] max-w-3xl mx-auto">
            {pageSubtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={resource._id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="bg-[#2A9D8F]/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <FileText size={28} className="text-[#2A9D8F]" />
              </div>
              <h3 className="text-xl font-bold text-[#333333] mb-4">{resource.title}</h3>
              <p className="text-[#555555] mb-6 leading-relaxed">{resource.description}</p>
              <button
                onClick={() => handleDownloadClick(resource)}
                className="bg-[#E76F51] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#E76F51]/90 transition-colors flex items-center justify-center mx-auto"
              >
                <Download size={20} className="mr-2" />
                Download Free
              </button>
            </motion.div>
          ))}
        </div>

        {/* Download Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-[#333333] mb-4 font-serif">
                Download: {selectedResource?.title}
              </h3>
              <p className="text-[#555555] mb-6">
                Please provide your contact information to download this free resource.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#333333] mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#555555]" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#333333] mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#555555]" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setSelectedResource(null)
                      setFormData({ name: '', email: '' })
                    }}
                    className="flex-1 px-6 py-3 border border-gray-200 text-[#555555] rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#E76F51] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#E76F51]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      'Downloading...'
                    ) : (
                      <>
                        <Download size={20} className="mr-2" />
                        Download
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <div className="bg-[#FAF9F6] p-12 rounded-2xl text-center">
            <h2 className="text-3xl font-bold text-[#333333] mb-6 font-serif">{ctaSectionTitle}</h2>
            <p className="text-lg text-[#555555] mb-8 max-w-2xl mx-auto">
              {ctaSectionText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                className="bg-[#2A9D8F] text-white px-8 py-4 rounded-xl font-semibold uppercase tracking-wide hover:bg-[#2A9D8F]/90 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Call Me: {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="bg-[#E76F51] text-white px-8 py-4 rounded-xl font-semibold uppercase tracking-wide hover:bg-[#E76F51]/90 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Email: {email}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Resources