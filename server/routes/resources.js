const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// Get all resources (public)
router.get('/', async (req, res) => {
    try {
        const { activeOnly = 'true' } = req.query;

        const query = activeOnly === 'true' ? { isActive: true } : {};

        const resources = await Resource.find(query)
            .sort({ order: 1, createdAt: -1 });

        res.json({
            success: true,
            data: resources
        });
    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching resources',
            error: error.message
        });
    }
});

// Get single resource
router.get('/:id', async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            });
        }

        res.json({
            success: true,
            data: resource
        });
    } catch (error) {
        console.error('Error fetching resource:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching resource',
            error: error.message
        });
    }
});

// Create new resource (admin)
router.post('/', async (req, res) => {
    try {
        const resource = await Resource.create(req.body);

        res.status(201).json({
            success: true,
            data: resource,
            message: 'Resource created successfully'
        });
    } catch (error) {
        console.error('Error creating resource:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating resource',
            error: error.message
        });
    }
});

// Update resource (admin)
router.put('/:id', async (req, res) => {
    try {
        const resource = await Resource.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            });
        }

        res.json({
            success: true,
            data: resource,
            message: 'Resource updated successfully'
        });
    } catch (error) {
        console.error('Error updating resource:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating resource',
            error: error.message
        });
    }
});

// Delete resource (admin)
router.delete('/:id', async (req, res) => {
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            });
        }

        res.json({
            success: true,
            message: 'Resource deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting resource:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting resource',
            error: error.message
        });
    }
});

// Increment download count
router.post('/:id/download', async (req, res) => {
    try {
        const resource = await Resource.findByIdAndUpdate(
            req.params.id,
            { $inc: { downloadCount: 1 } },
            { new: true }
        );

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            });
        }

        res.json({
            success: true,
            data: resource
        });
    } catch (error) {
        console.error('Error tracking download:', error);
        res.status(500).json({
            success: false,
            message: 'Error tracking download',
            error: error.message
        });
    }
});

// Reorder resources
router.post('/reorder', async (req, res) => {
    try {
        const { resources } = req.body; // Array of {id, order}

        const updates = resources.map(({ id, order }) =>
            Resource.findByIdAndUpdate(id, { order })
        );

        await Promise.all(updates);

        res.json({
            success: true,
            message: 'Resources reordered successfully'
        });
    } catch (error) {
        console.error('Error reordering resources:', error);
        res.status(500).json({
            success: false,
            message: 'Error reordering resources',
            error: error.message
        });
    }
});

module.exports = router;
