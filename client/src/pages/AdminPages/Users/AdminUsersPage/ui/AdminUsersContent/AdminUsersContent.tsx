import { memo, useCallback, useEffect } from 'react';
import cls from './AdminUsersContent.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { HStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUsersData } from '../../model/selectors/getUsersData/getUsersData.ts';
import { getUsersAdminPage } from '../../model/selectors/getUsersAdminPage/getUsersAdminPage.ts';
import { fetchUsersAdmin } from '../../model/services/fetchUsersAdmin.ts';
import { getUsersAdminCount } from '../../model/selectors/getUsersAdminCount/getUsersAdminCount.ts';
import {
    getUsersAdminQuery
} from "../../model/selectors/getUsersAdminQuery/getUsersAdminQuery.ts";
import { getUsersAdminLimit } from '../../model/selectors/getUsersAdminLimit/getUsersAdminLimit.ts';
import { adminUsersActions } from '../../model/slice/adminUsersSlice.ts';
import {
    getRouteAdminProductCreate,
    getRouteAdminUserDetails,
} from '@/shared/const/route.ts';
import { AdminPage } from '@/widgets/AdminPage';
import { useAdminTable } from '@/shared/hooks/useAdminTable/useAdminTable.ts';
import { AppLink } from '@/shared/ui/AppLink';

interface AdminUsersContentProps {
    className?: string;
}

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
        editable: false,
        render: (id: string) => (
            <AppLink
                to={getRouteAdminUserDetails(id)}
                style={{ color: 'blue' }}
            >
                {id}
            </AppLink>
        ),
    },
    {
        title: 'Имя пользователя',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        editable: true,
    },
    {
        title: 'Номер телефона',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        width: '20%',
        editable: true,
    },
];

export const AdminUsersContent = memo((props: AdminUsersContentProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const data = useSelector(getUsersData) || [];
    const page = useSelector(getUsersAdminPage) || 1;
    const totalUsers = useSelector(getUsersAdminCount) || 1;
    const limitUsers = useSelector(getUsersAdminLimit);
    const query = useSelector(getUsersAdminQuery) || '';
    const { form, isEditing } = useAdminTable();

    useEffect(() => {
        if (!limitUsers) return;
        dispatch(fetchUsersAdmin());
    }, [limitUsers]);

    const setPage = useCallback((page: number) => {
        dispatch(adminUsersActions.setPage(page));
        dispatch(fetchUsersAdmin());
    }, []);

    const searchUsers = useCallback((query: string) => {
        dispatch(adminUsersActions.setQuery(query));
        dispatch(fetchUsersAdmin());
    }, []);

    return (
        <HStack
            max
            align="start"
            gap="16"
            className={classNames(cls.AdminUsersContent, {}, [className])}
        >
            <AdminPage
                form={form}
                isEditing={isEditing}
                columns={columns}
                data={data}
                totalItems={totalUsers}
                page={page}
                itemsPerPage={limitUsers}
                setPage={setPage}
                query={query}
                search={searchUsers}
                linkToCreate={getRouteAdminProductCreate()}
                entityName="пользователя"
            />
        </HStack>
    );
});
