import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { Movie } from '@prisma/client';

const UseFavorites = () => {
    const { data, isLoading, error, mutate } = useSWR<Movie[]>('/api/favorites', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default UseFavorites;