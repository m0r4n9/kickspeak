import { memo, useCallback } from 'react';
import cls from './BrandDetailsProductsFilters.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { Text } from '@/shared/ui/Text';
import {
    ProductFilterColor,
    ProductFilterPrice,
    ProductFilterSex,
} from '@/features/ProductFilterBy';
import { VStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { ProductColor, ProductSexField } from '@/entities/Product';
import { brandDetailsActions } from '../../model/slice/brandDetailsSlice.ts';
import { getBrandDetailsStartPrice } from '../../model/selectors/getBrandDetailsStartPrice/getBrandDetailsStartPrice.ts';
import { getBrandDetailsEndPrice } from '../../model/selectors/getBrandDetailsEndPrice/getBrandDetailsEndPrice.ts';
import { fetchBrandDetails } from '../../model/services/fetchBrandDetails.ts';
import { getBrandDetailsColor } from '../../model/selectors/getBrandDetailsColor/getBrandDetailsColor.ts';
import { getBrandDetailsSex } from '../../model/selectors/getBrandDetailsSex/getBrandDetailsSex.ts';

interface BrandDetailsProductsFiltersProps {
    className?: string;
    brandId?: string;
}

export const BrandDetailsProductsFilters = memo(
    (props: BrandDetailsProductsFiltersProps) => {
        const { className, brandId } = props;
        const dispatch = useAppDispatch();
        const colors = useSelector(getBrandDetailsColor);
        const sex = useSelector(getBrandDetailsSex);
        const startPrice = useSelector(getBrandDetailsStartPrice);
        const endPrice = useSelector(getBrandDetailsEndPrice);

        const fetchData = useCallback(() => {
            if (brandId) dispatch(fetchBrandDetails(brandId));
        }, [dispatch]);

        const debouncedFetchData = useDebounce(fetchData, 500);

        const onChangeStartPrice = useCallback(
            (value: string) => {
                if (!Number(value)) {
                    return;
                }

                if (Number(value) > endPrice) {
                    dispatch(brandDetailsActions.setPriceStart(endPrice));
                    return;
                }

                dispatch(brandDetailsActions.setPriceStart(Number(value)));
                dispatch(brandDetailsActions.setPage(1));
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
                    dispatch(brandDetailsActions.setPriceEnd(startPrice));
                    return;
                }
                dispatch(brandDetailsActions.setPriceEnd(Number(value)));
                dispatch(brandDetailsActions.setPage(1));
                debouncedFetchData();
            },
            [dispatch, debouncedFetchData],
        );

        const onChangeSex = useCallback(
            (checked: boolean, sex: ProductSexField) => {
                if (checked) {
                    dispatch(brandDetailsActions.setSex(sex));
                } else {
                    dispatch(brandDetailsActions.removeSex(sex));
                }
                dispatch(brandDetailsActions.setPage(1));
                fetchData();
            },
            [],
        );

        const onChangeColor = useCallback(
            (checked: boolean, color: typeof ProductColor) => {
                if (checked) {
                    dispatch(brandDetailsActions.setColor(color));
                } else {
                    dispatch(brandDetailsActions.removeColor(color));
                }
                dispatch(brandDetailsActions.setPage(1));
                fetchData();
            },
            [dispatch, fetchData],
        );

        return (
            <VStack
                gap="24"
                className={classNames(cls.BrandDetailsProductsFilters, {}, [
                    className,
                ])}
            >
                <Text title="Фильтр" size="m" />
                <ProductFilterPrice
                    minPrice={startPrice}
                    maxPrice={endPrice}
                    onChangeStartPrice={onChangeStartPrice}
                    onChangeEndPrice={onChangeEndPrice}
                />
                <ProductFilterSex sex={sex} onChangeSex={onChangeSex} />
                <ProductFilterColor
                    colors={colors}
                    onChangeColor={onChangeColor}
                />
            </VStack>
        );
    },
);
