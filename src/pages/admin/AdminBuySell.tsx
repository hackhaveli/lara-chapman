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
        neighborhoodTitle: '',
        neighborhoodText: '',
        steps: [] as Step[]
    });

    const [sellContent, setSellContent] = useState({
        introTitle: '',
        introText: '',
        stepsTitle: '',
        stagingTitle: '',
        stagingSubtitle: '',
        stagingCta: '',
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
                    neighborhoodTitle: buy?.neighborhoodTitle || '',
                    neighborhoodText: buy?.neighborhoodText || '',
                    steps: buy?.steps || []
                });
                setSellContent({
                    introTitle: sell?.introTitle || '',
                    introText: sell?.introText || '',
                    stepsTitle: sell?.stepsTitle || 'Your Home Selling Journey',
                    stagingTitle: sell?.stagingTitle || 'Staging Examples',
                    stagingSubtitle: sell?.stagingSubtitle || '',
                    stagingCta: sell?.stagingCta || '',
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
                                <div className="mt-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Section Title
                                    </label>
                                    <input
                                        type="text"
                                        value={buyContent.stepsTitle}
                                        onChange={(e) => handleBuyChange('stepsTitle', e.target.value)}
                                        className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                        placeholder="Your Home Buying Journey"
                                    />
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
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default AdminBuySell;
