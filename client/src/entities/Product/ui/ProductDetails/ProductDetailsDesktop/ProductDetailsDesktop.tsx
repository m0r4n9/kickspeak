import { memo } from 'react';
import cls from './ProductDetailsDesktop.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { NavToolbar } from '@/shared/ui/NavToolbar';
import { RecentProducts } from '@/entities/Product/ui/ProductDetails/RecentProducts/RecentProducts.tsx';
import { HStack } from '@/shared/ui/Stack';
import { Loader } from '@/shared/ui/Loader';
import { ProductListImages } from '@/entities/Product/ui/ProductDetails/ProductListImages/ProductListImages.tsx';
import { ProductRightBar } from '@/entities/Product/ui/ProductDetails/ProductRightBar/ProductRightBar.tsx';
import { Product } from '@/entities/Product';
import { NavLinkToolbar } from '@/shared/ui/NavToolbar/NavToolbar.tsx';

interface ProductDetailsDesktopProps {
    isLoading?: boolean;
    product?: Product;
    recentProducts?: Product[];
    itemsToolbar?: NavLinkToolbar[];
    addProduct?: (productId: number, sizeId: number) => void;
}

export const ProductDetailsDesktop = memo(
    (props: ProductDetailsDesktopProps) => {
        const { isLoading, product, itemsToolbar, recentProducts, addProduct } = props;

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
            <div className={cls.ProductDetails}>
                {!isLoading && <NavToolbar links={itemsToolbar || []} />}
                <div className={cls.wrapperContent}>{content}</div>
                <RecentProducts
                    recentProducts={recentProducts}
                    addProductCart={addProduct}
                />
            </div>
        );
    },
);
