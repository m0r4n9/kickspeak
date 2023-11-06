import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';
import {forwardRef, HTMLAttributes, memo, ReactNode} from 'react';

export type CardVariant = 'normal' | 'clear' | 'white';
export type CardBorder = 'none' | 'normal' | 'top' | 'bottom';
export type CardPadding = '0' | '4' | '8' | '16' | '24';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    fullWidth?: boolean;
    variant?: CardVariant;
    children?: ReactNode;
    padding?: CardPadding;
    border?: CardBorder;
}

const mapPaddingToClass: Record<CardPadding, string> = {
    '0': 'gap_0',
    '4': 'gap_4',
    '8': 'gap_8',
    '16': 'gap_16',
    '24': 'gap_24',
};

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
    const {
        className,
        children,
        fullWidth,
        variant = 'normal',
        padding = '4',
        border = 'normal',
        ...otherProps
    } = props;

    const paddingCls = mapPaddingToClass[padding];

    const mods = {
        [cls.fullWidth]: fullWidth,
    };

    const additionalClasses = [
        className,
        cls[paddingCls],
        cls[variant],
        cls[border],
    ];

    return (
        <div
            {...otherProps}
            ref={ref}
            className={classNames(cls.Card, mods, additionalClasses)}
        >
            {children}
        </div>
    );
});
