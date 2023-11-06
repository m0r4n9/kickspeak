import { ReactNode, useEffect, useState } from 'react';
import cls from './Popup.module.scss';
import { classNames, Mods } from '@/shared/lib/classNames/classNames.ts';
import { VStack } from '@/shared/ui/Stack';
import { Portal } from '@/shared/ui/Portal';

type bgColor = 'bgGreen' | 'bgRed';

interface PopupProps {
    className?: string;
    title?: string;
    content?: ReactNode;
    bgColor?: bgColor;
}

export const Popup = (props: PopupProps) => {
    const {
        className,
        title,
        content,
        bgColor = 'bgGreen',
    } = props;
    const [open, setOpen] = useState(true);
    const [closing, setIsClosing] = useState(false);

    const onClosing = () => {
        if (open) {
            setIsClosing(true);
            setTimeout(() => {
                setOpen(false);
                setIsClosing(false);
            }, 300);
        }
    };

    useEffect(() => {
        const closePopup = setTimeout(onClosing, 3000);

        return () => {
            clearTimeout(closePopup);
        };
    }, []);

    const mods: Mods = {
        [cls.open]: open,
        [cls.closing]: closing,
    };

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <VStack
                className={classNames(cls.Popup, mods, [
                    className,
                    cls[bgColor],
                ])}
            >
                <div className={cls.wrapperTitle}>
                    <h3>{title}</h3>
                </div>
                <div className={cls.content}>{content}</div>
            </VStack>
        </Portal>
    );
};
