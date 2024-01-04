import { memo } from 'react';
import cls from '../AdminProductCreatePage/AdminProductCreatePage.module.scss';
import { HStack } from '@/shared/ui/Stack';

interface PriceFieldProps {
    price: number;
    onChangePrice: (value: string) => void;
}

export const PriceField = memo((props: PriceFieldProps) => {
    const { price, onChangePrice } = props;

    return (
        <HStack justify="between" className={cls.wrapperInput}>
            <label htmlFor="product-price">Цена</label>
            <input
                id="product-price"
                type="number"
                name="price"
                placeholder="Введите цену"
                value={price}
                onChange={(e) => onChangePrice(e.target.value)}
            />
        </HStack>
    );
});
