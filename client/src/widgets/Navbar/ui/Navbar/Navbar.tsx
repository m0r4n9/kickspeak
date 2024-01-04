import { classNames } from '@/shared/lib/classNames/classNames.ts';
import cls from './Navbar.module.scss';
import { memo, useCallback, useState } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import {
    getRouteBrands,
    getRouteCatalog,
    getRouteMain,
} from '@/shared/const/route.ts';
import { getUserAuthData, getUserIsLoading } from '@/entities/User';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { Cart } from '@/entities/Cart';
import { LoginModal } from '@/features/Auth/AuthUser';
import { SearchBar } from '@/features/Search';
import { useIsMath } from '@/shared/hooks/useIsMath';
import { NavbarBurger } from '../NavbarBurger/NavbarBurger.tsx';
import { useSelector } from 'react-redux';
import { Button } from '@/shared/ui/Button';
import { AppLink } from '@/shared/ui/AppLink';
import { ReactComponent as UserIcon } from '@/shared/assets/icons/user-icon-m.svg';
import { ReactComponent as StarIcon } from '@/shared/assets/icons/star-icon-m.svg';

export interface ItemsCatalogProps {
    content: string;
    href: string;
}

interface NavbarProps {
    className?: string;
}

const itemsCatalog: ItemsCatalogProps[] = [
    {
        content: 'Новинки',
        href: getRouteMain(),
    },
    {
        content: 'Бренды',
        href: getRouteBrands(),
    },
    {
        content: 'Каталог',
        href: getRouteCatalog(),
    },
];

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;
    const [isAuthModal, setIsAuthModal] = useState(false);
    const { isMatch } = useIsMath();
    const authData = useSelector(getUserAuthData);
    const isLoading = useSelector(getUserIsLoading);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <HStack
                max
                justify="between"
                align="center"
                className={cls.wrapper}
            >
                <NavbarBurger
                    authDataBool={Boolean(authData)}
                    isLoading={isLoading}
                    isMatch={isMatch}
                    itemsCatalog={itemsCatalog}
                    onShowModal={onShowModal}
                    userIcon={<UserIcon />}
                />
                <div className={cls.logo}>
                    <AppLink to={getRouteMain()}>KickLogo</AppLink>
                </div>

                <div className={cls.headerMain}>
                    <nav style={isMatch ? { display: 'none' } : {}}>
                        <HStack max align="center">
                            {itemsCatalog.map((link) => (
                                <AppLink key={link.content} to={link.href}>
                                    <VStack
                                        justify="center"
                                        className={cls.wrapperLink}
                                    >
                                        {link.content}
                                    </VStack>
                                </AppLink>
                            ))}
                        </HStack>
                    </nav>
                </div>

                <HStack justify="end" className={cls.headerActions}>
                    <HStack className={cls.wrapperIcon} justify="center">
                        <AppLink to={'/'}>
                            <StarIcon className={cls.icon} />
                        </AppLink>
                    </HStack>

                    {/* SEARCH */}
                    <SearchBar
                        className={cls.wrapperIcon}
                        iconStyle={cls.icon}
                    />
                    {/* CART */}
                    <Cart className={cls.wrapperIcon} />

                    {!isMatch &&
                        (authData ? (
                            <AvatarDropdown className={cls.wrapperIcon} />
                        ) : (
                            <Button
                                variant="clear"
                                onClick={onShowModal}
                                disabled={isLoading}
                                className={cls.wrapperIcon}
                            >
                                <UserIcon />
                            </Button>
                        ))}
                </HStack>
            </HStack>
            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            )}
        </header>
    );
});

Navbar.displayName = "Navbar";