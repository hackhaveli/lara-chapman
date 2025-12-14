const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Neighborhood = require('../models/Neighborhood');
const SiteContent = require('../models/SiteContent');

// Initial neighborhoods data (migrated from static array)
const neighborhoodsData = [
    {
        name: 'Mesa',
        slug: 'mesa',
        shortDescription: "One of the Valley's most eclectic and diverse cities with deeply rooted communities.",
        fullDescription: "Mesa is one of the Valley's most eclectic and diverse cities, with deeply rooted communities and a creative spirit. It blends affordability with access to outdoor recreation, cultural amenities, and welcoming neighborhoods. You'll find everything from historic districts and mid-century homes to large master-planned communities.",
        videoUrl: 'https://www.youtube.com/watch?v=blxhocllSXk',
        thumbnailImage: '',
        highlights: [
            'Historic homes, master-planned communities, and 55+ neighborhoods',
            'Salt River, Usery Park, and mountain access nearby',
            'Theaters including the Mesa Arts Center and Mesa Amphitheater',
            'Lower home prices than many other areas in the Valley'
        ],
        stats: {
            homeValues: 'Generally more affordable than Scottsdale or Paradise Valley',
            costOfLiving: 'Housing is more affordable than many Valley cities; sales tax is 8.3%',
            lifestyle: 'Year-round outdoor activity with hiking, river sports, biking, and golf'
        },
        didYouKnow: 'Mesa was founded in 1878 by Mormon pioneers who built canals based on ancient Hohokam designs - some of which still carry water today.',
        schools: 'Mesa is served by Mesa Public Schools, Arizona\'s largest district, along with many charter and private school options.',
        summary: [
            { feature: 'Eclectic Mix', description: 'Historic homes, master-planned communities, and 55+ neighborhoods.' },
            { feature: 'Outdoors', description: 'Salt River, Usery Park, and mountain access nearby.' },
            { feature: 'Cultural Life', description: 'Theaters including the Mesa Arts Center and Mesa Amphitheater.' },
            { feature: 'Affordability', description: 'Lower home prices than many other areas in the Valley.' }
        ],
        ctaButtons: ['View the Mesa Market Report', 'Search Homes in Mesa']
    },
    {
        name: 'Gilbert',
        slug: 'gilbert',
        shortDescription: "Community-oriented with a small-town feel and thriving downtown.",
        fullDescription: "Gilbert has grown from its agricultural roots into one of the Valley's most community-oriented areas. It retains a small-town feel with a thriving downtown and newer master-planned neighborhoods. It's consistently ranked among the safest cities in the U.S.",
        videoUrl: 'https://youtu.be/B0UJpA2XJzs?si=aoG3bNta6rBoenZs',
        thumbnailImage: '',
        highlights: [
            'Local events, parks, and schools anchor Gilbert\'s connected way of life',
            'Older homes downtown + new builds',
            'Mix of suburban comfort and lively downtown entertainment'
        ],
        stats: {
            homeValues: 'Range from older homes near downtown to newer builds in master-planned communities',
            costOfLiving: 'Moderate housing costs, with sales tax at 8.3%',
            lifestyle: 'Accessible and approachable with outdoor spaces and community events'
        },
        didYouKnow: 'Once nicknamed the "Hay Shipping Capital of the World," Gilbert\'s farming roots are still reflected in places like Agritopia.',
        schools: 'Gilbert is served by Gilbert Public Schools and Higley Unified School District.',
        summary: [
            { feature: 'Community Oriented', description: 'Local events, parks, and schools anchor Gilbert\'s connected way of life.' },
            { feature: 'Housing Variety', description: 'Older homes downtown + new builds.' },
            { feature: 'Lifestyle', description: 'Mix of suburban comfort and lively downtown entertainment.' }
        ],
        ctaButtons: ['View the Gilbert Market Report', 'Search Homes in Gilbert']
    },
    {
        name: 'Paradise Valley',
        slug: 'paradise-valley',
        shortDescription: "Ultra-luxury retreat with dramatic mountain views and exclusive estates.",
        fullDescription: "Paradise Valley combines scenic beauty with two distinct ways of living. The Town of Paradise Valley is an ultra-luxury retreat of estates and resorts, prized for privacy and exclusivity.",
        videoUrl: 'https://www.youtube.com/watch?v=_IX5dPK8Oeg',
        thumbnailImage: '',
        highlights: [
            'One of Arizona\'s most prestigious residential enclaves',
            'PV Village offers more housing diversity',
            'Iconic views of Camelback, Mummy, and the Phoenix Mountain Preserve'
        ],
        stats: {
            homeValues: 'Highest housing prices in the state, commonly over $2M',
            costOfLiving: 'Ultra-luxury housing, sales tax 8.8%',
            lifestyle: 'Scenic mountain views, hiking and golf, luxury resorts and spas'
        },
        didYouKnow: 'The Town of Paradise Valley was incorporated in 1961 to preserve its quiet, open desert character.',
        schools: 'Primarily served by Scottsdale Unified School District.',
        summary: [
            { feature: 'Exclusivity', description: 'One of Arizona\'s most prestigious residential enclaves.' },
            { feature: 'Natural Beauty', description: 'Iconic views of Camelback and Phoenix Mountain Preserve.' }
        ],
        ctaButtons: ['View the Paradise Valley Market Report', 'Search Homes in Paradise Valley']
    },
    {
        name: 'North Scottsdale',
        slug: 'north-scottsdale',
        shortDescription: "Serenity, exclusivity, and natural beauty with luxury communities.",
        fullDescription: "North Scottsdale blends serenity, exclusivity, and natural beauty. Residents enjoy sweeping mountain views, luxury master-planned communities, and a quieter pace.",
        videoUrl: 'https://www.youtube.com/watch?v=0V65v-hhwl0',
        thumbnailImage: '',
        highlights: [
            'Recognized as one of the Valley\'s most desirable addresses',
            'Higher elevation and low-density communities',
            'Desert preserves and mountain views'
        ],
        stats: {
            homeValues: 'Luxury homes often start near $1M, with estates far above',
            costOfLiving: 'Housing among the highest in the Valley, sales tax 8.0%',
            lifestyle: 'Upscale and nature-oriented with luxury golf courses and fine dining'
        },
        didYouKnow: 'The McDowell Sonoran Preserve spans more than 30,000 acres, making it the largest urban wilderness area in the US.',
        schools: 'Served by Scottsdale Unified and Paradise Valley Unified School Districts.',
        summary: [
            { feature: 'Prestige', description: 'One of the Valley\'s most desirable addresses.' },
            { feature: 'Tranquility', description: 'Higher elevation and low-density communities.' }
        ],
        ctaButtons: ['View the North Scottsdale Market Report', 'Search Homes in North Scottsdale']
    },
    {
        name: 'Biltmore / Arcadia',
        slug: 'biltmore-arcadia',
        shortDescription: "Historic character with modern sophistication and luxury resorts.",
        fullDescription: "Arcadia and the Biltmore Corridor are among Phoenix's most prestigious neighborhoods, blending historic character with modern sophistication.",
        videoUrl: 'https://www.youtube.com/watch?v=TYxKicrBSGU',
        thumbnailImage: '',
        highlights: [
            'Among Phoenix\'s most sought-after neighborhoods',
            'Parks, schools and patio dining foster community',
            'Access to luxury resorts, spas, and golf courses'
        ],
        stats: {
            homeValues: 'Arcadia homes often exceed $1M, Biltmore ranges from $400K to millions',
            costOfLiving: 'Housing among the priciest in Phoenix, sales tax 9.1%',
            lifestyle: 'Polished living with resort-style dining and upscale shopping'
        },
        didYouKnow: 'The Arizona Biltmore Resort opened in 1929 with design elements influenced by Frank Lloyd Wright.',
        schools: 'Arcadia is served by Scottsdale Unified School District.',
        summary: [
            { feature: 'Prestigious Address', description: 'Among Phoenix\'s most sought-after neighborhoods.' },
            { feature: 'Community Feel', description: 'Parks, schools and patio dining foster connection.' }
        ],
        ctaButtons: ['View the Biltmore / Arcadia Market Report', 'Search Homes in Biltmore / Arcadia']
    }
];

// Default site content
const siteContentData = {
    _id: 'site-content',
    home: {
        heroTitle: "I'm Lara Chapman, Realtor® with Bliss Realty.",
        heroSubtitle: 'Realtor®, investor, and home stager helping Phoenix Valley clients buy and sell with confidence.',
        heroImage: '',
        bioExcerpt: "I'm Lara Chapman, a native Phoenician and REALTOR® who brings together operational leadership, hands-on service, and real estate experience. My background in finance taught me how to lead teams and navigate complex decisions, and owning a massage therapy business deepened my ability to listen closely and support people through important moments. Combined with my investing and home staging experience, this gives me a well-rounded approach that is both strategic and deeply client-focused. I truly care about the people I serve, and I'm here to help you buy, sell, or invest with confidence and clarity.",
        servicesTitle: 'My Services',
        servicesSubtitle: 'From buying your first home to building an investment portfolio, I provide comprehensive real estate services.',
        ctaTitle: "Ready to talk about your goals? Let's connect.",
        ctaSubtitle: "Whether you're buying, selling, or investing, I'm here to help you achieve your real estate dreams in the Phoenix Valley."
    },
    about: {
        pageTitle: 'Meet Lara Chapman',
        pageSubtitle: 'Your trusted partner in Phoenix Valley real estate',
        fullBio: "As a native Phoenician and licensed REALTOR®, I bring together experience in finance, entrepreneurship, and real estate to provide my clients with a uniquely strategic and personalized approach.\n\nMy background includes leading operations and training teams, running my own massage therapy business, and working as a real estate investor and professional home stager. These experiences have shaped how I approach every transaction—with careful attention to detail, strong communication, and a genuine focus on my clients' needs.\n\nWhether you're buying your first home, selling a property, or exploring investment opportunities, I'm here to guide you with clarity and care. I believe real estate is deeply personal, and I treat every client's goals as if they were my own.",
        profileImage: '',
        philosophyTitle: 'My Commitment to You',
        philosophyText: 'Real estate is more than just buying and selling property—it\'s about helping people transition to new chapters in their lives. I\'m committed to providing honest guidance, clear communication, and dedicated support throughout every step of your journey.',
        lifestyleTitle: 'Living the Phoenix Valley Dream',
        lifestyleText: 'From desert hiking trails to world-class dining, let me help you find your perfect place in this incredible community.'
    },
    buy: {
        introTitle: 'Buying a Home in the Phoenix Valley',
        introText: 'Get access to the same MLS database that Realtors® use, updated every 15 minutes with the most accurate and up-to-date information available.',
        mlsDescription: "This is the same MLS Realtors® use — updated every 15 minutes and more accurate than Zillow, Realtor.com, or other consumer sites. Get the real story on pricing, availability, and market trends with professional-grade data.",
        stepsTitle: 'Your Home Buying Journey',
        neighborhoodTitle: 'Explore Phoenix Valley Neighborhoods',
        neighborhoodText: 'Every community in the Valley has its own character, lifestyle, and price points. Explore my neighborhood guides to find the area that feels like home.',
        steps: [
            { icon: 'FileText', title: 'Understanding Your Goals', text: 'We start with a detailed consultation to understand your needs, timeline, and budget.' },
            { icon: 'Search', title: 'Tailored Property Search', text: 'I create a customized search based on your criteria and send you listings as they hit the market.' },
            { icon: 'Eye', title: 'Guided Property Showings', text: 'Together, we tour properties with a critical eye, discussing pros, cons, and market positioning.' },
            { icon: 'FileText', title: 'Strategic Negotiation', text: 'I leverage market knowledge and negotiation skills to get you the best possible terms.' },
            { icon: 'Key', title: 'Managing Transaction Details', text: 'From inspections to appraisals, I coordinate all aspects to ensure a smooth process.' },
            { icon: 'Key', title: 'Closing & Beyond', text: "I'm with you through closing and available for any post-purchase questions or needs." }
        ]
    },
    sell: {
        introTitle: 'Selling Your Home with Lara',
        introText: 'Get top dollar for your home with strategic pricing, professional staging, and expert marketing that reaches qualified buyers.',
        stepsTitle: 'Your Home Selling Journey',
        stagingTitle: 'Staging Examples',
        stagingSubtitle: 'See how professional staging transforms spaces to appeal to potential buyers.',
        stagingCta: 'Professional staging can help your home sell faster and for a higher price. As a certified home stager, I can help you prepare your home to make the best possible impression on buyers.',
        marketingPoints: [
            { icon: 'DollarSign', title: 'Strategic Pricing Analysis', text: "I analyze recent sales, current market conditions, and your home's unique features to price it competitively." },
            { icon: 'Camera', title: 'Professional Staging & Photography', text: 'Transform your home with professional staging techniques and high-quality photography.' },
            { icon: 'TrendingUp', title: 'Comprehensive Marketing Strategy', text: 'Multi-channel marketing including MLS, social media, and targeted advertising.' },
            { icon: 'FileText', title: 'Expert Negotiation', text: 'I handle all negotiations to secure the best possible terms, price, and timeline.' },
            { icon: 'CheckCircle', title: 'Transaction Management', text: 'From contract to closing, I coordinate inspections, appraisals, and all paperwork.' },
            { icon: 'Key', title: 'Successful Closing', text: "I'm with you through closing day and beyond, ensuring all details are handled." }
        ]
    },
    calculators: {
        pageTitle: 'Mortgage Calculators',
        mortgageIntroText: 'Estimate your payments, affordability, and more with our easy-to-use mortgage calculators.',
        affordabilityIntroText: 'Estimate how much home you can afford based on your income and expenses.',
        disclaimer: 'These calculators are for informational purposes only and do not constitute financial advice. Please consult with a financial professional for personalized guidance.'
    },
    contact: {
        pageTitle: "Let's Connect",
        pageSubtitle: "Ready to start your real estate journey? I'm here to help with all your buying, selling, and investing needs.",
        formTitle: 'Send Me a Message',
        profileBlurb: "I'm always available to help with your real estate questions. Whether you're buying, selling, or just exploring your options, I'd love to hear from you.",
        address: 'Phoenix, Arizona',
        phone: '(602) 405-8002',
        email: 'KeysPlease@LaraLovesPhoenix.com',
        mapEmbedUrl: '',
        officeHours: 'Serving the entire Valley',
        socialBlurb: 'Get market updates, home tips, and behind-the-scenes content from my daily real estate adventures.'
    }
};

async function seedDatabase() {
    try {
        // Connect to MongoDB
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            console.log('Please create a .env file with MONGODB_URI in the server directory');
            console.log('Use .env.example as a template');
            process.exit(1);
        }

        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        // Check if data already exists
        const existingNeighborhoods = await Neighborhood.countDocuments();
        const existingContent = await SiteContent.findById('site-content');

        if (existingNeighborhoods > 0 || existingContent) {
            console.log('Database already has data. Skipping seed...');
            console.log(`Found ${existingNeighborhoods} neighborhoods`);
            console.log(`Site content exists: ${!!existingContent}`);

            const readline = require('readline');
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            const answer = await new Promise(resolve => {
                rl.question('Do you want to reset and re-seed? (yes/no): ', resolve);
            });
            rl.close();

            if (answer.toLowerCase() !== 'yes') {
                console.log('Seed cancelled.');
                process.exit(0);
            }

            // Clear existing data
            await Neighborhood.deleteMany({});
            await SiteContent.deleteMany({});
            console.log('Cleared existing data.');
        }

        // Insert neighborhoods
        await Neighborhood.insertMany(neighborhoodsData);
        console.log(`Inserted ${neighborhoodsData.length} neighborhoods`);

        // Insert site content
        await SiteContent.create(siteContentData);
        console.log('Inserted site content');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
