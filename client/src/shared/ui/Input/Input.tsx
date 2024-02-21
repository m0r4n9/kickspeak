import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { forwardRef, InputHTMLAttributes } from 'react';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'readOnly' | 'size'
>;

type InputVariant = 'clear' | 'underline' | 'border' | 'search';

interface InputProps extends HTMLInputProps {
    className?: string;
    readOnly?: boolean;
    variant?: InputVariant;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        variant = 'clear',
        readOnly = false,
        className,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.readOnly]: readOnly,
    };

    return (
        <input
            ref={ref}
            readOnly={readOnly}
            className={classNames(cls.Input, mods, [className, cls[variant]])}
            {...otherProps}
        />
    );
});

Input.displayName = 'Input';
