import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import { getBlogPostBySlug, type BlogPost as BlogPostType } from '../lib/api';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [loading, setLoading] = useState(true);
    const [showShareMenu, setShowShareMenu] = useState(false);

    useEffect(() => {
        if (slug) {
            fetchPost(slug);
        }
    }, [slug]);

    const fetchPost = async (postSlug: string) => {
        setLoading(true);
        try {
            console.log('Fetching blog post with slug:', postSlug);
            const response = await getBlogPostBySlug(postSlug);
            console.log('API Response:', response);

            if (response.success && response.data) {
                setPost(response.data);
            } else {
                console.error('Post not found:', response.message);
                // Don't redirect immediately, show error
                setPost(null);
            }
        } catch (error) {
            console.error('Failed to fetch blog post:', error);
            setPost(null);
        } finally {
            setLoading(false);
        }
    };

    const shareUrl = window.location.href;
    const shareTitle = post?.title || '';

    const handleShare = (platform: string) => {
        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`
        };

        window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
        setShowShareMenu(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
                    <p className="text-gray-400 mb-6">The blog post you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/blog')}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white transition-all"
                    >
                        Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
            {/* Hero Section */}
            <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
                </div>

                {/* Back Button */}
                <button
                    onClick={() => navigate('/blog')}
                    className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg text-white transition-all z-10"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Blog
                </button>

                {/* Post Meta */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="inline-block px-4 py-1 bg-purple-600 text-white text-sm rounded-full mb-4">
                                {post.category}
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-gray-300">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={post.author.image}
                                        alt={post.author.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-medium text-white">{post.author.name}</p>
                                        <p className="text-sm text-gray-400">Real Estate Expert</p>
                                    </div>
                                </div>

                                <div className="hidden md:block w-px h-12 bg-white/20" />

                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{post.readTime} min read</span>
                                    </div>
                                </div>

                                <div className="hidden md:block w-px h-12 bg-white/20" />

                                <div className="relative">
                                    <button
                                        onClick={() => setShowShareMenu(!showShareMenu)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                                    >
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </button>

                                    {showShareMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute top-full mt-2 right-0 bg-gray-800 border border-white/10 rounded-lg shadow-xl overflow-hidden z-20"
                                        >
                                            <button
                                                onClick={() => handleShare('facebook')}
                                                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 transition-colors text-left"
                                            >
                                                <Facebook className="w-5 h-5 text-blue-400" />
                                                <span>Facebook</span>
                                            </button>
                                            <button
                                                onClick={() => handleShare('twitter')}
                                                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 transition-colors text-left"
                                            >
                                                <Twitter className="w-5 h-5 text-blue-400" />
                                                <span>Twitter</span>
                                            </button>
                                            <button
                                                onClick={() => handleShare('linkedin')}
                                                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 transition-colors text-left"
                                            >
                                                <Linkedin className="w-5 h-5 text-blue-600" />
                                                <span>LinkedIn</span>
                                            </button>
                                            <button
                                                onClick={() => handleShare('email')}
                                                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 transition-colors text-left"
                                            >
                                                <Mail className="w-5 h-5 text-gray-400" />
                                                <span>Email</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {/* Excerpt */}
                    <div className="text-xl text-gray-300 mb-8 p-6 bg-white/5 backdrop-blur-sm border-l-4 border-purple-600 rounded-r-lg">
                        {post.excerpt}
                    </div>

                    {/* Main Content */}
                    <div
                        className="prose prose-invert prose-lg max-w-none
                            prose-headings:text-white prose-headings:font-bold
                            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                            prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300
                            prose-strong:text-white prose-strong:font-semibold
                            prose-ul:text-gray-300 prose-ul:my-6
                            prose-ol:text-gray-300 prose-ol:my-6
                            prose-li:my-2
                            prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-8
                            prose-blockquote:border-l-4 prose-blockquote:border-purple-600 
                            prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:px-6
                            prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                            prose-code:text-purple-300 prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
                            prose-pre:bg-gray-800 prose-pre:border prose-pre:border-white/10"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-white/10">
                            <h3 className="text-white font-semibold mb-4">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-full text-sm flex items-center gap-2 transition-colors cursor-pointer"
                                    >
                                        <Tag className="w-4 h-4" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Author Bio */}
                    <div className="mt-12 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                        <div className="flex items-start gap-6">
                            <img
                                src={post.author.image}
                                alt={post.author.name}
                                className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white mb-2">About {post.author.name}</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {post.author.name} is a dedicated real estate professional serving the Phoenix Valley.
                                    With years of experience and a passion for helping clients achieve their real estate dreams,
                                    {post.author.name} provides expert guidance through every step of the buying, selling, and investing process.
                                </p>
                                <button
                                    onClick={() => navigate('/contact')}
                                    className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all duration-200"
                                >
                                    Get in Touch
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-12 p-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Ready to Take the Next Step?
                        </h3>
                        <p className="text-gray-300 mb-6">
                            Whether you're buying, selling, or investing in the Phoenix Valley, I'm here to help you succeed.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all duration-200"
                            >
                                Schedule a Consultation
                            </button>
                            <button
                                onClick={() => navigate('/blog')}
                                className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200"
                            >
                                Read More Articles
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogPost;
