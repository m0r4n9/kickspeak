import { ImgHTMLAttributes, memo } from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
}

export const AppImage = memo((props: AppImageProps) => {
    const { className, src, alt, ...otherProps } = props;

    return <img src={src} alt={alt} className={className} {...otherProps} />;
});
