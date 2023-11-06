import { useSelector } from 'react-redux';
import cls from './ProductRightBar.module.scss';
import { memo, useEffect } from 'react';
import { getProductAdditionalProductsData } from '../../../model/selectors/productDetails.ts';
import { Product } from '../../../model/types/product.ts';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { ProductsAdditional } from './ProductsAdditional/ProductsAdditional.tsx';
import { ProductInformation } from './ProductInformation/ProductInformation.tsx';
import { ProductSizeInformation } from './ProductSizeInformation/ProductSizeInformation.tsx';

interface ProductRightBarProps {
    product?: Product;
}

export const ProductRightBar = memo(({ product }: ProductRightBarProps) => {
    const additionalProducts = useSelector(getProductAdditionalProductsData);

    return (
        <div className={cls.rightBar} id="right-bar">
            <VStack max gap="24" align="center" className={cls.test}>
                <Text
                    title={product?.Brand?.name}
                    text={product?.name}
                    color="primary40"
                    align="center"
                />
                <ProductSizeInformation
                    sizes={product?.Sizes}
                    price={product?.price}
                />
                <ProductsAdditional
                    additionalProducts={additionalProducts}
                    idMainProduct={product?.id}
                />
                <ProductInformation
                    code={product?.code}
                    idProduct={product?.id.toString()}
                />
            </VStack>
        </div>
    );
});
