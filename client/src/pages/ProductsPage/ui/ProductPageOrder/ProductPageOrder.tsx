import { memo, useCallback } from 'react';
import cls from './ProductPageOrder.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { ListBox } from '@/shared/ui/ListBox';
import { HStack } from '@/shared/ui/Stack';
import { useSelector } from 'react-redux';
import {
    getProductsLimit,
    getProductsOrder,
} from '../../model/selectors/productsPageSelector.ts';
import { fetchProductsList, productsPageActions } from '@/pages/ProductsPage';
import { SortOrder } from '@/entities/Product';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import {itemsLimit, itemsSort} from "@/shared/const/typeOrderSort.ts";

interface ProductPageOrderProps {
    className?: string;
    isMobile?: boolean;
}

export const ProductPageOrder = memo((props: ProductPageOrderProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const limit = useSelector(getProductsLimit || 10);
    const order = useSelector(getProductsOrder);

    const onChangeLimit = useCallback(
        (value: string) => {
            dispatch(productsPageActions.setLimit(Number(value)));
            dispatch(fetchProductsList({ replace: true }));
        },
        [dispatch],
    );

    const onChangeOrder = useCallback(
        (order: SortOrder) => {
            dispatch(productsPageActions.setOrder(order));
            dispatch(fetchProductsList({ replace: true }));
        },
        [dispatch],
    );

    return (
        <HStack
            justify={'end'}
            gap="8"
            className={classNames(cls.ProductBySort, {}, [className])}
        >
            {/* LIMIT SORT */}
            <ListBox
                items={itemsLimit}
                value={limit?.toString()}
                text="Показывать: "
                onChange={onChangeLimit}
            />
            {/* ORDER SORT */}
            <ListBox
                items={itemsSort}
                value={order}
                defaultValue="Сортировка"
                onChange={onChangeOrder}
            />
        </HStack>
    );
});
