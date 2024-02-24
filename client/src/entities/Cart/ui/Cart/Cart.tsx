import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Cart.module.scss';
import { memo, useCallback, useEffect } from 'react';
import { CartItem } from '../CartItem/CartItem.tsx';
import { getCartProducts } from '../../model/slice/cartSlice.ts';
import { removeProductCart } from '../../model/services/removeProductCart/removeProductCart.ts';
import { Button } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { AppLink } from '@/shared/ui/AppLink';
import { Text } from '@/shared/ui/Text';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { getRouteCatalog } from '@/shared/const/route.ts';
import { ReactComponent as CartIcon } from '@/shared/assets/icons/cart-icon-m.svg';
import { useDropdown } from '@/shared/hooks/useDropdown';
import { fetchCarts } from '../../index.ts';

interface ShoppingCartProps {
    className?: string;
    iconStyle?: string;
}

export const Cart = memo((props: ShoppingCartProps) => {
    const { className, iconStyle } = props;
    const products = useSelector(getCartProducts.selectAll);
    const dispatch = useAppDispatch();

    const {
        refItem: refDropdown,
        isOpen: isCartOpen,
        onToggle: onToggleCart,
        isClosing,
    } = useDropdown({});

    useEffect(() => {
        dispatch(fetchCarts());
    }, []);

    const deleteProductCart = useCallback(
        (productId: number, sizeId: number) => {
            dispatch(removeProductCart({ productId, sizeId }));
        },
        [dispatch],
    );

    let content;
    if (products.length) {
        content = (
            <>
                <HStack max justify="center" className={cls.cartHeader}>
                    <div className={cls.title}>
                        Корзина
                        <Text
                            text={`${products?.length ?? 0} товаров`}
                            color="primary40"
                        />
                    </div>
                </HStack>

                {products?.map((product, index) => (
                    <CartItem
                        key={index}
                        product={product}
                        deleteProduct={deleteProductCart}
                    />
                ))}

                <div>
                    <Button className={cls.buttonBuy} variant="card">
                        Оформить заказ
                    </Button>
                </div>
            </>
        );
    } else {
        content = (
            <>
                <HStack max justify="center" className={cls.cartHeader}>
                    <div className={cls.title}>
                        Корзина
                        <Text
                            text={`${products?.length ?? 0} товаров`}
                            color="primary40"
                        />
                    </div>
                </HStack>
                <VStack
                    align="center"
                    justify="center"
                    gap="32"
                    style={{ minHeight: '14rem', padding: 20 }}
                >
                    <p className={cls.textEmpty}>
                        Вы пока что еще ничего не добавили в корзину
                    </p>

                    <div>
                        <AppLink
                            to={getRouteCatalog()}
                            className={cls.buttonEmpty}
                        >
                            Перейти в каталог
                        </AppLink>
                    </div>
                </VStack>
            </>
        );
    }

    return (
        <div ref={refDropdown} className={classNames(cls.Cart, {}, [])}>
            <Button
                variant="ghost"
                onClick={onToggleCart}
                className={className}
            >
                <CartIcon className={iconStyle} />
            </Button>
            <div
                className={classNames(
                    cls.cart,
                    { [cls.open]: isCartOpen, [cls.closing]: isClosing },
                    [],
                )}
            >
                {isCartOpen && content}
            </div>
        </div>
    );
});
