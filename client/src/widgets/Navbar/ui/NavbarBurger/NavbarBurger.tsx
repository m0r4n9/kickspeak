import { memo, ReactNode } from 'react';
import cls from './NavbarBurger.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { Button } from '@/shared/ui/Button';
import { RightSidebar } from '@/shared/ui/RightSidebar';
import { HStack } from '@/shared/ui/Stack';
import { AppLink } from '@/shared/ui/AppLink';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { ReactComponent as BurgerIcon } from '@/shared/assets/icons/burger.svg';
import { ReactComponent as ArrowIcon } from '@/shared/assets/icons/arrow.svg';
import { ItemsCatalogProps } from '../Navbar/Navbar.tsx';
import { motion, useCycle } from 'framer-motion';
import { ReactComponent as CrossIcon } from '@/shared/assets/icons/cross-icon.svg';

interface NavbarBurgerProps {
    className?: string;
    itemsCatalog: ItemsCatalogProps[];
    onShowModal?: () => void;
    isLoading?: boolean;
    isMatch?: boolean;
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
                variant="clear"
                className={cls.toggleButton}
                onClick={() => {
                    toggleRightBar();
                }}
            >
                <BurgerIcon />
            </Button>

            <RightSidebar
                isOpen={isOpenRightBar}
                onClose={toggleRightBar}
                className={cls.wrapperBurger}
                variant="leftSide"
            >
                <motion.div
                    className={cls.burger}
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            delay: 0.2,
                            duration: 0.3,
                        },
                    }}
                    exit={{
                        opacity: 0,
                        transition: {
                            duration: 0.1,
                        },
                    }}
                >
                    <HStack max justify="center" className={cls.burgerTitle}>
                        <div>каталог</div>
                        <div className={cls.exitBtn}>
                            <Button
                                variant="clear"
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
                                variant="clear"
                                onClick={onShowModal}
                                disabled={isLoading}
                                className={cls.authBtn}
                            >
                                Вход / Регистрация
                            </Button>
                        )}
                    </HStack>
                </motion.div>
            </RightSidebar>
        </div>
    );
});
