const mongoose = require('mongoose');

const neighborhoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    thumbnailImage: {
        type: String,
        default: ''
    },
    shortDescription: {
        type: String,
        required: true
    },
    fullDescription: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        default: ''
    },
    highlights: [{
        type: String
    }],
    stats: {
        medianPrice: {
            type: String,
            default: ''
        },
        schoolDistrict: {
            type: String,
            default: ''
        },
        homeValues: {
            type: String,
            default: ''
        },
        costOfLiving: {
            type: String,
            default: ''
        },
        lifestyle: {
            type: String,
            default: ''
        }
    },
    didYouKnow: {
        type: String,
        default: ''
    },
    schools: {
        type: String,
        default: ''
    },
    summary: [{
        feature: String,
        description: String
    }],
    ctaButtons: [{
        type: String
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Pre-save middleware to generate slug from name if not provided
neighborhoodSchema.pre('save', function (next) {
    if (!this.slug && this.name) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    next();
});

module.exports = mongoose.model('Neighborhood', neighborhoodSchema);
