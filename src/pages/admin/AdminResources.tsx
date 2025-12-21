import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, FileText, Download, AlertCircle, CheckCircle, Search } from 'lucide-react';
import {
    getResources,
    createResource,
    updateResource,
    deleteResource,
    Resource,
    ResourceInput
} from '../../lib/api';

const AdminResources: React.FC = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [editingResource, setEditingResource] = useState<Resource | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<ResourceInput>({
        title: '',
        description: '',
        fileUrl: '',
        fileType: 'PDF',
        category: 'General',
        isActive: true,
        order: 0,
        requiresEmail: true,
        ghlFunnelUrl: ''
    });

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        setLoading(true);
        try {
            const response = await getResources(false); // Get all, including inactive
            if (response.success && response.data) {
                setResources(response.data);
            }
        } catch (error) {
            showNotification('error', 'Failed to fetch resources');
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleCreate = () => {
        setFormData({
            title: '',
            description: '',
            fileUrl: '',
            fileType: 'PDF',
            category: 'General',
            isActive: true,
            order: resources.length,
            requiresEmail: true,
            ghlFunnelUrl: ''
        });
        setEditingResource(null);
        setShowForm(true);
    };

    const handleEdit = (resource: Resource) => {
        setFormData({
            title: resource.title,
            description: resource.description,
            fileUrl: resource.fileUrl,
            fileType: resource.fileType,
            category: resource.category,
            isActive: resource.isActive,
            order: resource.order,
            requiresEmail: resource.requiresEmail,
            ghlFunnelUrl: resource.ghlFunnelUrl || ''
        });
        setEditingResource(resource);
        setShowForm(true);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingResource) {
                // Update existing resource
                const response = await updateResource(editingResource._id, formData);
                if (response.success) {
                    setResources(prev =>
                        prev.map(r => r._id === editingResource._id ? response.data! : r)
                    );
                    showNotification('success', 'Resource updated successfully');
                } else {
                    showNotification('error', response.message || 'Failed to update resource');
                }
            } else {
                // Create new resource
                const response = await createResource(formData);
                if (response.success && response.data) {
                    setResources(prev => [...prev, response.data!]);
                    showNotification('success', 'Resource created successfully');
                } else {
                    showNotification('error', response.message || 'Failed to create resource');
                }
            }

            setShowForm(false);
            setEditingResource(null);
        } catch (error) {
            showNotification('error', 'An error occurred');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteResource(id);
            if (response.success) {
                setResources(prev => prev.filter(r => r._id !== id));
                showNotification('success', 'Resource deleted successfully');
            } else {
                showNotification('error', response.message || 'Failed to delete');
            }
        } catch (error) {
            showNotification('error', 'Failed to delete resource');
        }
        setDeleteConfirm(null);
    };

    const handleToggleActive = async (resource: Resource) => {
        try {
            const response = await updateResource(resource._id, { isActive: !resource.isActive });
            if (response.success) {
                setResources(prev =>
                    prev.map(r => r._id === resource._id ? { ...r, isActive: !resource.isActive } : r)
                );
                showNotification('success', `Resource ${!resource.isActive ? 'activated' : 'deactivated'}`);
            }
        } catch (error) {
            showNotification('error', 'Failed to update status');
        }
    };

    const filteredResources = resources.filter(r =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                        <FileText className="text-[#E76F51]" size={32} />
                        Resources
                    </h1>
                    <p className="text-slate-500 mt-1">Manage downloadable resources and guides</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="inline-flex items-center gap-2 bg-[#E76F51] hover:bg-[#E76F51]/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                    <Plus size={20} />
                    Add New Resource
                </button>
            </div>

            {/* Notification */}
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${notification.type === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}
                >
                    {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    {notification.message}
                </motion.div>
            )}

            {/* Search */}
            <div className="relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51] focus:border-transparent"
                />
            </div>

            {/* Resources List */}
            {loading ? (
                <div className="grid gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                            <div className="h-6 bg-slate-200 rounded w-1/3 mb-3"></div>
                            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                        </div>
                    ))}
                </div>
            ) : filteredResources.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center">
                    <div className="text-slate-400 mb-4">
                        <FileText size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">
                        {searchTerm ? 'No resources found' : 'No resources yet'}
                    </h3>
                    <p className="text-slate-500 mb-6">
                        {searchTerm
                            ? 'Try adjusting your search terms'
                            : 'Create your first resource to get started'}
                    </p>
                    {!searchTerm && (
                        <button
                            onClick={handleCreate}
                            className="inline-flex items-center gap-2 bg-[#E76F51] hover:bg-[#E76F51]/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                        >
                            <Plus size={20} />
                            Add First Resource
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredResources.map((resource, index) => (
                        <motion.div
                            key={resource._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${resource.isActive
                                ? 'border-l-green-500'
                                : 'border-l-slate-300'
                                }`}
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-slate-800">{resource.title}</h3>
                                        <span className={`text-xs px-2 py-1 rounded-full ${resource.isActive
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-slate-100 text-slate-500'
                                            }`}>
                                            {resource.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                            {resource.fileType}
                                        </span>
                                        <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                                            {resource.category}
                                        </span>
                                    </div>
                                    <p className="text-slate-600 text-sm line-clamp-2 mb-3">{resource.description}</p>
                                    <div className="flex items-center gap-4 text-xs text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <Download size={14} />
                                            {resource.downloadCount} downloads
                                        </span>
                                        <span>•</span>
                                        <span>Order: {resource.order}</span>
                                        {resource.requiresEmail && (
                                            <>
                                                <span>•</span>
                                                <span>Requires Email</span>
                                            </>
                                        )}
                                        {resource.ghlFunnelUrl && (
                                            <>
                                                <span>•</span>
                                                <span className="text-green-600">GHL Funnel Connected</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="mt-2 text-xs text-slate-400">
                                        URL: <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{resource.fileUrl}</a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleToggleActive(resource)}
                                        className={`p-2 rounded-lg transition-colors ${resource.isActive
                                            ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                            }`}
                                        title={resource.isActive ? 'Deactivate' : 'Activate'}
                                    >
                                        {resource.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </button>

                                    <button
                                        onClick={() => handleEdit(resource)}
                                        className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 size={18} />
                                    </button>

                                    {deleteConfirm === resource._id ? (
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleDelete(resource._id)}
                                                className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600"
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(null)}
                                                className="px-3 py-1 rounded-lg bg-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-300"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setDeleteConfirm(resource._id)}
                                            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Stats Footer */}
            <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>Total: {resources.length} resources</span>
                <span>•</span>
                <span>Active: {resources.filter(r => r.isActive).length}</span>
                <span>•</span>
                <span>Inactive: {resources.filter(r => !r.isActive).length}</span>
                <span>•</span>
                <span>Total Downloads: {resources.reduce((sum, r) => sum + r.downloadCount, 0)}</span>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-800">
                                {editingResource ? 'Edit Resource' : 'Add New Resource'}
                            </h2>
                            <button
                                onClick={() => setShowForm(false)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="e.g., Pool Safety Regulations"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="Brief description of this resource..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    File URL *
                                </label>
                                <input
                                    type="url"
                                    required
                                    value={formData.fileUrl}
                                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="https://example.com/file.pdf or /Pool_Safety.pdf"
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    Use full URL or path relative to public folder (e.g., /Pool_Safety.pdf)
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        File Type
                                    </label>
                                    <select
                                        value={formData.fileType}
                                        onChange={(e) => setFormData({ ...formData, fileType: e.target.value as any })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    >
                                        <option value="PDF">PDF</option>
                                        <option value="DOC">DOC</option>
                                        <option value="DOCX">DOCX</option>
                                        <option value="XLS">XLS</option>
                                        <option value="XLSX">XLSX</option>
                                        <option value="ZIP">ZIP</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    >
                                        <option value="Buyer Guide">Buyer Guide</option>
                                        <option value="Seller Guide">Seller Guide</option>
                                        <option value="Checklist">Checklist</option>
                                        <option value="Market Report">Market Report</option>
                                        <option value="Safety">Safety</option>
                                        <option value="General">General</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="0"
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    Lower numbers appear first
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    GHL Funnel URL (Optional)
                                </label>
                                <input
                                    type="url"
                                    value={formData.ghlFunnelUrl}
                                    onChange={(e) => setFormData({ ...formData, ghlFunnelUrl: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
                                    placeholder="https://your-ghl-funnel-url.com"
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    If provided, users will be redirected to this GHL funnel instead of the email form
                                </p>
                            </div>

                            <div className="flex items-center gap-6 pt-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.requiresEmail}
                                        onChange={(e) => setFormData({ ...formData, requiresEmail: e.target.checked })}
                                        className="w-5 h-5 text-[#E76F51] rounded focus:ring-[#E76F51]"
                                    />
                                    <span className="text-sm font-medium text-slate-700">Require Email to Download</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-5 h-5 text-[#E76F51] rounded focus:ring-[#E76F51]"
                                    />
                                    <span className="text-sm font-medium text-slate-700">Active</span>
                                </label>
                            </div>

                            <div className="flex gap-3 pt-6 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#E76F51] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#E76F51]/90 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Save size={18} />
                                    {editingResource ? 'Update Resource' : 'Create Resource'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminResources;
