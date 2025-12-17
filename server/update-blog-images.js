// Script to update existing blog posts with correct author image
const mongoose = require('mongoose');
require('dotenv').config();

const BlogPost = require('./models/BlogPost');

async function updateAuthorImages() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Update all blog posts with the old image URL
        const result = await BlogPost.updateMany(
            {
                'author.image': 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200'
            },
            {
                $set: {
                    'author.image': '/profile.jpg'
                }
            }
        );

        console.log(`Updated ${result.modifiedCount} blog posts`);

        // Also update any posts with default Pexels images (various URLs)
        const result2 = await BlogPost.updateMany(
            {
                'author.image': { $regex: /pexels\.com/i }
            },
            {
                $set: {
                    'author.image': '/profile.jpg'
                }
            }
        );

        console.log(`Updated ${result2.modifiedCount} additional posts with Pexels images`);

        await mongoose.connection.close();
        console.log('Done!');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

updateAuthorImages();
