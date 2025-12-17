const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    excerpt: {
        type: String,
        required: true,
        maxlength: 300
    },
    content: {
        type: String,
        required: true
    },
    featuredImage: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Market Updates', 'Home Buying Tips', 'Home Selling Tips', 'Neighborhoods', 'Investment', 'Lifestyle', 'Real Estate News']
    },
    tags: [{
        type: String,
        trim: true
    }],
    author: {
        name: {
            type: String,
            default: 'Lara Chapman'
        },
        image: {
            type: String,
            default: '/profile.jpg'
        }
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    publishedAt: {
        type: Date
    },
    readTime: {
        type: Number, // in minutes
        default: 5
    },
    seo: {
        metaTitle: {
            type: String
        },
        metaDescription: {
            type: String,
            maxlength: 160
        },
        keywords: [{
            type: String
        }]
    }
}, {
    timestamps: true
});

// Auto-generate slug from title if not provided
blogPostSchema.pre('save', function (next) {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // Set publishedAt date when status changes to published
    if (this.status === 'published' && !this.publishedAt) {
        this.publishedAt = new Date();
    }

    next();
});

// Calculate read time based on content
blogPostSchema.pre('save', function (next) {
    if (this.content) {
        const wordsPerMinute = 200;
        const wordCount = this.content.split(/\s+/).length;
        this.readTime = Math.ceil(wordCount / wordsPerMinute);
    }
    next();
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
