import { memo, MutableRefObject, useMemo, useRef, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProductItem.module.scss';
import { Product } from '../../model/types/product.ts';
import { ProductSizes } from './ProductSizes/ProductSizes.tsx';
import { useIsMath } from '@/shared/hooks/useIsMath';
import { IMG_BASE_URL } from '@/shared/api/api.ts';
import { Card } from '@/shared/ui/Card';
import { AppImage } from '@/shared/ui/AppImage';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { CardOverlay } from '@/shared/ui/CardOverlay';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteProductDetails } from '@/shared/const/route.ts';
import { AddToWishList } from '@/features/wishlist/addToWishlist/index.ts';

interface ProductItemProps {
    className?: string;
    product?: Product;
    offSize?: boolean;
    addProductCart?: (productId: string, sizeId: string) => void;
}

export const ProductItem = memo((props: ProductItemProps) => {
    const { className, product, offSize = false, addProductCart } = props;
    const [hover, setHover] = useState(false);
    const elementRef = useRef() as MutableRefObject<HTMLDivElement>;
    const { isMobile } = useIsMath();

    if (!product) {
        return (
            <HStack max justify="center">
                <h1>Произошла ошибка</h1>
            </HStack>
        );
    }

    // Ловим размеры и делаем подсчет
    const heightOverlay = useMemo(() => {
        if (!elementRef.current) return;
        let heightSizes;

        if (!product.Sizes?.length) {
            return elementRef.current.clientHeight + 24;
        }

        if (elementRef.current.clientWidth <= 190) {
            heightSizes = Math.ceil(product.Sizes.length / 3);
        } else {
            heightSizes = Math.ceil(product.Sizes.length / 4);
        }
        return heightSizes * 32 + elementRef.current.clientHeight + 24;
    }, [elementRef.current]);

    const onMouseEnter = () => setHover(true);
    const onMouseLeave = () => setHover(false);

    return (
        <Card
            ref={elementRef}
            border="top"
            className={classNames(cls.ProductItem, { [cls.cardHover]: hover }, [
                className,
            ])}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <AddToWishList productId={product.id} hover={hover} />
            <AppLink
                to={getRouteProductDetails(product.id)}
                className={cls.linkProduct}
            >
                {/* OVERLAY */}
                {!(isMobile || offSize) && (
                    <CardOverlay hover={hover} height={heightOverlay} />
                )}
                {/* CONTENT */}
                <VStack
                    max
                    align="center"
                    gap="8"
                    className={classNames(
                        cls.wrapperContent,
                        { [cls.contentHover]: hover },
                        [],
                    )}
                >
                    <div className={cls.wrapperImg}>
                        <div className={cls.containerImg}>
                            <AppImage
                                src={IMG_BASE_URL + product?.Images[0]?.url}
                                className={`${cls.img}  ${cls.positionImg}`}
                            />
                        </div>
                    </div>

                    <VStack gap="4" align="center" max>
                        <Text text={product?.Brand?.name} />
                        <div className={cls.productName}>{product.name}</div>
                        <Text text={`${product.price.toLocaleString()} ₽`} />
                    </VStack>
                </VStack>
            </AppLink>

            {!isMobile && !offSize && (
                <ProductSizes
                    sizes={product?.Sizes}
                    hover={hover}
                    addProductCart={addProductCart}
                />
            )}
        </Card>
    );
});
