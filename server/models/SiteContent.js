const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
    // Singleton identifier
    _id: {
        type: String,
        default: 'site-content'
    },

    // Home Page Content
    home: {
        heroTitle: {
            type: String,
            default: "I'm Lara Chapman, Realtor® with Bliss Realty."
        },
        heroSubtitle: {
            type: String,
            default: 'Realtor®, investor, and home stager helping Phoenix Valley clients buy and sell with confidence.'
        },
        heroImage: {
            type: String,
            default: ''
        },
        heroVideoId: {
            type: String,
            default: 'DZfp99BamQk'
        },
        heroButton1Text: {
            type: String,
            default: 'Find Out What My Home is Worth'
        },
        heroButton1Url: {
            type: String,
            default: 'https://lstrep.co/0xcgPhSCLE'
        },
        heroButton2Text: {
            type: String,
            default: 'Search Homes for Sale'
        },
        heroButton2Url: {
            type: String,
            default: 'https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149'
        },
        bioExcerpt: {
            type: String,
            default: "I'm Lara Chapman, a native Phoenician and REALTOR® who brings together operational leadership, hands-on service, and real estate experience."
        },
        servicesTitle: {
            type: String,
            default: 'My Services'
        },
        servicesSubtitle: {
            type: String,
            default: 'From buying your first home to building an investment portfolio, I provide comprehensive real estate services.'
        },
        ctaTitle: {
            type: String,
            default: "Ready to talk about your goals? Let's connect."
        },
        ctaSubtitle: {
            type: String,
            default: "Whether you're buying, selling, or investing, I'm here to help you achieve your real estate dreams in the Phoenix Valley."
        },
        services: {
            type: [{
                icon: { type: String, default: 'Home' },
                title: { type: String, required: true },
                description: { type: String, required: true },
                link: { type: String, required: true },
                internal: { type: Boolean, default: true }
            }],
            default: [
                {
                    icon: 'HomeIcon',
                    title: 'Buy',
                    description: 'Find your dream home with personalized guidance through the Phoenix Valley market.',
                    link: '/buy',
                    internal: true
                },
                {
                    icon: 'DollarSign',
                    title: 'Sell',
                    description: 'Get top dollar for your home with strategic marketing and expert negotiation.',
                    link: '/sell',
                    internal: true
                },
                {
                    icon: 'Palette',
                    title: 'Stage',
                    description: "Professional home staging services to showcase your property's best features.",
                    link: 'https://www.styleandstaging.com',
                    internal: false
                },
                {
                    icon: 'TrendingUp',
                    title: 'Invest',
                    description: 'Commercial real estate investment opportunities to help you diversify beyond residential.',
                    link: 'https://www.orangedoorinvestmentgroup.com',
                    internal: false
                }
            ]
        }
    },

    // About Page Content
    about: {
        pageTitle: {
            type: String,
            default: 'Meet Lara Chapman'
        },
        pageSubtitle: {
            type: String,
            default: 'Your trusted partner in Phoenix Valley real estate'
        },
        fullBio: {
            type: String,
            default: ''
        },
        profileImage: {
            type: String,
            default: ''
        },
        profileName: {
            type: String,
            default: 'Lara Chapman'
        },
        profileTitle: {
            type: String,
            default: 'Realtor® | Investor | Home Stager'
        },
        profileCompany: {
            type: String,
            default: 'Bliss Realty'
        },
        philosophyTitle: {
            type: String,
            default: 'My Commitment to You'
        },
        philosophyText: {
            type: String,
            default: "Real estate is more than just buying and selling property—it's about helping people transition to new chapters in their lives."
        },
        lifestyleTitle: {
            type: String,
            default: 'Living the Phoenix Valley Dream'
        },
        lifestyleText: {
            type: String,
            default: 'From desert hiking trails to world-class dining, let me help you find your perfect place in this incredible community.'
        },
        lifestyleImage: {
            type: String,
            default: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200'
        }
    },

    // Buy Page Content
    buy: {
        introTitle: {
            type: String,
            default: 'Buying a Home in the Phoenix Valley'
        },
        introText: {
            type: String,
            default: 'Get access to the same MLS database that Realtors® use, updated every 15 minutes with the most accurate and up-to-date information available.'
        },
        mlsDescription: {
            type: String,
            default: "This is the same MLS Realtors® use — updated every 15 minutes and more accurate than Zillow, Realtor.com, or other consumer sites."
        },
        stepsTitle: {
            type: String,
            default: 'Your Home Buying Journey'
        },
        stepsSubtitle: {
            type: String,
            default: 'I guide you through every step of the process, making home buying as smooth and successful as possible.'
        },
        neighborhoodTitle: {
            type: String,
            default: 'Explore Phoenix Valley Neighborhoods'
        },
        neighborhoodText: {
            type: String,
            default: 'Every community in the Valley has its own character, lifestyle, and price points. Explore my neighborhood guides to find the area that feels like home.'
        },
        searchButtonText: {
            type: String,
            default: 'Search Homes for Sale'
        },
        searchButtonUrl: {
            type: String,
            default: 'https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149'
        },
        neighborhoodButtonText: {
            type: String,
            default: 'View Neighborhood Guides'
        },
        neighborhoodButtonUrl: {
            type: String,
            default: '/neighborhoods'
        },
        ctaButtonText: {
            type: String,
            default: 'Start Your Home Search Today'
        },
        ctaButtonUrl: {
            type: String,
            default: 'https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149'
        },
        resourcesTitle: {
            type: String,
            default: 'Helpful Resources'
        },
        resourcesSubtitle: {
            type: String,
            default: 'Tools and information to help you make informed decisions throughout your home buying journey.'
        },
        steps: [{
            icon: {
                type: String,
                default: 'FileText'
            },
            title: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }],
        resources: {
            type: [{
                icon: { type: String, default: 'Home' },
                title: { type: String, required: true },
                description: { type: String, required: true },
                buttonText: { type: String, required: true },
                buttonUrl: { type: String, required: true },
                isExternal: { type: Boolean, default: false },
                isDownload: { type: Boolean, default: false }
            }],
            default: [
                {
                    icon: 'Home',
                    title: 'Home Buying Guide',
                    description: 'Download my comprehensive guide to buying your home in the Phoenix Valley.',
                    buttonText: 'Download Guide',
                    buttonUrl: '/buyers guide.pdf',
                    isExternal: false,
                    isDownload: true
                },
                {
                    icon: 'FileText',
                    title: 'Market Reports',
                    description: 'Stay informed with the latest Phoenix Valley market data.',
                    buttonText: 'View Reports',
                    buttonUrl: '/neighborhoods',
                    isExternal: false,
                    isDownload: false
                }
            ]
        }
    },

    // Sell Page Content
    sell: {
        introTitle: {
            type: String,
            default: 'Selling Your Home with Lara'
        },
        introText: {
            type: String,
            default: 'Get top dollar for your home with strategic pricing, professional staging, and expert marketing that reaches qualified buyers.'
        },
        stepsTitle: {
            type: String,
            default: 'Your Home Selling Journey'
        },
        stepsSubtitle: {
            type: String,
            default: 'I guide you through every step of the selling process to maximize your home\'s value and minimize stress.'
        },
        stagingTitle: {
            type: String,
            default: 'Staging Examples'
        },
        stagingSubtitle: {
            type: String,
            default: 'See how professional staging transforms spaces to appeal to potential buyers.'
        },
        stagingCta: {
            type: String,
            default: 'Professional staging can help your home sell faster and for a higher price. As a certified home stager, I can help you prepare your home to make the best possible impression on buyers.'
        },
        stagingButtonText: {
            type: String,
            default: 'Learn More About Staging Services'
        },
        stagingButtonUrl: {
            type: String,
            default: 'https://styleandstaging.com'
        },
        stagingGallery: {
            type: [{
                image: { type: String, required: true },
                room: { type: String, required: true },
                description: { type: String, required: true }
            }],
            default: [
                {
                    image: 'https://images.pexels.com/photos/2029695/pexels-photo-2029695.jpeg?auto=compress&cs=tinysrgb&w=800',
                    room: 'Modern Kitchen',
                    description: 'Transformed with sleek white cabinetry, stainless appliances, and strategic lighting to create an inviting culinary space.'
                },
                {
                    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
                    room: 'Spacious Living Room',
                    description: 'Clean lines, neutral tones, and carefully placed furniture create an open, welcoming atmosphere.'
                },
                {
                    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
                    room: 'Grand Master Bedroom',
                    description: 'Luxurious retreat with elegant furnishings, sophisticated color palette, and premium bedding.'
                },
                {
                    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
                    room: 'Luxury Bathroom',
                    description: 'Spa-like ambiance with modern fixtures, elegant vanity, and refined styling details.'
                }
            ]
        },
        resourcesTitle: {
            type: String,
            default: 'Helpful Resources'
        },
        resourcesSubtitle: {
            type: String,
            default: 'Download free guides and tools to help you prepare for selling your home.'
        },
        resources: {
            type: [{
                icon: { type: String, default: 'FileText' },
                title: { type: String, required: true },
                description: { type: String, required: true },
                buttonText: { type: String, required: true },
                buttonUrl: { type: String, required: true },
                isExternal: { type: Boolean, default: false },
                isDownload: { type: Boolean, default: false }
            }],
            default: [
                {
                    icon: 'FileText',
                    title: 'Home Selling Guide',
                    description: 'Download my comprehensive guide to selling your home in the Phoenix Valley.',
                    buttonText: 'Download Guide',
                    buttonUrl: '/sellers guide.pdf',
                    isExternal: false,
                    isDownload: true
                },
                {
                    icon: 'DollarSign',
                    title: 'Free Home Value Estimate',
                    description: 'Get an accurate estimate of your home\'s current market value.',
                    buttonText: 'Get Estimate',
                    buttonUrl: 'https://www.highway.ai/app/homereport/register/dTfLtaKXS3?creationSource=signup_link',
                    isExternal: true,
                    isDownload: false
                }
            ]
        },
        faqTitle: {
            type: String,
            default: 'Frequently Asked Questions'
        },
        faqSubtitle: {
            type: String,
            default: 'Get answers to common questions about selling your home in the Phoenix Valley.'
        },
        faqs: {
            type: [{
                question: { type: String, required: true },
                answer: { type: String, required: true }
            }],
            default: [
                {
                    question: 'How do you determine the right listing price for my home?',
                    answer: 'I conduct a comprehensive market analysis looking at recent sales of similar homes, current market conditions, and your home\'s unique features. This data-driven approach ensures we price your home competitively to attract buyers while maximizing your return.'
                },
                {
                    question: 'What staging services do you provide?',
                    answer: 'I offer complete staging consultation including furniture arrangement, decluttering guidance, minor repairs recommendations, and professional photography coordination. For vacant homes, I can arrange furniture rental and full staging services.'
                },
                {
                    question: 'How long does it typically take to sell a home?',
                    answer: 'Every home and neighborhood is different, so there isn\'t a one-size-fits-all answer. Timing depends on factors like current buyer demand, pricing, and how well a home is presented. To get the clearest picture, check out the market reports under the Neighborhood tab, where you can see up-to-date stats on how quickly homes are selling in your specific area.'
                },
                {
                    question: 'What are your commission rates?',
                    answer: 'My commission structure is competitive and transparent. I believe in providing exceptional value through professional marketing, expert negotiation, and full-service support. Let\'s discuss your specific needs and I\'ll provide you with detailed information about costs and services.'
                },
                {
                    question: 'Do you offer any guarantees?',
                    answer: 'While I can\'t guarantee a specific sale price or timeline (as these depend on market conditions), I do guarantee professional service, transparent communication, and dedicated advocacy for your interests throughout the entire process.'
                }
            ]
        },
        ctaTitle: {
            type: String,
            default: 'Ready to Sell Your Home?'
        },
        ctaText: {
            type: String,
            default: 'Get a free, no-obligation home value estimate and learn how I can help you achieve your selling goals.'
        },
        ctaButtonText: {
            type: String,
            default: 'Request a Free Home Value Estimate Today'
        },
        ctaButtonUrl: {
            type: String,
            default: 'https://www.highway.ai/app/homereport/register/dTfLtaKXS3?creationSource=signup_link'
        },
        marketingPoints: [{
            icon: {
                type: String,
                default: 'CheckCircle'
            },
            title: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }]
    },

    // Neighborhoods Page Content
    neighborhoods: {
        pageTitle: {
            type: String,
            default: 'Phoenix Valley Neighborhoods'
        },
        pageDescription: {
            type: String,
            default: 'Phoenix is a vibrant and diverse city with neighborhoods that cater to every lifestyle. Whether you\'re drawn to the historic charm of Central Phoenix, the luxury of Scottsdale, the strong-community atmosphere of Chandler, or the up-and-coming energy of the West Valley, there\'s a perfect community waiting for you. Each area offers its own unique character, amenities, and opportunities to create the life you\'ve always wanted in the Valley of the Sun.'
        }
    },

    // Calculators Page Content
    calculators: {
        pageTitle: {
            type: String,
            default: 'Mortgage Calculators'
        },
        mortgageIntroText: {
            type: String,
            default: 'Estimate your payments, affordability, and more with our easy-to-use mortgage calculators.'
        },
        affordabilityIntroText: {
            type: String,
            default: 'Estimate how much home you can afford based on your income and expenses.'
        },
        disclaimer: {
            type: String,
            default: 'These calculators are for informational purposes only and do not constitute financial advice.'
        },
        partnerSectionTitle: {
            type: String,
            default: 'Additional Calculators from Our Partner'
        },
        partnerBoxTitle: {
            type: String,
            default: 'Visit Our Partner\'s Calculators'
        },
        partnerDescription: {
            type: String,
            default: 'For additional mortgage calculators, please visit our trusted partner Barrett Financial\'s website. You may be asked to complete a quick verification to access their tools.'
        },
        partnerButtonText: {
            type: String,
            default: 'Visit Barrett Financial Calculators'
        },
        partnerButtonUrl: {
            type: String,
            default: 'https://www.barrettfinancial.com/mortgage-calculators'
        },
        partnerFooterText: {
            type: String,
            default: 'These calculators are provided by our trusted lending partner, Barrett Financial Group. You\'ll be redirected to their website to use their tools.'
        }
    },

    // Contact Page Content
    contact: {
        pageTitle: {
            type: String,
            default: "Let's Connect"
        },
        pageSubtitle: {
            type: String,
            default: "Ready to start your real estate journey? I'm here to help with all your buying, selling, and investing needs."
        },
        formTitle: {
            type: String,
            default: 'Send Me a Message'
        },
        profileBlurb: {
            type: String,
            default: "I'm always available to help with your real estate questions. Whether you're buying, selling, or just exploring your options, I'd love to hear from you."
        },
        address: {
            type: String,
            default: 'Phoenix, Arizona'
        },
        phone: {
            type: String,
            default: '(602) 405-8002'
        },
        email: {
            type: String,
            default: 'KeysPlease@LaraLovesPhoenix.com'
        },
        mapEmbedUrl: {
            type: String,
            default: ''
        },
        officeHours: {
            type: String,
            default: 'Serving the entire Valley'
        },
        socialBlurb: {
            type: String,
            default: 'Get market updates, home tips, and behind-the-scenes content from my daily real estate adventures.'
        },
        profileImage: {
            type: String,
            default: '/profile.jpg'
        },
        profileName: {
            type: String,
            default: 'Lara Chapman'
        },
        profileTitle: {
            type: String,
            default: 'Realtor® | Investor | Home Stager'
        },
        facebookUrl: {
            type: String,
            default: 'https://www.facebook.com/LaraLovesPhoenix'
        },
        instagramUrl: {
            type: String,
            default: 'https://www.instagram.com/laralovesphoenix/'
        },
        linkedinUrl: {
            type: String,
            default: 'https://www.linkedin.com/in/lara-chapman-b4b025357/'
        },
        youtubeUrl: {
            type: String,
            default: 'https://www.youtube.com/@LaraLovesPhoenix'
        },
        twitterUrl: {
            type: String,
            default: 'https://x.com/larablissr1'
        }
    },

    // Header/Navigation Content
    header: {
        logoText: {
            type: String,
            default: 'Lara Chapman'
        },
        logoSubtext: {
            type: String,
            default: 'Realtor®'
        },
        menuItems: {
            type: [{
                label: String,
                path: String,
                isExternal: { type: Boolean, default: false }
            }],
            default: [
                { label: 'Home', path: '/', isExternal: false },
                { label: 'About', path: '/about', isExternal: false },
                { label: 'Buy', path: '/buy', isExternal: false },
                { label: 'Search Homes', path: 'https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149', isExternal: true },
                { label: 'Sell', path: '/sell', isExternal: false },
                { label: 'Neighborhoods', path: '/neighborhoods', isExternal: false },
                { label: 'Calculators', path: '/calculators', isExternal: false },
                { label: 'Contact', path: '/contact', isExternal: false }
            ]
        }
    },

    // Footer Content
    // Footer Content
    footer: {
        logoText: { type: String, default: 'Lara Chapman' },
        tagline: { type: String, default: 'Realtor®, investor, and home stager helping Phoenix Valley clients buy and sell with confidence.' },

        // Quick Links Section
        quickLinks: {
            type: [{ label: String, path: String, isExternal: { type: Boolean, default: false } }],
            default: [
                { label: 'Home', path: '/', isExternal: false },
                { label: 'About Lara', path: '/about', isExternal: false },
                { label: 'Buy a Home', path: '/buy', isExternal: false },
                { label: 'Search Homes', path: 'https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149', isExternal: true },
                { label: 'Sell Your Home', path: '/sell', isExternal: false },
                { label: 'Neighborhoods', path: '/neighborhoods', isExternal: false }
            ]
        },

        // Resources Section
        resourceLinks: {
            type: [{ label: String, path: String, isExternal: { type: Boolean, default: false } }],
            default: [
                { label: 'Mortgage Calculators', path: '/calculators', isExternal: false },
                { label: 'Buyer & Seller Guides', path: '#', isExternal: false },
                { label: 'Home Staging Services', path: 'https://styleandstaging.com', isExternal: true },
                { label: 'Investment Properties', path: 'https://orangedoorinvestmentgroup.com', isExternal: true }
            ]
        },

        // Section Titles
        quickLinksTitle: { type: String, default: 'Quick Links' },
        resourcesTitle: { type: String, default: 'Resources' },
        contactTitle: { type: String, default: 'Contact Me' },

        // Contact Details (Footer Specific)
        address: { type: String, default: 'Phoenix, AZ' },
        officeHours: { type: String, default: 'Monday - Friday: 9:00 AM - 6:00 PM' },
        email: { type: String, default: 'KeysPlease@LaraLovesPhoenix.com' },
        phone: { type: String, default: '(602) 405-8002' },

        consultationButtonText: { type: String, default: 'Schedule a Consultation' },
        searchHomesUrl: { type: String, default: 'https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149' },

        // Legal Links Labels
        privacyPolicyLinkText: { type: String, default: 'Privacy Policy' },
        termsLinkText: { type: String, default: 'Terms of Use' },
        accessibilityLinkText: { type: String, default: 'Accessibility' },

        copyrightText: { type: String, default: '© 2025 Lara Chapman, Realtor | Bliss Realty' },
        disclaimerText: { type: String, default: 'The data relating to real estate for sale on this web site comes in part from the Internet Data Exchange (IDX) program of the Arizona Regional Multiple Listing Service, Inc.' }
    },

    // Resources Page Content
    resources: {
        pageTitle: {
            type: String,
            default: 'Helpful Resources'
        },
        pageSubtitle: {
            type: String,
            default: 'Download free guides, checklists, and reports to help you navigate the Phoenix Valley real estate market with confidence.'
        },
        ctaSectionTitle: {
            type: String,
            default: 'Need More Information?'
        },
        ctaSectionText: {
            type: String,
            default: 'These resources are just the beginning. I\'m here to provide personalized guidance and answer any questions you have about buying, selling, or investing in Phoenix Valley real estate.'
        },
        // Default Resources
        resource1Title: { type: String, default: 'Your Guide to Buying a Home in the Phoenix Valley' },
        resource1Description: { type: String, default: 'Process overview, financing options, timeline, and essential tips for home buyers.' },
        resource1Url: { type: String, default: '/Buyers_Guide.pdf' },

        resource2Title: { type: String, default: 'Your Guide to Selling Your Phoenix Valley Home' },
        resource2Description: { type: String, default: 'Pricing strategies, preparation, staging, marketing, and handling offers.' },
        resource2Url: { type: String, default: '/Sellers_Guide.pdf' },

        resource3Title: { type: String, default: 'Staging Checklist - Make Your Home Show-Ready' },
        resource3Description: { type: String, default: 'Room-by-room preparation tips to maximize your home\'s appeal to potential buyers.' },
        resource3Url: { type: String, default: '/Staging_Checklist.pdf' },

        resource4Title: { type: String, default: 'Monsoon Prep Tips - Protecting Your Phoenix Home' },
        resource4Description: { type: String, default: 'Essential maintenance for roof/gutters, yard, AC, and flood safety during monsoon season.' },
        resource4Url: { type: String, default: '/Monsoon_Prep_Tips.pdf' }
    }
}, {
    timestamps: true,
    _id: false
});

// Static method to get or create singleton
siteContentSchema.statics.getSingleton = async function () {
    let content = await this.findById('site-content');
    if (!content) {
        content = await this.create({ _id: 'site-content' });
    }
    return content;
};

module.exports = mongoose.model('SiteContent', siteContentSchema);
