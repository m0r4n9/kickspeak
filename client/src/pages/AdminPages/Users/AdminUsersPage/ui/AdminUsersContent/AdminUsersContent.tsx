import { memo, useCallback, useEffect, useState } from 'react';
import cls from './AdminUsersContent.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { HStack } from '@/shared/ui/Stack';
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Profile } from '@/entities/Profile';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUsersData } from '@/pages/AdminPages/Users/AdminUsersPage/model/selectors/getUsersData/getUsersData.ts';
import { getUsersAdminPage } from '@/pages/AdminPages/Users/AdminUsersPage/model/selectors/getUsersAdminPage/getUsersAdminPage.ts';
import { getUsersDataMore } from '@/pages/AdminPages/Users/AdminUsersPage/model/selectors/getUsersDataMore/getUsersDataMore.ts';
import { getUsersAdminIsLoading } from '@/pages/AdminPages/Users/AdminUsersPage/model/selectors/getUsersAdminIsLoading/getUsersAdminIsLoading.ts';
import { useNavigate } from 'react-router-dom';
import { fetchUsersAdmin } from '@/pages/AdminPages/Users/AdminUsersPage/model/services/fetchUsersAdmin.ts';
import { adminUsersActions } from '@/pages/AdminPages/Users/AdminUsersPage/model/slice/adminUsersSlice.ts';
import { searchUsers } from '@/pages/AdminPages/Users/AdminUsersPage/model/services/searchUsers.ts';
import {
    getRouteAdminUserDetails,
    getRouteMain,
} from '@/shared/const/route.ts';
import { AdminTable } from '@/widgets/AdminTable';
import { AdminRightBar } from '@/widgets/AdminRightBar';

interface AdminUsersContentProps {
    className?: string;
}

const defaultColumns: ColumnDef<Profile>[] = [
    {
        header: 'Главная информация',
        columns: [
            {
                accessorKey: 'id',
                header: 'id',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'email',
                header: 'Почта',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'name',
                header: 'Имя',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'phoneNumber',
                header: 'Номер телефона',
                footer: (props) => props.column.id,
            },
        ],
    },
];

export const AdminUsersContent = memo((props: AdminUsersContentProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const data = useSelector(getUsersData) || [];
    const brandsPage = useSelector(getUsersAdminPage);
    const hasMore = useSelector(getUsersDataMore);
    const isLoading = useSelector(getUsersAdminIsLoading);
    const [columns] = useState(() => [...defaultColumns]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUsersAdmin());
    }, [dispatch]);

    let table = useReactTable({
        data,
        columns,
        state: {
            columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        debugTable: false,
        debugHeaders: false,
        debugColumns: false,
    });

    const nextPage = useCallback(() => {
        if (!brandsPage) return;
        dispatch(adminUsersActions.setPage(brandsPage + 1));
        dispatch(fetchUsersAdmin());
    }, [dispatch, brandsPage]);

    const prevPage = useCallback(() => {
        if (brandsPage === 1 || !brandsPage) return;
        dispatch(adminUsersActions.setPage(brandsPage - 1));
        dispatch(fetchUsersAdmin());
    }, [dispatch, brandsPage]);

    const handleSearchUsers = useCallback((query: string) => {
        dispatch(adminUsersActions.setQuery(query));
        dispatch(searchUsers({ query }));
    }, []);

    const detailsNavigate = (id: string) => {
        navigate(getRouteAdminUserDetails(id));
    };

    return (
        <HStack
            max
            align="start"
            gap="16"
            className={classNames(cls.AdminUsersContent, {}, [className])}
        >
            <AdminTable table={table} navigateDetails={detailsNavigate} />
            <AdminRightBar table={table} createRoute={getRouteMain()} />
        </HStack>
    );
});
