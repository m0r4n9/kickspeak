import { memo, useCallback } from 'react';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { getUserAuthData, userActions } from '@/entities/User';
import { useSelector } from 'react-redux';
import {
    getRouteMain,
    getRouteProfile,
    getRouteWishList,
} from '@/shared/const/route.ts';
import { DropdownItem, DropdownMenu } from '@/shared/ui/DropdownMenu';
import { AvatarDrawer } from '../AvatarDrawer/AvatarDrawer.tsx';
import { cartActions } from '@/entities/Cart';
import { ReactComponent as UserIcon } from '@/shared/assets/icons/user-icon-m.svg';

interface AvatarDropdownProps {
    className?: string;
    isMobile?: boolean;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className, isMobile = false } = props;
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
        dispatch(cartActions.clearCart());
    }, [dispatch]);

    const links: DropdownItem[] = [
        {
            content: authData?.email,
            href: getRouteProfile(),
        },
        {
            content: 'Заказы',
            href: getRouteMain(),
        },
        {
            content: 'Избранное',
            href: getRouteWishList(),
        },
        {
            content: 'Выйти из аккаунта',
            redColor: true,
            onClick: onLogout,
        },
    ];

    if (isMobile) {
        return (
            <AvatarDrawer
                links={links}
                onLogout={onLogout}
                userEmail={authData?.email}
            />
        );
    }

    return (
        <DropdownMenu
            items={links}
            className={className}
            trigger={<UserIcon />}
        />
    );
});
