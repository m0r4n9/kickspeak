import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProductItem.module.scss';
import { memo, MutableRefObject, useMemo, useRef, useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { AppImage } from '@/shared/ui/AppImage';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Product } from '../../model/types/product.ts';
import { CardOverlay } from '@/shared/ui/CardOverlay';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteProductDetails } from '@/shared/const/route.ts';
import { ProductSizes } from './ProductSizes/ProductSizes.tsx';
import { useIsMath } from '@/shared/hooks/useIsMath';

interface ProductItemProps {
    className?: string;
    product?: Product;
    addProductCart?: (productId: number, sizeId: number) => void;
}

export const ProductItem = memo((props: ProductItemProps) => {
    const { className, product, addProductCart } = props;
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
    }, [elementRef.current?.clientWidth]);

    const onMouseEnter = () => {
        setHover(true);
    };

    const onMouseLeave = () => {
        setHover(false);
    };

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
            <AppLink
                to={getRouteProductDetails(product.id.toString())}
                style={{
                    padding: '36px 8px 24px',
                }}
            >
                {/* OVERLAY */}
                <CardOverlay
                    hover={hover}
                    isMobile={isMobile}
                    height={heightOverlay}
                />

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
                    <div
                        ref={elementRef}
                        style={{
                            display: 'block',
                            marginBottom: '2rem',
                            width: '100%',
                        }}
                    >
                        <div
                            style={{
                                position: 'relative',
                                paddingTop: '100%',
                            }}
                        >
                            <AppImage
                                src={product?.Images[0]?.url}
                                className={`${cls.img}  ${cls.positionImg}`}
                            />
                        </div>
                    </div>

                    <VStack gap="4" align="center" max>
                        <Text text={product?.Brand?.name} />
                        <div className={cls.productName}>{product.name}</div>
                        <div
                            style={{
                                zIndex: 2,
                            }}
                        >
                            <Text
                                text={`${product.price.toLocaleString()} ₽`}
                            />
                        </div>
                    </VStack>
                </VStack>
            </AppLink>

            {!isMobile && (
                <ProductSizes
                    sizes={product?.Sizes}
                    addProductCart={addProductCart}
                    hover={hover}
                />
            )}
        </Card>
    );
});
