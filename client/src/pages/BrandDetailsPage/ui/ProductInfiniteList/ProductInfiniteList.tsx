import { useSelector } from 'react-redux';
import { ProductList } from '@/widgets/ProductList';
import { getBrandDetailsProducts } from '../../model/selectors/getBrandDetailsProducts/getBrandDetailsProducts.ts';
import { addProductCart } from '@/entities/Cart';

import { HStack, VStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useCallback } from 'react';
import { getBrandDetails } from '../../model/selectors/getBrandDetails/getBrandDetails.ts';
import {
    getBrandPage,
    getBrandDetailsTotalPage,
} from '../../model/selectors/getBrandPage/getBrandPage.ts';
import { Pagination } from '@/shared/ui/Pagination/Pagination.tsx';
import { brandDetailsActions } from '../../model/slice/brandDetailsSlice.ts';

export const ProductsInfiniteList = () => {
    const dispatch = useAppDispatch();
    const brand = useSelector(getBrandDetails);
    const products = useSelector(getBrandDetailsProducts);
    const page = useSelector(getBrandPage);
    const totalPage = useSelector(getBrandDetailsTotalPage);

    const addProduct = useCallback(
        (productId: string, sizeId: string) => {
            dispatch(
                addProductCart({
                    productId: Number(productId),
                    sizeId: Number(sizeId),
                }),
            );
        },
        [dispatch],
    );

    const setPage = useCallback((page: number) => {
        dispatch(brandDetailsActions.setPage(page));
    }, []);

    console.log('Page', page);

    return (
        <VStack>
            <ProductList
                brand={brand}
                products={products || []}
                addToCart={addProduct}
            />
            <HStack
                justify="center"
                max
                style={{
                    marginTop: '4.5rem',
                }}
            >
                {page && (
                    <Pagination
                        page={page}
                        totalPage={totalPage || 1}
                        onChangePage={setPage}
                    />
                )}
            </HStack>
        </VStack>
    );
};
