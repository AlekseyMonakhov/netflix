import { FC } from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { motion } from 'framer-motion';


const AccountMenu: FC = () => {


    return (
        <motion.div
            initial={{ height: 0, opacity: 0, padding: 0 }}
            animate={{ height: 'auto', opacity: 1, padding: '1.25rem 0' }}
            exit={{ height: 0, opacity: 0, padding: 0 }}
            transition={{
                duration: 0.25,
                ease: 'linear',
            }}
            className={'bg-black w-56 absolute top-14 right-0 flex-col border-2 border-gray-100 flex overflow-hidden'}>
            <div className={'flex flex-col gap-3'}>
                <div className={'px-3 group/item flex flex-row gap-3 items-center w-full'}>
                    <Image src={'/images/default-blue.png'} alt={'logo'} width={24} height={24} />
                    <p className={'text-white text-sm group-hover/item:underline'}>
                        Username
                    </p>
                </div>
                <hr className={'bg-gray-600 border-0 h-px my-4'} />

                <div onClick={() => signOut()}
                     className={'px-3 text-center text-white text-sm hover:underline'}>
                    Sign Out of Netflix
                </div>
            </div>
        </motion.div>
    );
};

export default AccountMenu;