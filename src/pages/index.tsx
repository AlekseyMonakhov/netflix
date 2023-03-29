import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '../components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '../../hooks/useMovieList';
import useFavorites from '../../hooks/useFavorites';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

export default function Home() {
    const { data: movies} = useMovieList();
    const { data: favorites, isLoading, error} = useFavorites();


    return (
        <>
            <Navbar />
            <Billboard />
            <div className={'pb-40'}>
                <MovieList title={'Trending Now'} data={movies} />
                <MovieList title={'My List'} data={favorites} />
            </div>
        </>
    );
}
