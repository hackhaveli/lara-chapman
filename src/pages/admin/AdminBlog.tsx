import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Save, AlertCircle, CheckCircle, Plus, Edit, Trash2,
    Calendar, Tag, Eye, EyeOff, FileText, Image as ImageIcon, X, Search
} from 'lucide-react';
import {
    getBlogPosts, getBlogPostById, createBlogPost,
    updateBlogPost, deleteBlogPost, BlogPost, BlogPostInput,
    getContent
} from '../../lib/api';
import RichTextEditor from '../../components/RichTextEditor';

const AdminBlog: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'list' | 'edit' | 'create'>('list');
    const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

    // Form state
    const [formData, setFormData] = useState<BlogPostInput>({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featuredImage: '',
        category: 'Real Estate News',
        tags: [],
        status: 'draft',
        author: {
            name: 'Lara Chapman',
            image: '/profile.jpg'
        },
        seo: {
            metaTitle: '',
            metaDescription: '',
            keywords: []
        }
    });

    const [tagInput, setTagInput] = useState('');
    const [keywordInput, setKeywordInput] = useState('');
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const categories = [
        'Market Updates', 'Home Buying Tips', 'Home Selling Tips',
        'Neighborhoods', 'Investment', 'Lifestyle', 'Real Estate News'
    ];

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        let filtered = posts;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (filterCategory !== 'all') {
            filtered = filtered.filter(post => post.category === filterCategory);
        }

        // Filter by status
        if (filterStatus !== 'all') {
            filtered = filtered.filter(post => post.status === filterStatus);
        }

        setFilteredPosts(filtered);
    }, [posts, searchTerm, filterCategory, filterStatus]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await getBlogPosts({ status: 'all', sort: '-createdAt', limit: 100 });
            if (response.success && response.data) {
                setPosts(response.data.posts);
            }
        } catch (error) {
            showNotification('error', 'Failed to fetch blog posts');
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000);
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleCreateNew = () => {
        setFormData({
            title: '',
            slug: '',
            excerpt: '',
            content: '',
            featuredImage: '',
            category: 'Real Estate News',
            tags: [],
            status: 'draft',
            author: {
                name: 'Lara Chapman',
                image: '/profile.jpg'
            },
            seo: {
                metaTitle: '',
                metaDescription: '',
                keywords: []
            }
        });
        setCurrentPost(null);
        setView('create');
    };

    const handleEdit = async (post: BlogPost) => {
        setCurrentPost(post);
        setFormData({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            featuredImage: post.featuredImage,
            category: post.category,
            tags: post.tags || [],
            status: post.status,
            author: post.author,
            seo: post.seo || { metaTitle: '', metaDescription: '', keywords: [] }
        });
        setView('edit');
        // Scroll to top to show the form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        try {
            const response = await deleteBlogPost(id);
            if (response.success) {
                showNotification('success', 'Blog post deleted successfully');
                fetchPosts();
            } else {
                showNotification('error', response.message || 'Failed to delete blog post');
            }
        } catch (error) {
            showNotification('error', 'Failed to delete blog post');
        }
    };

    const handleSave = async () => {
        // Validation
        if (!formData.title || !formData.excerpt || !formData.content || !formData.featuredImage) {
            showNotification('error', 'Please fill in all required fields');
            return;
        }

        setIsSaving(true);

        try {
            // Auto-generate slug if not provided
            if (!formData.slug) {
                formData.slug = generateSlug(formData.title);
            }

            // Auto-generate SEO meta title if not provided
            if (!formData.seo?.metaTitle) {
                formData.seo = {
                    ...formData.seo,
                    metaTitle: formData.title
                };
            }

            // Auto-generate SEO meta description if not provided
            if (!formData.seo?.metaDescription) {
                formData.seo = {
                    ...formData.seo,
                    metaDescription: formData.excerpt
                };
            }

            let response;
            if (view === 'edit' && currentPost) {
                response = await updateBlogPost(currentPost._id, formData);
            } else {
                response = await createBlogPost(formData);
            }

            if (response.success) {
                showNotification('success', `Blog post ${view === 'edit' ? 'updated' : 'created'} successfully`);
                fetchPosts();
                setView('list');
            } else {
                showNotification('error', response.message || 'Failed to save blog post');
            }
        } catch (error) {
            showNotification('error', 'Failed to save blog post');
        } finally {
            setIsSaving(false);
        }
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...(formData.tags || []), tagInput.trim()]
            });
            setTagInput('');
        }
    };

    const removeTag = (tag: string) => {
        setFormData({
            ...formData,
            tags: formData.tags?.filter(t => t !== tag) || []
        });
    };

    const addKeyword = () => {
        if (keywordInput.trim() && !formData.seo?.keywords?.includes(keywordInput.trim())) {
            setFormData({
                ...formData,
                seo: {
                    ...formData.seo,
                    keywords: [...(formData.seo?.keywords || []), keywordInput.trim()]
                }
            });
            setKeywordInput('');
        }
    };

    const removeKeyword = (keyword: string) => {
        setFormData({
            ...formData,
            seo: {
                ...formData.seo,
                keywords: formData.seo?.keywords?.filter(k => k !== keyword) || []
            }
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
            <div className="max-w-7xl mx-auto">
                {/* Notification */}
                <AnimatePresence>
                    {notification && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                                }`}
                        >
                            {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                            <span>{notification.message}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Blog Management
                    </h1>
                    <p className="text-gray-400">Create, edit, and manage your blog posts</p>
                </div>

                {view === 'list' ? (
                    <>
                        {/* Filters and Search */}
                        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search posts..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                            >
                                <option value="all" className="bg-gray-800 text-white">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat} className="bg-gray-800 text-white">{cat}</option>
                                ))}
                            </select>

                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value as any)}
                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                            >
                                <option value="all" className="bg-gray-800 text-white">All Status</option>
                                <option value="published" className="bg-gray-800 text-white">Published</option>
                                <option value="draft" className="bg-gray-800 text-white">Draft</option>
                            </select>

                            <button
                                onClick={handleCreateNew}
                                className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all duration-200"
                            >
                                <Plus className="w-5 h-5" />
                                New Post
                            </button>
                        </div>

                        {/* Posts List */}
                        <div className="grid gap-4">
                            {(filteredPosts?.length || 0) === 0 ? (
                                <div className="text-center py-12 bg-white/5 rounded-lg border border-white/10">
                                    <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                    <p className="text-gray-400">No blog posts found</p>
                                </div>
                            ) : (
                                filteredPosts.map((post) => (
                                    <motion.div
                                        key={post._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-200"
                                    >
                                        <div className="flex gap-6">
                                            {/* Featured Image */}
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={post.featuredImage}
                                                    alt={post.title}
                                                    className="w-32 h-32 object-cover rounded-lg"
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
                                                        <p className="text-gray-400 text-sm line-clamp-2">{post.excerpt}</p>
                                                    </div>
                                                    <div className="flex gap-2 ml-4">
                                                        <button
                                                            onClick={() => handleEdit(post)}
                                                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                                                        >
                                                            <Edit className="w-5 h-5 text-blue-400" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(post._id)}
                                                            className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 className="w-5 h-5 text-red-400" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${post.status === 'published'
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : 'bg-yellow-500/20 text-yellow-400'
                                                        }`}>
                                                        {post.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                                        {post.status}
                                                    </span>
                                                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">
                                                        {post.category}
                                                    </span>
                                                    <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(post.createdAt).toLocaleDateString()}
                                                    </span>
                                                    <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs">
                                                        {post.readTime} min read
                                                    </span>
                                                </div>

                                                {post.tags && post.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {post.tags.map((tag, idx) => (
                                                            <span key={idx} className="px-2 py-1 bg-white/5 text-gray-300 rounded text-xs flex items-center gap-1">
                                                                <Tag className="w-3 h-3" />
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </>
                ) : (
                    /* Edit/Create Form */
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">
                                {view === 'edit' ? 'Edit Post' : 'Create New Post'}
                            </h2>
                            <button
                                onClick={() => setView('list')}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Title <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => {
                                        setFormData({ ...formData, title: e.target.value });
                                        if (!currentPost) {
                                            setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) });
                                        }
                                    }}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter post title"
                                />
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Slug <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="post-slug-url"
                                />
                                <p className="text-xs text-gray-400 mt-1">URL-friendly version of the title</p>
                            </div>

                            {/* Category and Status */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Category <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat} className="bg-gray-800 text-white">{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Status <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                                    >
                                        <option value="draft" className="bg-gray-800 text-white">Draft</option>
                                        <option value="published" className="bg-gray-800 text-white">Published</option>
                                    </select>
                                </div>
                            </div>

                            {/* Featured Image */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Featured Image URL <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="url"
                                    value={formData.featuredImage}
                                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="https://example.com/image.jpg"
                                />
                                {formData.featuredImage && (
                                    <div className="mt-2">
                                        <img
                                            src={formData.featuredImage}
                                            alt="Preview"
                                            className="w-full max-w-md h-48 object-cover rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Excerpt <span className="text-red-400">*</span>
                                </label>
                                <textarea
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    rows={3}
                                    maxLength={300}
                                    placeholder="Brief description (max 300 characters)"
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                    {formData.excerpt.length}/300 characters
                                </p>
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Content <span className="text-red-400">*</span>
                                </label>
                                <RichTextEditor
                                    value={formData.content}
                                    onChange={(value) => setFormData({ ...formData, content: value })}
                                    placeholder="Write your blog post content here. You can use HTML or Markdown formatting."
                                />
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Tags</label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Add a tag"
                                    />
                                    <button
                                        onClick={addTag}
                                        type="button"
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags?.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm flex items-center gap-2"
                                        >
                                            {tag}
                                            <button
                                                onClick={() => removeTag(tag)}
                                                type="button"
                                                className="hover:text-red-400 transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* SEO Section */}
                            <div className="border-t border-white/10 pt-6">
                                <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Meta Title</label>
                                        <input
                                            type="text"
                                            value={formData.seo?.metaTitle || ''}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                seo: { ...formData.seo, metaTitle: e.target.value }
                                            })}
                                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            placeholder="Leave empty to use post title"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Meta Description</label>
                                        <textarea
                                            value={formData.seo?.metaDescription || ''}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                seo: { ...formData.seo, metaDescription: e.target.value }
                                            })}
                                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            rows={2}
                                            maxLength={160}
                                            placeholder="Leave empty to use excerpt"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">
                                            {(formData.seo?.metaDescription || '').length}/160 characters
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">SEO Keywords</label>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={keywordInput}
                                                onChange={(e) => setKeywordInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                                                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                placeholder="Add a keyword"
                                            />
                                            <button
                                                onClick={addKeyword}
                                                type="button"
                                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.seo?.keywords?.map((keyword, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm flex items-center gap-2"
                                                >
                                                    {keyword}
                                                    <button
                                                        onClick={() => removeKeyword(keyword)}
                                                        type="button"
                                                        className="hover:text-red-400 transition-colors"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-6 border-t border-white/10">
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all duration-200 disabled:opacity-50"
                                >
                                    <Save className="w-5 h-5" />
                                    {isSaving ? 'Saving...' : (view === 'edit' ? 'Update Post' : 'Create Post')}
                                </button>
                                <button
                                    onClick={() => setView('list')}
                                    className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBlog;
