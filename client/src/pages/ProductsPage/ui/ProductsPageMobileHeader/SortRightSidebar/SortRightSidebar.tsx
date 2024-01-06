import { memo, useCallback, useState } from 'react';
import cls from './SortRightSidebar.module.scss';
import { itemsSort } from '@/shared/const/typeOrderSort.ts';
import { RightSidebar } from '@/shared/ui/RightSidebar';
import { Button } from '@/shared/ui/Button';
import { SortOrder } from '@/entities/Product';
import { ReactComponent as SortIcon } from '@/shared/assets/icons/sort-icon.svg';
import { ListBoxItem } from '@/shared/ui/ListBox/ListBox.tsx';
import { HStack } from '@/shared/ui/Stack';

interface SortRightSidebarProps {
    onChangeOrder?: (sort: SortOrder) => void;
}

export const SortRightSidebar = memo((props: SortRightSidebarProps) => {
    const { onChangeOrder } = props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [value, setValue] = useState<ListBoxItem<SortOrder>>(itemsSort[0]);

    const onClose = useCallback(() => {
        setSidebarOpen(false);
    }, []);

    return (
        <>
            <Button
                variant="clear"
                onClick={() => setSidebarOpen(true)}
                className={cls.btn}
            >
                <SortIcon />
                {value.content}
            </Button>

            {sidebarOpen && (
                <RightSidebar
                    isOpen={sidebarOpen}
                    onClose={onClose}
                    variant="rightSide"
                >
                    <div className={cls.container}>
                        <HStack justify="center" max>
                            <h2>Сортировка</h2>
                        </HStack>
                        <ul className={cls.listSort}>
                            {itemsSort.map((sort) => (
                                <li
                                    key={sort.value}
                                    className={cls.wrapperSort}
                                >
                                    <input
                                        id={sort.content}
                                        type="radio"
                                        name="sort-type"
                                        value={value.value}
                                        onChange={() => {
                                            setValue(sort);
                                            onChangeOrder?.(sort.value);
                                            setSidebarOpen(false)
                                        }}
                                        className={cls.radioBtn}
                                    />
                                    <label
                                        htmlFor={sort.content}
                                        className={cls.filterOptionLabel}
                                    >
                                        {sort.content}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </RightSidebar>
            )}
        </>
    );
});
