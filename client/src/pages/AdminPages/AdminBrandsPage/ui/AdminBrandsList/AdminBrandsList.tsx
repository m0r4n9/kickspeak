import { useCallback, useEffect } from 'react';
import {
    DynamicModuleLoader,
    ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader.tsx';
import { fetchBrandsAdmin } from '../../model/services/fetchBrandsAdmin.ts';
import {
    getBrandsAdminData,
    getBrandsAdminHasMore,
    getBrandsAdminPage,
} from '../../model/selectors/adminBrandsSelectors.ts';
import { ColumnDef } from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import { AdminTable } from '@/widgets/AdminTable';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Brand } from '@/entities/Brand';
import { adminBrandActions, adminBrandReducer } from '@/pages/AdminPages/AdminBrandsPage';
import {useNavigate} from "react-router-dom";
import {getRouteAdminBrandDetails} from "@/shared/const/route.ts";

const reducer: ReducerList = {
    adminBrands: adminBrandReducer,
};

const defaultColumns: ColumnDef<Brand>[] = [
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
                accessorKey: 'name',
                header: 'Название',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'country',
                header: 'Страна',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'foundation',
                header: 'Дата основания',
                footer: (props) => props.column.id,
            },
        ],
    },
];

export const AdminBrandsList = () => {
    const dispatch = useAppDispatch();
    const data = useSelector(getBrandsAdminData) || [];
    const brandsPage = useSelector(getBrandsAdminPage);
    const hasMore = useSelector(getBrandsAdminHasMore);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchBrandsAdmin());
    }, [dispatch]);

    const nextPage = useCallback(() => {
        if (!brandsPage) return;
        dispatch(adminBrandActions.setPage(brandsPage + 1));
        dispatch(fetchBrandsAdmin());
    }, [dispatch, brandsPage]);

    const prevPage = useCallback(() => {
        if (brandsPage === 1 || !brandsPage) return;
        dispatch(adminBrandActions.setPage(brandsPage - 1));
        dispatch(fetchBrandsAdmin());
    }, [dispatch, brandsPage]);

    const detailsNavigate = (id: string) => {
        navigate(getRouteAdminBrandDetails(id));
    }

    return (
        <DynamicModuleLoader reducers={reducer} removeAfterUnmount={false}>
            <AdminTable
                data={data}
                defaultColumns={defaultColumns}
                page={brandsPage}
                hasMore={hasMore}
                nextPage={nextPage}
                prevPage={prevPage}
                navigateDetails={detailsNavigate}
            />
        </DynamicModuleLoader>
    );
};
