import Image from 'next/image';
import { useCallback, useState } from 'react';
import Input from '../components/input';
import { AnimatePresence } from 'framer-motion';
import { getSession, signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner';
import { GetServerSideProps } from 'next';


export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

export interface FormData {
    email: string,
    name?: string,
    password: string
}

export type ErrorFieldName = 'Email' | 'Password' | null;


const Auth = () => {
    const router = useRouter();
    const [variant, setVariant] = useState<'login' | 'register'>('login');
    const [error, setError] = useState<ErrorFieldName>(null);
    const [loading, setLoading] = useState(false);


    const resetErrorHandler = useCallback(
        () => {
            setError(null);
        },
        [],
    );

    const toggleVariant = () => {
        setVariant((prev) => prev === 'login' ? 'register' : 'login');
        setError(null);
    };

    const methods = useForm<FormData>();

    const submitHandler: SubmitHandler<FormData> = async (data) => {
        setLoading(true);
        if (variant === 'register') {
            try {
                await axios.post('api/register', data);

                const result = await signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                });
                if (result?.ok) {
                    router.push('/profiles');
                } else {
                    throw result;
                }
                setError(null);
            } catch (err: any) {
                const { error } = err as { error: string };

                if (error.includes('Email')) {
                    setError('Email');
                }
                if (error.includes('Password')) {
                    setError('Password');
                }
            } finally {
                setLoading(false);
            }
        } else {
            try {
                const result = await signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                });

                if (result?.ok) {
                    router.push('profiles');
                } else {
                    throw result;
                }
                setError(null);
            } catch (err: any) {
                const { error } = err as { error: string };
                if (error.includes('Email')) {
                    setError('Email');
                }
                if (error.includes('Password')) {
                    setError('Password');
                }

            } finally {
                setLoading(false);
            }
        }
    };


    return (
        <div className={'relative h-full w-full bg-hero bg-no-repeat bg-center bg-fixed bg-cover'}>
            <div className='bg-black w-full h-full sm:bg-opacity-50 lg:bg-opacity-50'>
                <nav className='px-12 py-5'>
                    <Image src={'/images/logo.png'} width='300' height={'85'} alt='Logo'
                           className='h-auto w-auto' priority />
                </nav>
                <div className='flex justify-center items-center'>
                    <FormProvider {...methods}>
                        <form
                            onSubmit={methods.handleSubmit(submitHandler)}
                            className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
                            <h2 className='text-white text-4xl mb-8 font-semibold'>
                                {variant === 'login' ? 'Sign in' : 'Register'}
                            </h2>
                            {loading ?
                                <Spinner />
                                :
                                <>
                                    <div className='flex flex-col'>
                                        <AnimatePresence>
                                            {variant === 'register' && (<Input
                                                label='Username'
                                                id='name'
                                                type='text'
                                                fieldName={'name'}
                                                inputConfig={{
                                                    required: {
                                                        value: true,
                                                        message: 'This field is required',
                                                    },
                                                    minLength: {
                                                        value: 3,
                                                        message: 'Name length is min 3 char',
                                                    },
                                                }}
                                            />)}
                                        </AnimatePresence>
                                        <Input
                                            label='Email'
                                            id='email'
                                            type='email'
                                            fieldName={'email'}
                                            serverValidationError={error === 'Email'}
                                            resetErrorHandler={resetErrorHandler}
                                            inputConfig={{
                                                required: {
                                                    value: true,
                                                    message: 'The email field is required',
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message: 'Email length is min 5 char',
                                                },
                                            }}
                                        />
                                        <Input
                                            label='Password'
                                            id='password'
                                            type='password'
                                            fieldName={'password'}
                                            serverValidationError={error === 'Password'}
                                            resetErrorHandler={resetErrorHandler}
                                            inputConfig={{
                                                required: {
                                                    value: true,
                                                    message: 'Password field is required',
                                                },
                                                minLength: {
                                                    value: 6,
                                                    message: 'Password length is min 6 char',
                                                },
                                            }}
                                        />
                                    </div>
                                    <button
                                        type={'submit'}
                                        className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
                                        {variant === 'login' ? 'Login' : 'Sign up'}
                                    </button>
                                    <div
                                        className='flex flex-row items-center gap-4 mt-8 justify-center'>
                                        <div
                                            onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                                            className='
                                                w-10
                                                h-10
                                                bg-white
                                                rounded-full
                                                flex
                                                items-center
                                                justify-center
                                                cursor-pointer
                                                hover:opacity-80
                                                transition
                                                '
                                        >
                                            <FcGoogle size={30} />
                                        </div>
                                        <div
                                            onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                                            className='
                                                w-10
                                                h-10
                                                bg-white
                                                rounded-full
                                                flex
                                                items-center
                                                justify-center
                                                cursor-pointer
                                                hover:opacity-80
                                                transition
                                            '
                                        >
                                            <FaGithub size={30} />
                                        </div>
                                    </div>
                                    <p className='text-neutral-500 mt-12'>
                                        {variant === 'login' ? 'First time using Netflix ?' : 'Already have account'}
                                        <span onClick={toggleVariant}
                                              className='text-white ml-1 hover:underline cursor-pointer'>
                                        {variant === 'login' ? 'Create account' : 'Login'}
                                        </span>
                                    </p>
                                </>
                            }
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
};


export default Auth;