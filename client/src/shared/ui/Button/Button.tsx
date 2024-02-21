import {
    ButtonHTMLAttributes,
    FC,
    ForwardedRef,
    forwardRef,
    ReactNode,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames.ts';
import cls from './Button.module.scss';

export type ButtonVariant = 'ghost' | 'card' | 'black' | 'border';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children?: ReactNode;
    variant?: ButtonVariant;
    fullWidth?: boolean;
    disabled?: boolean;
    width?: number | string;
    height?: number | string;
}

export const Button: FC<ButtonProps> = forwardRef(
    (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const {
            children,
            variant = 'ghost',
            width,
            disabled,
            fullWidth,
            height,
            className,
            ...otherProps
        } = props;

        const mods: Mods = {
            [cls.disabled]: disabled,
            [cls.fullWidth]: fullWidth,
        };

        return (
            <button
                disabled={disabled}
                className={classNames(cls.Button, mods, [
                    className,
                    cls[variant],
                ])}
                style={{
                    width,
                    height,
                }}
                {...otherProps}
                ref={ref}
            >
                {children}
            </button>
        );
    },
);
