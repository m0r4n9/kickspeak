import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import cls from './ProductsInfiniteList.module.scss';
import {
    getProducts,
    productsPageActions,
} from '../../model/slice/productsPageSlice.ts';
import {
    getProductTotalPage,
    getProductsPageError,
    getProductsPageIsLoading,
    getProductsPageNumber,
} from '../../model/selectors/productsPageSelector.ts';
import { fetchProductsList } from '../../model/services/fetchProductsList/fetchProductsList.ts';
import { Text } from '@/shared/ui/Text';
import { ProductList } from '@/widgets/ProductList';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { addProductCart, getCartError } from '@/entities/Cart';
import { Loader } from '@/shared/ui/Loader';
import { toast } from 'sonner';
import { Pagination } from '@/shared/ui/Pagination';

export const ProductsInfiniteList = () => {
    const dispatch = useAppDispatch();
    const products = useSelector(getProducts.selectAll);
    const page = useSelector(getProductsPageNumber);
    const totalPage = useSelector(getProductTotalPage);
    const isLoading = useSelector(getProductsPageIsLoading);
    const error = useSelector(getProductsPageError);
    const errorCart = useSelector(getCartError);

    const addProduct = useCallback(
        async (productId: string, sizeId: string) => {
            dispatch(
                addProductCart({
                    productId: Number(productId),
                    sizeId: Number(sizeId),
                }),
            ).then((res) => {
                const status = res.meta.requestStatus;
                if (status === 'fulfilled') {
                    toast.success('Товар успешно добавлен в корзину.');
                } else if (status === 'rejected') {
                    console.log('@', errorCart);
                    toast.error(errorCart);
                }
            });
        },
        [dispatch],
    );

    const setPage = useCallback(
        (page: number) => {
            dispatch(productsPageActions.setPage(page));
            dispatch(fetchProductsList({ replace: true }));
        },
        [page],
    );

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

    // if (error) {
    //     return (
    //         <HStack max justify="center">
    //             <Text title="Произошла ошибка" color="error" />;
    //         </HStack>
    //     );
    // }

    return (
        <div className={cls.content}>
            <VStack>
                <ProductList products={products} addToCart={addProduct} />
                <HStack max justify="center" className={cls.contentPagination}>
                    {page && (
                        <Pagination
                            page={page}
                            totalPage={totalPage || 1}
                            onChangePage={setPage}
                        />
                    )}
                </HStack>
            </VStack>
        </div>
    );
};
