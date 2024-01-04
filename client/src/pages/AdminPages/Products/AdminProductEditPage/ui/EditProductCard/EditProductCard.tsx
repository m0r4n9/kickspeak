import { memo, useEffect, useState } from 'react';
import { Product } from '@/entities/Product';
import { HStack, VStack } from '@/shared/ui/Stack';
import cls from './EditProductCard.module.scss';
import { Select } from 'antd';

interface EditProductCardProps {
    name?: string;
    price?: number;
    code?: string;
    sex?: string;

    updateForm?: (value: string, key: keyof Product) => void;
}

export const EditProductCard = memo((props: EditProductCardProps) => {
    const { name, price, code, sex = '', updateForm } = props;

    return (
        <VStack max gap="16">
            <HStack justify="between" className={cls.wrapperInput}>
                <label htmlFor="">Название:</label>
                <input
                    type="text"
                    id="product-name"
                    value={name}
                    onChange={(e) => {
                        updateForm?.(e.target.value, 'name');
                    }}
                />
            </HStack>
            <HStack justify="between" className={cls.wrapperInput}>
                <label htmlFor="">Название:</label>
                <input
                    type="number"
                    id="product-price"
                    value={price}
                    onChange={(e) => {
                        updateForm?.(e.target.value, 'price');
                    }}
                />
            </HStack>
            <HStack justify="between" className={cls.wrapperInput}>
                <label htmlFor="">Код товара:</label>
                <input
                    type="text"
                    id="product-code"
                    value={code}
                    onChange={(e) => {
                        updateForm?.(e.target.value, 'code');
                    }}
                />
            </HStack>
            <HStack justify="between" className={cls.wrapperInput}>
                <label htmlFor="sex-product">Пол:</label>
                <Select
                    id="sex-product"
                    style={{ width: 120 }}
                    value={sex}
                    options={[
                        { value: 'U', label: 'Унисекс' },
                        { value: 'W', label: 'Женский' },
                        { value: 'M', label: 'Мужской' },
                    ]}
                    onChange={(value: string) => {
                        updateForm?.(value, 'sex');
                    }}
                />
            </HStack>
        </VStack>
    );
});
