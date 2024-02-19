import { ReactNode } from 'react';
import cls from './Dropdown.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

interface DropdownProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export const Dropdown = (props: DropdownProps) => {
    const { children, isOpen, onClose } = props;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 50,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            opacity: {
                                duration: 0.1,
                            },
                        },
                    }}
                    exit={{
                        y: 50,
                        opacity: 0,
                    }}
                    transition={{
                        type: 'keyframes',
                    }}
                    className={cls.dropdown}
                >
                    <div onClick={onClose} className={cls.overlay} />
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

Dropdown.displayName = 'Dropdown';
