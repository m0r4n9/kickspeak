import { ReactNode } from 'react';
import cls from './RightSidebar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { Overlay } from '@/shared/ui/Overlay';
import { Portal } from '@/shared/ui/Portal';
import { AnimatePresence, motion } from 'framer-motion';

type variatnSizeOpen = 'leftSide' | 'rightSide';

interface RightSidebarProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
    children: ReactNode;
    variant?: variatnSizeOpen;
}

export const RightSidebar = (props: RightSidebarProps) => {
    const {
        className,
        isOpen,
        onClose,
        children,
        variant = 'rightSide',
    } = props;

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 500, opacity: 1 }}
                        exit={{
                            opacity: 1,
                            width: 0,
                            transition: {
                                duration: 0.3,
                            },
                        }}
                        className={cls.rightSidebar}
                    >
                        <Overlay onClick={onClose} className={cls.overlay} />
                        <motion.div className={classNames(cls.container, {})}>
                            {children}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Portal>
    );
};
