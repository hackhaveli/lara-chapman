// Debug script to check blog posts and their slugs
const mongoose = require('mongoose');
require('dotenv').config();

const BlogPost = require('./models/BlogPost');

async function checkBlogPosts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB\n');

        const posts = await BlogPost.find();

        console.log(`Found ${posts.length} blog posts:\n`);

        posts.forEach((post, index) => {
            console.log(`${index + 1}. Title: "${post.title}"`);
            console.log(`   Slug: "${post.slug}"`);
            console.log(`   Status: ${post.status}`);
            console.log(`   URL: /blog/${post.slug}`);
            console.log(`   ID: ${post._id}`);
            console.log('');
        });

        await mongoose.connection.close();
        console.log('Done!');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkBlogPosts();
