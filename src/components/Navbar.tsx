import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { BsBell, BsChevronDown, BsSearch } from 'react-icons/bs';
import NavbarItem from './NavbarItem';
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';
import { AnimatePresence } from 'framer-motion';


const TOP_OFFSET = 66;

const Navbar: FC = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackGround, setShowBackGround] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackGround(true);
            } else {
                setShowBackGround(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    const toggleMobileMenu = () => {
        setShowMobileMenu((prev) => !prev);
    };

    const toggleAccountMenu = () => {
        setShowAccountMenu((prev) => !prev);
    };


    return (
        <nav className='w-full fixed z-40'>
            <div className={`
                p-4
                md:px-16
                py-6
                flex
                flex-row
                items-center
                transition
                duration-500
                ${showBackGround ? 'bg-zinc-900 bg-opacity-90' : ''}
            `}>
                <Image className={'h-4 lg:h-7 w-auto'} src={'/images/logo.png'} alt={'Logo'}
                       width={100}
                       height={30}
                       placeholder={'blur'}
                       blurDataURL={'/images/logo.png'}
                />
                <div className='
                    flex-row
                    ml-8
                    gap-7
                    hidden
                    lg:flex
                    '>
                    <NavbarItem label='Home' />
                    <NavbarItem label='Series' />
                    <NavbarItem label='Films' />
                    <NavbarItem label='New & Popular' />
                    <NavbarItem label='My List' />
                    <NavbarItem label='Browse by languages' />
                </div>
                <div onClick={toggleMobileMenu}
                     className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative'>
                    <p className='text-white text-sm'>Browse</p>
                    <BsChevronDown
                        className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                    <AnimatePresence>
                        {showMobileMenu && <MobileMenu />}
                    </AnimatePresence>
                </div>

                <div className='flex flex-row ml-auto gap-7 items-center'>
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                        <BsSearch />
                    </div>
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                        <BsBell />
                    </div>


                    <div onClick={toggleAccountMenu}
                         className='flex flex-row items-center gap-2 cursor-pointer relative'>
                        <div
                            className={'w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden relative'}>
                            <Image src={'/images/default-blue.png'} fill sizes={'100%'}
                                   alt='logo' />
                        </div>
                        <BsChevronDown
                            className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                        <AnimatePresence>
                            {showAccountMenu && <AccountMenu />}
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;