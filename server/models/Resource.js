const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    fileUrl: {
        type: String,
        required: [true, 'File URL is required'],
        trim: true
    },
    fileType: {
        type: String,
        enum: ['PDF', 'DOC', 'DOCX', 'XLS', 'XLSX', 'ZIP', 'Other'],
        default: 'PDF'
    },
    category: {
        type: String,
        enum: ['Buyer Guide', 'Seller Guide', 'Checklist', 'Market Report', 'Safety', 'General', 'Other'],
        default: 'General'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    downloadCount: {
        type: Number,
        default: 0
    },
    order: {
        type: Number,
        default: 0
    },
    requiresEmail: {
        type: Boolean,
        default: true
    },
    ghlFunnelUrl: {
        type: String,
        default: null,
        trim: true
    }
}, {
    timestamps: true
});

// Index for ordering
ResourceSchema.index({ order: 1, createdAt: -1 });

module.exports = mongoose.model('Resource', ResourceSchema);
