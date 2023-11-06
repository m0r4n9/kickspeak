import { ReactNode } from 'react';
import cls from './Drawer.module.scss';
import { Portal } from '@/shared/ui/Portal';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { useModal } from '@/shared/hooks/useModal';
import { Button } from '@/shared/ui/Button';
import { ReactComponent as CrossIcon } from '@/shared/assets/icons/cross-icon.svg';

interface DrawerProps {
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Drawer = (props: DrawerProps) => {
    const { children, isOpen, onClose } = props;
    const { isClosing, close } = useModal({
        onClose,
        isOpen,
        animationDelay: 300,
    });

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div
                className={classNames(
                    cls.drawer,
                    {
                        [cls.opened]: isOpen,
                        [cls.closing]: isClosing,
                    },
                    [],
                )}
            >
                <div className={classNames(cls.container, {})}>
                    <div>
                        <Button
                            variant="clear"
                            className={cls.exitBtn}
                            onClick={close}
                        >
                            <CrossIcon />
                        </Button>
                    </div>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
