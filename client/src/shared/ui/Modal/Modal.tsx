import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { memo, ReactNode } from 'react';
import { Portal } from '@/shared/ui/Portal';
import { Overlay } from '@/shared/ui/Overlay';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

export const Modal = memo((props: ModalProps) => {
    const { className, children, isOpen, onClose, lazy } = props;

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                            zIndex: 100,
                            transition: {
                                duration: 0.3,
                            },
                        }}
                        exit={{
                            opacity: 0,
                            transition: {
                                duration: 0.3,
                            },
                        }}
                        className={classNames(cls.Modal, {}, [
                            className,
                            'app_modal',
                        ])}
                    >
                        <Overlay onClick={onClose} />
                        <div className={cls.content}>{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Portal>
    );
});
