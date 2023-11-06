import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import { FC, ForwardedRef, forwardRef, memo } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';

export type AppLinkVariant = 'primary' | 'primary-40' | 'red';
export type AppLinkHoverVariant = 'block' | 'accent';

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    hoverVariant?: AppLinkHoverVariant;
}

export const AppLink: FC<AppLinkProps> = forwardRef(
    (props: AppLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
        const {
            className,
            to,
            children,
            variant = 'primary',
            ...otherProps
        } = props;

        return (
            <NavLink
                to={to}
                className={classNames(cls.AppLink, {}, [
                    className,
                    cls[variant],
                ])}
                {...otherProps}
                ref={ref}
            >
                {children}
            </NavLink>
        );
    },
);
