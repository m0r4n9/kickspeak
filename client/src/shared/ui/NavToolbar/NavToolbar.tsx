import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NavToolbar.module.scss';
import { memo } from 'react';
import { AppLink } from '@/shared/ui/AppLink';

export interface NavLinkToolbar {
    content: string;
    href: string;
}

interface NavToolbarProps {
    className?: string;
    links: NavLinkToolbar[];
}

export const NavToolbar = memo((props: NavToolbarProps) => {
    const { className, links } = props;

    return (
        <div className={classNames(cls.NavToolbar, {}, [className])}>
            <div className={cls.wrapperNavList}>
                <ul className={cls.navList}>
                    {links.map((link) => (
                        <li key={link.content} className={cls.navListItem}>
                            <AppLink to={link.href} variant="primary-40">
                                {link.content}
                            </AppLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
});
