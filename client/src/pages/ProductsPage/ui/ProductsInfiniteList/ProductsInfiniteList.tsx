import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import cls from './ProductsInfiniteList.module.scss';
import {
    getProducts,
    productsPageActions,
} from '../../model/slice/productsPageSlice.ts';
import {
    getProductPageHasMore,
    getProductsPageError,
    getProductsPageIsLoading,
    getProductsPageNumber,
} from '../../model/selectors/productsPageSelector.ts';
import { fetchProductsList } from '../../model/services/fetchProductsList/fetchProductsList.ts';
import { Text } from '@/shared/ui/Text';
import { ProductList } from '@/widgets/ProductList';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Pagination } from '@/features/pagination';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { addProductCart, getCartError } from '@/entities/Cart';
import { Loader } from '@/shared/ui/Loader';
import { Popup } from '@/shared/ui/Popup';

export const ProductsInfiniteList = () => {
    const dispatch = useAppDispatch();
    const products = useSelector(getProducts.selectAll);
    const page = useSelector(getProductsPageNumber);
    const hasMore = useSelector(getProductPageHasMore);
    const isLoading = useSelector(getProductsPageIsLoading);
    const error = useSelector(getProductsPageError);
    const errorCart = useSelector(getCartError);

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

    const nextPage = useCallback(() => {
        if (!page) return;
        dispatch(productsPageActions.setPage(page + 1));
        dispatch(fetchProductsList({ replace: true }));
    }, [page]);

    const firstPage = useCallback(() => {
        dispatch(productsPageActions.setPage(1));
        dispatch(fetchProductsList({ replace: true }));
    }, [page]);

    const prevPage = useCallback(() => {
        if (!page) return;
        dispatch(productsPageActions.setPage(page - 1));
        dispatch(fetchProductsList({ replace: true }));
    }, [page]);

    if (isLoading) {
        return (
            <HStack
                max
                justify="center"
                style={{ marginTop: '10rem', height: '100vh' }}
            >
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack max justify="center">
                <Text title="Произошла ошибка" color="error" />;
            </HStack>
        );
    }

    return (
        <VStack>
            {errorCart && (
                <Popup content={errorCart} title="Ошибка" bgColor="bgRed" />
            )}
            <ProductList products={products} addToCart={addProduct} />
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
};
