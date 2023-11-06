import { memo, useCallback } from 'react';
import cls from './ProductsPageMobileHeader.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getProductsOrder } from '../../model/selectors/productsPageSelector.ts';
import { fetchProductsList } from '../../model/services/fetchProductsList/fetchProductsList.ts';
import { productsPageActions } from '../../model/slice/productsPageSlice.ts';
import { SortRightSidebar } from './SortRightSidebar/SortRightSidebar.tsx';
import { FiltersRightSidebar } from './FiltersRightSidebar/FiltersRightSidebar.tsx';
import { SortOrder } from '@/entities/Product';

interface MobileHeaderProps {
    className?: string;
}

export const ProductsPageMobileHeader = memo((props: MobileHeaderProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const order = useSelector(getProductsOrder);

    const onChangeOrder = useCallback(
        (order: SortOrder) => {
            dispatch(productsPageActions.setOrder(order));
            dispatch(fetchProductsList({ replace: true }));
        },
        [dispatch],
    );

    const triggerFilter = <></>;

    return (
        <div className={classNames(cls.MobileHeader, {}, [className])}>
            <SortRightSidebar onChangeOrder={onChangeOrder} />
            <FiltersRightSidebar />
        </div>
    );
});
