import { memo } from 'react';
import cls from './CartItem.module.scss';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteProductDetails } from '@/shared/const/route.ts';
import { AppImage } from '@/shared/ui/AppImage';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { ProductData } from '../../model/types/Cart.ts';

interface CartItemProps {
    className?: string;
    product: ProductData;
    deleteProduct: (productId: number, sizeId: number) => void;
}

export const CartItem = memo((props: CartItemProps) => {
    const { className, product, deleteProduct } = props;

    return (
        <HStack
            align="start"
            className={classNames(cls.content, {}, [className])}
        >
            {/*    IMAGE*/}
            <div className={cls.leftItem}>
                <AppLink
                    to={getRouteProductDetails(product?.id.toString() || '-1')}
                    className={cls.imgWrapper}
                >
                    <div className={`${cls.cartImg} ${cls.ibg}`}>
                        <picture>
                            <AppImage
                                src={product?.Images[0].url}
                                alt={product?.name}
                            />
                        </picture>
                    </div>
                </AppLink>
            </div>
            <VStack max className={cls.rightItem}>
                <HStack>
                    <VStack className={cls.cartTitle}>
                        {product?.Brand.name}
                        <p className={cls.productName}>{product?.name}</p>
                    </VStack>
                    <div className={cls.cartActions}>
                        <div className={cls.cartPrice}>
                            <div className={cls.wrapperPrice}>
                                <span>
                                    {`${product?.price.toLocaleString()} ₽`}
                                </span>
                            </div>
                        </div>
                    </div>
                </HStack>
                <HStack align="center" max>
                    <HStack align="center" className={cls.counter}>
                        <Button onClick={() => deleteProduct(product?.id, product?.Sizes.id)} className={cls.counterBtn}>-</Button>
                        <div className={cls.counterNumber}>1</div>
                        <Button className={cls.counterBtn}>+</Button>
                    </HStack>
                    <div
                        className={cls.size}
                    >{`${product?.Sizes.name} EU`}</div>
                </HStack>
            </VStack>
        </HStack>
    );
});
