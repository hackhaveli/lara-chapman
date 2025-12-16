import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Map,
    ShoppingCart,
    Tag,
    Settings,
    LogOut,
    Home,
    Menu,
    X
} from 'lucide-react';
import { isAuthenticated, removeAuthToken } from '../../lib/api';

const AdminLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        removeAuthToken();
        navigate('/admin');
    };

    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/neighborhoods', icon: Map, label: 'Neighborhoods' },
        { path: '/admin/buy-sell', icon: ShoppingCart, label: 'Buy & Sell Pages' },
        { path: '/admin/services', icon: Tag, label: 'Services' },
        { path: '/admin/general', icon: Settings, label: 'General Pages' },
    ];

    const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Desktop Sidebar */}
            <aside
                className={`hidden lg:flex flex-col bg-slate-900 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'
                    }`}
            >
                <div className="p-4 border-b border-slate-700">
                    <motion.div
                        initial={false}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-10 h-10 bg-[#E76F51] rounded-lg flex items-center justify-center flex-shrink-0">
                            <Home size={20} className="text-white" />
                        </div>
                        {sidebarOpen && (
                            <span className="text-white font-bold text-lg">Admin Panel</span>
                        )}
                    </motion.div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive(item.path)
                                ? 'bg-[#E76F51] text-white'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            {sidebarOpen && <span>{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-700 space-y-2">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all w-full"
                    >
                        <Menu size={20} />
                        {sidebarOpen && <span>Collapse</span>}
                    </button>

                    <a
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
                    >
                        <Home size={20} />
                        {sidebarOpen && <span>View Website</span>}
                    </a>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all w-full"
                    >
                        <LogOut size={20} />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E76F51] rounded-lg flex items-center justify-center">
                        <Home size={20} className="text-white" />
                    </div>
                    <span className="text-white font-bold">Admin</span>
                </div>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-white p-2"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="lg:hidden fixed inset-0 z-40 bg-black/50"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <motion.div
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        className="w-64 h-full bg-slate-900 p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <nav className="space-y-2 mt-16">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive(item.path)
                                        ? 'bg-[#E76F51] text-white'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                        }`}
                                >
                                    <item.icon size={20} />
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}

                            <a
                                href="/"
                                target="_blank"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
                            >
                                <Home size={20} />
                                <span>View Website</span>
                            </a>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all w-full"
                            >
                                <LogOut size={20} />
                                <span>Logout</span>
                            </button>
                        </nav>
                    </motion.div>
                </motion.div>
            )}

            {/* Main Content */}
            <main className="flex-1 lg:p-8 p-4 pt-20 lg:pt-8 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
