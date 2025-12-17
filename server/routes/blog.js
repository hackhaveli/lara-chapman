const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// Get all blog posts (with filtering and pagination)
router.get('/', async (req, res) => {
    try {
        const {
            status,
            category,
            tag,
            page = 1,
            limit = 10,
            sort = '-publishedAt'
        } = req.query;

        const query = {};

        // Only filter by status if it's not 'all' or undefined
        // For public access, default to published. For admin, pass status=all
        if (status && status !== 'all') {
            query.status = status;
        } else if (!status) {
            // Default to published for public API calls
            query.status = 'published';
        }
        // If status === 'all', don't add status filter (shows all posts)

        if (category) query.category = category;
        if (tag) query.tags = tag;

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const posts = await BlogPost.find(query)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit))
            .select('-content'); // Exclude full content in list view

        const total = await BlogPost.countDocuments(query);

        res.json({
            success: true,
            data: {
                posts,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / parseInt(limit))
                }
            }
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get single blog post by slug
router.get('/slug/:slug', async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug });

        if (!post) {
            return res.status(404).json({ success: false, message: 'Blog post not found' });
        }

        res.json({ success: true, data: post });
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get single blog post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Blog post not found' });
        }

        res.json({ success: true, data: post });
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create new blog post
router.post('/', async (req, res) => {
    try {
        const post = new BlogPost(req.body);
        await post.save();
        res.status(201).json({ success: true, data: post });
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(400).json({ success: false, message: error.message });
    }
});

// Update blog post
router.put('/:id', async (req, res) => {
    try {
        const post = await BlogPost.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!post) {
            return res.status(404).json({ success: false, message: 'Blog post not found' });
        }

        res.json({ success: true, data: post });
    } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(400).json({ success: false, message: error.message });
    }
});

// Delete blog post
router.delete('/:id', async (req, res) => {
    try {
        const post = await BlogPost.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Blog post not found' });
        }

        res.json({ success: true, message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all categories
router.get('/meta/categories', async (req, res) => {
    try {
        const categories = await BlogPost.distinct('category');
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get all tags
router.get('/meta/tags', async (req, res) => {
    try {
        const tags = await BlogPost.distinct('tags');
        res.json(tags);
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
