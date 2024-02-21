import { memo, useState } from 'react';
import cls from './SortRightSidebar.module.scss';
import { itemsSort } from '@/shared/const/typeOrderSort.ts';
import { Button } from '@/shared/ui/Button';
import { SortOrder } from '@/entities/Product';
import { ReactComponent as SortIcon } from '@/shared/assets/icons/sort-icon.svg';
import { ReactComponent as CrossIcon } from '@/shared/assets/icons/cross-icon.svg';
import { ListBoxItem } from '@/shared/ui/ListBox/ListBox.tsx';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useCycle } from 'framer-motion';
import { Sidebar } from '@/shared/ui/Sidebar';
import { getProductsOrder } from '@/pages/ProductsPage/model/selectors/productsPageSelector.ts';
import { useSelector } from 'react-redux';

interface SortRightSidebarProps {
    onChangeOrder?: (sort: SortOrder) => void;
}

export const SortRightSidebar = memo((props: SortRightSidebarProps) => {
    const { onChangeOrder } = props;
    const order = useSelector(getProductsOrder);
    const [isOpen, cycleOpen] = useCycle(false, true);
    const [value, setValue] = useState<ListBoxItem<SortOrder>>(itemsSort[0]);

    return (
        <>
            <Button
                variant="ghost"
                onClick={() => cycleOpen()}
                className={cls.btn}
            >
                <SortIcon />
                {value.content}
            </Button>
            <Sidebar isOpen={isOpen} onClose={cycleOpen} variant="rightSide">
                <VStack max className={cls.productSorts}>
                    <HStack max justify="center" className={cls.header}>
                        <div className={cls.wrapperExitBtn}>
                            <Button variant="ghost" onClick={() => cycleOpen()}>
                                <CrossIcon width={16} />
                            </Button>
                        </div>
                        <p>Сортировка</p>
                    </HStack>

                    <div className={cls.container}>
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
                                        checked={order === sort.value}
                                        onChange={() => {
                                            console.log(sort);
                                            setValue(sort);
                                            onChangeOrder?.(sort.value);
                                            cycleOpen();
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
                </VStack>
            </Sidebar>
        </>
    );
});
