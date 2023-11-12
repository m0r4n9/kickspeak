import { ImgHTMLAttributes, memo } from 'react';
import { IMG_BASE_URL } from '@/shared/api/api.ts';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    serverImages?: boolean;
}

export const AppImage = memo((props: AppImageProps) => {
    const { className, src, serverImages, alt, ...otherProps } = props;

    if (!src) {
        return;
    }

    return (
        <img
            src={serverImages ? IMG_BASE_URL + src : src}
            alt={alt}
            className={className}
            {...otherProps}
        />
    );
});
