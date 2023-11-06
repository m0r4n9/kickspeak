import { ReactNode, useEffect } from 'react';
import cls from './RightSidebar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { useModal } from '@/shared/hooks/useModal';
import { Overlay } from '@/shared/ui/Overlay';
import { Portal } from '@/shared/ui/Portal';

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
    const { isClosing, close } = useModal({
        onClose,
        isOpen,
        animationDelay: 300,
    });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div
                className={classNames(
                    cls.rightSidebar,
                    {
                        [cls.opened]: isOpen,
                    },
                    [cls[variant], className],
                )}
            >
                <Overlay onClick={close} className={cls.overlay} />
                <div
                    className={classNames(cls.container, {
                        [cls.closing]: isClosing,
                    })}
                >
                    {children}
                </div>
            </div>
        </Portal>
    );
};
