import { memo, useCallback, useState } from 'react';
import cls from './SortRightSidebar.module.scss';
import { itemsSort } from '@/shared/const/typeOrderSort.ts';
import { Input } from '@/shared/ui/Input';
import { RightSidebar } from '@/shared/ui/RightSidebar';
import { Button } from '@/shared/ui/Button';
import { SortOrder } from '@/entities/Product';
import { ReactComponent as SortIcon } from '@/shared/assets/icons/sort-icon.svg';

interface SortRightSidebarProps {
    onChangeOrder?: (sort: SortOrder) => void;
}

export const SortRightSidebar = memo((props: SortRightSidebarProps) => {
    const { onChangeOrder } = props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const onClose = useCallback(() => {
        setSidebarOpen(false);
    }, []);

    return (
        <>
            <Button variant="clear" onClick={() => setSidebarOpen(true)} className={cls.btn}>
                <SortIcon />
                Сортировка
            </Button>

            {sidebarOpen && (
                <RightSidebar
                    isOpen={sidebarOpen}
                    onClose={onClose}
                    variant="rightSide"
                >
                    <ul>
                        {itemsSort.map((sortType, index) => (
                            <li key={sortType.value}>
                                <Input
                                    id={index.toString()}
                                    type={'radio'}
                                    name="sort-type"
                                    onChange={() =>
                                        onChangeOrder?.(sortType.value)
                                    }
                                />
                                <label htmlFor={index.toString()}>
                                    {sortType.content}
                                </label>
                            </li>
                        ))}
                    </ul>
                </RightSidebar>
            )}
        </>
    );
});
