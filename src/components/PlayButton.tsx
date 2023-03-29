import { FC, memo } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

interface PlayButtonProps {
    moveId:string | undefined;
}

const PlayButton: FC<PlayButtonProps> = ({moveId}) => {
    const router = useRouter();


    return (
        <button
            onClick={() => router.push(`/watch/${moveId}`)}
            className={'bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition'}>
            <BsFillPlayFill className={'mr-1'} size={25}/>
            Play
        </button>
    );
};

export default memo(PlayButton);