import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, AlertCircle, CheckCircle, User, Phone, Calculator, Home, MapPin, Menu, FileText, Trash2, Plus } from 'lucide-react';
import { getContent, updateContentSection } from '../../lib/api';

const AdminGeneral: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'home' | 'about' | 'contact' | 'neighborhoods' | 'calculators' | 'header' | 'footer' | 'resources'>('home');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const [homeContent, setHomeContent] = useState({
        heroTitle: '',
        heroSubtitle: '',
        heroImage: '',
        heroVideoId: '',
        heroButton1Text: '',
        heroButton1Url: '',
        heroButton2Text: '',
        heroButton2Url: '',
        bioExcerpt: '',
        servicesTitle: '',
        servicesSubtitle: '',
        ctaTitle: '',
        ctaSubtitle: '',
        services: [] as Array<{ icon: string; title: string; description: string; link: string; internal: boolean }>
    });

    const [aboutContent, setAboutContent] = useState({
        pageTitle: '',
        pageSubtitle: '',
        fullBio: '',
        profileImage: '',
        profileName: '',
        profileTitle: '',
        profileCompany: '',
        philosophyTitle: '',
        philosophyText: '',
        lifestyleTitle: '',
        lifestyleText: '',
        lifestyleImage: ''
    });

    const [contactContent, setContactContent] = useState({
        pageTitle: '',
        pageSubtitle: '',
        formTitle: '',
        profileBlurb: '',
        address: '',
        phone: '',
        email: '',
        mapEmbedUrl: '',
        officeHours: '',
        socialBlurb: '',
        profileImage: '',
        profileName: '',
        profileTitle: '',
        facebookUrl: '',
        instagramUrl: '',
        linkedinUrl: '',
        youtubeUrl: '',
        twitterUrl: ''
    });

    const [neighborhoodsContent, setNeighborhoodsContent] = useState({
        pageTitle: '',
        pageDescription: ''
    });

    const [calculatorsContent, setCalculatorsContent] = useState({
        pageTitle: '',
        mortgageIntroText: '',
        affordabilityIntroText: '',
        disclaimer: '',
        partnerSectionTitle: '',
        partnerBoxTitle: '',
        partnerDescription: '',
        partnerButtonText: '',
        partnerButtonUrl: '',
        partnerFooterText: ''
    });

    const [headerContent, setHeaderContent] = useState({
        logoText: '',
        logoSubtext: '',
        menuItems: [] as { label: string; path: string; isExternal: boolean; }[]
    });

    const [footerContent, setFooterContent] = useState({
        logoText: '',
        tagline: '',
        copyrightText: '',
        disclaimerText: '',

        quickLinks: [],
        resourceLinks: [],

        quickLinksTitle: '',
        resourcesTitle: '',
        contactTitle: '',

        address: '',
        officeHours: '',
        email: '',
        phone: '',

        consultationButtonText: '',
        searchHomesUrl: '',

        privacyPolicyLinkText: '',
        termsLinkText: '',
        accessibilityLinkText: ''
    });

    const [resourcesContent, setResourcesContent] = useState({
        pageTitle: '',
        pageSubtitle: '',
        ctaSectionTitle: '',
        ctaSectionText: '',
        resource1Title: '',
        resource1Description: '',
        resource1Url: '',
        resource2Title: '',
        resource2Description: '',
        resource2Url: '',
        resource3Title: '',
        resource3Description: '',
        resource3Url: '',
        resource4Title: '',
        resource4Description: '',
        resource4Url: ''
    });

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await getContent();
            if (response.success && response.data) {
                const { home, about, contact, neighborhoods, calculators, header, footer, resources } = response.data;

                setHomeContent({
                    heroTitle: home?.heroTitle || '',
                    heroSubtitle: home?.heroSubtitle || '',
                    heroImage: home?.heroImage || '',
                    heroVideoId: home?.heroVideoId || 'DZfp99BamQk',
                    heroButton1Text: home?.heroButton1Text || 'Find Out What My Home is Worth',
                    heroButton1Url: home?.heroButton1Url || 'https://lstrep.co/0xcgPhSCLE',
                    heroButton2Text: home?.heroButton2Text || 'Search Homes for Sale',
                    heroButton2Url: home?.heroButton2Url || 'https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149',
                    bioExcerpt: home?.bioExcerpt || '',
                    servicesTitle: home?.servicesTitle || 'My Services',
                    servicesSubtitle: home?.servicesSubtitle || '',
                    ctaTitle: home?.ctaTitle || '',
                    ctaSubtitle: home?.ctaSubtitle || '',
                    services: home?.services || []
                });

                setAboutContent({
                    pageTitle: about?.pageTitle || 'Meet Lara Chapman',
                    pageSubtitle: about?.pageSubtitle || '',
                    fullBio: about?.fullBio || '',
                    profileImage: about?.profileImage || '',
                    profileName: about?.profileName || 'Lara Chapman',
                    profileTitle: about?.profileTitle || 'Realtor® | Investor | Home Stager',
                    profileCompany: about?.profileCompany || 'Bliss Realty',
                    philosophyTitle: about?.philosophyTitle || '',
                    philosophyText: about?.philosophyText || '',
                    lifestyleTitle: about?.lifestyleTitle || '',
                    lifestyleText: about?.lifestyleText || '',
                    lifestyleImage: about?.lifestyleImage || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200'
                });

                setContactContent({
                    pageTitle: contact?.pageTitle || "Let's Connect",
                    pageSubtitle: contact?.pageSubtitle || '',
                    formTitle: contact?.formTitle || 'Send Me a Message',
                    profileBlurb: contact?.profileBlurb || '',
                    address: contact?.address || '',
                    phone: contact?.phone || '',
                    email: contact?.email || '',
                    mapEmbedUrl: contact?.mapEmbedUrl || '',
                    officeHours: contact?.officeHours || '',
                    socialBlurb: contact?.socialBlurb || '',
                    profileImage: contact?.profileImage || '/profile.jpg',
                    profileName: contact?.profileName || 'Lara Chapman',
                    profileTitle: contact?.profileTitle || 'Realtor® | Investor | Home Stager',
                    facebookUrl: contact?.facebookUrl || 'https://www.facebook.com/LaraLovesPhoenix',
                    instagramUrl: contact?.instagramUrl || 'https://www.instagram.com/laralovesphoenix/',
                    linkedinUrl: contact?.linkedinUrl || 'https://www.linkedin.com/in/lara-chapman-b4b025357/',
                    youtubeUrl: contact?.youtubeUrl || 'https://www.youtube.com/@LaraLovesPhoenix',
                    twitterUrl: contact?.twitterUrl || 'https://x.com/larablissr1'
                });

                setCalculatorsContent({
                    pageTitle: calculators?.pageTitle || '',
                    mortgageIntroText: calculators?.mortgageIntroText || '',
                    affordabilityIntroText: calculators?.affordabilityIntroText || '',
                    disclaimer: calculators?.disclaimer || '',
                    partnerSectionTitle: calculators?.partnerSectionTitle || 'Additional Calculators from Our Partner',
                    partnerBoxTitle: calculators?.partnerBoxTitle || 'Visit Our Partner\'s Calculators',
                    partnerDescription: calculators?.partnerDescription || 'For additional mortgage calculators, please visit our trusted partner Barrett Financial\'s website. You may be asked to complete a quick verification to access their tools.',
                    partnerButtonText: calculators?.partnerButtonText || 'Visit Barrett Financial Calculators',
                    partnerButtonUrl: calculators?.partnerButtonUrl || 'https://www.barrettfinancial.com/mortgage-calculators',
                    partnerFooterText: calculators?.partnerFooterText || 'These calculators are provided by our trusted lending partner, Barrett Financial Group. You\'ll be redirected to their website to use their tools.'
                });

                setNeighborhoodsContent({
                    pageTitle: neighborhoods?.pageTitle || 'Phoenix Valley Neighborhoods',
                    pageDescription: neighborhoods?.pageDescription || 'Phoenix is a vibrant and diverse city with neighborhoods that cater to every lifestyle. Whether you\'re drawn to the historic charm of Central Phoenix, the luxury of Scottsdale, the strong-community atmosphere of Chandler, or the up-and-coming energy of the West Valley, there\'s a perfect community waiting for you. Each area offers its own unique character, amenities, and opportunities to create the life you\'ve always wanted in the Valley of the Sun.'
                });

                setHeaderContent({
                    logoText: header?.logoText || 'Lara Chapman',
                    logoSubtext: header?.logoSubtext || 'Realtor®',
                    menuItems: header?.menuItems || [
                        { label: 'Home', path: '/', isExternal: false },
                        { label: 'About', path: '/about', isExternal: false },
                        { label: 'Buy', path: '/buy', isExternal: false },
                        { label: 'Search Homes', path: footer?.searchHomesUrl || 'https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149', isExternal: true },
                        { label: 'Sell', path: '/sell', isExternal: false },
                        { label: 'Neighborhoods', path: '/neighborhoods', isExternal: false },
                        { label: 'Calculators', path: '/calculators', isExternal: false },
                        { label: 'Contact', path: '/contact', isExternal: false }
                    ]
                });

                setFooterContent({
                    logoText: footer?.logoText || 'Lara Chapman',
                    tagline: footer?.tagline || 'Realtor®, investor, and home stager helping Phoenix Valley clients buy and sell with confidence.',
                    copyrightText: footer?.copyrightText || '© 2025 Lara Chapman, Realtor | Bliss Realty',
                    disclaimerText: footer?.disclaimerText || 'The data relating to real estate for sale on this web site comes in part from the Internet Data Exchange (IDX) program...',

                    quickLinks: footer?.quickLinks && footer.quickLinks.length > 0 ? footer.quickLinks : [
                        { label: 'Home', path: '/', isExternal: false },
                        { label: 'About Lara', path: '/about', isExternal: false },
                        { label: 'Buy a Home', path: '/buy', isExternal: false },
                        { label: 'Search Homes', path: 'https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149', isExternal: true },
                        { label: 'Sell Your Home', path: '/sell', isExternal: false },
                        { label: 'Neighborhoods', path: '/neighborhoods', isExternal: false }
                    ],
                    resourceLinks: footer?.resourceLinks && footer.resourceLinks.length > 0 ? footer.resourceLinks : [
                        { label: 'Mortgage Calculators', path: '/calculators', isExternal: false },
                        { label: 'Buyer & Seller Guides', path: '#', isExternal: false },
                        { label: 'Home Staging Services', path: 'https://styleandstaging.com', isExternal: true },
                        { label: 'Investment Properties', path: 'https://orangedoorinvestmentgroup.com', isExternal: true }
                    ],

                    quickLinksTitle: footer?.quickLinksTitle || 'Quick Links',
                    resourcesTitle: footer?.resourcesTitle || 'Resources',
                    contactTitle: footer?.contactTitle || 'Contact Me',

                    address: footer?.address || 'Phoenix, AZ',
                    officeHours: footer?.officeHours || 'Monday - Friday: 9:00 AM - 6:00 PM',
                    email: footer?.email || 'KeysPlease@LaraLovesPhoenix.com',
                    phone: footer?.phone || '(602) 405-8002',

                    consultationButtonText: footer?.consultationButtonText || 'Schedule a Consultation',
                    searchHomesUrl: footer?.searchHomesUrl || 'https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149',

                    privacyPolicyLinkText: footer?.privacyPolicyLinkText || 'Privacy Policy',
                    termsLinkText: footer?.termsLinkText || 'Terms of Use',
                    accessibilityLinkText: footer?.accessibilityLinkText || 'Accessibility'
                });

                setResourcesContent({
                    pageTitle: resources?.pageTitle || 'Helpful Resources',
                    pageSubtitle: resources?.pageSubtitle || 'Download free guides, checklists, and reports to help you navigate the Phoenix Valley real estate market with confidence.',
                    ctaSectionTitle: resources?.ctaSectionTitle || 'Need More Information?',
                    ctaSectionText: resources?.ctaSectionText || 'These resources are just the beginning. I\'m here to provide personalized guidance and answer any questions you have about buying, selling, or investing in Phoenix Valley real estate.',
                    resource1Title: resources?.resource1Title || 'Your Guide to Buying a Home in the Phoenix Valley',
                    resource1Description: resources?.resource1Description || 'Process overview, financing options, timeline, and essential tips for home buyers.',
                    resource1Url: resources?.resource1Url || '/Buyers_Guide.pdf',
                    resource2Title: resources?.resource2Title || 'Your Guide to Selling Your Phoenix Valley Home',
                    resource2Description: resources?.resource2Description || 'Pricing strategies, preparation, staging, marketing, and handling offers.',
                    resource2Url: resources?.resource2Url || '/Sellers_Guide.pdf',
                    resource3Title: resources?.resource3Title || 'Staging Checklist - Make Your Home Show-Ready',
                    resource3Description: resources?.resource3Description || 'Room-by-room preparation tips to maximize your home\'s appeal to potential buyers.',
                    resource3Url: resources?.resource3Url || '/Staging_Checklist.pdf',
                    resource4Title: resources?.resource4Title || 'Monsoon Prep Tips - Protecting Your Phoenix Home',
                    resource4Description: resources?.resource4Description || 'Essential maintenance for roof/gutters, yard, AC, and flood safety during monsoon season.',
                    resource4Url: resources?.resource4Url || '/Monsoon_Prep_Tips.pdf'
                });
            }
        } catch (error) {
            showNotification('error', 'Failed to fetch content');
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            let response;
            switch (activeTab) {
                case 'home':
                    response = await updateContentSection('home', homeContent);
                    break;
                case 'about':
                    response = await updateContentSection('about', aboutContent);
                    break;
                case 'contact':
                    response = await updateContentSection('contact', contactContent);
                    break;
                case 'neighborhoods':
                    response = await updateContentSection('neighborhoods', neighborhoodsContent);
                    break;
                case 'calculators':
                    response = await updateContentSection('calculators', calculatorsContent);
                    break;
                case 'header':
                    response = await updateContentSection('header', headerContent);
                    break;
                case 'footer':
                    response = await updateContentSection('footer', footerContent);
                    break;
                case 'resources':
                    response = await updateContentSection('resources', resourcesContent);
                    break;
            }

            if (response?.success) {
                showNotification('success', 'Content updated successfully!');
            } else {
                showNotification('error', response?.message || 'Failed to save');
            }
        } catch (error) {
            showNotification('error', 'An error occurred while saving');
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        { id: 'home' as const, label: 'Home', icon: Home },
        { id: 'about' as const, label: 'About', icon: User },
        { id: 'contact' as const, label: 'Contact', icon: Phone },
        { id: 'neighborhoods' as const, label: 'Neighborhoods', icon: MapPin },
        { id: 'calculators' as const, label: 'Calculators', icon: Calculator },
        { id: 'header' as const, label: 'Header', icon: Menu },
        { id: 'footer' as const, label: 'Footer', icon: Menu },
        { id: 'resources' as const, label: 'Resources', icon: FileText },
    ];

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-8 bg-slate-200 rounded w-48 animate-pulse"></div>
                <div className="bg-white rounded-xl p-6 space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">General Pages</h1>
                    <p className="text-slate-500 mt-1">Manage ALL text content for your pages</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-[#E76F51] text-white rounded-xl hover:bg-[#E76F51]/90 transition-colors disabled:opacity-50"
                >
                    <Save size={18} />
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200 overflow-x-auto pb-px">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                            ? 'text-[#E76F51] border-b-2 border-[#E76F51]'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Notification */}
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}
                >
                    {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    {notification.message}
                </motion.div>
            )}

            {/* Home Tab */}
            {activeTab === 'home' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
                >
                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2">Hero Section</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Hero Title
                            </label>
                            <input
                                type="text"
                                value={homeContent.heroTitle}
                                onChange={(e) => setHomeContent(prev => ({ ...prev, heroTitle: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Main headline..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Hero Image URL
                            </label>
                            <input
                                type="url"
                                value={homeContent.heroImage}
                                onChange={(e) => setHomeContent(prev => ({ ...prev, heroImage: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="https://example.com/hero.jpg"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Hero Subtitle
                        </label>
                        <textarea
                            value={homeContent.heroSubtitle}
                            onChange={(e) => setHomeContent(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                            rows={2}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Subtitle text..."
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Hero Video ID (YouTube)
                            </label>
                            <input
                                type="text"
                                value={homeContent.heroVideoId}
                                onChange={(e) => setHomeContent(prev => ({ ...prev, heroVideoId: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="DZfp99BamQk"
                            />
                            <p className="text-xs text-slate-500 mt-1">Just the video ID from the YouTube URL</p>
                        </div>
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Hero Buttons</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Button 1 Text
                            </label>
                            <input
                                type="text"
                                value={homeContent.heroButton1Text}
                                onChange={(e) => setHomeContent(prev => ({ ...prev, heroButton1Text: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Find Out What My Home is Worth"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Button 1 URL
                            </label>
                            <input
                                type="url"
                                value={homeContent.heroButton1Url}
                                onChange={(e) => setHomeContent(prev => ({ ...prev, heroButton1Url: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Button 2 Text
                            </label>
                            <input
                                type="text"
                                value={homeContent.heroButton2Text}
                                onChange={(e) => setHomeContent(prev => ({ ...prev, heroButton2Text: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Search Homes for Sale"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Button 2 URL
                            </label>
                            <input
                                type="url"
                                value={homeContent.heroButton2Url}
                                onChange={(e) => setHomeContent(prev => ({ ...prev, heroButton2Url: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Bio Section</h2>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Bio Excerpt (Introduction box)
                        </label>
                        <textarea
                            value={homeContent.bioExcerpt}
                            onChange={(e) => setHomeContent(prev => ({ ...prev, bioExcerpt: e.target.value }))}
                            rows={4}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Short bio for the home page..."
                        />
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Services Section</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Services Section Title
                            </label>
                            <input
                                type="text"
                                value={homeContent.servicesTitle}
                                onChange={(e) => setHomeContent(prev => ({ ...prev, servicesTitle: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="My Services"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Services Section Subtitle
                        </label>
                        <textarea
                            value={homeContent.servicesSubtitle}
                            onChange={(e) => setHomeContent(prev => ({ ...prev, servicesSubtitle: e.target.value }))}
                            rows={2}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="From buying your first home..."
                        />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                        <p className="text-sm text-blue-800">
                            <strong>💡 Service Cards:</strong> To edit the individual service cards (Buy, Sell, Stage, Invest),
                            go to the <strong>"Services"</strong> menu in the sidebar. There you can add, edit, delete, and reorder all service cards.
                        </p>
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Call to Action Section</h2>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            CTA Title
                        </label>
                        <input
                            type="text"
                            value={homeContent.ctaTitle}
                            onChange={(e) => setHomeContent(prev => ({ ...prev, ctaTitle: e.target.value }))}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Ready to talk about your goals?"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            CTA Subtitle
                        </label>
                        <textarea
                            value={homeContent.ctaSubtitle}
                            onChange={(e) => setHomeContent(prev => ({ ...prev, ctaSubtitle: e.target.value }))}
                            rows={2}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Whether you're buying, selling..."
                        />
                    </div>
                </motion.div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
                >
                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2">Page Header</h2>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Page Title
                        </label>
                        <input
                            type="text"
                            value={aboutContent.pageTitle}
                            onChange={(e) => setAboutContent(prev => ({ ...prev, pageTitle: e.target.value }))}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Meet Lara Chapman"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Page Subtitle
                        </label>
                        <input
                            type="text"
                            value={aboutContent.pageSubtitle}
                            onChange={(e) => setAboutContent(prev => ({ ...prev, pageSubtitle: e.target.value }))}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Your trusted partner..."
                        />
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Biography</h2>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Full Bio (separate paragraphs with blank lines)
                        </label>
                        <textarea
                            value={aboutContent.fullBio}
                            onChange={(e) => setAboutContent(prev => ({ ...prev, fullBio: e.target.value }))}
                            rows={10}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Full biography text..."
                        />
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Profile Card</h2>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Profile Name
                            </label>
                            <input
                                type="text"
                                value={aboutContent.profileName}
                                onChange={(e) => setAboutContent(prev => ({ ...prev, profileName: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Lara Chapman"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Profile Title
                            </label>
                            <input
                                type="text"
                                value={aboutContent.profileTitle}
                                onChange={(e) => setAboutContent(prev => ({ ...prev, profileTitle: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Realtor® | Investor | Home Stager"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Company Name
                            </label>
                            <input
                                type="text"
                                value={aboutContent.profileCompany}
                                onChange={(e) => setAboutContent(prev => ({ ...prev, profileCompany: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Bliss Realty"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Profile Image URL
                        </label>
                        <input
                            type="url"
                            value={aboutContent.profileImage}
                            onChange={(e) => setAboutContent(prev => ({ ...prev, profileImage: e.target.value }))}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="https://example.com/profile.jpg"
                        />
                        <p className="text-xs text-slate-500 mt-1">This is the photo displayed on the right side of the About page</p>
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Philosophy Section</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Philosophy Title
                            </label>
                            <input
                                type="text"
                                value={aboutContent.philosophyTitle}
                                onChange={(e) => setAboutContent(prev => ({ ...prev, philosophyTitle: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="My Commitment to You"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Philosophy Text
                        </label>
                        <textarea
                            value={aboutContent.philosophyText}
                            onChange={(e) => setAboutContent(prev => ({ ...prev, philosophyText: e.target.value }))}
                            rows={3}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Real estate is more than..."
                        />
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Lifestyle Section (Bottom Banner)</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Lifestyle Title
                            </label>
                            <input
                                type="text"
                                value={aboutContent.lifestyleTitle}
                                onChange={(e) => setAboutContent(prev => ({ ...prev, lifestyleTitle: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Living the Phoenix Valley Dream"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Lifestyle Text
                        </label>
                        <textarea
                            value={aboutContent.lifestyleText}
                            onChange={(e) => setAboutContent(prev => ({ ...prev, lifestyleText: e.target.value }))}
                            rows={2}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="From desert hiking trails..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Lifestyle Background Image URL
                        </label>
                        <input
                            type="url"
                            value={aboutContent.lifestyleImage}
                            onChange={(e) => setAboutContent(prev => ({ ...prev, lifestyleImage: e.target.value }))}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="https://example.com/lifestyle-banner.jpg"
                        />
                        <p className="text-xs text-slate-500 mt-1">This image appears in the bottom banner section</p>
                    </div>
                </motion.div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
                >
                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2">Page Header</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Page Title
                            </label>
                            <input
                                type="text"
                                value={contactContent.pageTitle}
                                onChange={(e) => setContactContent(prev => ({ ...prev, pageTitle: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Let's Connect"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Form Title
                            </label>
                            <input
                                type="text"
                                value={contactContent.formTitle}
                                onChange={(e) => setContactContent(prev => ({ ...prev, formTitle: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Send Me a Message"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Page Subtitle
                        </label>
                        <textarea
                            value={contactContent.pageSubtitle}
                            onChange={(e) => setContactContent(prev => ({ ...prev, pageSubtitle: e.target.value }))}
                            rows={2}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Ready to start your real estate journey?"
                        />
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Contact Information</h2>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                value={contactContent.phone}
                                onChange={(e) => setContactContent(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="(602) 405-8002"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={contactContent.email}
                                onChange={(e) => setContactContent(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="email@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                value={contactContent.address}
                                onChange={(e) => setContactContent(prev => ({ ...prev, address: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Phoenix, Arizona"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Office Hours / Service Area
                        </label>
                        <input
                            type="text"
                            value={contactContent.officeHours}
                            onChange={(e) => setContactContent(prev => ({ ...prev, officeHours: e.target.value }))}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Serving the entire Valley"
                        />
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Profile Card</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Profile Name
                            </label>
                            <input
                                type="text"
                                value={contactContent.profileName}
                                onChange={(e) => setContactContent(prev => ({ ...prev, profileName: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Lara Chapman"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Profile Title
                            </label>
                            <input
                                type="text"
                                value={contactContent.profileTitle}
                                onChange={(e) => setContactContent(prev => ({ ...prev, profileTitle: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Realtor® | Investor | Home Stager"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Profile Image URL
                        </label>
                        <input
                            type="text"
                            value={contactContent.profileImage}
                            onChange={(e) => setContactContent(prev => ({ ...prev, profileImage: e.target.value }))}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="/profile.jpg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Profile Blurb
                        </label>
                        <textarea
                            value={contactContent.profileBlurb}
                            onChange={(e) => setContactContent(prev => ({ ...prev, profileBlurb: e.target.value }))}
                            rows={3}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="I'm always available to help..."
                        />
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Social Section</h2>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Social Media Blurb
                        </label>
                        <textarea
                            value={contactContent.socialBlurb}
                            onChange={(e) => setContactContent(prev => ({ ...prev, socialBlurb: e.target.value }))}
                            rows={2}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Get market updates..."
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Facebook URL
                            </label>
                            <input
                                type="url"
                                value={contactContent.facebookUrl}
                                onChange={(e) => setContactContent(prev => ({ ...prev, facebookUrl: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="https://www.facebook.com/..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Instagram URL
                            </label>
                            <input
                                type="url"
                                value={contactContent.instagramUrl}
                                onChange={(e) => setContactContent(prev => ({ ...prev, instagramUrl: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="https://www.instagram.com/..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                LinkedIn URL
                            </label>
                            <input
                                type="url"
                                value={contactContent.linkedinUrl}
                                onChange={(e) => setContactContent(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="https://www.linkedin.com/..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                YouTube URL
                            </label>
                            <input
                                type="url"
                                value={contactContent.youtubeUrl}
                                onChange={(e) => setContactContent(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="https://www.youtube.com/..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Twitter/X URL
                            </label>
                            <input
                                type="url"
                                value={contactContent.twitterUrl}
                                onChange={(e) => setContactContent(prev => ({ ...prev, twitterUrl: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="https://x.com/..."
                            />
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Neighborhoods Tab */}
            {activeTab === 'neighborhoods' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
                >
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Neighborhoods Page Header</h2>
                        <p className="text-sm text-slate-600 mb-4">
                            Edit the main title and description that appears at the top of the Neighborhoods page.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Page Title
                        </label>
                        <input
                            type="text"
                            value={neighborhoodsContent.pageTitle}
                            onChange={(e) => setNeighborhoodsContent(prev => ({ ...prev, pageTitle: e.target.value }))}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Phoenix Valley Neighborhoods"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Page Description
                        </label>
                        <textarea
                            value={neighborhoodsContent.pageDescription}
                            onChange={(e) => setNeighborhoodsContent(prev => ({ ...prev, pageDescription: e.target.value }))}
                            rows={4}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Phoenix is a vibrant and diverse city..."
                        />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-sm text-blue-800">
                            <strong>Note:</strong> Individual neighborhood details are managed separately in the Neighborhoods admin section.
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Calculators Tab */}
            {activeTab === 'calculators' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
                >
                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2">Page Header</h2>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Page Title
                        </label>
                        <input
                            type="text"
                            value={calculatorsContent.pageTitle}
                            onChange={(e) => setCalculatorsContent(prev => ({ ...prev, pageTitle: e.target.value }))}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Mortgage Calculators"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Introduction Text
                        </label>
                        <textarea
                            value={calculatorsContent.mortgageIntroText}
                            onChange={(e) => setCalculatorsContent(prev => ({ ...prev, mortgageIntroText: e.target.value }))}
                            rows={2}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Estimate your payments..."
                        />
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Calculator Descriptions</h2>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Affordability Calculator Description
                        </label>
                        <textarea
                            value={calculatorsContent.affordabilityIntroText}
                            onChange={(e) => setCalculatorsContent(prev => ({ ...prev, affordabilityIntroText: e.target.value }))}
                            rows={2}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Estimate how much home you can afford..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Disclaimer Text
                        </label>
                        <textarea
                            value={calculatorsContent.disclaimer}
                            onChange={(e) => setCalculatorsContent(prev => ({ ...prev, disclaimer: e.target.value }))}
                            rows={2}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="These calculators are for informational purposes only..."
                        />
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-6">Partner Section</h2>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Partner Section Title
                        </label>
                        <input
                            type="text"
                            value={calculatorsContent.partnerSectionTitle}
                            onChange={(e) => setCalculatorsContent(prev => ({ ...prev, partnerSectionTitle: e.target.value }))}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Additional Calculators from Our Partner"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Partner Box Title
                        </label>
                        <input
                            type="text"
                            value={calculatorsContent.partnerBoxTitle}
                            onChange={(e) => setCalculatorsContent(prev => ({ ...prev, partnerBoxTitle: e.target.value }))}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Visit Our Partner's Calculators"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Partner Description
                        </label>
                        <textarea
                            value={calculatorsContent.partnerDescription}
                            onChange={(e) => setCalculatorsContent(prev => ({ ...prev, partnerDescription: e.target.value }))}
                            rows={3}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="For additional mortgage calculators, please visit our trusted partner..."
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Partner Button Text
                            </label>
                            <input
                                type="text"
                                value={calculatorsContent.partnerButtonText}
                                onChange={(e) => setCalculatorsContent(prev => ({ ...prev, partnerButtonText: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Visit Barrett Financial Calculators"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Partner Button URL
                            </label>
                            <input
                                type="url"
                                value={calculatorsContent.partnerButtonUrl}
                                onChange={(e) => setCalculatorsContent(prev => ({ ...prev, partnerButtonUrl: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="https://www.barrettfinancial.com/mortgage-calculators"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Partner Footer Text
                        </label>
                        <textarea
                            value={calculatorsContent.partnerFooterText}
                            onChange={(e) => setCalculatorsContent(prev => ({ ...prev, partnerFooterText: e.target.value }))}
                            rows={2}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="These calculators are provided by our trusted lending partner..."
                        />
                    </div>
                </motion.div>
            )}

            {/* Header Tab */}
            {activeTab === 'header' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
                >
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Header/Navigation Content</h2>
                        <p className="text-sm text-slate-600 mb-4">
                            Edit the logo text that appears in the navigation header across all pages.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Logo Text
                            </label>
                            <input
                                type="text"
                                value={headerContent.logoText}
                                onChange={(e) => setHeaderContent(prev => ({ ...prev, logoText: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Lara Chapman"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Logo Subtext
                            </label>
                            <input
                                type="text"
                                value={headerContent.logoSubtext}
                                onChange={(e) => setHeaderContent(prev => ({ ...prev, logoSubtext: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Realtor®"
                            />
                        </div>
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Navigation Menu Builder</h2>
                    <p className="text-sm text-slate-600 mb-4">
                        Add, remove, and reorder links in your main navigation menu.
                    </p>

                    <div className="space-y-4">
                        {(headerContent.menuItems || []).map((item, index) => (
                            <div key={index} className="flex gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="flex-1 space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Label</label>
                                            <input
                                                type="text"
                                                value={item.label}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setHeaderContent(prev => ({
                                                        ...prev,
                                                        menuItems: prev.menuItems.map((it, i) => i === index ? { ...it, label: val } : it)
                                                    }));
                                                }}
                                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Path / URL</label>
                                            <input
                                                type="text"
                                                value={item.path}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setHeaderContent(prev => ({
                                                        ...prev,
                                                        menuItems: prev.menuItems.map((it, i) => i === index ? { ...it, path: val } : it)
                                                    }));
                                                }}
                                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={item.isExternal}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setHeaderContent(prev => ({
                                                    ...prev,
                                                    menuItems: prev.menuItems.map((it, i) => i === index ? { ...it, isExternal: checked } : it)
                                                }));
                                            }}
                                            className="mr-2 h-4 w-4 text-[#E76F51] focus:ring-[#E76F51] border-gray-300 rounded"
                                        />
                                        <label className="text-sm text-slate-600">External Link (opens in new tab)</label>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        const newItems = headerContent.menuItems.filter((_, i) => i !== index);
                                        setHeaderContent(prev => ({ ...prev, menuItems: newItems }));
                                    }}
                                    className="text-red-500 hover:text-red-700 p-2 mt-8"
                                    title="Remove Item"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}

                        <button
                            onClick={() => {
                                setHeaderContent(prev => ({
                                    ...prev,
                                    menuItems: [...(prev.menuItems || []), { label: 'New Link', path: '/', isExternal: false }]
                                }));
                            }}
                            className="flex items-center text-[#E76F51] font-bold mt-4 hover:underline"
                        >
                            <Plus size={20} className="mr-2" /> Add Menu Item
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Footer Tab */}
            {activeTab === 'footer' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
                >
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">General Settings</h2>
                        <p className="text-sm text-slate-600 mb-4">
                            Configure the main footer details.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Logo Text
                            </label>
                            <input
                                type="text"
                                value={footerContent.logoText}
                                onChange={(e) => setFooterContent(prev => ({ ...prev, logoText: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Lara Chapman"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Copyright Text
                            </label>
                            <input
                                type="text"
                                value={footerContent.copyrightText}
                                onChange={(e) => setFooterContent(prev => ({ ...prev, copyrightText: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="© 2025 Lara Chapman..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Tagline
                        </label>
                        <textarea
                            value={footerContent.tagline}
                            onChange={(e) => setFooterContent(prev => ({ ...prev, tagline: e.target.value }))}
                            rows={2}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Realtor®, investor, and home stager..."
                        />
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Footer Contact Info</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                            <input
                                type="text"
                                value={footerContent.address}
                                onChange={(e) => setFooterContent(prev => ({ ...prev, address: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Phoenix, Arizona"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                            <input
                                type="text"
                                value={footerContent.phone}
                                onChange={(e) => setFooterContent(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="(602) 405-8002"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={footerContent.email}
                                onChange={(e) => setFooterContent(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="email@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Office Hours</label>
                            <input
                                type="text"
                                value={footerContent.officeHours}
                                onChange={(e) => setFooterContent(prev => ({ ...prev, officeHours: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Mon-Fri, 9am - 5pm"
                            />
                        </div>
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Section Titles</h2>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Quick Links Title
                            </label>
                            <input
                                type="text"
                                value={footerContent.quickLinksTitle}
                                onChange={(e) => setFooterContent(prev => ({ ...prev, quickLinksTitle: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Quick Links"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Resources Title
                            </label>
                            <input
                                type="text"
                                value={footerContent.resourcesTitle}
                                onChange={(e) => setFooterContent(prev => ({ ...prev, resourcesTitle: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Resources"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Contact Title
                            </label>
                            <input
                                type="text"
                                value={footerContent.contactTitle}
                                onChange={(e) => setFooterContent(prev => ({ ...prev, contactTitle: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Contact Me"
                            />
                        </div>
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Buttons & Links</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Consultation Button Text
                            </label>
                            <input
                                type="text"
                                value={footerContent.consultationButtonText}
                                onChange={(e) => setFooterContent(prev => ({ ...prev, consultationButtonText: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Schedule a Consultation"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Search Homes URL
                            </label>
                            <input
                                type="url"
                                value={footerContent.searchHomesUrl}
                                onChange={(e) => setFooterContent(prev => ({ ...prev, searchHomesUrl: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149"
                            />
                        </div>
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Quick Links Menu</h2>
                    <p className="text-sm text-slate-600 mb-4">
                        Add, remove, and reorder links in the Quick Links column.
                    </p>

                    <div className="space-y-4 mb-8">
                        {(footerContent.quickLinks || []).map((item, index) => (
                            <div key={index} className="flex gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="flex-1 space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Label</label>
                                            <input
                                                type="text"
                                                value={item.label}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setFooterContent(prev => ({
                                                        ...prev,
                                                        quickLinks: prev.quickLinks.map((it, i) => i === index ? { ...it, label: val } : it)
                                                    }));
                                                }}
                                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Path / URL</label>
                                            <input
                                                type="text"
                                                value={item.path}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setFooterContent(prev => ({
                                                        ...prev,
                                                        quickLinks: prev.quickLinks.map((it, i) => i === index ? { ...it, path: val } : it)
                                                    }));
                                                }}
                                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={item.isExternal}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setFooterContent(prev => ({
                                                    ...prev,
                                                    quickLinks: prev.quickLinks.map((it, i) => i === index ? { ...it, isExternal: checked } : it)
                                                }));
                                            }}
                                            className="mr-2 h-4 w-4 text-[#E76F51] focus:ring-[#E76F51] border-gray-300 rounded"
                                        />
                                        <label className="text-sm text-slate-600">External Link (opens in new tab)</label>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        const newItems = footerContent.quickLinks.filter((_, i) => i !== index);
                                        setFooterContent(prev => ({ ...prev, quickLinks: newItems }));
                                    }}
                                    className="text-red-500 hover:text-red-700 p-2 mt-8"
                                    title="Remove Item"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => setFooterContent(prev => ({
                                ...prev,
                                quickLinks: [...(prev.quickLinks || []), { label: 'New Link', path: '/', isExternal: false }]
                            }))}
                            className="flex items-center gap-2 text-[#E76F51] font-medium hover:text-[#E76F51]/80"
                        >
                            <Plus size={18} /> Add Quick Link
                        </button>
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Resource Links Menu</h2>
                    <p className="text-sm text-slate-600 mb-4">
                        Add, remove, and reorder links in the Resources column.
                    </p>

                    <div className="space-y-4 mb-4">
                        {(footerContent.resourceLinks || []).map((item, index) => (
                            <div key={index} className="flex gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="flex-1 space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Label</label>
                                            <input
                                                type="text"
                                                value={item.label}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setFooterContent(prev => ({
                                                        ...prev,
                                                        resourceLinks: prev.resourceLinks.map((it, i) => i === index ? { ...it, label: val } : it)
                                                    }));
                                                }}
                                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Path / URL</label>
                                            <input
                                                type="text"
                                                value={item.path}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setFooterContent(prev => ({
                                                        ...prev,
                                                        resourceLinks: prev.resourceLinks.map((it, i) => i === index ? { ...it, path: val } : it)
                                                    }));
                                                }}
                                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={item.isExternal}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setFooterContent(prev => ({
                                                    ...prev,
                                                    resourceLinks: prev.resourceLinks.map((it, i) => i === index ? { ...it, isExternal: checked } : it)
                                                }));
                                            }}
                                            className="mr-2 h-4 w-4 text-[#E76F51] focus:ring-[#E76F51] border-gray-300 rounded"
                                        />
                                        <label className="text-sm text-slate-600">External Link (opens in new tab)</label>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        const newItems = footerContent.resourceLinks.filter((_, i) => i !== index);
                                        setFooterContent(prev => ({ ...prev, resourceLinks: newItems }));
                                    }}
                                    className="text-red-500 hover:text-red-700 p-2 mt-8"
                                    title="Remove Item"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => setFooterContent(prev => ({
                                ...prev,
                                resourceLinks: [...(prev.resourceLinks || []), { label: 'New Resource', path: '/', isExternal: false }]
                            }))}
                            className="flex items-center gap-2 text-[#E76F51] font-medium hover:text-[#E76F51]/80"
                        >
                            <Plus size={18} /> Add Resource Link
                        </button>
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Legal Links</h2>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Privacy Policy</label>
                            <input
                                type="text"
                                value={footerContent.privacyPolicyLinkText}
                                onChange={(e) => setFooterContent(prev => ({ ...prev, privacyPolicyLinkText: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Privacy Policy"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Terms of Use</label>
                            <input
                                type="text"
                                value={footerContent.termsLinkText}
                                onChange={(e) => setFooterContent(prev => ({ ...prev, termsLinkText: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Terms of Use"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Accessibility</label>
                            <input
                                type="text"
                                value={footerContent.accessibilityLinkText}
                                onChange={(e) => setFooterContent(prev => ({ ...prev, accessibilityLinkText: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Accessibility"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Disclaimer Text
                        </label>
                        <textarea
                            value={footerContent.disclaimerText}
                            onChange={(e) => setFooterContent(prev => ({ ...prev, disclaimerText: e.target.value }))}
                            rows={4}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="The data relating to real estate for sale on this web site..."
                        />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-sm text-blue-800">
                            <strong>Note:</strong> Social media links are managed in the Contact tab. Contact details here are for the Footer specifically.
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
                >
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Resources Page Content</h2>
                        <p className="text-sm text-slate-600 mb-4">
                            Edit the content that appears on the Resources page.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Page Title
                        </label>
                        <input
                            type="text"
                            value={resourcesContent.pageTitle}
                            onChange={(e) => setResourcesContent(prev => ({ ...prev, pageTitle: e.target.value }))}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Helpful Resources"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Page Subtitle
                        </label>
                        <textarea
                            value={resourcesContent.pageSubtitle}
                            onChange={(e) => setResourcesContent(prev => ({ ...prev, pageSubtitle: e.target.value }))}
                            rows={2}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Download free guides, checklists, and reports to help you navigate the Phoenix Valley real estate market with confidence."
                        />
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Call-to-Action Section</h2>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            CTA Section Title
                        </label>
                        <input
                            type="text"
                            value={resourcesContent.ctaSectionTitle}
                            onChange={(e) => setResourcesContent(prev => ({ ...prev, ctaSectionTitle: e.target.value }))}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Need More Information?"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            CTA Section Text
                        </label>
                        <textarea
                            value={resourcesContent.ctaSectionText}
                            onChange={(e) => setResourcesContent(prev => ({ ...prev, ctaSectionText: e.target.value }))}
                            rows={3}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="These resources are just the beginning. I'm here to provide personalized guidance and answer any questions you have about buying, selling, or investing in Phoenix Valley real estate."
                        />
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 border-b pb-2 pt-4">Default Resources</h2>
                    <p className="text-sm text-slate-600 mb-4">Edit the 4 default resources displayed on the resources page.</p>

                    {/* Resource 1 */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                        <h3 className="font-bold text-slate-700 mb-3">Resource 1</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={resourcesContent.resource1Title}
                                    onChange={(e) => setResourcesContent(prev => ({ ...prev, resource1Title: e.target.value }))}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                                <input
                                    type="text"
                                    value={resourcesContent.resource1Description}
                                    onChange={(e) => setResourcesContent(prev => ({ ...prev, resource1Description: e.target.value }))}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">File URL (PDF)</label>
                            <input
                                type="text"
                                value={resourcesContent.resource1Url}
                                onChange={(e) => setResourcesContent(prev => ({ ...prev, resource1Url: e.target.value }))}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            />
                        </div>
                    </div>

                    {/* Resource 2 */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                        <h3 className="font-bold text-slate-700 mb-3">Resource 2</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={resourcesContent.resource2Title}
                                    onChange={(e) => setResourcesContent(prev => ({ ...prev, resource2Title: e.target.value }))}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                                <input
                                    type="text"
                                    value={resourcesContent.resource2Description}
                                    onChange={(e) => setResourcesContent(prev => ({ ...prev, resource2Description: e.target.value }))}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">File URL (PDF)</label>
                            <input
                                type="text"
                                value={resourcesContent.resource2Url}
                                onChange={(e) => setResourcesContent(prev => ({ ...prev, resource2Url: e.target.value }))}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            />
                        </div>
                    </div>

                    {/* Resource 3 */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                        <h3 className="font-bold text-slate-700 mb-3">Resource 3</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={resourcesContent.resource3Title}
                                    onChange={(e) => setResourcesContent(prev => ({ ...prev, resource3Title: e.target.value }))}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                                <input
                                    type="text"
                                    value={resourcesContent.resource3Description}
                                    onChange={(e) => setResourcesContent(prev => ({ ...prev, resource3Description: e.target.value }))}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">File URL (PDF)</label>
                            <input
                                type="text"
                                value={resourcesContent.resource3Url}
                                onChange={(e) => setResourcesContent(prev => ({ ...prev, resource3Url: e.target.value }))}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            />
                        </div>
                    </div>

                    {/* Resource 4 */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                        <h3 className="font-bold text-slate-700 mb-3">Resource 4</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={resourcesContent.resource4Title}
                                    onChange={(e) => setResourcesContent(prev => ({ ...prev, resource4Title: e.target.value }))}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                                <input
                                    type="text"
                                    value={resourcesContent.resource4Description}
                                    onChange={(e) => setResourcesContent(prev => ({ ...prev, resource4Description: e.target.value }))}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">File URL (PDF)</label>
                            <input
                                type="text"
                                value={resourcesContent.resource4Url}
                                onChange={(e) => setResourcesContent(prev => ({ ...prev, resource4Url: e.target.value }))}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            />
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-sm text-blue-800">
                            <strong>Note:</strong> Contact phone and email displayed on this page are managed in the Contact tab.
                        </p>
                    </div>
                </motion.div>
            )
            }
        </div >
    );
};

export default AdminGeneral;
