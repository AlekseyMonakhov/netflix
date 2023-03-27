import { ChangeEvent, FC } from "react"
import { motion } from 'framer-motion';


interface InputProps {
    id: string,
    value: string,
    label: string,
    type?: string
    onChange(e: ChangeEvent<HTMLInputElement>): void,
}


const Input: FC<InputProps> = ({
    id,
    onChange,
    value,
    label,
    type
}) => {

    return (
        <motion.div
            initial={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
            animate={{ height: 'auto', opacity: 1, paddingTop: '0.25rem', paddingBottom: '0.25rem' }}
            exit={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
            transition={{
                duration: 0.5,
                ease: 'linear'
            }}
            className="relative overflow-hidden">
            <input
                value={value}
                type={type}
                onChange={onChange}
                placeholder=" "
                id={id}
                className="
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
        "
            />
            <label
                htmlFor={id}
                className="
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
            "
            >{label}</label>
        </motion.div>
    )
}

export default Input