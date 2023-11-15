import { memo } from 'react';
import { getProductsOrder } from '../../../model/selectors/productsPageSelector.ts';
import cls from './SortRightSidebar.module.scss';
import { itemsSort } from '@/shared/const/typeOrderSort.ts';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { SortOrder } from '@/entities/Product';
import { useCycle } from 'framer-motion';
import { Sidebar } from '@/shared/ui/Sidebar';
import { HStack, VStack } from '@/shared/ui/Stack';
import { ReactComponent as SortIcon } from '@/shared/assets/icons/sort-icon.svg';
import { ReactComponent as CrossIcon } from '@/shared/assets/icons/cross-icon.svg';
import { useSelector } from 'react-redux';

interface SortRightSidebarProps {
    onChangeOrder?: (sort: SortOrder) => void;
}

export const SortRightSidebar = memo((props: SortRightSidebarProps) => {
    const { onChangeOrder } = props;
    const order = useSelector(getProductsOrder);
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

            <Sidebar isOpen={isOpen} onClose={cycleOpen} variant="rightSide">
                <VStack max className={cls.productSorts}>
                    <HStack max justify="center" className={cls.header}>
                        <div className={cls.wrapperExitBtn}>
                            <Button variant="clear" onClick={() => cycleOpen()}>
                                <CrossIcon width={16} />
                            </Button>
                        </div>
                        <p>Сортировка</p>
                    </HStack>

                    <div className={cls.content}>
                        <ul className={cls.list}>
                            {itemsSort.map((sortType, index) => (
                                <li
                                    key={sortType.value}
                                    className={cls.listItem}
                                >
                                    <Input
                                        id={index.toString()}
                                        type={'radio'}
                                        name="sort-type"
                                        checked={sortType.value === order}
                                        onChange={() =>
                                            onChangeOrder?.(sortType.value)
                                        }
                                    />
                                    <label
                                        onClick={() => cycleOpen()}
                                        htmlFor={index.toString()}
                                        className={cls.sortLabel}
                                    >
                                        {sortType.content}
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
