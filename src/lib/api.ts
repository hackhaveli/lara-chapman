// API Configuration for the Admin Panel
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = (): string | null => {
    return localStorage.getItem('admin_token');
};

// Set auth token in localStorage
export const setAuthToken = (token: string): void => {
    localStorage.setItem('admin_token', token);
};

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
    localStorage.removeItem('admin_token');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
    return !!getAuthToken();
};

// Create headers with auth if available
const createHeaders = (includeAuth: boolean = false): HeadersInit => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (includeAuth) {
        const token = getAuthToken();
        if (token) {
            headers['Authorization'] = `Basic ${token}`;
        }
    }

    return headers;
};

// Generic API response type
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    count?: number;
}

// Login function
export const login = async (username: string, password: string): Promise<{ success: boolean; token?: string; message?: string }> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({ username, password }),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Network error' };
    }
};

// ============ CONTENT API ============

export interface HeaderContent {
    logoText: string;
    logoSubtext: string;
    menuItems: {
        label: string;
        path: string;
        isExternal: boolean;
    }[];
}

export interface SiteContent {
    home: {
        heroTitle: string;
        heroSubtitle: string;
        heroImage: string;
        heroVideoId: string;
        heroButton1Text: string;
        heroButton1Url: string;
        heroButton2Text: string;
        heroButton2Url: string;
        bioExcerpt: string;
        servicesTitle: string;
        servicesSubtitle: string;
        ctaTitle: string;
        ctaSubtitle: string;
        services: Array<{ icon: string; title: string; description: string; link: string; internal: boolean }>;
    };
    about: {
        pageTitle: string;
        pageSubtitle: string;
        fullBio: string;
        profileImage: string;
        profileName: string;
        profileTitle: string;
        profileCompany: string;
        philosophyTitle: string;
        philosophyText: string;
        lifestyleTitle: string;
        lifestyleText: string;
        lifestyleImage: string;
    };
    buy: {
        introTitle: string;
        introText: string;
        mlsDescription: string;
        stepsTitle: string;
        stepsSubtitle: string;
        neighborhoodTitle: string;
        neighborhoodText: string;
        searchButtonText: string;
        searchButtonUrl: string;
        neighborhoodButtonText: string;
        neighborhoodButtonUrl: string;
        ctaButtonText: string;
        ctaButtonUrl: string;
        resourcesTitle: string;
        resourcesSubtitle: string;
        steps: Array<{ icon: string; title: string; text: string }>;
        resources: Array<{ icon: string; title: string; description: string; buttonText: string; buttonUrl: string; isExternal: boolean; isDownload: boolean }>;
    };
    sell: {
        introTitle: string;
        introText: string;
        stepsTitle: string;
        stepsSubtitle: string;
        stagingTitle: string;
        stagingSubtitle: string;
        stagingCta: string;
        stagingButtonText: string;
        stagingButtonUrl: string;
        stagingGallery: Array<{ image: string; room: string; description: string }>;
        resourcesTitle: string;
        resourcesSubtitle: string;
        resources: Array<{ icon: string; title: string; description: string; buttonText: string; buttonUrl: string; isExternal: boolean; isDownload: boolean }>;
        faqTitle: string;
        faqSubtitle: string;
        faqs: Array<{ question: string; answer: string }>;
        ctaTitle: string;
        ctaText: string;
        ctaButtonText: string;
        ctaButtonUrl: string;
        marketingPoints: Array<{ icon: string; title: string; text: string }>;
    };
    neighborhoods: {
        pageTitle: string;
        pageDescription: string;
    };
    calculators: {
        pageTitle: string;
        mortgageIntroText: string;
        affordabilityIntroText: string;
        disclaimer: string;
        partnerSectionTitle: string;
        partnerBoxTitle: string;
        partnerDescription: string;
        partnerButtonText: string;
        partnerButtonUrl: string;
        partnerFooterText: string;
    };
    contact: {
        pageTitle: string;
        pageSubtitle: string;
        formTitle: string;
        profileBlurb: string;
        address: string;
        phone: string;
        email: string;
        mapEmbedUrl: string;
        officeHours: string;
        socialBlurb: string;
        profileImage: string;
        profileName: string;
        profileTitle: string;
        facebookUrl: string;
        instagramUrl: string;
        linkedinUrl: string;
        youtubeUrl: string;
        twitterUrl: string;
    };
    header: HeaderContent;
    footer: {
        logoText: string;
        tagline: string;
        copyrightText: string;
        disclaimerText: string;

        quickLinks: Array<{ label: string; path: string; isExternal: boolean }>;
        resourceLinks: Array<{ label: string; path: string; isExternal: boolean }>;

        quickLinksTitle: string;
        resourcesTitle: string;
        contactTitle: string;

        address: string;
        officeHours: string;
        email: string;
        phone: string;

        consultationButtonText: string;
        searchHomesUrl: string;

        privacyPolicyLinkText: string;
        termsLinkText: string;
        accessibilityLinkText: string;
    };
    resources: {
        pageTitle: string;
        pageSubtitle: string;
        ctaSectionTitle: string;
        ctaSectionText: string;
        resource1Title: string;
        resource1Description: string;
        resource1Url: string;
        resource2Title: string;
        resource2Description: string;
        resource2Url: string;
        resource3Title: string;
        resource3Description: string;
        resource3Url: string;
        resource4Title: string;
        resource4Description: string;
        resource4Url: string;
    };
}

// Get all content
export const getContent = async (): Promise<ApiResponse<SiteContent>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/content`, {
            headers: createHeaders(),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Failed to fetch content' };
    }
};

// Get specific section
export const getContentSection = async (section: string): Promise<ApiResponse<any>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/content/${section}`, {
            headers: createHeaders(),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Failed to fetch section' };
    }
};

// Update content
export const updateContent = async (content: Partial<SiteContent>): Promise<ApiResponse<SiteContent>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/content`, {
            method: 'PUT',
            headers: createHeaders(true),
            body: JSON.stringify(content),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Failed to update content' };
    }
};

// Update specific section
export const updateContentSection = async (section: string, data: any): Promise<ApiResponse<any>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/content/${section}`, {
            method: 'PUT',
            headers: createHeaders(true),
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Failed to update section' };
    }
};

// ============ NEIGHBORHOODS API ============

export interface Neighborhood {
    _id: string;
    name: string;
    slug: string;
    thumbnailImage: string;
    shortDescription: string;
    fullDescription: string;
    videoUrl: string;
    highlights: string[];
    stats: {
        medianPrice?: string;
        schoolDistrict?: string;
        homeValues?: string;
        costOfLiving?: string;
        lifestyle?: string;
    };
    didYouKnow: string;
    schools: string;
    summary: Array<{ feature: string; description: string }>;
    ctaButtons: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface NeighborhoodInput {
    name: string;
    slug?: string;
    thumbnailImage?: string;
    shortDescription: string;
    fullDescription: string;
    videoUrl?: string;
    highlights?: string[];
    stats?: {
        medianPrice?: string;
        schoolDistrict?: string;
        homeValues?: string;
        costOfLiving?: string;
        lifestyle?: string;
    };
    didYouKnow?: string;
    schools?: string;
    summary?: Array<{ feature: string; description: string }>;
    ctaButtons?: string[];
    isActive?: boolean;
}

// Get all neighborhoods
export const getNeighborhoods = async (activeOnly: boolean = false): Promise<ApiResponse<Neighborhood[]>> => {
    try {
        const url = activeOnly
            ? `${API_BASE_URL}/neighborhoods?active=true`
            : `${API_BASE_URL}/neighborhoods`;
        const response = await fetch(url, {
            headers: createHeaders(true),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Failed to fetch neighborhoods' };
    }
};

// Get single neighborhood by slug
export const getNeighborhoodBySlug = async (slug: string): Promise<ApiResponse<Neighborhood>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/neighborhoods/${slug}`, {
            headers: createHeaders(),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Failed to fetch neighborhood' };
    }
};

// Create neighborhood
export const createNeighborhood = async (data: NeighborhoodInput): Promise<ApiResponse<Neighborhood>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/neighborhoods`, {
            method: 'POST',
            headers: createHeaders(true),
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Failed to create neighborhood' };
    }
};

// Update neighborhood
export const updateNeighborhood = async (id: string, data: Partial<NeighborhoodInput>): Promise<ApiResponse<Neighborhood>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/neighborhoods/${id}`, {
            method: 'PUT',
            headers: createHeaders(true),
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Failed to update neighborhood' };
    }
};

// Delete neighborhood
export const deleteNeighborhood = async (id: string): Promise<ApiResponse<null>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/neighborhoods/${id}`, {
            method: 'DELETE',
            headers: createHeaders(true),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Failed to delete neighborhood' };
    }
};

// ============ BLOG API ============

export interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    category: 'Market Updates' | 'Home Buying Tips' | 'Home Selling Tips' | 'Neighborhoods' | 'Investment' | 'Lifestyle' | 'Real Estate News';
    tags: string[];
    author: {
        name: string;
        image: string;
    };
    status: 'draft' | 'published';
    publishedAt?: Date;
    readTime: number;
    seo: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
    };
    createdAt: string;
    updatedAt: string;
}

export interface BlogPostInput {
    title: string;
    slug?: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    category: string;
    tags?: string[];
    author?: {
        name?: string;
        image?: string;
    };
    status?: 'draft' | 'published';
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
    };
}

// Get all blog posts
export const getBlogPosts = async (params?: {
    status?: 'draft' | 'published' | 'all';
    category?: string;
    tag?: string;
    page?: number;
    limit?: number;
    sort?: string;
}): Promise<ApiResponse<{ posts: BlogPost[]; pagination: any }>> => {
    try {
        const queryParams = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined) {
                    queryParams.append(key, value.toString());
                }
            });
        }

        const url = `${API_BASE_URL}/blog${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        console.log('[API] Fetching from URL:', url);
        console.log('[API] API_BASE_URL:', API_BASE_URL);

        const response = await fetch(url, {
            headers: createHeaders(),
        });

        console.log('[API] Response status:', response.status);
        console.log('[API] Response ok:', response.ok);

        const data = await response.json();
        console.log('[API] Response data:', data);

        return data; // Backend already returns { success, data } format
    } catch (error) {
        console.error('[API] Error fetching blog posts:', error);
        return { success: false, message: 'Failed to fetch blog posts' };
    }
};

// Get single blog post by slug
export const getBlogPostBySlug = async (slug: string): Promise<ApiResponse<BlogPost>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/blog/slug/${slug}`, {
            headers: createHeaders(),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Failed to fetch blog post' };
    }
};

// Get single blog post by ID
// Get single blog post by ID
export const getBlogPostById = async (id: string): Promise<ApiResponse<BlogPost>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
            headers: createHeaders(true),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Failed to fetch blog post' };
    }
};

// Create blog post
export const createBlogPost = async (data: BlogPostInput): Promise<ApiResponse<BlogPost>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/blog`, {
            method: 'POST',
            headers: createHeaders(true),
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Failed to create blog post' };
    }
};

// Update blog post
export const updateBlogPost = async (id: string, data: Partial<BlogPostInput>): Promise<ApiResponse<BlogPost>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
            method: 'PUT',
            headers: createHeaders(true),
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Failed to update blog post' };
    }
};

// Delete blog post
export const deleteBlogPost = async (id: string): Promise<ApiResponse<null>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
            method: 'DELETE',
            headers: createHeaders(true),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Failed to delete blog post' };
    }
};

// Get blog categories
export const getBlogCategories = async (): Promise<ApiResponse<string[]>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/blog/meta/categories`, {
            headers: createHeaders(),
        });
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        return { success: false, message: 'Failed to fetch categories' };
    }
};

// Get blog tags
export const getBlogTags = async (): Promise<ApiResponse<string[]>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/blog/meta/tags`, {
            headers: createHeaders(),
        });
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        return { success: false, message: 'Failed to fetch tags' };
    }
};

export default {
    login,
    setAuthToken,
    removeAuthToken,
    isAuthenticated,
    getContent,
    getContentSection,
    updateContent,
    updateContentSection,
    getNeighborhoods,
    getNeighborhoodBySlug,
    createNeighborhood,
    updateNeighborhood,
    deleteNeighborhood,
};
