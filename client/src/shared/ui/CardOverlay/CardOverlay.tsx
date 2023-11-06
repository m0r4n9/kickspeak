import cls from './CardOverlay.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { useIsMath } from '@/shared/hooks/useIsMath';

interface CardOverlayProps {
    className?: string;
    hover: boolean;
    height?: number;
    isMobile?: boolean;
}

export const CardOverlay = (props: CardOverlayProps) => {
    const { hover, height, isMobile, className } = props;


    if (!height || isMobile) {
        return;
    }

    return (
        <div
            className={classNames(cls.CardOverlay, {}, [className])}
            style={hover ? { height, backgroundColor: 'rgba(0,0,0,.05)' } : {}}
        />
    );
};
