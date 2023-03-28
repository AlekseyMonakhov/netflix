import { FC } from 'react';
import { motion } from 'framer-motion';


const MobileMenu: FC = () => {

    return (
        <motion.div
            className={'bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex overflow-hidden'}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
                duration: 0.25,
                ease: 'linear',
            }}
        >
            <div className='flex flex-col gap-4'>
                <div className='px-3 text-center text-white hover:underline'>
                    Home
                </div>
                <div className='px-3 text-center text-white hover:underline'>
                    Series
                </div>
                <div className='px-3 text-center text-white hover:underline'>
                    Films
                </div>
                <div className='px-3 text-center text-white hover:underline'>
                    New & Popular
                </div>
                <div className='px-3 text-center text-white hover:underline'>
                    My List
                </div>
                <div className='px-3 text-center text-white hover:underline'>
                    Browse by Languages
                </div>
            </div>


        </motion.div>
    );
};

export default MobileMenu;