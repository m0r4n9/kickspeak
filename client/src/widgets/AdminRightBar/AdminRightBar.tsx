import cls from './AdminRightBar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import {
    SearchAdmin,
    CreateEntity,
} from '@/features/Admin/AdminRightbar';
import { VStack } from '@/shared/ui/Stack';

interface AdminRightBarProps<T> {
    className?: string;
    createRoute: string;
    query?: string;
    search?: (query: string) => void;
    entityName?: string;
}

export function AdminRightBar<T>(props: AdminRightBarProps<T>) {
    const { className, createRoute, entityName, query, search } = props;

    return (
        <VStack
            gap="16"
            className={classNames(cls.AdminRightBar, {}, [className])}
        >
            <SearchAdmin query={query} search={search} />

            <CreateEntity createRoute={createRoute} entityName={entityName} />
        </VStack>
    );
}
