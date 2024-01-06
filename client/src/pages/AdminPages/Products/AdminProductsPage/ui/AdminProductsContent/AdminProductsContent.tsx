import { useSelector } from 'react-redux';
import { memo, useCallback, useEffect } from 'react';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { getAdminProducts } from '../../model/selectors/getAdminProducts/getAdminProducts.ts';
import { getAdminProductsPage } from '../../model/selectors/getAdminProductsPage/getAdminProductsPage.ts';
import { getAdminProductsTotal } from '../../model/selectors/getAdminProductsTotal/getAdminProductsTotal.ts';
import { adminProductsActions } from '../../model/slice/adminProductsSlice.ts';
import { fetchProductsAdmin } from '../../model/services/fetchProductsAdmin.ts';
import { getAdminProductsLimit } from '../../model/selectors/getAdminProductsLimit/getAdminProductsLimit.ts';
import { AdminPage } from '@/widgets/AdminPage';
import { AppLink } from '@/shared/ui/AppLink';
import {
    getRouteAdminProductCreate,
    getRouteAdminProductDetails,
} from '@/shared/const/route.ts';
import { Popconfirm, Typography } from 'antd';
import { Product } from '@/entities/Product';
import { useAdminTable } from '@/shared/hooks/useAdminTable/useAdminTable.ts';
import { $api } from '@/shared/api';
import { getAdminProductsQuery } from '../../model/selectors/getAdminProductsQuery/getAdminProductsQuery.ts';
import {
    getAdminProductsIsLoading
} from "@/pages/AdminPages/Products/AdminProductsPage/model/selectors/getAdminProductsIsLoading/getAdminProductsIsLoading.ts";

interface AdminProductsContentProps {
    className?: string;
}

export const AdminProductsContent = memo((props: AdminProductsContentProps) => {
    const dispatch = useAppDispatch();
    const products = useSelector(getAdminProducts) || [];
    const isLoading = useSelector(getAdminProductsIsLoading) || false;
    const page = useSelector(getAdminProductsPage) || 1;
    const totalProducts = useSelector(getAdminProductsTotal) || 1;
    const limitProductPage = useSelector(getAdminProductsLimit);
    const querySearch = useSelector(getAdminProductsQuery);
    const { form, editingKey, setEditingKey, isEditing, cancel, edit } =
        useAdminTable();

    useEffect(() => {
        if (!limitProductPage) return;
        dispatch(fetchProductsAdmin());
    }, [limitProductPage]);

    const setPage = useCallback((page: number) => {
        dispatch(adminProductsActions.setPage(page));
        dispatch(fetchProductsAdmin());
    }, []);

    const setQuery = useCallback((value: string) => {
        dispatch(adminProductsActions.setQuery(value));
        dispatch(fetchProductsAdmin());
    }, []);

    const updateProduct = async () => {
        try {
            const data = form.getFieldsValue();
            await $api.put('/admin/product/update/' + editingKey, { data });
            setEditingKey('');
            dispatch(fetchProductsAdmin());
        } catch (e) {
            console.log(e);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            editable: false,
            render: (id: string) => (
                <AppLink
                    to={getRouteAdminProductDetails(id)}
                    style={{ color: 'blue' }}
                >
                    {id}
                </AppLink>
            ),
        },
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            editable: true,
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
            width: '20%',
            editable: true,
        },
        {
            title: 'Код',
            dataIndex: 'code',
            key: 'code',
            width: '20%',
            editable: true,
        },
        {
            title: '',
            width: '10%',
            dataIndex: 'operation',
            render: (_: any, record: Product) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={updateProduct}
                            style={{ marginRight: 8 }}
                        >
                            Сохранить
                        </Typography.Link>
                        <Popconfirm title="Отменить?" onConfirm={cancel}>
                            <a>Отмена</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link
                        disabled={editingKey !== ''}
                        onClick={() => edit(record)}
                    >
                        Изменить
                    </Typography.Link>
                );
            },
        },
    ];

    return (
        <AdminPage
            form={form}
            isLoading={isLoading}
            isEditing={isEditing}
            columns={columns}
            data={products}
            totalItems={totalProducts}
            page={page}
            itemsPerPage={limitProductPage}
            setPage={setPage}
            linkToCreate={getRouteAdminProductCreate()}
            query={querySearch}
            search={setQuery}
            entityName="продукт"
        />
    );
});
