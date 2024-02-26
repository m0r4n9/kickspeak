import { memo } from 'react';
import cls from './SearchAdmin.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { Input } from '@/shared/ui/Input';
import { Label } from '@/shared/ui/Label';
import { VStack } from '@/shared/ui/Stack';

interface SearchAdminProps {
    className?: string;
    query?: string;
    search?: (query: string) => void;
}

export const SearchAdmin = memo((props: SearchAdminProps) => {
    const { className, search, query } = props;

    return (
        <VStack
            gap="8"
            className={classNames(cls.searchItems, {}, [className])}
        >
            <Label htmlFor="admin-search">Поиск</Label>
            <Input
                id="admin-search"
                value={query}
                variant="underline"
                onChange={(e) => search?.(e.target.value)}
            />
        </VStack>
    );
});
