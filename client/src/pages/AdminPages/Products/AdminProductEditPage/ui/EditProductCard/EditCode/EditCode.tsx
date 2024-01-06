import cls from '../EditProductCard.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { Product } from '@/entities/Product';
import {memo} from "react";

interface EditCodeProps {
    code?: string;
    updateForm?: (value: string, key: keyof Product) => void;
}

export const EditCode = memo((props: EditCodeProps) => {
    const { code, updateForm } = props;
    return (
        <HStack justify="between" className={cls.wrapperInput}>
            <label htmlFor="product-code">Код товара:</label>
            <input
                type="text"
                id="product-code"
                value={code}
                onChange={(e) => {
                    updateForm?.(e.target.value, 'code');
                }}
            />
        </HStack>
    );
});
