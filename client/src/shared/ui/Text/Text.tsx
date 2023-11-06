import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';
import { memo } from 'react';

export type TextColor =
    | 'primary05'
    | 'primary10'
    | 'primary40'
    | 'primary80'
    | 'normal'
    | 'error';
export type TextAlign = 'left' | 'center' | 'right';
export type TextSize = 's' | 'm' | 'l';
type HeaderTagType = 'h1' | 'h2' | 'h3';

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    align?: TextAlign;
    color?: TextColor;
    size?: TextSize;
    bold?: boolean;
}

const mapSizeToClass: Record<TextSize, string> = {
    s: cls.size_s,
    m: cls.size_m,
    l: cls.size_l,
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
};

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        size = 'm',
        align = 'left',
        title,
        bold,
        color = 'normal',
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];
    const sizeText = mapSizeToClass[size];

    const additionalClasses = [
        className,
        sizeText,
        cls[color],
        cls[align],
    ];

    return (
        <div
            className={classNames(
                cls.Text,
                { [cls.bold]: bold },
                additionalClasses,
            )}
        >
            {title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});
