import { useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProductPageFilters.module.scss';
import {
    ProductFilterColor,
    ProductFilterPrice,
    ProductFilterSex,
} from '@/features/ProductFilterBy';
import { ProductColor, ProductSexField } from '@/entities/Product';
import { useSelector } from 'react-redux';
import {
    getProductsColor,
    getProductsEndPrice,
    getProductSex,
    getProductsStartPrice,
} from '../../model/selectors/productsPageSelector.ts';
import { productsPageActions } from '../../model/slice/productsPageSlice.ts';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { fetchProductsList } from '../../model/services/fetchProductsList/fetchProductsList.ts';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

interface ProductPageFiltersProps {
    className?: string;
}

export const ProductPageFilters = (props: ProductPageFiltersProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const sex = useSelector(getProductSex);
    const colors = useSelector(getProductsColor);
    const startPrice = useSelector(getProductsStartPrice);
    const endPrice = useSelector(getProductsEndPrice);

    const fetchData = useCallback(() => {
        dispatch(fetchProductsList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeStartPrice = useCallback(
        (value: string) => {
            if (!Number(value)) {
                return;
            }

            if (Number(value) > endPrice) {
                dispatch(productsPageActions.setPriceStart(endPrice));
                return;
            }

            dispatch(productsPageActions.setPriceStart(Number(value)));
            dispatch(productsPageActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData],
    );

    const onChangeEndPrice = useCallback(
        (value?: string) => {
            if (!Number(value)) {
                return;
            }
            if (Number(value) < startPrice) {
                dispatch(productsPageActions.setPriceEnd(startPrice));
                return;
            }
            dispatch(productsPageActions.setPriceEnd(Number(value)));
            dispatch(productsPageActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData],
    );

    const onChangeSex = useCallback(
        (checked: boolean, sex: ProductSexField) => {
            if (checked) {
                dispatch(productsPageActions.setSex(sex));
            } else {
                dispatch(productsPageActions.removeSex(sex));
            }
            dispatch(productsPageActions.setPage(1));
            dispatch(fetchProductsList({ replace: true }));
        },
        [],
    );

    const onChangeColor = useCallback(
        (checked: boolean, color: ProductColor) => {
            if (checked) {
                dispatch(productsPageActions.setColor(color));
            } else {
                dispatch(productsPageActions.removeColor(color));
            }
            dispatch(productsPageActions.setPage(1));
            dispatch(fetchProductsList({ replace: true }));
        },
        [dispatch, fetchProductsList],
    );

    const handleClearFilters = () => {
        dispatch(productsPageActions.clearFilters());
        dispatch(fetchProductsList({ replace: true }));
    };

    return (
        <VStack
            gap="24"
            className={classNames(cls.ProductsFitler, {}, [className])}
        >
            {sex?.length || colors?.length ? (
                <div onClick={handleClearFilters}>Очистить фильтры</div>
            ) : null}
            <Text title="Фильтр" size="m" />
            <ProductFilterPrice
                startPrice={startPrice}
                endPrice={endPrice}
                onChangeStartPrice={onChangeStartPrice}
                onChangeEndPrice={onChangeEndPrice}
            />
            <ProductFilterSex onChangeSex={onChangeSex} sex={sex} />
            <ProductFilterColor onChangeColor={onChangeColor} colors={colors} />
        </VStack>
    );
};
