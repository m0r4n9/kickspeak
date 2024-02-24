import { ReactNode } from 'react';
import cls from './Drawer.module.scss';
import { Portal } from '@/shared/ui/Portal';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { Button } from '@/shared/ui/Button';
import { ReactComponent as CrossIcon } from '@/shared/assets/icons/cross-icon.svg';
import { AnimatePresence, motion } from 'framer-motion';

interface DrawerProps {
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Drawer = (props: DrawerProps) => {
    const { children, isOpen, onClose } = props;

    return (
        <AnimatePresence>
            {isOpen && (
                <Portal
                    element={document.getElementById('app') ?? document.body}
                >
                    <motion.div
                        initial={{
                            y: 200,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                            },
                        }}
                        exit={{
                            y: 200,
                            opacity: 0,
                            transition: {
                                duration: 0.3,
                            },
                        }}
                        className={classNames(cls.drawer, {}, [])}
                    >
                        <div className={classNames(cls.container, {})}>
                            <div>
                                <Button
                                    variant="ghost"
                                    className={cls.exitBtn}
                                    onClick={onClose}
                                >
                                    <CrossIcon />
                                </Button>
                            </div>
                            {children}
                        </div>
                    </motion.div>
                </Portal>
            )}
        </AnimatePresence>
    );
};
