import { useCallback, useEffect } from 'react';
import {
    DynamicModuleLoader,
    ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader.tsx';
import { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AdminTable } from '@/widgets/AdminTable';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { getUsersData } from '../../model/selectors/getUsersData/getUsersData.ts';
import { getUsersAdminPage } from '../../model/selectors/getUsersAdminPage/getUsersAdminPage.ts';
import {
    adminUsersActions,
    adminUsersReducer,
} from '../../model/slice/adminUsersSlice.ts';
import { fetchUsersAdmin } from '../../model/services/fetchUsersAdmin.ts';
import { getUsersDataMore } from '../../model/selectors/getUsersDataMore/getUsersDataMore.ts';
import { Profile } from '@/entities/Profile';
import { getRouteAdminUserDetails } from '@/shared/const/route.ts';
import {searchUsers} from "@/pages/AdminPages/AdminUsersPage/model/services/searchUsers.ts";
import {
    getUsersAdminIsLoading
} from "../../model/selectors/getUsersAdminIsLoading/getUsersAdminIsLoading.ts";

const reducer: ReducerList = {
    adminUsers: adminUsersReducer,
};

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

export const AdminUsersList = () => {
    const dispatch = useAppDispatch();
    const data = useSelector(getUsersData);
    const brandsPage = useSelector(getUsersAdminPage);
    const hasMore = useSelector(getUsersDataMore);
    const isLoading = useSelector(getUsersAdminIsLoading);
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
        dispatch(searchUsers({query}));
    }, []);

    const detailsNavigate = (id: string) => {
        navigate(getRouteAdminUserDetails(id));
    };

    return (
        <DynamicModuleLoader reducers={reducer}>
            <AdminTable
                data={data || []}
                defaultColumns={defaultColumns}
                isLoading={isLoading}
                page={brandsPage}
                hasMore={hasMore}
                nextPage={nextPage}
                prevPage={prevPage}
                navigateDetails={detailsNavigate}
                searchItems={handleSearchUsers}
            />
        </DynamicModuleLoader>
    );
};
