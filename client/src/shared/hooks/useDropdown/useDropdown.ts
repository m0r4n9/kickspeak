import { MutableRefObject, useEffect, useRef, useState } from 'react';

interface UseDropdownProps {
    animationDelay?: number
}

export function useDropdown(props: UseDropdownProps) {
    const {animationDelay = 250} = props;
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const refItem = useRef<HTMLDivElement | null>(null);
    const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    const onToggle = () => {
        if (isOpen) {
            setIsClosing(true);
            timeRef.current = setTimeout(() => {
                setIsClosing(false);
                setIsOpen((prevState) => !prevState);
            }, animationDelay);
            return;
        }
        setIsOpen((prevState) => !prevState);
    };

    const closeOpenMenu = (e: any) => {
        if (refItem.current && isOpen && !refItem.current?.contains(e.target)) {
            onToggle();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeOpenMenu);

        return () => {
            document.removeEventListener('mousedown', closeOpenMenu);
        };
    }, [closeOpenMenu]);

    return {
        isOpen,
        isClosing,
        refItem,
        onToggle,
    };
}
