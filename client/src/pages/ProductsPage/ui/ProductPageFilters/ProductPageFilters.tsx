import { useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProductPageFilters.module.scss';
import {
    ProductFilterBrand,
    ProductFilterColor,
    ProductFilterPrice,
    ProductFilterSex,
    ProductFilterSize,
} from '@/features/ProductFilterBy';
import { ProductSexField } from '@/entities/Product';
import { useSelector } from 'react-redux';
import {
    getProductSex,
    getProductsPageIsLoading,
} from '../../model/selectors/productsPageSelector.ts';
import {
    getProductsMaxPrice,
    getProductsMaxPriceDB,
    getProductsMinPrice,
    getProductsMinPriceDB,
} from '../../model/selectors/getProductPrices/getProductPrices.ts';
import {
    getProductsColors,
    getProductsFilterColors,
} from '../../model/selectors/getProductsColors/getProductsColors.ts';
import { productsPageActions } from '../../model/slice/productsPageSlice.ts';
import { fetchProductsList } from '../../model/services/fetchProductsList/fetchProductsList.ts';
import {
    getProductBrands,
    getProductFilterBrands,
} from '../../model/selectors/getProductBrands/getProductBrands.ts';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { fetchColors } from '../../model/services/fetchColors/fetchColors.ts';
import { fetchListBrands } from '../../model/services/fetchListBrands/fetchListBrands.ts';
import {
    getProductFilterSizes,
    getProductSizes,
} from '@/pages/ProductsPage/model/selectors/getProductSizes/getProductSizes.ts';
import { fetchSizes } from '@/pages/ProductsPage/model/services/fetchSizes/fetchSizes.ts';

interface ProductPageFiltersProps {
    className?: string;
}

export const ProductPageFilters = (props: ProductPageFiltersProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getProductsPageIsLoading);
    const sex = useSelector(getProductSex);
    const colors = useSelector(getProductsColors);
    const activeColors = useSelector(getProductsFilterColors);
    const sizes = useSelector(getProductSizes);
    const activeSizes = useSelector(getProductFilterSizes);
    const brands = useSelector(getProductBrands);
    const activeBrands = useSelector(getProductFilterBrands);
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
        if (isNaN(numberValue) || !minPriceFromDb || !minPrice) return;

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
        (checked: boolean, color: string) => {
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

    const onChangeSize = useCallback(
        (checked: boolean, size: string) => {
            if (checked) {
                dispatch(productsPageActions.setSize(size));
            } else {
                dispatch(productsPageActions.removeSize(size));
            }
            dispatch(productsPageActions.setPage(1));
            dispatch(fetchProductsList({ replace: true }));
        },
        [dispatch, fetchProductsList],
    );

    const onChangeBrand = useCallback(
        (checked: boolean, brand: string) => {
            if (checked) {
                dispatch(productsPageActions.setBrand(brand));
            } else {
                dispatch(productsPageActions.removeBrand(brand));
            }
            dispatch(productsPageActions.setPage(1));
            dispatch(fetchProductsList({ replace: true }));
        },
        [dispatch, fetchProductsList],
    );

    const searchColors = useCallback((query: string) => {
        dispatch(fetchColors(query));
    }, []);

    const searchBrands = useCallback((query: string) => {
        dispatch(fetchListBrands(query));
    }, []);

    const searchSizes = useCallback((query: string) => {
        dispatch(fetchSizes(query));
    }, []);

    const resetColors = useCallback(() => {
        dispatch(productsPageActions.resetColors());
        dispatch(fetchProductsList({ replace: true }));
    }, []);

    const resetSizes = useCallback(() => {
        dispatch(productsPageActions.resetSizes());
        dispatch(fetchProductsList({ replace: true }));
    }, []);

    const resetBrands = useCallback(() => {
        dispatch(productsPageActions.resetBrands());
        dispatch(fetchProductsList({ replace: true }));
    }, []);

    const handleClearFilters = () => {
        dispatch(productsPageActions.clearFilters());
        dispatch(fetchProductsList({ replace: true }));
    };

    return (
        <VStack
            gap="24"
            className={classNames(cls.ProductsFitler, {}, [className])}
        >
            {/*{sex?.length || allColors.activeColors?.length ? (*/}
            {/*<div onClick={handleClearFilters}>Сбросить фильтр</div>*/}
            {/*) : null}*/}
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
            <ProductFilterColor
                colors={colors}
                activeColors={activeColors}
                onChangeColor={onChangeColor}
                searchColors={searchColors}
                resetColors={resetColors}
            />
            <ProductFilterSize
                sizes={sizes}
                activeSizes={activeSizes}
                onChangeSize={onChangeSize}
                searchSizes={searchSizes}
                resetSizes={resetSizes}
            />
            <ProductFilterBrand
                brands={brands}
                activeBrands={activeBrands}
                onChangeBrands={onChangeBrand}
                searchBrands={searchBrands}
                resetBrands={resetBrands}
            />
        </VStack>
    );
};
