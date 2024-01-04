import { memo, useCallback, useEffect } from 'react';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import {
    getBrandsAdminData,
    getBrandsAdminLimit,
    getBrandsAdminPage,
    getBrandsAdminQuery,
    getBrandsAdminSortParams,
    getBrandsCount,
} from '../../model/selectors/adminBrandsSelectors.ts';
import { adminBrandActions } from '../../model/slice/adminBrandsSlice.ts';
import { fetchBrandsAdmin } from '../../model/services/fetchBrandsAdmin.ts';
import { searchBrands } from '../../model/services/searchBrands.ts';
import {
    getRouteAdminBrandCreate,
    getRouteAdminBrandDetails,
} from '@/shared/const/route.ts';
import { AdminPage } from '@/widgets/AdminPage';
import { AppLink } from '@/shared/ui/AppLink';
import { Brand } from '@/entities/Brand';
import { Popconfirm, Typography } from 'antd';
import { useAdminTable } from '@/shared/hooks/useAdminTable/useAdminTable.ts';
import { $api } from '@/shared/api';

interface AdminBrandsContentProps {
    className?: string;
}

export const AdminBrandsContent = memo((props: AdminBrandsContentProps) => {
    const dispatch = useAppDispatch();
    const data = useSelector(getBrandsAdminData) || [];
    const brandsPage = useSelector(getBrandsAdminPage) || 1;
    const itemPerPage = useSelector(getBrandsAdminLimit);
    const totalItems = useSelector(getBrandsCount) || 1;
    const query = useSelector(getBrandsAdminQuery) || '';
    const { form, editingKey, setEditingKey, isEditing, cancel, edit } =
        useAdminTable();

    useEffect(() => {
        if (!itemPerPage) return;
        dispatch(fetchBrandsAdmin());
    }, [itemPerPage]);

    const updateBrandList = useCallback(() => {
        dispatch(fetchBrandsAdmin());
    }, []);

    const handleSearchBrands = (query: string) => {
        dispatch(adminBrandActions.setQuery(query));
        dispatch(searchBrands());
    };

    const setPage = useCallback(
        (page: number) => {
            dispatch(adminBrandActions.setPage(page));
            dispatch(fetchBrandsAdmin());
        },
        [brandsPage],
    );

    const updateItem = async () => {
        try {
            const data = form.getFieldsValue();
            const response = await $api.put(
                '/admin/brand/update/' + editingKey,
                {
                    brand: data,
                },
            );
            updateBrandList();
            setEditingKey('');
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
                    to={getRouteAdminBrandDetails(id)}
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
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        },
        {
            title: 'Страна',
            dataIndex: 'country',
            key: 'country',
            width: '20%',
            editable: true,
        },
        {
            title: 'Дата основания',
            dataIndex: 'foundation',
            key: 'foundation',
            width: '20%',
            editable: true,
        },
        {
            title: '',
            width: '10%',
            dataIndex: 'operation',
            render: (_: any, record: Brand) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={updateItem}
                            style={{ marginRight: 8 }}
                        >
                            Сохранить
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
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
            data={data}
            page={brandsPage}
            columns={columns}
            form={form}
            isEditing={isEditing}
            itemsPerPage={itemPerPage}
            totalItems={totalItems}
            setPage={setPage}
            query={query}
            entityName="бренд"
            search={handleSearchBrands}
            linkToCreate={getRouteAdminBrandCreate()}
        />
    );
});
