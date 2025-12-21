const express = require('express');
const router = express.Router();
const CalculatorSettings = require('../models/CalculatorSettings');

// Get calculator settings
router.get('/settings', async (req, res) => {
    try {
        let settings = await CalculatorSettings.findOne();

        // If no settings exist, create default ones
        if (!settings) {
            settings = await CalculatorSettings.create({});
        }

        res.json({
            success: true,
            data: settings
        });
    } catch (error) {
        console.error('Error fetching calculator settings:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching calculator settings',
            error: error.message
        });
    }
});

// Update calculator settings
router.put('/settings', async (req, res) => {
    try {
        let settings = await CalculatorSettings.findOne();

        if (!settings) {
            settings = await CalculatorSettings.create(req.body);
        } else {
            settings = await CalculatorSettings.findOneAndUpdate(
                {},
                req.body,
                { new: true, runValidators: true }
            );
        }

        res.json({
            success: true,
            data: settings,
            message: 'Calculator settings updated successfully'
        });
    } catch (error) {
        console.error('Error updating calculator settings:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating calculator settings',
            error: error.message
        });
    }
});

// Reset to defaults
router.post('/settings/reset', async (req, res) => {
    try {
        await CalculatorSettings.deleteMany({});
        const settings = await CalculatorSettings.create({});

        res.json({
            success: true,
            data: settings,
            message: 'Calculator settings reset to defaults'
        });
    } catch (error) {
        console.error('Error resetting calculator settings:', error);
        res.status(500).json({
            success: false,
            message: 'Error resetting calculator settings',
            error: error.message
        });
    }
});

module.exports = router;
