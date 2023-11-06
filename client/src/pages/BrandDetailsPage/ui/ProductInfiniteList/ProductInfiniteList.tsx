import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import cls from './ProductInfiniteList.module.scss';
import { ListProducts } from '@/widgets/ListProducts';
import {
    getBrandDetailsDataHasMore,
    getBrandDetailsDataProducts,
} from '../../model/selectors/getBrandDetailsData/getBrandDetailsData.ts';
import { Brand } from '@/entities/Brand';
import { VStack } from '@/shared/ui/Stack';
import { getBrandDetailsPageNumber } from '../../model/selectors/getBrandDetailsPageNumber/getBrandDetailsPageNumber.ts';
import { brandDetailsActions } from '../../model/slice/brandDetailsSlice.ts';
import { fetchBrandDetails } from '../../model/services/fetchBrandDetails.ts';
import { Pagination } from '@/features/pagination';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

interface ProductInfitineListProps {
    addProductCart: (productId: number, sizeId: number) => void;
    brand?: Brand;
}

export const ProductsInfiniteList = memo((props: ProductInfitineListProps) => {
    const { brand, addProductCart } = props;
    const dispatch = useAppDispatch();
    const products = useSelector(getBrandDetailsDataProducts) || [];
    const page = useSelector(getBrandDetailsPageNumber);
    const hasMore = useSelector(getBrandDetailsDataHasMore);

    const nextPage = useCallback(() => {
        if (!page || !brand) return;
        dispatch(brandDetailsActions.setPage(page + 1));
        dispatch(fetchBrandDetails(brand.id.toString()));
    }, [page, brand]);

    const firstPage = useCallback(() => {
        if (!brand) return;
        dispatch(brandDetailsActions.setPage(1));
        dispatch(fetchBrandDetails(brand.id.toString()));
    }, [page, brand]);

    const prevPage = useCallback(() => {
        if (!page || !brand) return;
        dispatch(brandDetailsActions.setPage(page - 1));
        dispatch(fetchBrandDetails(brand.id.toString()));
    }, [page, brand]);

    return (
        <VStack>
            <ListProducts
                brand={brand}
                products={products}
                addToCart={addProductCart}
            />
            <Pagination
                hasMore={hasMore}
                pageNumber={page}
                prevPage={prevPage}
                nextPage={nextPage}
                startPage={firstPage}
                className={cls.productsPagination}
            />
        </VStack>
    );
});
