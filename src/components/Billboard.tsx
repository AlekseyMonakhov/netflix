import { FC } from 'react';
import useBillboard from '../../hooks/useBillboard';

import {AiOutlineInfoCircle} from 'react-icons/ai';
import PlayButton from '@/components/PlayButton';
import useInfoModal from '../../hooks/useInfoModal';

const Billboard: FC = () => {
    const { data, error, isLoading } = useBillboard();
    const {openModal} = useInfoModal();

    const handleOpenModal = () => {
        data && openModal(data.id)
    }


    return (
        <div className={'relative h-[100vw] sm:h-[56.25vw]'}>
            <video
                className={'w-full object-cover brightness-[60%] h-full sm:h-[56.25vw]'}
                autoPlay
                muted
                loop
                poster={data?.thumbnailUrl}
                src={data?.videoUrl}
            >

            </video>
            <div className={'absolute top-[45%] md:top-[40%] ml-4 md:ml-16'}>
                <h1 className={'text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl'}>
                    {data?.title}
                </h1>
                <h2 className={'text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl'}>
                    {data?.description}
                </h2>
                <div className={'flex flex-row items-center mt-3 md:mt-4 gap-3'}>
                    <PlayButton moveId={data?.id}/>
                    <button
                        onClick={handleOpenModal}
                        className={'bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition'}>
                        <AiOutlineInfoCircle className={'mr-1'}/>
                        More info
                    </button>
                </div>

            </div>

        </div>
    );
};

export default Billboard;