import { memo, useCallback, useEffect, useState } from 'react';
import cls from './AdminUsersContent.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { HStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUsersData } from '../../model/selectors/getUsersData/getUsersData.ts';
import { getUsersAdminPage } from '../../model/selectors/getUsersAdminPage/getUsersAdminPage.ts';
import { getUsersDataMore } from '../../model/selectors/getUsersDataMore/getUsersDataMore.ts';
import { getUsersAdminIsLoading } from '../../model/selectors/getUsersAdminIsLoading/getUsersAdminIsLoading.ts';
import { useNavigate } from 'react-router-dom';
import { fetchUsersAdmin } from '../../model/services/fetchUsersAdmin.ts';
import { adminUsersActions } from '../../model/slice/adminUsersSlice.ts';
import { searchUsers } from '../../model/services/searchUsers.ts';
import {
    getRouteAdminUserDetails,
    getRouteMain,
} from '@/shared/const/route.ts';
import { AdminRightBar } from '@/widgets/AdminRightBar';

interface AdminUsersContentProps {
    className?: string;
}
export const AdminUsersContent = memo((props: AdminUsersContentProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const data = useSelector(getUsersData) || [];
    const brandsPage = useSelector(getUsersAdminPage);
    const hasMore = useSelector(getUsersDataMore);
    const isLoading = useSelector(getUsersAdminIsLoading);
    const [columnVisibility, setColumnVisibility] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUsersAdmin());
    }, [dispatch]);

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
            <h1>Тут надо сделать Table</h1>
            <AdminRightBar createRoute={getRouteMain()} />
        </HStack>
    );
});
