import cls from './AdminTable.module.scss';
import { Table } from '@tanstack/react-table';
import { TableComponents } from '@/shared/ui/TableComponents';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Pagination } from '@/features/pagination';
import { Loader } from '@/shared/ui/Loader';

interface AdminTableProps<T> {
    table: Table<T>;
    page?: number;
    isLoading?: boolean;
    hasMore?: boolean;
    nextPage?: () => void;
    prevPage?: () => void;
    navigateDetails?: (id: string) => void;
}

export function AdminTable<T>(props: AdminTableProps<T>) {
    const {
        table,
        page,
        hasMore,
        isLoading,
        prevPage,
        nextPage,
        navigateDetails,
    } = props;

    return (
        <VStack justify="between" className={cls.containerTable}>
            {isLoading ? (
                <HStack max justify="center" style={{ marginTop: 50 }}>
                    <Loader />
                </HStack>
            ) : (
                <TableComponents
                    table={table}
                    navigateDetails={navigateDetails}
                />
            )}

            <Pagination
                pageNumber={page}
                hasMore={hasMore}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </VStack>
    );
}
