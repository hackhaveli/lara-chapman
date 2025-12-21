import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Tag, Search, ArrowRight } from 'lucide-react';
import { getBlogPosts, BlogPost } from '../lib/api';

const Blog: React.FC = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

    const categories = [
        'All',
        'Market Updates',
        'Home Buying Tips',
        'Home Selling Tips',
        'Neighborhoods',
        'Investment',
        'Lifestyle',
        'Real Estate News'
    ];

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        let filtered = posts;

        if (searchTerm) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(post => post.category === selectedCategory);
        }

        setFilteredPosts(filtered);
        setCurrentPage(1);
    }, [posts, searchTerm, selectedCategory]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await getBlogPosts({
                status: 'published',
                sort: '-publishedAt',
                limit: 100
            });
            if (response.success && response.data) {
                setPosts(response.data.posts);
            }
        } catch (error) {
            console.error('Failed to fetch blog posts:', error);
        } finally {
            setLoading(false);
        }
    };

    // Pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts?.slice(indexOfFirstPost, indexOfLastPost) || [];
    const totalPages = Math.ceil((filteredPosts?.length || 0) / postsPerPage);



    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePostClick = (slug: string) => {
        navigate(`/blog/${slug}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-700 text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-[#E76F51] to-[#F4A261]">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white font-serif">
                            Real Estate Insights & Tips
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Stay informed with the latest market trends, home buying guides, and expert advice from Lara Chapman
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Search and Filter Section */}
                <div className="mb-12">
                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto mb-8">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E76F51] focus:border-transparent shadow-sm"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category === 'All' ? 'all' : category)}
                                className={`px-6 py-2 rounded-full transition-all duration-200 font-medium ${(category === 'All' && selectedCategory === 'all') ||
                                    category === selectedCategory
                                    ? 'bg-[#E76F51] text-white shadow-md'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#E76F51] hover:text-[#E76F51]'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blog Posts Grid */}
                {currentPosts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-xl">No posts found</p>
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {currentPosts.map((post, index) => (
                                <motion.article
                                    key={post._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => handlePostClick(post.slug)}
                                    style={{ cursor: 'pointer' }}
                                    className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
                                >
                                    {/* Featured Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={post.featuredImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-4 py-1 bg-[#E76F51] text-white text-sm rounded-full font-semibold shadow-md">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Meta Info */}
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>
                                                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{post.readTime} min read</span>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#E76F51] transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>

                                        {/* Excerpt */}
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        {/* Tags */}
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags.slice(0, 3).map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded flex items-center gap-1"
                                                    >
                                                        <Tag className="w-3 h-3" />
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Author */}
                                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                            <img
                                                src={post.author.image}
                                                alt={post.author.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div className="flex-1">
                                                <p className="text-gray-900 font-medium text-sm">{post.author.name}</p>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-[#E76F51] group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                                >
                                    Previous
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-4 py-2 rounded-lg transition-all font-medium ${currentPage === page
                                            ? 'bg-[#E76F51] text-white shadow-md'
                                            : 'bg-white text-gray-700 border border-gray-200 hover:border-[#E76F51] hover:text-[#E76F51]'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Blog;
