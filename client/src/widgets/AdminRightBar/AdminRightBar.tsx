import cls from './AdminRightBar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import {
    SearchAdmin,
    ToggleItems,
    CreateEntity,
} from '@/features/Admin/AdminRightbar';
import { Table } from '@tanstack/react-table';
import { VStack } from '@/shared/ui/Stack';

interface AdminRightBarProps<T> {
    className?: string;
    table: Table<T>;
    createRoute: string;
    query?: string;
    search?: (query: string) => void;
    entityName?: string;
}

export function AdminRightBar<T>(props: AdminRightBarProps<T>) {
    const { className, table, createRoute, entityName, query, search } = props;

    return (
        <VStack
            gap="16"
            className={classNames(cls.AdminRightBar, {}, [className])}
        >
            <ToggleItems table={table} />

            <SearchAdmin query={query} search={search} />

            <CreateEntity createRoute={createRoute} entityName={entityName} />
        </VStack>
    );
}
