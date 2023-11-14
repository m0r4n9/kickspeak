import { memo, useEffect, useState } from 'react';
import cls from './AdminPage.module.scss';
import { useNavigate } from 'react-router-dom';
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { HStack } from '@/shared/ui/Stack';
import { AdminTable } from '@/widgets/AdminTable';
import { AdminRightBar } from '@/widgets/AdminRightBar';

interface AdminPageProps<T> {
    data: T[];
    defaultColumns: ColumnDef<any>[];
    page: number;
    query?: string;
    hasMore: boolean;
    linkToCreate: string;
    entityName?: string;

    nextPage: () => void;
    prevPage: () => void;
    fetchData: () => void;
    linkToDetails: (id: string) => string;
    search?: (query: string) => void;
}

function AdminPageGeneric<T>(props: AdminPageProps<T>) {
    const {
        data,
        page,
        hasMore,
        query,
        linkToCreate,
        entityName,
        defaultColumns,
        nextPage,
        prevPage,
        fetchData,
        linkToDetails,
        search,
    } = props;
    const [columns] = useState(() => [...defaultColumns]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const detailsNavigate = (id: string) => {
        navigate(linkToDetails(id));
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
        <HStack max align="start" gap="16" className={cls.AdminBrandsContent}>
            <AdminTable
                table={table}
                hasMore={hasMore}
                page={page}
                nextPage={nextPage}
                prevPage={prevPage}
                navigateDetails={detailsNavigate}
            />
            <AdminRightBar
                table={table}
                query={query}
                search={search}
                createRoute={linkToCreate}
                entityName={entityName}
            />
        </HStack>
    );
}

export const AdminPage = memo(AdminPageGeneric);
