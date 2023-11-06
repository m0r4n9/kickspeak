import {useEffect, useState} from 'react';
import cls from './AdminTable.module.scss';
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {ToggleItems} from '@/features/adminPanelFilters';
import {TableComponents} from '@/shared/ui/TableComponents';
import {HStack, VStack} from '@/shared/ui/Stack';
import {Pagination} from '@/features/pagination';
import {Loader} from "@/shared/ui/Loader";

interface AdminTableProps<T> {
    data: T[];
    defaultColumns: ColumnDef<T>[];
    page?: number;
    isLoading?: boolean;
    hasMore?: boolean;
    nextPage?: () => void;
    prevPage?: () => void;
    navigateDetails?: (id: string) => void;
    query?: string;
    searchItems?: (query: string) => void;
}

export function AdminTable<T>(props: AdminTableProps<T>) {
    const {
        data,
        defaultColumns,
        page,
        hasMore,
        isLoading,
        query,
        prevPage,
        nextPage,
        navigateDetails,
        searchItems,
    } = props;
    const [columns] = useState(() => [...defaultColumns]);
    const [columnVisibility, setColumnVisibility] = useState({});

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
        <>
            <VStack justify="between" className={cls.containerTable}>
                {isLoading ? (<HStack max justify="center" style={{marginTop: 50}}>
                    <Loader/>
                </HStack>) : (<TableComponents
                    table={table}
                    navigateDetails={navigateDetails}
                />)}

                <Pagination
                    pageNumber={page}
                    hasMore={hasMore}
                    nextPage={nextPage}
                    prevPage={prevPage}
                />
            </VStack>

            <div className={cls.filters}>
                <ToggleItems
                    table={table}
                    query={query}
                    searchItems={searchItems}
                />
            </div>
        </>
    );
}
