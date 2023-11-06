import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readonly' | 'size'
>;

type InputVariant = 'clear' | 'underline' | 'border' | 'search';
type LabelFlexVariant = 'labelRow' | 'labelColumn';

interface InputProps extends HTMLInputProps {
    className?: string;
    variant?: InputVariant;
    labelFlex?: LabelFlexVariant;
    value?: string | number;
    label?: string;
    onChange?: (value: string) => void;
    autoFocus?: boolean;
    fullWidth?: boolean;
    readonly?: boolean;

}

export const Input = (props: InputProps) => {
    const {
        value,
        variant = 'clear',
        labelFlex = 'labelRow',
        type = 'text',
        fullWidth = false,
        autoFocus,
        label,
        placeholder,
        readonly,
        className,
        onChange,
        ...otherProps
    } = props;
    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    useEffect(() => {
        if (autoFocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autoFocus]);

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
        [cls.fullWidth]: fullWidth,
    };

    const input = (
        <input
            ref={ref}
            type={type}
            value={value}
            onChange={onChangeHandler}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly={readonly}
            placeholder={placeholder}
            className={classNames(cls.Input, mods, [className, cls[variant]])}
            {...otherProps}
        />
    );

    if (label) {
        return (
            <label
                className={classNames(
                    cls.label,
                    { [cls.fullWidth]: fullWidth },
                    [cls[labelFlex]],
                )}
            >
                {label}
                {input}
            </label>
        );
    }

    return input;
};
