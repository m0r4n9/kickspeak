import React, { memo, ReactNode, useCallback, useState } from 'react';
import cls from './NavbarBurger.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { Button } from '@/shared/ui/Button';
import { RightSidebar } from '@/shared/ui/RightSidebar';
import { HStack, VStack } from '@/shared/ui/Stack';
import { AppLink } from '@/shared/ui/AppLink';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { ReactComponent as BurgerIcon } from '@/shared/assets/icons/burger.svg';
import { ReactComponent as ArrowIcon } from '@/shared/assets/icons/arrow.svg';
import { ItemsCatalogProps } from '../Navbar/Navbar.tsx';

interface NavbarBurgerProps {
    className?: string;
    itemsCatalog: ItemsCatalogProps[];
    onShowModal?: () => void;
    isLoading?: boolean;
    isMatch?: boolean;
    authDataBool?: boolean;
    userIcon?: ReactNode;
}

export const NavbarBurger = memo((props: NavbarBurgerProps) => {
    const {
        className,
        itemsCatalog,
        onShowModal,
        isLoading,
        isMatch,
        userIcon,
        authDataBool,
    } = props;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const onClose = useCallback(() => {
        setSidebarOpen(false);
    }, []);

    return (
        <div className={classNames(cls.NavbarBurger, {}, [className])}>
            <Button
                variant="clear"
                className={cls.toggleButton}
                onClick={() => setSidebarOpen(true)}
            >
                <BurgerIcon />
            </Button>

            {sidebarOpen && (
                <RightSidebar
                    isOpen={sidebarOpen}
                    onClose={onClose}
                    className={cls.wrapperBurger}
                    variant="leftSide"
                >
                    <VStack max align="center" className={cls.burger}>
                        <HStack
                            max
                            justify="center"
                            className={cls.burgerTitle}
                        >
                            <div>каталог</div>
                            <div>{/*Закрыть*/}</div>
                        </HStack>

                        <div className={cls.burgerBody}>
                            <ul className={cls.burgerList}>
                                {itemsCatalog.map((link) => (
                                    <li
                                        key={link.content}
                                        className={cls.item}
                                        onClick={onClose}
                                    >
                                        <AppLink
                                            key={link.content}
                                            to={link.href}
                                        >
                                            <HStack
                                                justify="start"
                                                className={cls.wrapperLink}
                                            >
                                                <div className={cls.icon}>
                                                    <ArrowIcon
                                                        width={7}
                                                        height={12}
                                                    />
                                                </div>
                                                {link.content}
                                            </HStack>
                                        </AppLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {authDataBool ? (
                            <div className={cls.burgerFooter}>
                                <AvatarDropdown isMobile={isMatch} />
                            </div>
                        ) : (
                            <Button
                                variant="clear"
                                onClick={onShowModal}
                                disabled={isLoading}
                                className={cls.wrapperIcon}
                            >
                                {userIcon}
                            </Button>
                        )}
                    </VStack>
                </RightSidebar>
            )}
        </div>
    );
});
