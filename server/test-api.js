const fetch = require('node-fetch');

async function testAPI() {
    try {
        const response = await fetch('http://localhost:5000/api/blog?status=published&sort=-publishedAt&limit=100');
        const data = await response.json();

        console.log('API Response:');
        console.log(JSON.stringify(data, null, 2));

        if (data.success && data.data && data.data.posts) {
            console.log(`\n✓ Found ${data.data.posts.length} published posts`);
            data.data.posts.forEach((post, index) => {
                console.log(`\n${index + 1}. ${post.title}`);
                console.log(`   Slug: ${post.slug}`);
                console.log(`   Status: ${post.status}`);
                console.log(`   Category: ${post.category}`);
            });
        } else {
            console.log('\n✗ No posts found or API error');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testAPI();
