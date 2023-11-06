import {useCallback, useEffect} from 'react';
import cls from './WishListPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { wishListReducer } from '../../model/slice/wishListSlice.ts';
import { fetchWishList } from '../../model/services/fetchWishList.ts';
import {getWishListProducts} from "../../model/selectors/getWishListProducts/getWishListProducts.ts";
import { DynamicModuleLoader } from '@/shared/lib/components';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader.tsx';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import {useSelector} from "react-redux";
import {ProductItem} from "@/entities/Product";
import {addProductCart} from "@/entities/Cart";

interface WishListPageProps {
    className?: string;
}

const reducer: ReducerList = {
    wishList: wishListReducer,
};

const WishListPage = (props: WishListPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const products = useSelector(getWishListProducts);

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
        dispatch(fetchWishList());
    }, []);

    return (
        <DynamicModuleLoader reducers={reducer}>
            <Page>
                <VStack max className={cls.WishListPage}>
                    <HStack max justify="center" className={cls.header}>
                        <h1>Избранное</h1>
                    </HStack>

                    <HStack max align="stretch" className={cls.list}>
                        {products?.map(product => (
                            <ProductItem key={product.id} product={product} addProductCart={addProduct}/>
                        ))}
                    </HStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default WishListPage;
