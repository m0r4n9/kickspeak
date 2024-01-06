import { memo } from 'react';
import cls from './SortRightSidebar.module.scss';
import { itemsSort } from '@/shared/const/typeOrderSort.ts';
import { Input } from '@/shared/ui/Input';
import { RightSidebar } from '@/shared/ui/RightSidebar';
import { Button } from '@/shared/ui/Button';
import { SortOrder } from '@/entities/Product';
import { ReactComponent as SortIcon } from '@/shared/assets/icons/sort-icon.svg';
import { useCycle } from 'framer-motion';

interface SortRightSidebarProps {
    onChangeOrder?: (sort: SortOrder) => void;
}

export const SortRightSidebar = memo((props: SortRightSidebarProps) => {
    const { onChangeOrder } = props;
    const [isOpen, cycleOpen] = useCycle(false, true);

    return (
        <>
            <Button
                variant="clear"
                onClick={() => cycleOpen()}
                className={cls.btn}
            >
                <SortIcon />
                Сортировка
            </Button>

            <RightSidebar
                isOpen={isOpen}
                onClose={cycleOpen}
                variant="rightSide"
            >
                <ul>
                    {itemsSort.map((sortType, index) => (
                        <li key={sortType.value}>
                            <Input
                                id={index.toString()}
                                type={'radio'}
                                name="sort-type"
                                onChange={() => onChangeOrder?.(sortType.value)}
                            />
                            <label htmlFor={index.toString()}>
                                {sortType.content}
                            </label>
                        </li>
                    ))}
                </ul>
            </RightSidebar>
        </>
    );
});