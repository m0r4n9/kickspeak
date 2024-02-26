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
    getProductSex,
    getProductsMinPrice,
    getProductsMaxPrice,
    getProductsMaxPriceDB,
    getProductsMinPriceDB,
    getProductsPageIsLoading,
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
    const isLoading = useSelector(getProductsPageIsLoading);
    const sex = useSelector(getProductSex);
    const colors = useSelector(getProductsColor);
    const minPriceFromDb = useSelector(getProductsMinPriceDB);
    const maxPriceFromDB = useSelector(getProductsMaxPriceDB);
    const minPrice = useSelector(getProductsMinPrice) || 0;
    const maxPrice = useSelector(getProductsMaxPrice) || 0;

    const fetchData = useCallback(() => {
        dispatch(fetchProductsList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeStartPrice = (value: string) => {
        const numberValue = Number(value);
        if (isNaN(numberValue) || !maxPriceFromDB) return;

        if (value === '') {
            dispatch(productsPageActions.setPriceStart(0));
        } else if (numberValue > maxPriceFromDB) {
            dispatch(productsPageActions.setPriceStart(maxPriceFromDB));
        } else {
            dispatch(productsPageActions.setPriceStart(numberValue));
        }

        dispatch(productsPageActions.setPage(1));
        debouncedFetchData();
    };

    const onChangeEndPrice = (value?: string) => {
        const numberValue = Number(value);
        if (isNaN(numberValue) || !minPriceFromDb) return;

        if (numberValue <= minPrice) {
            if (!minPrice) {
                dispatch(productsPageActions.setPriceEnd(minPriceFromDb));
            } else {
                dispatch(productsPageActions.setPriceEnd(minPrice));
            }
        } else {
            dispatch(productsPageActions.setPriceEnd(numberValue));
        }
        dispatch(productsPageActions.setPage(1));
        debouncedFetchData();
    };

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
        (checked: boolean, color: typeof ProductColor) => {
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
                minPrice={minPrice}
                maxPrice={maxPrice}
                minPriceFromDb={minPriceFromDb}
                maxPriceFromDB={maxPriceFromDB}
                onChangeStartPrice={onChangeStartPrice}
                onChangeEndPrice={onChangeEndPrice}
            />
            <ProductFilterSex onChangeSex={onChangeSex} sex={sex} />
            <ProductFilterColor onChangeColor={onChangeColor} colors={colors} />
        </VStack>
    );
};
