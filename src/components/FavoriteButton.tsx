import { FC, memo } from 'react';
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';
import useFavorites from '../../hooks/useFavorites';
import useCurrentUser from '../../hooks/useCurrentUser';
import axios from 'axios';
import { User } from '@prisma/client';

interface FavoriteButtonProps {
    movieId: string | undefined;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();


    const isFavorite = () => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(movieId!);
    };


    const toggleFavorites = async () => {
        let response;
        if (isFavorite()) {
            response = await axios.delete<User>('/api/favorite', {
                data: { movieId },
            });
        } else {
            response = await axios.post<User>('/api/favorite', { movieId });
        }
        const updatedFavoriteIds = response?.data?.favoriteIds;


        mutate({ ...currentUser!, favoriteIds: updatedFavoriteIds });
        mutateFavorites();
    };

    const Icon = isFavorite() ? AiOutlineCheck : AiOutlinePlus;


    return (
        <div
            onClick={toggleFavorites}
            className={'cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'}>
            <Icon className={'text-white'} size={25} />
        </div>
    );
};

export default memo(FavoriteButton);