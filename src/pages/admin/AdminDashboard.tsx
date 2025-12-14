import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Map, FileText, Settings, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getNeighborhoods, getContent } from '../../lib/api';

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState({
        neighborhoods: 0,
        activeNeighborhoods: 0,
        lastUpdated: null as Date | null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [neighborhoodsRes, contentRes] = await Promise.all([
                    getNeighborhoods(),
                    getContent()
                ]);

                if (neighborhoodsRes.success && neighborhoodsRes.data) {
                    const activeCount = neighborhoodsRes.data.filter(n => n.isActive).length;
                    setStats(prev => ({
                        ...prev,
                        neighborhoods: neighborhoodsRes.data!.length,
                        activeNeighborhoods: activeCount
                    }));
                }

                if (contentRes.success) {
                    setStats(prev => ({
                        ...prev,
                        lastUpdated: new Date()
                    }));
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            title: 'Total Neighborhoods',
            value: stats.neighborhoods,
            icon: Map,
            color: 'bg-blue-500',
            link: '/admin/neighborhoods'
        },
        {
            title: 'Active Neighborhoods',
            value: stats.activeNeighborhoods,
            icon: TrendingUp,
            color: 'bg-green-500',
            link: '/admin/neighborhoods'
        },
        {
            title: 'Page Sections',
            value: 6,
            icon: FileText,
            color: 'bg-purple-500',
            link: '/admin/general'
        },
        {
            title: 'Buy/Sell Steps',
            value: 12,
            icon: Settings,
            color: 'bg-orange-500',
            link: '/admin/buy-sell'
        }
    ];

    const quickLinks = [
        { label: 'Add New Neighborhood', path: '/admin/neighborhoods/new', icon: Map },
        { label: 'Edit Buy Page', path: '/admin/buy-sell', icon: FileText },
        { label: 'Edit Sell Page', path: '/admin/buy-sell', icon: FileText },
        { label: 'Update Contact Info', path: '/admin/general', icon: Settings },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
                <p className="text-slate-500 mt-1">Welcome to the Lara Chapman Admin Panel</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <Link
                            to={stat.link}
                            className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-500 text-sm">{stat.title}</p>
                                    <p className="text-3xl font-bold text-slate-800 mt-1">
                                        {loading ? '...' : stat.value}
                                    </p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-xl text-white`}>
                                    <stat.icon size={24} />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
            >
                <h2 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.path}
                            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-[#E76F51] hover:bg-[#E76F51]/5 transition-all"
                        >
                            <link.icon size={20} className="text-[#E76F51]" />
                            <span className="text-slate-700 font-medium">{link.label}</span>
                        </Link>
                    ))}
                </div>
            </motion.div>

            {/* Getting Started Guide */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="bg-gradient-to-r from-[#E76F51] to-[#E76F51]/80 rounded-2xl p-6 text-white"
            >
                <h2 className="text-xl font-bold mb-4">Getting Started</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white/10 rounded-xl p-4">
                        <div className="text-2xl font-bold mb-2">1</div>
                        <h3 className="font-semibold mb-1">Manage Neighborhoods</h3>
                        <p className="text-white/80 text-sm">
                            Add, edit, or remove neighborhood listings from the Neighborhoods tab.
                        </p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                        <div className="text-2xl font-bold mb-2">2</div>
                        <h3 className="font-semibold mb-1">Update Buy & Sell Pages</h3>
                        <p className="text-white/80 text-sm">
                            Customize the buying and selling process steps shown on respective pages.
                        </p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                        <div className="text-2xl font-bold mb-2">3</div>
                        <h3 className="font-semibold mb-1">General Settings</h3>
                        <p className="text-white/80 text-sm">
                            Edit about info, contact details, and calculator text from General Pages.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Last Updated */}
            {stats.lastUpdated && (
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Clock size={16} />
                    <span>Last checked: {stats.lastUpdated.toLocaleTimeString()}</span>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
