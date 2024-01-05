import { memo, useState } from 'react';
import { Product, SizeProduct } from '@/entities/Product';
import { HStack, VStack } from '@/shared/ui/Stack';
import cls from './EditProductCard.module.scss';
import { colorsProduct } from '@/shared/const/colors.ts';
import { Select } from 'antd';

interface EditProductCardProps {
    name?: string;
    price?: number;
    code?: string;
    sex?: string;
    selectedColors?: string[];
    sizes?: SizeProduct[];
    newSizes?: SizeProduct[];

    updateForm?: (value: string, key: keyof Product) => void;
    onChangeColors?: (value: string[]) => void;
}

export const EditProductCard = memo((props: EditProductCardProps) => {
    const {
        name,
        price,
        code,
        sex = '',
        selectedColors,
        sizes,
        newSizes,
        updateForm,
        onChangeColors,
    } = props;
    const [hidden, setHidden] = useState(true);

    const filteredOptions = colorsProduct.filter(
        (o) => !selectedColors?.includes(o),
    );

    return (
        <VStack max gap="16">
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
            <HStack justify="between" className={cls.wrapperInput}>
                <label htmlFor="product-price">Название:</label>
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
            <HStack justify="between" className={cls.wrapperInput}>
                <label htmlFor="color-product">Цвет продукта:</label>
                <Select
                    id="color-product"
                    mode="multiple"
                    placeholder="Выберите цвет(а) товара"
                    value={selectedColors}
                    onChange={onChangeColors}
                    style={{ width: 250 }}
                    options={filteredOptions.map((item) => ({
                        value: item,
                        label: item,
                    }))}
                />
            </HStack>

            <VStack gap="16" className={cls.wrapperInput}>
                <button onClick={() => setHidden(prevState => !prevState)}>
                    {hidden ? 'Показать размеры' : 'Скрыть размеры'}
                </button>
                {!hidden && (
                    <>
                        <h2>Размеры</h2>
                        <VStack>
                            <button>Добавить размер</button>
                        </VStack>

                        {sizes?.map((size) => (
                            <HStack gap="8">
                                <VStack gap="8">
                                    <label htmlFor="">Размер</label>
                                    <input
                                        type="text"
                                        value={size.name}
                                        readOnly
                                    />
                                </VStack>
                                <VStack gap="8">
                                    <label htmlFor="">Кол-во</label>
                                    <input
                                        type="number"
                                        value={size.quantity}
                                    />
                                </VStack>
                            </HStack>
                        ))}
                    </>
                )}
            </VStack>
        </VStack>
    );
});
