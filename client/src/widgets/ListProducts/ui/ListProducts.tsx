import { memo } from 'react';
import cls from './ListProducts.module.scss';
import { Product, ProductItem } from '@/entities/Product';
import { Brand, BrandDetailsItems } from '@/entities/Brand';
import { HStack } from '@/shared/ui/Stack';

interface ListProductsProps {
    products: Product[];
    brand?: Brand;
    addToCart: (productId: number, sizeId: number) => void;
}

export const ListProducts = memo((props: ListProductsProps) => {
    const { products, addToCart, brand } = props;

    return (
        <HStack max>
            <div className={cls.catalogWrapper}>
                <div className={cls.catalog}>
                    {brand && <BrandDetailsItems brand={brand} />}
                    {products.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            addProductCart={addToCart}
                        />
                    ))}
                </div>
            </div>
        </HStack>
    );
});
