import { memo, useCallback, useEffect, useState } from 'react';
import cls from './AdminBrandsContent.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import {
    adminBrandActions,
    getBrandsAdminData,
    getBrandsAdminPage,
} from '@/pages/AdminPages/Brands/AdminBrandsPage';
import { getBrandsAdminHasMore } from '@/pages/AdminPages/Brands/AdminBrandsPage/model/selectors/adminBrandsSelectors.ts';
import { useNavigate } from 'react-router-dom';
import { fetchBrandsAdmin } from '@/pages/AdminPages/Brands/AdminBrandsPage/model/services/fetchBrandsAdmin.ts';
import {
    getRouteAdminBrandCreate,
    getRouteAdminBrandDetails,
} from '@/shared/const/route.ts';
import { AdminTable } from '@/widgets/AdminTable';
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Brand } from '@/entities/Brand';
import { AdminRightBar } from '@/widgets/AdminRightBar';
import { HStack } from '@/shared/ui/Stack';

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
    const { className } = props;
    const dispatch = useAppDispatch();
    const data = useSelector(getBrandsAdminData) || [];
    const brandsPage = useSelector(getBrandsAdminPage);
    const hasMore = useSelector(getBrandsAdminHasMore);
    const [columns] = useState(() => [...defaultColumns]);
    const [columnVisibility, setColumnVisibility] = useState({});
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
    };

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

    return (
        <HStack
            max
            align="start"
            gap="16"
            className={classNames(cls.AdminBrandsContent, {}, [className])}
        >
            <AdminTable
                table={table}
                nextPage={nextPage}
                prevPage={prevPage}
                hasMore={hasMore}
                page={brandsPage}
                navigateDetails={detailsNavigate}
            />
            <AdminRightBar
                table={table}
                createRoute={getRouteAdminBrandCreate()}
            />
        </HStack>
    );
});
