import { memo, useMemo } from 'react';
import cls from './AdminSidebar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import {
    getRouteAdminBrands,
    getRouteAdminProducts,
    getRouteAdminUsers,
} from '@/shared/const/route.ts';
import { useNavigate } from 'react-router-dom';
import { AppLink } from '@/shared/ui/AppLink';

export type idItems = 'brands' | 'products' | 'users' | 'purchases';

interface itemProps {
    id: idItems;
    name: string;
    url: string;
}

interface AdminSidebarProps {
    className?: string;
    activeElement?: idItems;
}

const items: itemProps[] = [
    {
        id: 'brands',
        name: 'Бренды',
        url: getRouteAdminBrands(),
    },
    {
        id: 'products',
        name: 'Продукты',
        url: getRouteAdminProducts(),
    },
    {
        id: 'users',
        name: 'Пользователи',
        url: getRouteAdminUsers(),
    },
];

export const AdminSidebar = memo((props: AdminSidebarProps) => {
    const { className, activeElement } = props;
    const navigate = useNavigate();

    const itemsLinks = useMemo(
        () =>
            items.map((data) => (
                <li
                    key={data.id}
                    className={`${cls.sideBarItem} ${
                        activeElement === data.id ? cls.active : ''
                    }`}
                >
                    <AppLink to={data.url}>{data.name}</AppLink>
                </li>
            )),
        [],
    );

    return (
        <div className={classNames(cls.AdminSidebar, {}, [className])}>
            <h1 className={cls.sidebarTitle}>Категории</h1>
            <ul className={cls.sidebarList}>{itemsLinks}</ul>
        </div>
    );
});
