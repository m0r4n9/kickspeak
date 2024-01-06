import cls from './CardOverlay.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';

interface CardOverlayProps {
    className?: string;
    hover: boolean;
    height?: number;
}

export const CardOverlay = (props: CardOverlayProps) => {
    const { hover, height, className } = props;

    return (
        <div
            className={classNames(cls.CardOverlay, {}, [className])}
            style={hover ? { height, backgroundColor: 'rgba(0,0,0,.05)' } : {}}
        />
    );
};
