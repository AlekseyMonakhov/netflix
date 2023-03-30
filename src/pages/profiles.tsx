import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);


    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}





const Profiles: FC = () => {
    const { push } = useRouter();
    const { data: user } = useCurrentUser();

    return (
        <div className='flex items-center h-full justify-center'>
            <div className='flex flex-col'>
                <h1 className='text-3xl md:text-6xl text-white text-center'>Who is watching ?</h1>
                <div className='flex items-center justify-center gap-8 mt-10'>
                    <div onClick={() => push('/')}>
                        <div className='group flex-row w-44 mx-auto'>
                            <div className='
                                w-44
                                h-44
                                rounded-md
                                flex
                                items-center
                                justify-center
                                border-2
                                border-transparent
                                group-hover:cursor-pointer
                                group-hover:border-white
                                overflow-hidden
                            '>
                                <Image src={'/images/default-blue.png'} alt={'logo image'} width={100} height={100} priority />

                            </div>
                            <div className='
                                    mt-4
                                    text-gray-400
                                    text-2xl
                                    text-center
                                    group-hover:text-white
                                '>
                                {user?.name}
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profiles;