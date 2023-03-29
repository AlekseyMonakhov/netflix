import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { Movie } from '@prisma/client';

const useMovie = (id: string) => {
    const { data, isLoading, error } = useSWR<Movie>('/api/movies/' + id, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return {
        data,
        error,
        isLoading,
    };
};

export default useMovie;