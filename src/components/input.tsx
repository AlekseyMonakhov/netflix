import { Dispatch, FC, memo, SetStateAction } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { ErrorFieldName, FormData } from '@/pages/auth';

interface InputProps {
    id: string,
    label: string,
    type?: string,
    fieldName: keyof FormData,
    inputConfig?: RegisterOptions<FormData, keyof FormData>,
    serverValidationError?: boolean,
    resetErrorHandler?():void;
}


const Input: FC<InputProps> = ({
                                   id,
                                   label,
                                   type,
                                   fieldName,
                                   inputConfig,
                                   serverValidationError,
                                   resetErrorHandler
                               }) => {
    const { register, formState: { errors } } = useFormContext<FormData>();

    return (
        <motion.div
            initial={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
            animate={{
                height: 'auto',
                opacity: 1,
                paddingTop: '0.25rem',
                paddingBottom: '0.25rem',
            }}
            exit={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
            transition={{
                duration: 0.5,
                ease: 'linear',
            }}
            className='relative overflow-hidden'>
            <input
                {...register(fieldName, inputConfig)}
                type={type}
                onFocus={resetErrorHandler}
                id={id}
                placeholder=' '
                className='
            block
            rounded-md
            px-6
            pt-6
            pb-1
            w-full
            text-md
            text-white
            bg-neutral-700
            appearance-none
            focus:outline-none
            focus:ring-0
            peer
        '
            />
            <label
                htmlFor={id}
                className='
            absolute
            text-md
            text-zinc-400
            duration-150
            transform
            -translate-y-3
            scale-75
            top-4
            z-10
            origin-[0]
            left-6
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-3
            '
            >{label}</label>
            <AnimatePresence>
                {errors[fieldName] &&
                    (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={'text-red-700 flex py-2 pl-5 items-center'}>{errors[fieldName]!.message}</motion.span>
                    )}
                {serverValidationError &&
                    (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={'text-red-700 flex py-2 pl-5 items-center'}>{label === 'Password' ? 'Wrong Password' : 'Email not found'}</motion.span>
                    )}
            </AnimatePresence>
        </motion.div>
    );
};

export default memo(Input);