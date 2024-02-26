import { MutableRefObject, useEffect, useRef, useState } from 'react';
import cls from './ProductSizeInformation.module.scss';
import { Text } from '@/shared/ui/Text';
import { HStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { SizeProduct } from '../../../../model/types/product.ts';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { addProductCart, cartActions } from '@/entities/Cart';
import { useSelector } from 'react-redux';
import { getCartError } from '@/entities/Cart';
import { Popup } from '@/shared/ui/Popup';

interface ProductSizeInformationProps {
    sizes?: SizeProduct[];
    price?: number;
}

export const ProductSizeInformation = (props: ProductSizeInformationProps) => {
    const { sizes, price } = props;
    const dispatch = useAppDispatch();
    const errorCart = useSelector(getCartError);
    const [animateSize, setAnimateSize] = useState(false);
    const [activeSize, setActiveSize] = useState<SizeProduct | undefined>(
        sizes?.[0],
    );
    const timer = useRef() as MutableRefObject<any>;

    useEffect(() => {
        if (errorCart) dispatch(cartActions.clearError());

        if (timer.current) clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            setAnimateSize(false);
        }, 4000);
    }, [animateSize]);

    const onHandlerProductCart = (productId?: number, sizeId?: number) => {
        if (productId && sizeId)
            dispatch(addProductCart({ productId, sizeId })).then((res) => {
                if (res.meta.requestStatus === 'fulfilled')
                    setAnimateSize(true);
            });
    };

    if (!sizes?.length) {
        return (
            <div className={cls.notAvailable}>
                К сожалению, данного товара нет в наличии
            </div>
        );
    }

    return (
        <>
            <Text text="Доступные размеры" />
            <HStack max gap="4" wrap="wrap" justify="center">
                {errorCart && (
                    <Popup bgColor="bgRed" title="Ошибка" content={errorCart} />
                )}
                {sizes?.map((size) => (
                    <Button
                        onClick={() => setActiveSize(size)}
                        key={size.id}
                        variant="card"
                        style={{ cursor: 'pointer' }}
                        className={classNames(
                            '',
                            {
                                [cls.activeSize]: size.id === activeSize?.id,
                            },
                            [],
                        )}
                    >
                        {`${size.name} EU`}
                    </Button>
                ))}
            </HStack>
            <Text title={`${price?.toLocaleString()} ₽`} />
            <Button
                fullWidth
                variant="black"
                className={classNames(cls.ButtonBuy, {
                    [cls.animate]: animateSize,
                })}
                onClick={() =>
                    onHandlerProductCart(
                        Number(activeSize?.productId),
                        Number(activeSize?.id),
                    )
                }
            >
                {animateSize
                    ? 'Товар успешно добавлен в корзину'
                    : 'Добавить в коризину'}
                <p style={{ color: 'hsla(0,0%,100%,.5)' }}>
                    {`${activeSize?.name} EU`}
                </p>
            </Button>
        </>
    );
};
