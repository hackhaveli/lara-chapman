require('dotenv').config();
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

async function checkPosts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Get all posts
        const allPosts = await BlogPost.find({});
        console.log(`\nTotal posts in database: ${allPosts.length}`);

        // Get published posts
        const publishedPosts = await BlogPost.find({ status: 'published' });
        console.log(`Published posts: ${publishedPosts.length}`);

        // Get draft posts
        const draftPosts = await BlogPost.find({ status: 'draft' });
        console.log(`Draft posts: ${draftPosts.length}`);

        console.log('\n--- All Posts ---');
        allPosts.forEach(post => {
            console.log(`- ${post.title}`);
            console.log(`  Status: ${post.status}`);
            console.log(`  Slug: ${post.slug}`);
            console.log(`  Published At: ${post.publishedAt || 'Not set'}`);
            console.log('');
        });

        // If there are draft posts, let's publish them
        if (draftPosts.length > 0) {
            console.log('\n--- Publishing all draft posts ---');
            for (const post of draftPosts) {
                post.status = 'published';
                if (!post.publishedAt) {
                    post.publishedAt = new Date();
                }
                await post.save();
                console.log(`✓ Published: ${post.title}`);
            }
        }

        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkPosts();
