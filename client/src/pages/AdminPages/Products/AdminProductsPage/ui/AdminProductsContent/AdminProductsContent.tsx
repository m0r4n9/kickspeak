import { useSelector } from 'react-redux';
import {memo, useCallback, useEffect} from 'react';
import { AdminPage } from '@/widgets/AdminPage';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { getAdminProducts } from '../../model/selectors/getAdminProducts/getAdminProducts.ts';
import { getAdminProductsPage } from '../../model/selectors/getAdminProductsPage/getAdminProductsPage.ts';
import { AdminProductsData } from '../../model/types/AdminProductsSchema.ts';
import { ColumnDef } from '@tanstack/react-table';
import {
    getAdminProductsHasMore
} from "../../model/selectors/getAdminProductsHasMore/getAdminProductsHasMore.ts";
import {adminProductsActions} from "../../model/slice/adminProductsSlice.ts";
import {fetchProductsAdmin} from "../../model/services/fetchProductsAdmin.ts";

interface AdminProductsContentProps {
    className?: string;
}


const defaultColumns: ColumnDef<AdminProductsData>[] = [
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
                accessorKey: 'price',
                header: 'Цена',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'code',
                header: 'Шифр',
                footer: (props) => props.column.id,
            },
        ],
    },
];

export const AdminProductsContent = memo((props: AdminProductsContentProps) => {
    const dispatch = useAppDispatch();
    const products = useSelector(getAdminProducts) || [];
    const page = useSelector(getAdminProductsPage) || 1;
    const hasMore = useSelector(getAdminProductsHasMore) || false;

    const fetchData = useCallback(() => {
        dispatch(fetchProductsAdmin());
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const nextPage = useCallback(() => {
        if (!hasMore) return;
        dispatch(adminProductsActions.setPage(page + 1));
        dispatch(fetchProductsAdmin());
    }, [page, hasMore]);

    const prevPage = useCallback(() => {
        if (page <= 0) return;
        dispatch(adminProductsActions.setPage(page - 1));
        dispatch(fetchProductsAdmin());
    }, [page]);

    return (
        <AdminPage
            data={products}
            defaultColumns={defaultColumns}
            page={page}
            hasMore={hasMore}
            fetchData={fetchData}
            nextPage={nextPage}
            prevPage={prevPage}
            linkToDetails={() => ''}
            linkToCreate={'#'}
            entityName="продукт"
        />
    );
});
