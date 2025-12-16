const express = require('express');
const router = express.Router();
const SiteContent = require('../models/SiteContent');
const { adminAuth } = require('../middleware/auth');

// @route   GET /api/content
// @desc    Get all site content (public)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const content = await SiteContent.getSingleton();
        res.json({
            success: true,
            data: content
        });
    } catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).json({
            success: false,
            message: 'Server error fetching content',
            error: error.message
        });
    }
});

// @route   GET /api/content/:section
// @desc    Get specific section of site content
// @access  Public
router.get('/:section', async (req, res) => {
    try {
        const { section } = req.params;
        const validSections = ['home', 'about', 'buy', 'sell', 'neighborhoods', 'calculators', 'contact', 'header', 'footer', 'resources'];

        if (!validSections.includes(section)) {
            return res.status(400).json({
                success: false,
                message: `Invalid section. Valid sections: ${validSections.join(', ')}`
            });
        }

        const content = await SiteContent.getSingleton();
        res.json({
            success: true,
            data: content[section]
        });
    } catch (error) {
        console.error('Error fetching section:', error);
        res.status(500).json({
            success: false,
            message: 'Server error fetching section',
            error: error.message
        });
    }
});

// @route   PUT /api/content
// @desc    Update entire site content
// @access  Admin
router.put('/', adminAuth, async (req, res) => {
    try {
        const content = await SiteContent.getSingleton();

        // Update each section if provided
        const sections = ['home', 'about', 'buy', 'sell', 'neighborhoods', 'calculators', 'contact', 'header', 'footer', 'resources'];
        sections.forEach(section => {
            if (req.body[section]) {
                content[section] = { ...content[section].toObject(), ...req.body[section] };
            }
        });

        await content.save();

        res.json({
            success: true,
            message: 'Content updated successfully',
            data: content
        });
    } catch (error) {
        console.error('Error updating content:', error);
        res.status(500).json({
            success: false,
            message: 'Server error updating content',
            error: error.message
        });
    }
});

// @route   PUT /api/content/:section
// @desc    Update specific section of site content
// @access  Admin
router.put('/:section', adminAuth, async (req, res) => {
    try {
        const { section } = req.params;
        const validSections = ['home', 'about', 'buy', 'sell', 'neighborhoods', 'calculators', 'contact', 'header', 'footer', 'resources'];

        if (!validSections.includes(section)) {
            return res.status(400).json({
                success: false,
                message: `Invalid section. Valid sections: ${validSections.join(', ')}`
            });
        }

        const content = await SiteContent.getSingleton();
        content[section] = { ...content[section].toObject(), ...req.body };
        await content.save();

        res.json({
            success: true,
            message: `${section} section updated successfully`,
            data: content[section]
        });
    } catch (error) {
        console.error('Error updating section:', error);
        res.status(500).json({
            success: false,
            message: 'Server error updating section',
            error: error.message
        });
    }
});

module.exports = router;
