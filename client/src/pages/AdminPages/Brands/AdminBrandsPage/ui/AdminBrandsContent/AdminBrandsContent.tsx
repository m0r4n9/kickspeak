import { memo, useCallback, useEffect } from 'react';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import {
    getBrandsAdminData,
    getBrandsAdminPage,
} from '../../model/selectors/adminBrandsSelectors.ts';
import {
    getBrandsAdminHasMore,
    getBrandsAdminQuery,
} from '../../model/selectors/adminBrandsSelectors.ts';
import { adminBrandActions } from '../../model/slice/adminBrandsSlice.ts';
import { fetchBrandsAdmin } from '../../model/services/fetchBrandsAdmin.ts';
import { searchBrands } from '../../model/services/searchBrands.ts';
import {
    getRouteAdminBrandCreate,
    getRouteAdminBrandDetails,
} from '@/shared/const/route.ts';
import { ColumnDef } from '@tanstack/react-table';
import { Brand } from '@/entities/Brand';
import { AdminPage } from '@/widgets/AdminPage';
import { useThrottle } from '@/shared/hooks/useThrottle';

interface AdminBrandsContentProps {
    className?: string;
}

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

export const AdminBrandsContent = memo((props: AdminBrandsContentProps) => {
    const dispatch = useAppDispatch();
    const data = useSelector(getBrandsAdminData) || [];
    const brandsPage = useSelector(getBrandsAdminPage) || 1;
    const hasMore = useSelector(getBrandsAdminHasMore) || false;
    const query = useSelector(getBrandsAdminQuery) || '';

    useEffect(() => {
        dispatch(fetchBrandsAdmin());
    }, []);

    const handleSearchBrands = (query: string) => {
        dispatch(adminBrandActions.setQuery(query));
        dispatch(searchBrands());
    };

    const nextPage = useCallback(() => {
        if (!hasMore) return;
        dispatch(adminBrandActions.setPage(brandsPage + 1));
        dispatch(fetchBrandsAdmin());
    }, [brandsPage, hasMore]);

    const prevPage = useCallback(() => {
        if (brandsPage <= 0) return;
        dispatch(adminBrandActions.setPage(brandsPage - 1));
        dispatch(fetchBrandsAdmin());
    }, [brandsPage]);

    return (
        <AdminPage
            data={data}
            page={brandsPage}
            hasMore={hasMore}
            nextPage={nextPage}
            prevPage={prevPage}
            defaultColumns={defaultColumns}
            query={query}
            entityName="бренд"
            fetchData={fetchBrandsAdmin}
            search={handleSearchBrands}
            linkToDetails={getRouteAdminBrandDetails}
            linkToCreate={getRouteAdminBrandCreate()}
        />
    );
});
