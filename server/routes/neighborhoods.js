const express = require('express');
const router = express.Router();
const Neighborhood = require('../models/Neighborhood');
const { adminAuth } = require('../middleware/auth');

// @route   GET /api/neighborhoods
// @desc    Get all neighborhoods (public)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { active } = req.query;
        const filter = {};

        // If not admin request, only show active neighborhoods
        if (!req.headers.authorization) {
            filter.isActive = true;
        } else if (active === 'true') {
            filter.isActive = true;
        } else if (active === 'false') {
            filter.isActive = false;
        }

        const neighborhoods = await Neighborhood.find(filter).sort({ name: 1 });
        res.json({
            success: true,
            count: neighborhoods.length,
            data: neighborhoods
        });
    } catch (error) {
        console.error('Error fetching neighborhoods:', error);
        res.status(500).json({
            success: false,
            message: 'Server error fetching neighborhoods',
            error: error.message
        });
    }
});

// @route   GET /api/neighborhoods/:slug
// @desc    Get single neighborhood by slug (public)
// @access  Public
router.get('/:slug', async (req, res) => {
    try {
        const neighborhood = await Neighborhood.findOne({
            slug: req.params.slug,
            isActive: true
        });

        if (!neighborhood) {
            return res.status(404).json({
                success: false,
                message: 'Neighborhood not found'
            });
        }

        res.json({
            success: true,
            data: neighborhood
        });
    } catch (error) {
        console.error('Error fetching neighborhood:', error);
        res.status(500).json({
            success: false,
            message: 'Server error fetching neighborhood',
            error: error.message
        });
    }
});

// @route   POST /api/neighborhoods
// @desc    Create a new neighborhood
// @access  Admin
router.post('/', adminAuth, async (req, res) => {
    try {
        const {
            name,
            slug,
            thumbnailImage,
            shortDescription,
            fullDescription,
            videoUrl,
            highlights,
            stats,
            didYouKnow,
            schools,
            summary,
            ctaButtons
        } = req.body;

        // Validate required fields
        if (!name || !shortDescription || !fullDescription) {
            return res.status(400).json({
                success: false,
                message: 'Name, short description, and full description are required'
            });
        }

        // Check if slug already exists
        const existingNeighborhood = await Neighborhood.findOne({
            slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        });

        if (existingNeighborhood) {
            return res.status(400).json({
                success: false,
                message: 'A neighborhood with this slug already exists'
            });
        }

        const neighborhood = new Neighborhood({
            name,
            slug,
            thumbnailImage: thumbnailImage || '',
            shortDescription,
            fullDescription,
            videoUrl: videoUrl || '',
            highlights: highlights || [],
            stats: stats || {},
            didYouKnow: didYouKnow || '',
            schools: schools || '',
            summary: summary || [],
            ctaButtons: ctaButtons || []
        });

        await neighborhood.save();

        res.status(201).json({
            success: true,
            message: 'Neighborhood created successfully',
            data: neighborhood
        });
    } catch (error) {
        console.error('Error creating neighborhood:', error);
        res.status(500).json({
            success: false,
            message: 'Server error creating neighborhood',
            error: error.message
        });
    }
});

// @route   PUT /api/neighborhoods/:id
// @desc    Update a neighborhood
// @access  Admin
router.put('/:id', adminAuth, async (req, res) => {
    try {
        const neighborhood = await Neighborhood.findById(req.params.id);

        if (!neighborhood) {
            return res.status(404).json({
                success: false,
                message: 'Neighborhood not found'
            });
        }

        // Check if new slug conflicts with existing
        if (req.body.slug && req.body.slug !== neighborhood.slug) {
            const existingNeighborhood = await Neighborhood.findOne({ slug: req.body.slug });
            if (existingNeighborhood) {
                return res.status(400).json({
                    success: false,
                    message: 'A neighborhood with this slug already exists'
                });
            }
        }

        // Update fields
        const updateFields = [
            'name', 'slug', 'thumbnailImage', 'shortDescription', 'fullDescription',
            'videoUrl', 'highlights', 'stats', 'didYouKnow', 'schools',
            'summary', 'ctaButtons', 'isActive'
        ];

        updateFields.forEach(field => {
            if (req.body[field] !== undefined) {
                neighborhood[field] = req.body[field];
            }
        });

        await neighborhood.save();

        res.json({
            success: true,
            message: 'Neighborhood updated successfully',
            data: neighborhood
        });
    } catch (error) {
        console.error('Error updating neighborhood:', error);
        res.status(500).json({
            success: false,
            message: 'Server error updating neighborhood',
            error: error.message
        });
    }
});

// @route   DELETE /api/neighborhoods/:id
// @desc    Delete a neighborhood
// @access  Admin
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const neighborhood = await Neighborhood.findById(req.params.id);

        if (!neighborhood) {
            return res.status(404).json({
                success: false,
                message: 'Neighborhood not found'
            });
        }

        await Neighborhood.deleteOne({ _id: req.params.id });

        res.json({
            success: true,
            message: 'Neighborhood deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting neighborhood:', error);
        res.status(500).json({
            success: false,
            message: 'Server error deleting neighborhood',
            error: error.message
        });
    }
});

module.exports = router;
