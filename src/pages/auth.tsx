import Image from "next/image";
import { ChangeEvent, useState } from "react";
import Input from "../components/input";
import { AnimatePresence } from 'framer-motion';
import axios from "axios";
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';


interface FormData {
    email: string,
    name: string,
    password: string
}

const Auth = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        name: '',
        password: ''
    });

    const [variant, setVariant] = useState<'login' | 'register'>('login');

    const toggleVariant = () => {
        setVariant((prev) => prev === 'login' ? 'register' : 'login')
    }


    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {

        switch (e.target.type) {
            case 'text':
                setFormData((prev) => ({ ...prev, name: e.target.value }))
                break;

            case 'password':
                setFormData((prev) => ({ ...prev, password: e.target.value }))
                break;

            default:
                setFormData((prev) => ({ ...prev, email: e.target.value }))
                break;
        }
    }

    const login = async () => {
        try {
            await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: true,
                callbackUrl: '/profiles'
            });
        } catch (err) {
            console.log(err);
        }
    }

    const register = async () => {
        try {
            await axios.post('api/register', formData)
            login();
        } catch (err) {
            console.log(err);

        }
    }





    return (
        <div className={"relative h-full w-full bg-hero bg-no-repeat bg-center bg-fixed bg-cover"}>
            <div className="bg-black w-full h-full sm:bg-opacity-50 lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <Image src={"/images/logo.png"} width='300' height={'85'} alt='Logo'
                        className="h-auto w-auto" priority />
                </nav>
                <div className="flex justify-center">
                    <div
                        className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? 'Sigin in' : 'Register'}
                        </h2>
                        <div className="flex flex-col">
                            <AnimatePresence>
                                {variant === 'register' && (<Input
                                    label="Username"
                                    onChange={onChangeHandler}
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                />)}
                            </AnimatePresence>
                            <Input
                                label="Email"
                                onChange={onChangeHandler}
                                id="email"
                                type="email"
                                value={formData.email}
                            />
                            <Input
                                label="Password"
                                onChange={onChangeHandler}
                                id="password"
                                type="password"
                                value={formData.password}
                            />
                        </div>
                        <button
                            onClick={variant === 'login' ? login : register}
                            className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant === 'login' ? 'Login' : 'Sign up'}
                        </button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div
                                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                                className="
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
                                    "
                            >
                                <FcGoogle size={30} />
                            </div>
                            <div
                                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                                className="
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
                                "
                            >
                                <FaGithub size={30} />
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant === 'login' ? 'First time using Netflix ?' : 'Already have account'}
                            <span onClick={toggleVariant}
                                className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === 'login' ? 'Create account' : 'Login'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Auth;