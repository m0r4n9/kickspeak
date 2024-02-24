import { ReactNode } from 'react';
import cls from './Sidebar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { Overlay } from '@/shared/ui/Overlay';
import { Portal } from '@/shared/ui/Portal';
import { AnimatePresence, motion } from 'framer-motion';

type variatnSizeOpen = 'leftSide' | 'rightSide';

interface SidebarProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
    children: ReactNode;
    variant?: variatnSizeOpen;
    overlay?: boolean;
}

export const Sidebar = (props: SidebarProps) => {
    const {
        className,
        isOpen,
        onClose,
        children,
        variant = 'rightSide',
        overlay = true,
    } = props;

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <AnimatePresence>
                {isOpen && (
                    <div
                        className={classNames(cls.rightSidebar, {}, [
                            cls[variant],
                            className,
                        ])}
                    >
                        <Overlay
                            onClick={onClose}
                            className={!overlay ? `${cls.overlayDisabled}` : ''}
                        />
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 350, opacity: 1 }}
                            exit={{
                                opacity: 1,
                                width: 0,
                                transition: {
                                    duration: 0.2,
                                },
                            }}
                            className={classNames(cls.container, {})}
                        >
                            <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    transition: {
                                        delay: 0.2,
                                        duration: 0.2,
                                    },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: {
                                        duration: 0.1,
                                    },
                                }}
                            >
                                {children}
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Portal>
    );
};
