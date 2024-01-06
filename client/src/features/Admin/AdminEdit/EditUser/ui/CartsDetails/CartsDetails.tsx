import { memo } from 'react';
import cls from './CartsDetails.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { AdminCart } from '../../model/types/adminUserDetailsSchema.ts';

interface CartsDetailsProps {
    titleClass?: string;
    cart?: AdminCart[];
}

export const CartsDetails = memo((props: CartsDetailsProps) => {
    const { titleClass, cart } = props;

    return (
        <VStack max className={cls.CartsDetails}>
            <div className={titleClass}>Корзина пользователя</div>

            <VStack>
                <ul className={cls.list}>
                    {cart?.map((product) => {
                        return (
                            <li key={product.id} className={cls.item}>
                                <p>Id Product: {product.id}</p>
                                <p>Product name: {product.name}</p>

                                {product?.Sizes?.map((size) => (
                                    <div key={size.id}>
                                        <p>size id: {size.id}</p>
                                        <p>size name: {size.name}</p>
                                    </div>
                                ))}
                            </li>
                        );
                    })}
                </ul>
            </VStack>
        </VStack>
    );
});
