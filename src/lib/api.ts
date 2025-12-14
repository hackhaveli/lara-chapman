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

export interface SiteContent {
    home: {
        heroTitle: string;
        heroSubtitle: string;
        heroImage: string;
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
        philosophyTitle: string;
        philosophyText: string;
        lifestyleTitle: string;
        lifestyleText: string;
    };
    buy: {
        introTitle: string;
        introText: string;
        mlsDescription: string;
        stepsTitle: string;
        neighborhoodTitle: string;
        neighborhoodText: string;
        steps: Array<{ icon: string; title: string; text: string }>;
    };
    sell: {
        introTitle: string;
        introText: string;
        stepsTitle: string;
        stagingTitle: string;
        stagingSubtitle: string;
        stagingCta: string;
        marketingPoints: Array<{ icon: string; title: string; text: string }>;
    };
    calculators: {
        pageTitle: string;
        mortgageIntroText: string;
        affordabilityIntroText: string;
        disclaimer: string;
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
