import { memo } from 'react';
import cls from './NavbarBurger.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { AppLink } from '@/shared/ui/AppLink';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { ItemsCatalogProps } from '../Navbar/Navbar.tsx';
import { useCycle } from 'framer-motion';
import { Sidebar } from '@/shared/ui/Sidebar';
import { ReactComponent as BurgerIcon } from '@/shared/assets/icons/burger.svg';
import { ReactComponent as CrossIcon } from '@/shared/assets/icons/cross-icon.svg';
import { ReactComponent as ArrowIcon } from '@/shared/assets/icons/arrow.svg';
import { Simulate } from 'react-dom/test-utils';
import toggle = Simulate.toggle;

interface NavbarBurgerProps {
    className?: string;
    isLoading?: boolean;
    itemsCatalog: ItemsCatalogProps[];
    onShowModal: () => void;
    isMatch: boolean;
    authDataBool?: boolean;
}

export const NavbarBurger = memo((props: NavbarBurgerProps) => {
    const {
        className,
        itemsCatalog,
        isLoading,
        isMatch,
        authDataBool,
        onShowModal,
    } = props;
    const [isOpenRightBar, toggleRightBar] = useCycle(false, true);

    return (
        <div className={classNames(cls.NavbarBurger, {}, [className])}>
            <Button
                variant="ghost"
                className={cls.toggleButton}
                onClick={() => {
                    toggleRightBar();
                }}
            >
                <BurgerIcon />
            </Button>

            <Sidebar
                isOpen={isOpenRightBar}
                onClose={toggleRightBar}
                className={cls.wrapperBurger}
                variant="leftSide"
            >
                <div className={cls.burger}>
                    <HStack max justify="center" className={cls.burgerTitle}>
                        <div>каталог</div>
                        <div className={cls.exitBtn}>
                            <Button
                                variant="ghost"
                                onClick={() => toggleRightBar()}
                            >
                                <CrossIcon style={{ width: 16 }} />
                            </Button>
                        </div>
                    </HStack>

                    <div className={cls.burgerBody}>
                        <ul className={cls.burgerList}>
                            {itemsCatalog.map((link) => (
                                <li
                                    key={link.content}
                                    className={cls.item}
                                    onClick={() => toggleRightBar()}
                                >
                                    <AppLink key={link.content} to={link.href}>
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

                    <HStack justify="center" max className={cls.burgerFooter}>
                        {authDataBool ? (
                            <AvatarDropdown isMobile={isMatch} />
                        ) : (
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    toggleRightBar();
                                    onShowModal();
                                }}
                                disabled={isLoading}
                                className={cls.authBtn}
                            >
                                Вход / Регистрация
                            </Button>
                        )}
                    </HStack>
                </div>
            </Sidebar>
        </div>
    );
});
