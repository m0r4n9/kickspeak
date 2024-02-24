import { Fragment, ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import cls from './DropdownMenu.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { AppLink } from '@/shared/ui/AppLink';

export interface DropdownItem {
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
    disabled?: boolean;
    redColor?: boolean;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
}

export function DropdownMenu(props: DropdownProps) {
    const { className, trigger, items } = props;

    const menuClasses = [cls.menu];

    return (
        <Menu
            as="div"
            className={classNames(cls.Dropdown, {}, [className, cls.popup])}
        >
            <Menu.Button className={cls.trigger}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                {items.map((item, index) => {
                    const content = (
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(cls.item, {
                                [cls.redColor]: item.redColor,
                            })}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                                key={`dropdown-key-${index}`}
                            >
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item
                            key={`dropdown-key-${index}`}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
}
