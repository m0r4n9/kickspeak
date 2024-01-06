import { memo } from 'react';
import cls from '../EditProductCard.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { Product } from '@/entities/Product';

interface EditPriceProps {
    price?: number;
    updateForm?: (value: string, key: keyof Product) => void;
}

export const EditPrice = memo((props: EditPriceProps) => {
    const { price, updateForm } = props;
    return (
        <HStack justify="between" className={cls.wrapperInput}>
            <label htmlFor="product-price">Цена:</label>
            <input
                type="number"
                id="product-price"
                value={price}
                onChange={(e) => {
                    updateForm?.(e.target.value, 'price');
                }}
            />
        </HStack>
    );
});
