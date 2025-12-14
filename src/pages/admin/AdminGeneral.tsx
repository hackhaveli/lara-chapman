import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, AlertCircle, CheckCircle, User, Phone, Calculator, Home } from 'lucide-react';
import { getContent, updateContentSection } from '../../lib/api';

const AdminGeneral: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'home' | 'about' | 'contact' | 'calculators'>('home');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const [homeContent, setHomeContent] = useState({
        heroTitle: '',
        heroSubtitle: '',
        heroImage: '',
        bioExcerpt: '',
        servicesTitle: '',
        servicesSubtitle: '',
        ctaTitle: '',
        ctaSubtitle: ''
    });

    const [aboutContent, setAboutContent] = useState({
        pageTitle: '',
        pageSubtitle: '',
        fullBio: '',
        profileImage: '',
        philosophyTitle: '',
        philosophyText: '',
        lifestyleTitle: '',
        lifestyleText: ''
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
        socialBlurb: ''
    });

    const [calculatorsContent, setCalculatorsContent] = useState({
        pageTitle: '',
        mortgageIntroText: '',
        affordabilityIntroText: '',
        disclaimer: ''
    });

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await getContent();
            if (response.success && response.data) {
                const { home, about, contact, calculators } = response.data;

                setHomeContent({
                    heroTitle: home?.heroTitle || '',
                    heroSubtitle: home?.heroSubtitle || '',
                    heroImage: home?.heroImage || '',
                    bioExcerpt: home?.bioExcerpt || '',
                    servicesTitle: home?.servicesTitle || 'My Services',
                    servicesSubtitle: home?.servicesSubtitle || '',
                    ctaTitle: home?.ctaTitle || '',
                    ctaSubtitle: home?.ctaSubtitle || ''
                });

                setAboutContent({
                    pageTitle: about?.pageTitle || 'Meet Lara Chapman',
                    pageSubtitle: about?.pageSubtitle || '',
                    fullBio: about?.fullBio || '',
                    profileImage: about?.profileImage || '',
                    philosophyTitle: about?.philosophyTitle || '',
                    philosophyText: about?.philosophyText || '',
                    lifestyleTitle: about?.lifestyleTitle || '',
                    lifestyleText: about?.lifestyleText || ''
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
                    socialBlurb: contact?.socialBlurb || ''
                });

                setCalculatorsContent({
                    pageTitle: calculators?.pageTitle || '',
                    mortgageIntroText: calculators?.mortgageIntroText || '',
                    affordabilityIntroText: calculators?.affordabilityIntroText || '',
                    disclaimer: calculators?.disclaimer || ''
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
                case 'calculators':
                    response = await updateContentSection('calculators', calculatorsContent);
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
        { id: 'calculators' as const, label: 'Calculators', icon: Calculator },
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

                    <div className="grid md:grid-cols-2 gap-4">
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
                                Profile Image URL
                            </label>
                            <input
                                type="url"
                                value={aboutContent.profileImage}
                                onChange={(e) => setAboutContent(prev => ({ ...prev, profileImage: e.target.value }))}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="https://example.com/profile.jpg"
                            />
                        </div>
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
                </motion.div>
            )}
        </div>
    );
};

export default AdminGeneral;
