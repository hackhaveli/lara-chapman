import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, AlertCircle, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
    getNeighborhoods,
    deleteNeighborhood,
    updateNeighborhood,
    Neighborhood
} from '../../lib/api';

const AdminNeighborhoods: React.FC = () => {
    const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchNeighborhoods = async () => {
        setLoading(true);
        try {
            const response = await getNeighborhoods(false); // Get all, including inactive
            if (response.success && response.data) {
                setNeighborhoods(response.data);
            }
        } catch (error) {
            showNotification('error', 'Failed to fetch neighborhoods');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNeighborhoods();
    }, []);

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleToggleActive = async (id: string, currentStatus: boolean) => {
        try {
            const response = await updateNeighborhood(id, { isActive: !currentStatus });
            if (response.success) {
                setNeighborhoods(prev =>
                    prev.map(n => n._id === id ? { ...n, isActive: !currentStatus } : n)
                );
                showNotification('success', `Neighborhood ${!currentStatus ? 'activated' : 'deactivated'}`);
            }
        } catch (error) {
            showNotification('error', 'Failed to update status');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteNeighborhood(id);
            if (response.success) {
                setNeighborhoods(prev => prev.filter(n => n._id !== id));
                showNotification('success', 'Neighborhood deleted successfully');
            } else {
                showNotification('error', response.message || 'Failed to delete');
            }
        } catch (error) {
            showNotification('error', 'Failed to delete neighborhood');
        }
        setDeleteConfirm(null);
    };

    const filteredNeighborhoods = neighborhoods.filter(n =>
        n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Neighborhoods</h1>
                    <p className="text-slate-500 mt-1">Manage neighborhood listings</p>
                </div>
                <Link
                    to="/admin/neighborhoods/new"
                    className="inline-flex items-center gap-2 bg-[#E76F51] hover:bg-[#E76F51]/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                    <Plus size={20} />
                    Create New Neighborhood
                </Link>
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
                    placeholder="Search neighborhoods..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E76F51] focus:border-transparent"
                />
            </div>

            {/* Neighborhoods List */}
            {loading ? (
                <div className="grid gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                            <div className="h-6 bg-slate-200 rounded w-1/3 mb-3"></div>
                            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                        </div>
                    ))}
                </div>
            ) : filteredNeighborhoods.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center">
                    <div className="text-slate-400 mb-4">
                        <Search size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">
                        {searchTerm ? 'No neighborhoods found' : 'No neighborhoods yet'}
                    </h3>
                    <p className="text-slate-500 mb-6">
                        {searchTerm
                            ? 'Try adjusting your search terms'
                            : 'Create your first neighborhood to get started'}
                    </p>
                    {!searchTerm && (
                        <Link
                            to="/admin/neighborhoods/new"
                            className="inline-flex items-center gap-2 bg-[#E76F51] hover:bg-[#E76F51]/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                        >
                            <Plus size={20} />
                            Create First Neighborhood
                        </Link>
                    )}
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredNeighborhoods.map((neighborhood, index) => (
                        <motion.div
                            key={neighborhood._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${neighborhood.isActive
                                    ? 'border-l-green-500'
                                    : 'border-l-slate-300'
                                }`}
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-slate-800">{neighborhood.name}</h3>
                                        <span className={`text-xs px-2 py-1 rounded-full ${neighborhood.isActive
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-slate-100 text-slate-500'
                                            }`}>
                                            {neighborhood.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <p className="text-slate-600 text-sm line-clamp-2">{neighborhood.shortDescription}</p>
                                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                                        <span>Slug: {neighborhood.slug}</span>
                                        <span>•</span>
                                        <span>{neighborhood.highlights?.length || 0} highlights</span>
                                        <span>•</span>
                                        <span>{neighborhood.summary?.length || 0} summary points</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleToggleActive(neighborhood._id, neighborhood.isActive)}
                                        className={`p-2 rounded-lg transition-colors ${neighborhood.isActive
                                                ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                            }`}
                                        title={neighborhood.isActive ? 'Deactivate' : 'Activate'}
                                    >
                                        {neighborhood.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </button>

                                    <button
                                        onClick={() => navigate(`/admin/neighborhoods/edit/${neighborhood._id}`)}
                                        className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 size={18} />
                                    </button>

                                    {deleteConfirm === neighborhood._id ? (
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleDelete(neighborhood._id)}
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
                                            onClick={() => setDeleteConfirm(neighborhood._id)}
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
                <span>Total: {neighborhoods.length} neighborhoods</span>
                <span>•</span>
                <span>Active: {neighborhoods.filter(n => n.isActive).length}</span>
                <span>•</span>
                <span>Inactive: {neighborhoods.filter(n => !n.isActive).length}</span>
            </div>
        </div>
    );
};

export default AdminNeighborhoods;
