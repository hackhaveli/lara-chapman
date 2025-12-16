import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, AlertCircle, CheckCircle, ShoppingCart, Tag, GripVertical } from 'lucide-react';
import { getContent, updateContentSection } from '../../lib/api';

interface Step {
    icon: string;
    title: string;
    text: string;
}

const AdminBuySell: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const [buyContent, setBuyContent] = useState({
        introTitle: '',
        introText: '',
        mlsDescription: '',
        stepsTitle: '',
        stepsSubtitle: '',
        neighborhoodTitle: '',
        neighborhoodText: '',
        searchButtonText: '',
        searchButtonUrl: '',
        neighborhoodButtonText: '',
        neighborhoodButtonUrl: '',
        ctaButtonText: '',
        ctaButtonUrl: '',
        resourcesTitle: '',
        resourcesSubtitle: '',
        steps: [] as Step[],
        resources: [] as Array<{ icon: string; title: string; description: string; buttonText: string; buttonUrl: string; isExternal: boolean; isDownload: boolean }>
    });

    const [sellContent, setSellContent] = useState({
        introTitle: '',
        introText: '',
        stepsTitle: '',
        stepsSubtitle: '',
        stagingTitle: '',
        stagingSubtitle: '',
        stagingCta: '',
        stagingButtonText: '',
        stagingButtonUrl: '',
        stagingGallery: [] as Array<{ image: string; room: string; description: string }>,
        resourcesTitle: '',
        resourcesSubtitle: '',
        resources: [] as Array<{ icon: string; title: string; description: string; buttonText: string; buttonUrl: string; isExternal: boolean; isDownload: boolean }>,
        faqTitle: '',
        faqSubtitle: '',
        faqs: [] as Array<{ question: string; answer: string }>,
        ctaTitle: '',
        ctaText: '',
        ctaButtonText: '',
        ctaButtonUrl: '',
        marketingPoints: [] as Step[]
    });

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await getContent();
            if (response.success && response.data) {
                const { buy, sell } = response.data;
                setBuyContent({
                    introTitle: buy?.introTitle || '',
                    introText: buy?.introText || '',
                    mlsDescription: buy?.mlsDescription || '',
                    stepsTitle: buy?.stepsTitle || 'Your Home Buying Journey',
                    stepsSubtitle: buy?.stepsSubtitle || 'I guide you through every step of the process, making home buying as smooth and successful as possible.',
                    neighborhoodTitle: buy?.neighborhoodTitle || '',
                    neighborhoodText: buy?.neighborhoodText || '',
                    searchButtonText: buy?.searchButtonText || 'Search Homes for Sale',
                    searchButtonUrl: buy?.searchButtonUrl || 'https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149',
                    neighborhoodButtonText: buy?.neighborhoodButtonText || 'View Neighborhood Guides',
                    neighborhoodButtonUrl: buy?.neighborhoodButtonUrl || '/neighborhoods',
                    ctaButtonText: buy?.ctaButtonText || 'Start Your Home Search Today',
                    ctaButtonUrl: buy?.ctaButtonUrl || 'https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149',
                    resourcesTitle: buy?.resourcesTitle || 'Helpful Resources',
                    resourcesSubtitle: buy?.resourcesSubtitle || 'Tools and information to help you make informed decisions throughout your home buying journey.',
                    steps: buy?.steps || [],
                    resources: buy?.resources || []
                });
                setSellContent({
                    introTitle: sell?.introTitle || '',
                    introText: sell?.introText || '',
                    stepsTitle: sell?.stepsTitle || 'Your Home Selling Journey',
                    stepsSubtitle: sell?.stepsSubtitle || 'I guide you through every step of the selling process to maximize your home\'s value and minimize stress.',
                    stagingTitle: sell?.stagingTitle || 'Staging Examples',
                    stagingSubtitle: sell?.stagingSubtitle || '',
                    stagingCta: sell?.stagingCta || '',
                    stagingButtonText: sell?.stagingButtonText || 'Learn More About Staging Services',
                    stagingButtonUrl: sell?.stagingButtonUrl || 'https://styleandstaging.com',
                    stagingGallery: sell?.stagingGallery || [],
                    resourcesTitle: sell?.resourcesTitle || 'Helpful Resources',
                    resourcesSubtitle: sell?.resourcesSubtitle || 'Download free guides and tools to help you prepare for selling your home.',
                    resources: sell?.resources || [],
                    faqTitle: sell?.faqTitle || 'Frequently Asked Questions',
                    faqSubtitle: sell?.faqSubtitle || 'Get answers to common questions about selling your home in the Phoenix Valley.',
                    faqs: sell?.faqs || [],
                    ctaTitle: sell?.ctaTitle || 'Ready to Sell Your Home?',
                    ctaText: sell?.ctaText || 'Get a free, no-obligation home value estimate and learn how I can help you achieve your selling goals.',
                    ctaButtonText: sell?.ctaButtonText || 'Request a Free Home Value Estimate Today',
                    ctaButtonUrl: sell?.ctaButtonUrl || 'https://www.highway.ai/app/homereport/register/dTfLtaKXS3?creationSource=signup_link',
                    marketingPoints: sell?.marketingPoints || []
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

    const iconOptions = [
        'FileText', 'Search', 'Eye', 'Key', 'Home', 'DollarSign',
        'Camera', 'TrendingUp', 'CheckCircle', 'Star', 'Award', 'Target'
    ];

    // Buy handlers
    const handleBuyChange = (field: string, value: string) => {
        setBuyContent(prev => ({ ...prev, [field]: value }));
    };

    const handleBuyStepChange = (index: number, field: keyof Step, value: string) => {
        setBuyContent(prev => {
            const steps = [...prev.steps];
            steps[index] = { ...steps[index], [field]: value };
            return { ...prev, steps };
        });
    };

    const addBuyStep = () => {
        setBuyContent(prev => ({
            ...prev,
            steps: [...prev.steps, { icon: 'FileText', title: '', text: '' }]
        }));
    };

    const removeBuyStep = (index: number) => {
        setBuyContent(prev => ({
            ...prev,
            steps: prev.steps.filter((_, i) => i !== index)
        }));
    };

    // Sell handlers
    const handleSellChange = (field: string, value: string) => {
        setSellContent(prev => ({ ...prev, [field]: value }));
    };

    const handleSellPointChange = (index: number, field: keyof Step, value: string) => {
        setSellContent(prev => {
            const marketingPoints = [...prev.marketingPoints];
            marketingPoints[index] = { ...marketingPoints[index], [field]: value };
            return { ...prev, marketingPoints };
        });
    };

    const addSellPoint = () => {
        setSellContent(prev => ({
            ...prev,
            marketingPoints: [...prev.marketingPoints, { icon: 'CheckCircle', title: '', text: '' }]
        }));
    };

    const removeSellPoint = (index: number) => {
        setSellContent(prev => ({
            ...prev,
            marketingPoints: prev.marketingPoints.filter((_, i) => i !== index)
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (activeTab === 'buy') {
                const response = await updateContentSection('buy', buyContent);
                if (response.success) {
                    showNotification('success', 'Buy page content saved successfully');
                } else {
                    showNotification('error', response.message || 'Failed to save');
                }
            } else {
                const response = await updateContentSection('sell', sellContent);
                if (response.success) {
                    showNotification('success', 'Sell page content saved successfully');
                } else {
                    showNotification('error', response.message || 'Failed to save');
                }
            }
        } catch (error) {
            showNotification('error', 'An error occurred while saving');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-8 bg-slate-200 rounded w-48 animate-pulse"></div>
                <div className="bg-white rounded-xl p-6 space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse"></div>
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
                    <h1 className="text-3xl font-bold text-slate-800">Buy & Sell Pages</h1>
                    <p className="text-slate-500 mt-1">Manage ALL text content for Buy and Sell pages</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E76F51] hover:bg-[#E76F51]/90 text-white font-semibold transition-colors disabled:opacity-50"
                >
                    {saving ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save size={20} />
                            Save Changes
                        </>
                    )}
                </button>
            </div>

            {/* Notification */}
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${notification.type === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}
                >
                    {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    {notification.message}
                </motion.div>
            )}

            {/* Tabs */}
            <div className="flex gap-2 bg-slate-100 p-1 rounded-xl w-fit">
                <button
                    onClick={() => setActiveTab('buy')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'buy'
                        ? 'bg-white text-slate-800 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    <ShoppingCart size={18} />
                    Buy Page
                </button>
                <button
                    onClick={() => setActiveTab('sell')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'sell'
                        ? 'bg-white text-slate-800 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    <Tag size={18} />
                    Sell Page
                </button>
            </div>

            {/* Buy Content */}
            {activeTab === 'buy' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                >
                    {/* Header Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Page Header</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Page Title
                                </label>
                                <input
                                    type="text"
                                    value={buyContent.introTitle}
                                    onChange={(e) => handleBuyChange('introTitle', e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Buying a Home in the Phoenix Valley"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Introduction Text
                                </label>
                                <textarea
                                    value={buyContent.introText}
                                    onChange={(e) => handleBuyChange('introText', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Get access to the same MLS database..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    MLS Description Box
                                </label>
                                <textarea
                                    value={buyContent.mlsDescription}
                                    onChange={(e) => handleBuyChange('mlsDescription', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="This is the same MLS Realtors® use..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Buying Steps */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Buying Process Steps</h2>
                                <div className="mt-2 space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Section Title
                                        </label>
                                        <input
                                            type="text"
                                            value={buyContent.stepsTitle}
                                            onChange={(e) => handleBuyChange('stepsTitle', e.target.value)}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            placeholder="Your Home Buying Journey"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Section Subtitle
                                        </label>
                                        <textarea
                                            value={buyContent.stepsSubtitle}
                                            onChange={(e) => handleBuyChange('stepsSubtitle', e.target.value)}
                                            rows={2}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            placeholder="I guide you through every step..."
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={addBuyStep}
                                className="flex items-center gap-1 text-sm text-[#E76F51] hover:text-[#E76F51]/80 font-medium"
                            >
                                <Plus size={16} /> Add Step
                            </button>
                        </div>

                        <div className="space-y-4 mt-4">
                            {buyContent.steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex gap-4 p-4 bg-slate-50 rounded-xl"
                                >
                                    <div className="flex items-center text-slate-400 cursor-move">
                                        <GripVertical size={20} />
                                    </div>

                                    <div className="flex items-center justify-center w-10 h-10 bg-[#E76F51] rounded-full text-white font-bold flex-shrink-0">
                                        {index + 1}
                                    </div>

                                    <div className="flex-1 space-y-3">
                                        <div className="grid md:grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                value={step.title}
                                                onChange={(e) => handleBuyStepChange(index, 'title', e.target.value)}
                                                className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                                placeholder="Step title"
                                            />
                                            <select
                                                value={step.icon}
                                                onChange={(e) => handleBuyStepChange(index, 'icon', e.target.value)}
                                                className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            >
                                                {iconOptions.map(icon => (
                                                    <option key={icon} value={icon}>{icon}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <textarea
                                            value={step.text}
                                            onChange={(e) => handleBuyStepChange(index, 'text', e.target.value)}
                                            rows={2}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            placeholder="Step description..."
                                        />
                                    </div>

                                    <button
                                        onClick={() => removeBuyStep(index)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg self-start"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </motion.div>
                            ))}

                            {buyContent.steps.length === 0 && (
                                <div className="text-center py-8 text-slate-400">
                                    No steps added yet. Click "Add Step" to get started.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Neighborhood Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Neighborhood Section</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Section Title
                                </label>
                                <input
                                    type="text"
                                    value={buyContent.neighborhoodTitle}
                                    onChange={(e) => handleBuyChange('neighborhoodTitle', e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Explore Phoenix Valley Neighborhoods"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Section Description
                                </label>
                                <textarea
                                    value={buyContent.neighborhoodText}
                                    onChange={(e) => handleBuyChange('neighborhoodText', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Every community in the Valley has its own character..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Buttons Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Page Buttons</h2>

                        <div className="space-y-6">
                            {/* Search Button */}
                            <div>
                                <h3 className="text-md font-semibold text-slate-700 mb-3">Search Button (Top)</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Button Text
                                        </label>
                                        <input
                                            type="text"
                                            value={buyContent.searchButtonText}
                                            onChange={(e) => handleBuyChange('searchButtonText', e.target.value)}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            placeholder="Search Homes for Sale"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Button URL
                                        </label>
                                        <input
                                            type="url"
                                            value={buyContent.searchButtonUrl}
                                            onChange={(e) => handleBuyChange('searchButtonUrl', e.target.value)}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Neighborhood Button */}
                            <div>
                                <h3 className="text-md font-semibold text-slate-700 mb-3">Neighborhood Button</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Button Text
                                        </label>
                                        <input
                                            type="text"
                                            value={buyContent.neighborhoodButtonText}
                                            onChange={(e) => handleBuyChange('neighborhoodButtonText', e.target.value)}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            placeholder="View Neighborhood Guides"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Button URL
                                        </label>
                                        <input
                                            type="text"
                                            value={buyContent.neighborhoodButtonUrl}
                                            onChange={(e) => handleBuyChange('neighborhoodButtonUrl', e.target.value)}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            placeholder="/neighborhoods"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div>
                                <h3 className="text-md font-semibold text-slate-700 mb-3">CTA Button (Bottom)</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Button Text
                                        </label>
                                        <input
                                            type="text"
                                            value={buyContent.ctaButtonText}
                                            onChange={(e) => handleBuyChange('ctaButtonText', e.target.value)}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            placeholder="Start Your Home Search Today"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Button URL
                                        </label>
                                        <input
                                            type="url"
                                            value={buyContent.ctaButtonUrl}
                                            onChange={(e) => handleBuyChange('ctaButtonUrl', e.target.value)}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Helpful Resources Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Helpful Resources Section</h2>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Section Title
                                </label>
                                <input
                                    type="text"
                                    value={buyContent.resourcesTitle}
                                    onChange={(e) => handleBuyChange('resourcesTitle', e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Helpful Resources"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Section Subtitle
                                </label>
                                <textarea
                                    value={buyContent.resourcesSubtitle}
                                    onChange={(e) => handleBuyChange('resourcesSubtitle', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Tools and information to help you..."
                                />
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                            <p className="text-sm text-blue-800">
                                <strong>💡 Note:</strong> The Mortgage Calculator is always shown as the first card. Add additional resource cards below.
                            </p>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-md font-semibold text-slate-700">Resource Cards</h3>
                            <button
                                onClick={() => {
                                    setBuyContent(prev => ({
                                        ...prev,
                                        resources: [...prev.resources, {
                                            icon: 'Home',
                                            title: '',
                                            description: '',
                                            buttonText: '',
                                            buttonUrl: '',
                                            isExternal: false,
                                            isDownload: false
                                        }]
                                    }));
                                }}
                                className="flex items-center gap-1 text-sm text-[#E76F51] hover:text-[#E76F51]/80 font-medium"
                            >
                                <Plus size={16} /> Add Resource
                            </button>
                        </div>

                        <div className="space-y-4">
                            {buyContent.resources.map((resource, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-slate-50 rounded-xl space-y-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-slate-700">Resource {index + 1}</span>
                                        <button
                                            onClick={() => {
                                                setBuyContent(prev => ({
                                                    ...prev,
                                                    resources: prev.resources.filter((_, i) => i !== index)
                                                }));
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Icon</label>
                                            <select
                                                value={resource.icon}
                                                onChange={(e) => {
                                                    const updated = [...buyContent.resources];
                                                    updated[index] = { ...updated[index], icon: e.target.value };
                                                    setBuyContent(prev => ({ ...prev, resources: updated }));
                                                }}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51] text-sm"
                                            >
                                                {iconOptions.map(icon => (
                                                    <option key={icon} value={icon}>{icon}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Title</label>
                                            <input
                                                type="text"
                                                value={resource.title}
                                                onChange={(e) => {
                                                    const updated = [...buyContent.resources];
                                                    updated[index] = { ...updated[index], title: e.target.value };
                                                    setBuyContent(prev => ({ ...prev, resources: updated }));
                                                }}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51] text-sm"
                                                placeholder="Resource title"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
                                        <textarea
                                            value={resource.description}
                                            onChange={(e) => {
                                                const updated = [...buyContent.resources];
                                                updated[index] = { ...updated[index], description: e.target.value };
                                                setBuyContent(prev => ({ ...prev, resources: updated }));
                                            }}
                                            rows={2}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51] text-sm"
                                            placeholder="Resource description"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Button Text</label>
                                            <input
                                                type="text"
                                                value={resource.buttonText}
                                                onChange={(e) => {
                                                    const updated = [...buyContent.resources];
                                                    updated[index] = { ...updated[index], buttonText: e.target.value };
                                                    setBuyContent(prev => ({ ...prev, resources: updated }));
                                                }}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51] text-sm"
                                                placeholder="Download Guide"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Button URL</label>
                                            <input
                                                type="text"
                                                value={resource.buttonUrl}
                                                onChange={(e) => {
                                                    const updated = [...buyContent.resources];
                                                    updated[index] = { ...updated[index], buttonUrl: e.target.value };
                                                    setBuyContent(prev => ({ ...prev, resources: updated }));
                                                }}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51] text-sm"
                                                placeholder="/file.pdf or https://..."
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={resource.isExternal}
                                                onChange={(e) => {
                                                    const updated = [...buyContent.resources];
                                                    updated[index] = { ...updated[index], isExternal: e.target.checked };
                                                    setBuyContent(prev => ({ ...prev, resources: updated }));
                                                }}
                                                className="rounded border-slate-300"
                                            />
                                            <span className="text-slate-600">External Link (opens in new tab)</span>
                                        </label>

                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={resource.isDownload}
                                                onChange={(e) => {
                                                    const updated = [...buyContent.resources];
                                                    updated[index] = { ...updated[index], isDownload: e.target.checked };
                                                    setBuyContent(prev => ({ ...prev, resources: updated }));
                                                }}
                                                className="rounded border-slate-300"
                                            />
                                            <span className="text-slate-600">Download File</span>
                                        </label>
                                    </div>
                                </motion.div>
                            ))}

                            {buyContent.resources.length === 0 && (
                                <div className="text-center py-8 text-slate-400">
                                    No resource cards added yet. Click "Add Resource" to get started.
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Sell Content */}
            {activeTab === 'sell' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                >
                    {/* Header Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Page Header</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Page Title
                                </label>
                                <input
                                    type="text"
                                    value={sellContent.introTitle}
                                    onChange={(e) => handleSellChange('introTitle', e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Selling Your Home with Lara"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Introduction Text
                                </label>
                                <textarea
                                    value={sellContent.introText}
                                    onChange={(e) => handleSellChange('introText', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Get top dollar for your home..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Selling Steps */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Selling Process Steps</h2>
                                <div className="mt-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Section Title
                                    </label>
                                    <input
                                        type="text"
                                        value={sellContent.stepsTitle}
                                        onChange={(e) => handleSellChange('stepsTitle', e.target.value)}
                                        className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                        placeholder="Your Home Selling Journey"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={addSellPoint}
                                className="flex items-center gap-1 text-sm text-[#E76F51] hover:text-[#E76F51]/80 font-medium"
                            >
                                <Plus size={16} /> Add Step
                            </button>
                        </div>

                        <div className="space-y-4 mt-4">
                            {sellContent.marketingPoints.map((point, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex gap-4 p-4 bg-slate-50 rounded-xl"
                                >
                                    <div className="flex items-center text-slate-400 cursor-move">
                                        <GripVertical size={20} />
                                    </div>

                                    <div className="flex items-center justify-center w-10 h-10 bg-[#E76F51] rounded-full text-white font-bold flex-shrink-0">
                                        {index + 1}
                                    </div>

                                    <div className="flex-1 space-y-3">
                                        <div className="grid md:grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                value={point.title}
                                                onChange={(e) => handleSellPointChange(index, 'title', e.target.value)}
                                                className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                                placeholder="Step title"
                                            />
                                            <select
                                                value={point.icon}
                                                onChange={(e) => handleSellPointChange(index, 'icon', e.target.value)}
                                                className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            >
                                                {iconOptions.map(icon => (
                                                    <option key={icon} value={icon}>{icon}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <textarea
                                            value={point.text}
                                            onChange={(e) => handleSellPointChange(index, 'text', e.target.value)}
                                            rows={2}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            placeholder="Step description..."
                                        />
                                    </div>

                                    <button
                                        onClick={() => removeSellPoint(index)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg self-start"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </motion.div>
                            ))}

                            {sellContent.marketingPoints.length === 0 && (
                                <div className="text-center py-8 text-slate-400">
                                    No steps added yet. Click "Add Step" to get started.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Staging Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Staging Section</h2>

                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Section Title
                                    </label>
                                    <input
                                        type="text"
                                        value={sellContent.stagingTitle}
                                        onChange={(e) => handleSellChange('stagingTitle', e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                        placeholder="Staging Examples"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Section Subtitle
                                </label>
                                <textarea
                                    value={sellContent.stagingSubtitle}
                                    onChange={(e) => handleSellChange('stagingSubtitle', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="See how professional staging transforms spaces..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Staging CTA Text (bottom paragraph)
                                </label>
                                <textarea
                                    value={sellContent.stagingCta}
                                    onChange={(e) => handleSellChange('stagingCta', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Professional staging can help your home sell faster..."
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Staging Button Text
                                    </label>
                                    <input
                                        type="text"
                                        value={sellContent.stagingButtonText}
                                        onChange={(e) => handleSellChange('stagingButtonText', e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                        placeholder="Learn More About Staging Services"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Staging Button URL
                                    </label>
                                    <input
                                        type="url"
                                        value={sellContent.stagingButtonUrl}
                                        onChange={(e) => handleSellChange('stagingButtonUrl', e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Steps Subtitle - Adding this field */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Selling Journey Subtitle</h2>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Subtitle Text
                            </label>
                            <textarea
                                value={sellContent.stepsSubtitle}
                                onChange={(e) => handleSellChange('stepsSubtitle', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="I guide you through every step..."
                            />
                        </div>
                    </div>

                    {/* Staging Gallery */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-slate-800">Staging Gallery</h2>
                            <button
                                onClick={() => {
                                    setSellContent(prev => ({
                                        ...prev,
                                        stagingGallery: [...prev.stagingGallery, { image: '', room: '', description: '' }]
                                    }));
                                }}
                                className="flex items-center gap-1 text-sm text-[#E76F51] hover:text-[#E76F51]/80 font-medium"
                            >
                                <Plus size={16} /> Add Gallery Item
                            </button>
                        </div>

                        <div className="space-y-4">
                            {sellContent.stagingGallery.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-slate-50 rounded-xl space-y-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-slate-700">Gallery Item {index + 1}</span>
                                        <button
                                            onClick={() => {
                                                setSellContent(prev => ({
                                                    ...prev,
                                                    stagingGallery: prev.stagingGallery.filter((_, i) => i !== index)
                                                }));
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Image URL</label>
                                        <input
                                            type="url"
                                            value={item.image}
                                            onChange={(e) => {
                                                const updated = [...sellContent.stagingGallery];
                                                updated[index] = { ...updated[index], image: e.target.value };
                                                setSellContent(prev => ({ ...prev, stagingGallery: updated }));
                                            }}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51] text-sm"
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Room Name</label>
                                            <input
                                                type="text"
                                                value={item.room}
                                                onChange={(e) => {
                                                    const updated = [...sellContent.stagingGallery];
                                                    updated[index] = { ...updated[index], room: e.target.value };
                                                    setSellContent(prev => ({ ...prev, stagingGallery: updated }));
                                                }}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51] text-sm"
                                                placeholder="Modern Kitchen"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
                                            <input
                                                type="text"
                                                value={item.description}
                                                onChange={(e) => {
                                                    const updated = [...sellContent.stagingGallery];
                                                    updated[index] = { ...updated[index], description: e.target.value };
                                                    setSellContent(prev => ({ ...prev, stagingGallery: updated }));
                                                }}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51] text-sm"
                                                placeholder="Transformed with sleek cabinetry..."
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {sellContent.stagingGallery.length === 0 && (
                                <div className="text-center py-8 text-slate-400">
                                    No gallery items added yet. Click "Add Gallery Item" to get started.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Resources Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Helpful Resources Section</h2>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Section Title
                                </label>
                                <input
                                    type="text"
                                    value={sellContent.resourcesTitle}
                                    onChange={(e) => handleSellChange('resourcesTitle', e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Helpful Resources"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Section Subtitle
                                </label>
                                <textarea
                                    value={sellContent.resourcesSubtitle}
                                    onChange={(e) => handleSellChange('resourcesSubtitle', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Download free guides and tools..."
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-md font-semibold text-slate-700">Resource Cards</h3>
                            <button
                                onClick={() => {
                                    setSellContent(prev => ({
                                        ...prev,
                                        resources: [...prev.resources, {
                                            icon: 'FileText',
                                            title: '',
                                            description: '',
                                            buttonText: '',
                                            buttonUrl: '',
                                            isExternal: false,
                                            isDownload: false
                                        }]
                                    }));
                                }}
                                className="flex items-center gap-1 text-sm text-[#E76F51] hover:text-[#E76F51]/80 font-medium"
                            >
                                <Plus size={16} /> Add Resource
                            </button>
                        </div>

                        <div className="space-y-4">
                            {sellContent.resources.map((resource, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-slate-50 rounded-xl space-y-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-slate-700">Resource {index + 1}</span>
                                        <button
                                            onClick={() => {
                                                setSellContent(prev => ({
                                                    ...prev,
                                                    resources: prev.resources.filter((_, i) => i !== index)
                                                }));
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Icon</label>
                                            <select
                                                value={resource.icon}
                                                onChange={(e) => {
                                                    const updated = [...sellContent.resources];
                                                    updated[index] = { ...updated[index], icon: e.target.value };
                                                    setSellContent(prev => ({ ...prev, resources: updated }));
                                                }}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51] text-sm"
                                            >
                                                {iconOptions.map(icon => (
                                                    <option key={icon} value={icon}>{icon}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Title</label>
                                            <input
                                                type="text"
                                                value={resource.title}
                                                onChange={(e) => {
                                                    const updated = [...sellContent.resources];
                                                    updated[index] = { ...updated[index], title: e.target.value };
                                                    setSellContent(prev => ({ ...prev, resources: updated }));
                                                }}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51] text-sm"
                                                placeholder="Resource title"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
                                        <textarea
                                            value={resource.description}
                                            onChange={(e) => {
                                                const updated = [...sellContent.resources];
                                                updated[index] = { ...updated[index], description: e.target.value };
                                                setSellContent(prev => ({ ...prev, resources: updated }));
                                            }}
                                            rows={2}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51] text-sm"
                                            placeholder="Resource description"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Button Text</label>
                                            <input
                                                type="text"
                                                value={resource.buttonText}
                                                onChange={(e) => {
                                                    const updated = [...sellContent.resources];
                                                    updated[index] = { ...updated[index], buttonText: e.target.value };
                                                    setSellContent(prev => ({ ...prev, resources: updated }));
                                                }}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51] text-sm"
                                                placeholder="Download Guide"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Button URL</label>
                                            <input
                                                type="text"
                                                value={resource.buttonUrl}
                                                onChange={(e) => {
                                                    const updated = [...sellContent.resources];
                                                    updated[index] = { ...updated[index], buttonUrl: e.target.value };
                                                    setSellContent(prev => ({ ...prev, resources: updated }));
                                                }}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51] text-sm"
                                                placeholder="/file.pdf or https://..."
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={resource.isExternal}
                                                onChange={(e) => {
                                                    const updated = [...sellContent.resources];
                                                    updated[index] = { ...updated[index], isExternal: e.target.checked };
                                                    setSellContent(prev => ({ ...prev, resources: updated }));
                                                }}
                                                className="rounded border-slate-300"
                                            />
                                            <span className="text-slate-600">External Link</span>
                                        </label>

                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={resource.isDownload}
                                                onChange={(e) => {
                                                    const updated = [...sellContent.resources];
                                                    updated[index] = { ...updated[index], isDownload: e.target.checked };
                                                    setSellContent(prev => ({ ...prev, resources: updated }));
                                                }}
                                                className="rounded border-slate-300"
                                            />
                                            <span className="text-slate-600">Download File</span>
                                        </label>
                                    </div>
                                </motion.div>
                            ))}

                            {sellContent.resources.length === 0 && (
                                <div className="text-center py-8 text-slate-400">
                                    No resources added yet. Click "Add Resource" to get started.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">FAQ Section</h2>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Section Title
                                </label>
                                <input
                                    type="text"
                                    value={sellContent.faqTitle}
                                    onChange={(e) => handleSellChange('faqTitle', e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Frequently Asked Questions"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Section Subtitle
                                </label>
                                <textarea
                                    value={sellContent.faqSubtitle}
                                    onChange={(e) => handleSellChange('faqSubtitle', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Get answers to common questions..."
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-md font-semibold text-slate-700">FAQ Items</h3>
                            <button
                                onClick={() => {
                                    setSellContent(prev => ({
                                        ...prev,
                                        faqs: [...prev.faqs, { question: '', answer: '' }]
                                    }));
                                }}
                                className="flex items-center gap-1 text-sm text-[#E76F51] hover:text-[#E76F51]/80 font-medium"
                            >
                                <Plus size={16} /> Add FAQ
                            </button>
                        </div>

                        <div className="space-y-4">
                            {sellContent.faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-slate-50 rounded-xl space-y-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-slate-700">FAQ {index + 1}</span>
                                        <button
                                            onClick={() => {
                                                setSellContent(prev => ({
                                                    ...prev,
                                                    faqs: prev.faqs.filter((_, i) => i !== index)
                                                }));
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Question</label>
                                        <input
                                            type="text"
                                            value={faq.question}
                                            onChange={(e) => {
                                                const updated = [...sellContent.faqs];
                                                updated[index] = { ...updated[index], question: e.target.value };
                                                setSellContent(prev => ({ ...prev, faqs: updated }));
                                            }}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51] text-sm"
                                            placeholder="How do you determine the right listing price?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Answer</label>
                                        <textarea
                                            value={faq.answer}
                                            onChange={(e) => {
                                                const updated = [...sellContent.faqs];
                                                updated[index] = { ...updated[index], answer: e.target.value };
                                                setSellContent(prev => ({ ...prev, faqs: updated }));
                                            }}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51] text-sm"
                                            placeholder="I conduct a comprehensive market analysis..."
                                        />
                                    </div>
                                </motion.div>
                            ))}

                            {sellContent.faqs.length === 0 && (
                                <div className="text-center py-8 text-slate-400">
                                    No FAQs added yet. Click "Add FAQ" to get started.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Call to Action Section</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    CTA Title
                                </label>
                                <input
                                    type="text"
                                    value={sellContent.ctaTitle}
                                    onChange={(e) => handleSellChange('ctaTitle', e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Ready to Sell Your Home?"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    CTA Text
                                </label>
                                <textarea
                                    value={sellContent.ctaText}
                                    onChange={(e) => handleSellChange('ctaText', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Get a free, no-obligation home value estimate..."
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Button Text
                                    </label>
                                    <input
                                        type="text"
                                        value={sellContent.ctaButtonText}
                                        onChange={(e) => handleSellChange('ctaButtonText', e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                        placeholder="Request a Free Home Value Estimate Today"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Button URL
                                    </label>
                                    <input
                                        type="url"
                                        value={sellContent.ctaButtonUrl}
                                        onChange={(e) => handleSellChange('ctaButtonUrl', e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default AdminBuySell;
