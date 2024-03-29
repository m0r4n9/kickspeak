import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import cls from './ProductDetails.module.scss';
import {
    DynamicModuleLoader,
    ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader.tsx';
import { productDetailsReducer } from '../../model/slice/productDetailsSlice.ts';
import {
    getProductDetailsData,
    getProductDetailsIsLoading,
    getProductRecentData,
} from '../../model/selectors/productDetails.ts';
import { fetchProductById } from '../../model/services/fetchProductById/fetchProductById.ts';
import { ProductListImages } from './ProductListImages/ProductListImages.tsx';
import { ProductRightBar } from './ProductRightBar/ProductRightBar.tsx';
import { RecentProducts } from './RecentProducts/RecentProducts.tsx';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { NavLinkToolbar } from '@/shared/ui/NavToolbar/NavToolbar.tsx';
import { getRouteMain, getRouteProductDetails } from '@/shared/const/route.ts';
import { Loader } from '@/shared/ui/Loader';
import { HStack } from '@/shared/ui/Stack';
import { addProductCart } from '@/entities/Cart';
import { Page } from '@/widgets/Page';

interface ProductDetailsProps {
    id?: string;
}

const reducersList: ReducerList = {
    productDetails: productDetailsReducer,
};

export const ProductDetails = (props: ProductDetailsProps) => {
    const { id } = props;
    const dispatch = useAppDispatch();
    const product = useSelector(getProductDetailsData);
    const recentProducts = useSelector(getProductRecentData);
    const isLoading = useSelector(getProductDetailsIsLoading);

    const addProduct = useCallback(
        (productId: number, sizeId: number) => {
            dispatch(
                addProductCart({
                    productId,
                    sizeId,
                }),
            );
        },
        [dispatch],
    );

    useEffect(() => {
        const items: string[] = JSON.parse(
            localStorage.getItem('recentProducts') || '[]',
        );

        dispatch(fetchProductById(id));

        return () => {
            if (!id) return;
            if (items.indexOf(id) === -1) {
                items.push(id);
                localStorage.setItem('recentProducts', JSON.stringify(items));
            }
        };
    }, [dispatch, id]);

    let content;
    if (isLoading) {
        content = (
            <HStack
                justify="center"
                align="start"
                max
                style={{ height: '100vh', marginTop: '16rem' }}
            >
                <Loader />
            </HStack>
        );
    } else {
        content = (
            <>
                <ProductListImages product={product} />
                <ProductRightBar product={product} />
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducersList}>
            <Page>
                <div className={cls.ProductDetails}>
                    <div className={cls.wrapperProductDetails}>{content}</div>
                    <RecentProducts
                        recentProducts={recentProducts}
                        addProductCart={addProduct}
                    />
                </div>
            </Page>
        </DynamicModuleLoader>
    );
};
