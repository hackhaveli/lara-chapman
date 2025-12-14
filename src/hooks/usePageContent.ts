import { useState, useEffect, useCallback } from 'react';
import { getContent, SiteContent } from '../lib/api';

interface UsePageContentReturn {
    content: SiteContent | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const usePageContent = (): UsePageContentReturn => {
    const [content, setContent] = useState<SiteContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchContent = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getContent();

            if (response.success && response.data) {
                setContent(response.data);
            } else {
                setError(response.message || 'Failed to fetch content');
            }
        } catch (err) {
            setError('Network error fetching content');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContent();
    }, [fetchContent]);

    return { content, loading, error, refetch: fetchContent };
};

export default usePageContent;
