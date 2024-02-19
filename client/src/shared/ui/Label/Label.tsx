import { LabelHTMLAttributes, ReactNode } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    className?: string;
    children: ReactNode;
}

export const Label = (props: LabelProps) => {
    const { children, ...otherProps } = props;

    return <label {...otherProps}>{children}</label>;
};

Label.displayName = 'Label';
