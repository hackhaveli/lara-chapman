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
        services: [{
            icon: { type: String, default: 'Home' },
            title: { type: String, required: true },
            description: { type: String, required: true },
            link: { type: String, required: true },
            internal: { type: Boolean, default: true }
        }]
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
        neighborhoodTitle: {
            type: String,
            default: 'Explore Phoenix Valley Neighborhoods'
        },
        neighborhoodText: {
            type: String,
            default: 'Every community in the Valley has its own character, lifestyle, and price points. Explore my neighborhood guides to find the area that feels like home.'
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
        }]
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
        }
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
