import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle } from 'lucide-react';
import { login, setAuthToken, isAuthenticated } from '../../lib/api';

const AdminLogin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await login(username, password);

            if (response.success && response.token) {
                setAuthToken(response.token);
                navigate('/admin/dashboard');
            } else {
                setError(response.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E76F51] rounded-full mb-4">
                            <Lock size={28} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
                        <p className="text-slate-300">Lara Chapman Real Estate</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-3"
                        >
                            <AlertCircle size={20} className="text-red-400" />
                            <span className="text-red-200">{error}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E76F51] focus:border-transparent transition-all"
                                    placeholder="Enter username"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E76F51] focus:border-transparent transition-all"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-[#E76F51] hover:bg-[#E76F51]/90 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                        <a
                            href="/"
                            className="text-slate-400 hover:text-white transition-colors text-sm"
                        >
                            ← Back to Website
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
