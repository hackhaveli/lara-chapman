import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Save,
    Plus,
    Trash2,
    AlertCircle,
    CheckCircle,
    Image,
    Video,
    FileText
} from 'lucide-react';
import {
    createNeighborhood,
    updateNeighborhood,
    getNeighborhoods,
    NeighborhoodInput
} from '../../lib/api';

const NeighborhoodForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(isEditing);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const [formData, setFormData] = useState<NeighborhoodInput>({
        name: '',
        slug: '',
        thumbnailImage: '',
        shortDescription: '',
        fullDescription: '',
        videoUrl: '',
        highlights: [''],
        stats: {
            homeValues: '',
            costOfLiving: '',
            lifestyle: ''
        },
        didYouKnow: '',
        schools: '',
        summary: [{ feature: '', description: '' }],
        ctaButtons: ['', ''],
        isActive: true
    });

    useEffect(() => {
        if (isEditing && id) {
            fetchNeighborhood();
        }
    }, [id, isEditing]);

    const fetchNeighborhood = async () => {
        try {
            const response = await getNeighborhoods(false);
            if (response.success && response.data) {
                const neighborhood = response.data.find(n => n._id === id);
                if (neighborhood) {
                    setFormData({
                        name: neighborhood.name,
                        slug: neighborhood.slug,
                        thumbnailImage: neighborhood.thumbnailImage || '',
                        shortDescription: neighborhood.shortDescription,
                        fullDescription: neighborhood.fullDescription,
                        videoUrl: neighborhood.videoUrl || '',
                        highlights: neighborhood.highlights?.length ? neighborhood.highlights : [''],
                        stats: neighborhood.stats || { homeValues: '', costOfLiving: '', lifestyle: '' },
                        didYouKnow: neighborhood.didYouKnow || '',
                        schools: neighborhood.schools || '',
                        summary: neighborhood.summary?.length ? neighborhood.summary : [{ feature: '', description: '' }],
                        ctaButtons: neighborhood.ctaButtons?.length ? neighborhood.ctaButtons : ['', ''],
                        isActive: neighborhood.isActive
                    });
                }
            }
        } catch (error) {
            showNotification('error', 'Failed to fetch neighborhood');
        } finally {
            setFetchLoading(false);
        }
    };

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 4000);
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setFormData(prev => ({
            ...prev,
            name,
            slug: prev.slug || generateSlug(name)
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleStatsChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            stats: { ...prev.stats, [field]: value }
        }));
    };

    const handleHighlightChange = (index: number, value: string) => {
        setFormData(prev => {
            const highlights = [...(prev.highlights || [])];
            highlights[index] = value;
            return { ...prev, highlights };
        });
    };

    const addHighlight = () => {
        setFormData(prev => ({
            ...prev,
            highlights: [...(prev.highlights || []), '']
        }));
    };

    const removeHighlight = (index: number) => {
        setFormData(prev => ({
            ...prev,
            highlights: (prev.highlights || []).filter((_, i) => i !== index)
        }));
    };

    const handleSummaryChange = (index: number, field: 'feature' | 'description', value: string) => {
        setFormData(prev => {
            const summary = [...(prev.summary || [])];
            summary[index] = { ...summary[index], [field]: value };
            return { ...prev, summary };
        });
    };

    const addSummary = () => {
        setFormData(prev => ({
            ...prev,
            summary: [...(prev.summary || []), { feature: '', description: '' }]
        }));
    };

    const removeSummary = (index: number) => {
        setFormData(prev => ({
            ...prev,
            summary: (prev.summary || []).filter((_, i) => i !== index)
        }));
    };

    const handleCtaChange = (index: number, value: string) => {
        setFormData(prev => {
            const ctaButtons = [...(prev.ctaButtons || [])];
            ctaButtons[index] = value;
            return { ...prev, ctaButtons };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Clean up data
        const cleanData: NeighborhoodInput = {
            ...formData,
            highlights: formData.highlights?.filter(h => h.trim()) || [],
            summary: formData.summary?.filter(s => s.feature.trim() || s.description.trim()) || [],
            ctaButtons: formData.ctaButtons?.filter(c => c.trim()) || []
        };

        try {
            const response = isEditing
                ? await updateNeighborhood(id!, cleanData)
                : await createNeighborhood(cleanData);

            if (response.success) {
                showNotification('success', isEditing ? 'Neighborhood updated!' : 'Neighborhood created!');
                setTimeout(() => navigate('/admin/neighborhoods'), 1500);
            } else {
                showNotification('error', response.message || 'Failed to save');
            }
        } catch (error) {
            showNotification('error', 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#E76F51] border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/admin/neighborhoods')}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        {isEditing ? 'Edit Neighborhood' : 'Create New Neighborhood'}
                    </h1>
                    <p className="text-slate-500 mt-1">
                        {isEditing ? 'Update neighborhood details' : 'Add a new neighborhood listing'}
                    </p>
                </div>
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

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FileText size={20} className="text-[#E76F51]" />
                        Basic Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleNameChange}
                                required
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="e.g., Paradise Valley"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Slug (URL)
                            </label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="auto-generated-from-name"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Short Description * (for card view)
                        </label>
                        <textarea
                            name="shortDescription"
                            value={formData.shortDescription}
                            onChange={handleChange}
                            required
                            rows={2}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="A brief description for the neighborhood card..."
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Full Description * (for detail page)
                        </label>
                        <textarea
                            name="fullDescription"
                            value={formData.fullDescription}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                            placeholder="Detailed description of the neighborhood..."
                        />
                    </div>
                </div>

                {/* Media */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Image size={20} className="text-[#E76F51]" />
                        Media
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <Image size={16} className="inline mr-1" />
                                Thumbnail Image URL
                            </label>
                            <input
                                type="url"
                                name="thumbnailImage"
                                value={formData.thumbnailImage}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <Video size={16} className="inline mr-1" />
                                Video URL (YouTube)
                            </label>
                            <input
                                type="url"
                                name="videoUrl"
                                value={formData.videoUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="https://youtube.com/watch?v=..."
                            />
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Facts / Stats</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Home Values
                            </label>
                            <textarea
                                value={formData.stats?.homeValues || ''}
                                onChange={(e) => handleStatsChange('homeValues', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="e.g., Homes generally range from..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Cost of Living
                            </label>
                            <textarea
                                value={formData.stats?.costOfLiving || ''}
                                onChange={(e) => handleStatsChange('costOfLiving', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="e.g., Housing costs, sales tax..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Lifestyle
                            </label>
                            <textarea
                                value={formData.stats?.lifestyle || ''}
                                onChange={(e) => handleStatsChange('lifestyle', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="e.g., Outdoor activities, dining scene..."
                            />
                        </div>
                    </div>
                </div>

                {/* Highlights */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-800">Highlights</h2>
                        <button
                            type="button"
                            onClick={addHighlight}
                            className="flex items-center gap-1 text-sm text-[#E76F51] hover:text-[#E76F51]/80"
                        >
                            <Plus size={16} /> Add Highlight
                        </button>
                    </div>

                    <div className="space-y-3">
                        {formData.highlights?.map((highlight, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={highlight}
                                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                                    className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder={`Highlight ${index + 1}`}
                                />
                                {(formData.highlights?.length || 0) > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeHighlight(index)}
                                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Info */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Additional Information</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Did You Know?
                            </label>
                            <textarea
                                name="didYouKnow"
                                value={formData.didYouKnow}
                                onChange={handleChange}
                                rows={2}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="Fun fact about the neighborhood..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Schools
                            </label>
                            <textarea
                                name="schools"
                                value={formData.schools}
                                onChange={handleChange}
                                rows={2}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="School districts serving this area..."
                            />
                        </div>
                    </div>
                </div>

                {/* Summary Points */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-800">At a Glance (Summary Points)</h2>
                        <button
                            type="button"
                            onClick={addSummary}
                            className="flex items-center gap-1 text-sm text-[#E76F51] hover:text-[#E76F51]/80"
                        >
                            <Plus size={16} /> Add Point
                        </button>
                    </div>

                    <div className="space-y-4">
                        {formData.summary?.map((item, index) => (
                            <div key={index} className="flex gap-2 items-start">
                                <div className="flex-1 grid md:grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        value={item.feature}
                                        onChange={(e) => handleSummaryChange(index, 'feature', e.target.value)}
                                        className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                        placeholder="Feature name"
                                    />
                                    <input
                                        type="text"
                                        value={item.description}
                                        onChange={(e) => handleSummaryChange(index, 'description', e.target.value)}
                                        className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                        placeholder="Description"
                                    />
                                </div>
                                {(formData.summary?.length || 0) > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeSummary(index)}
                                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">CTA Buttons</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Primary CTA
                            </label>
                            <input
                                type="text"
                                value={formData.ctaButtons?.[0] || ''}
                                onChange={(e) => handleCtaChange(0, e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="e.g., View Market Report"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Secondary CTA
                            </label>
                            <input
                                type="text"
                                value={formData.ctaButtons?.[1] || ''}
                                onChange={(e) => handleCtaChange(1, e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                placeholder="e.g., Search Homes"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.isActive}
                            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                            className="w-5 h-5 rounded border-slate-300 text-[#E76F51] focus:ring-[#E76F51]"
                        />
                        <span className="text-slate-700">Active (visible on website)</span>
                    </label>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/neighborhoods')}
                            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E76F51] hover:bg-[#E76F51]/90 text-white font-semibold transition-colors disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    {isEditing ? 'Update' : 'Create'} Neighborhood
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NeighborhoodForm;
