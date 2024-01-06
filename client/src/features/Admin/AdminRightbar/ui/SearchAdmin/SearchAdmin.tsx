import { memo } from 'react';
import cls from './SearchAdmin.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { Input } from '@/shared/ui/Input';

interface SearchAdminProps {
    className?: string;
    query?: string;
    search?: (query: string) => void;
}

export const SearchAdmin = memo((props: SearchAdminProps) => {
    const { className, search, query } = props;
    
    return (
        <div className={classNames(cls.searchItems, {}, [className])}>
            <Input
                value={query}
                variant="underline"
                onChange={search}
                label="Поиск"
                labelFlex="labelColumn"
            />
        </div>
    );
});
