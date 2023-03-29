import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { Movie } from '@prisma/client';


const useMovieList = () => {
    const { data, isLoading, error } = useSWR<Movie[]>('/api/movies', fetcher, {
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

export default useMovieList;