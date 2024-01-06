import cls from '../EditProductCard.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { Product } from '@/entities/Product';
import {memo} from "react";

interface EditNameProps {
    name?: string;
    updateForm?: (value: string, key: keyof Product) => void;
}

export const EditName = memo((props: EditNameProps) => {
    const { name, updateForm } = props;
    return (
        <HStack justify="between" className={cls.wrapperInput}>
            <label htmlFor="product-name">Название:</label>
            <input
                type="text"
                id="product-name"
                value={name}
                onChange={(e) => {
                    updateForm?.(e.target.value, 'name');
                }}
            />
        </HStack>
    );
});
