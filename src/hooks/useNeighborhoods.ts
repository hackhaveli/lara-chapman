import { useState, useEffect, useCallback } from 'react';
import { getNeighborhoods, getNeighborhoodBySlug, Neighborhood } from '../lib/api';

interface UseNeighborhoodsReturn {
    neighborhoods: Neighborhood[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

interface UseSingleNeighborhoodReturn {
    neighborhood: Neighborhood | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useNeighborhoods = (activeOnly: boolean = true): UseNeighborhoodsReturn => {
    const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNeighborhoods = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getNeighborhoods(activeOnly);

            if (response.success && response.data) {
                setNeighborhoods(response.data);
            } else {
                setError(response.message || 'Failed to fetch neighborhoods');
            }
        } catch (err) {
            setError('Network error fetching neighborhoods');
        } finally {
            setLoading(false);
        }
    }, [activeOnly]);

    useEffect(() => {
        fetchNeighborhoods();
    }, [fetchNeighborhoods]);

    return { neighborhoods, loading, error, refetch: fetchNeighborhoods };
};

export const useNeighborhood = (slug: string): UseSingleNeighborhoodReturn => {
    const [neighborhood, setNeighborhood] = useState<Neighborhood | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNeighborhood = useCallback(async () => {
        if (!slug) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await getNeighborhoodBySlug(slug);

            if (response.success && response.data) {
                setNeighborhood(response.data);
            } else {
                setError(response.message || 'Neighborhood not found');
            }
        } catch (err) {
            setError('Network error fetching neighborhood');
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        fetchNeighborhood();
    }, [fetchNeighborhood]);

    return { neighborhood, loading, error, refetch: fetchNeighborhood };
};

export default useNeighborhoods;
