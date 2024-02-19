import cls from './AvatarDrawer.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Drawer } from '@/shared/ui/Drawer/Drawer.tsx';
import { DropdownItem } from '@/shared/ui/DropdownMenu/DropdownMenu';
import { AppLink } from '@/shared/ui/AppLink';
import { Button } from '@/shared/ui/Button';
import { ReactComponent as UserIcon } from '@/shared/assets/icons/user-icon-m.svg';
import { useCycle } from 'framer-motion';

interface AvatarDrawerProps {
    links?: DropdownItem[];
    userEmail?: string;
    onLogout?: () => void;
}

export const AvatarDrawer = (props: AvatarDrawerProps) => {
    const { links, userEmail, onLogout } = props;
    const [isOpenDrawer, toggleDrawer] = useCycle(false, true);

    return (
        <div>
            <Button variant="clear" onClick={() => toggleDrawer()}>
                <HStack align="center" gap="8">
                    <UserIcon className={cls.userIconBurger} />
                    {userEmail}
                </HStack>
            </Button>

            <Drawer isOpen={isOpenDrawer} onClose={toggleDrawer}>
                <VStack
                    max
                    justify="start"
                    align="center"
                    className={cls.drawerContent}
                >
                    <ul className={cls.drawerList}>
                        {links?.map((link, index) => {
                            if (link.href) {
                                return (
                                    <li
                                        key={index}
                                        className={cls.item}
                                        onClick={() => toggleDrawer()}
                                    >
                                        <AppLink to={link.href}>
                                            <div className={cls.content}>
                                                {link.content}
                                            </div>
                                        </AppLink>
                                    </li>
                                );
                            }

                            return (
                                <Button
                                    key={index}
                                    onClick={onLogout}
                                    className={`${cls.redColor} ${cls.item} ${cls.content}`}
                                    variant="clear"
                                >
                                    {link.content}
                                </Button>
                            );
                        })}
                    </ul>
                </VStack>
            </Drawer>
        </div>
    );
};
