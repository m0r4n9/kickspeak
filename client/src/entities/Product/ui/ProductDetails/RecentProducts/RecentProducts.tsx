import { memo } from 'react';
import cls from './RecentProducts.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { Product } from '../../../model/types/product.ts';
import { HStack } from '@/shared/ui/Stack';
import { ProductItem } from '../../ProductItem/ProductItem.tsx';

interface RecentProductsProps {
    className?: string;
    recentProducts?: Product[];
    addProductCart?: (productId: number, sizeId: number) => void;
}

export const RecentProducts = memo((props: RecentProductsProps) => {
    const { className, recentProducts, addProductCart } = props;

    return (
        <div className={classNames(cls.RecentProducts, {}, [className])}>
            <div style={{ fontSize: 18, marginTop: 40 }}>
                Недавно просмотренные
            </div>
            <HStack justify="start" align="stretch" max className={cls.containerListProducts}>
                <div className={cls.listProducts}>
                    {recentProducts?.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            addProductCart={addProductCart}
                        />
                    ))}
                </div>
            </HStack>
        </div>
    );
});
