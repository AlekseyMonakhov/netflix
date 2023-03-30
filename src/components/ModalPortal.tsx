import { FC, PropsWithChildren, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const ModalPortal: FC<PropsWithChildren> = ({ children }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        ref.current = document.getElementById('modal') as HTMLDivElement;
        setMounted(true)

    }, []);



    return (mounted && ref.current) ? createPortal(children, ref.current) : null;
};

export default ModalPortal;