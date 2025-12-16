import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, AlertCircle, CheckCircle, GripVertical } from 'lucide-react';
import { getContent, updateContentSection } from '../../lib/api';

interface Service {
    icon: string;
    title: string;
    description: string;
    link: string;
    internal: boolean;
}

const AdminServices: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [services, setServices] = useState<Service[]>([]);

    const availableIcons = ['HomeIcon', 'DollarSign', 'Palette', 'TrendingUp', 'Building', 'Key', 'Heart', 'Star'];

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await getContent();
            if (response.success && response.data?.home?.services) {
                setServices(response.data.home.services);
            }
        } catch (error) {
            showNotification('error', 'Failed to fetch services');
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
            const response = await updateContentSection('home', { services });
            if (response?.success) {
                showNotification('success', 'Services updated successfully!');
            } else {
                showNotification('error', response?.message || 'Failed to save');
            }
        } catch (error) {
            showNotification('error', 'An error occurred while saving');
        } finally {
            setSaving(false);
        }
    };

    const addService = () => {
        setServices([
            ...services,
            {
                icon: 'HomeIcon',
                title: '',
                description: '',
                link: '',
                internal: true
            }
        ]);
    };

    const updateService = (index: number, field: keyof Service, value: any) => {
        const updated = [...services];
        updated[index] = { ...updated[index], [field]: value };
        setServices(updated);
    };

    const deleteService = (index: number) => {
        if (confirm('Are you sure you want to delete this service?')) {
            setServices(services.filter((_, i) => i !== index));
        }
    };

    const moveService = (index: number, direction: 'up' | 'down') => {
        const newServices = [...services];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= services.length) return;

        [newServices[index], newServices[targetIndex]] = [newServices[targetIndex], newServices[index]];
        setServices(newServices);
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-8 bg-slate-200 rounded w-48 animate-pulse"></div>
                <div className="bg-white rounded-xl p-6 space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 bg-slate-100 rounded-xl animate-pulse"></div>
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
                    <h1 className="text-3xl font-bold text-slate-800">Manage Services</h1>
                    <p className="text-slate-500 mt-1">Customize the services displayed on your home page</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={addService}
                        className="flex items-center gap-2 px-4 py-3 bg-slate-600 text-white rounded-xl hover:bg-slate-700 transition-colors"
                    >
                        <Plus size={18} />
                        Add Service
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 bg-[#E76F51] text-white rounded-xl hover:bg-[#E76F51]/90 transition-colors disabled:opacity-50"
                    >
                        <Save size={18} />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
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

            {/* Services List */}
            <div className="space-y-4">
                {services.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center">
                        <p className="text-slate-500 mb-4">No services yet. Click "Add Service" to get started!</p>
                    </div>
                ) : (
                    services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl p-6 shadow-sm"
                        >
                            <div className="flex items-start gap-4">
                                {/* Drag Handle */}
                                <div className="flex flex-col gap-1 pt-3">
                                    <button
                                        onClick={() => moveService(index, 'up')}
                                        disabled={index === 0}
                                        className="text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <GripVertical size={20} />
                                    </button>
                                    <button
                                        onClick={() => moveService(index, 'down')}
                                        disabled={index === services.length - 1}
                                        className="text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <GripVertical size={20} className="rotate-180" />
                                    </button>
                                </div>

                                {/* Form Fields */}
                                <div className="flex-1 space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Icon
                                            </label>
                                            <select
                                                value={service.icon}
                                                onChange={(e) => updateService(index, 'icon', e.target.value)}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            >
                                                {availableIcons.map(icon => (
                                                    <option key={icon} value={icon}>{icon}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                value={service.title}
                                                onChange={(e) => updateService(index, 'title', e.target.value)}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                                placeholder="Service title"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            value={service.description}
                                            onChange={(e) => updateService(index, 'description', e.target.value)}
                                            rows={2}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            placeholder="Service description"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Link URL
                                            </label>
                                            <input
                                                type="text"
                                                value={service.link}
                                                onChange={(e) => updateService(index, 'link', e.target.value)}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                                placeholder="/buy or https://example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Link Type
                                            </label>
                                            <select
                                                value={service.internal ? 'internal' : 'external'}
                                                onChange={(e) => updateService(index, 'internal', e.target.value === 'internal')}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                            >
                                                <option value="internal">Internal</option>
                                                <option value="external">External</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Delete Button */}
                                <button
                                    onClick={() => deleteService(index)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete service"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> Services are displayed in the order shown here. Use the arrows to reorder them.
                    Internal links navigate within your site (e.g., /buy), while external links open in a new tab (e.g., https://example.com).
                </p>
            </div>
        </div>
    );
};

export default AdminServices;
