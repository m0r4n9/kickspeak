import { HStack, VStack } from '@/shared/ui/Stack';
import cls from '../AdminProductCreatePage/AdminProductCreatePage.module.scss';
import { Button, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { memo, useEffect, useState } from 'react';
import { $api } from '@/shared/api';
import { NameField } from './NameField.tsx';
import { BrandField } from '@/pages/AdminPages/Products/AdminProductCreatePage/ui/ProductCreateFields/BrandField.tsx';
import {PriceField} from "@/pages/AdminPages/Products/AdminProductCreatePage/ui/ProductCreateFields/PriceField.tsx";
import {CodeField} from "@/pages/AdminPages/Products/AdminProductCreatePage/ui/ProductCreateFields/CodeField.tsx";

const options = [
    'Красный',
    'Оранжевый',
    'Жёлтый',
    'Зелёный',
    'Голубой',
    'Синий',
    'Фиолетовый',
    'Розовый',
    'Белый',
    'Чёрный',
    'Серый',
    'Коричневый',
    'Малиновый',
    'Лаймовый',
    'Индиго',
    'Марсала',
    'Персиковый',
    'Бирюзовый',
    'Бежевый',
    'Коралловый',
    'Лавандовый',
    'Оливковый',
    'Тёмно-синий',
    'Салатовый',
    'Фуксия',
    'Графитовый',
    'Сливовый',
    'Аметистовый',
    'Мятный',
];

interface ProductCreateFieldsProps {
    name: string;
    brand: string;
    price: number;
    code: string;
    selectedColors: string[];

    onChangeName: (value: string) => void;
    onChangeBrand: (value: string) => void;
    onChangePrice: (value: string) => void;
    onChangeCode: (value: string) => void;
    onChangeSex: (type: 'M' | 'U' | 'W') => void;
    onChangeColors: (value: string[]) => void;
    uploadImages: (file: any) => void;
}

export const ProductCreateFields = memo((props: ProductCreateFieldsProps) => {
    const {
        name,
        brand,
        price,
        code,
        selectedColors,
        onChangeCode,
        onChangePrice,
        onChangeName,
        onChangeBrand,
        onChangeSex,
        onChangeColors,
        uploadImages,
    } = props;

    const filteredOptions = options.filter((o) => !selectedColors.includes(o));

    return (
        <VStack max gap="16" style={{ marginTop: 24 }}>
            <NameField name={name} onChangeName={onChangeName} />
            <BrandField onChangeBrand={onChangeBrand} />
            <PriceField price={price} onChangePrice={onChangePrice}/>
            <CodeField code={code} onChangeCode={onChangeCode}/>

            <HStack justify="between" className={cls.wrapperInput}>
                <label htmlFor="sex-product">Пол:</label>
                <Select
                    id="sex-product"
                    style={{ width: 120 }}
                    options={[
                        { value: 'U', label: 'Унисекс' },
                        { value: 'W', label: 'Женский' },
                        { value: 'M', label: 'Мужской' },
                    ]}
                    onChange={(value) => {
                        onChangeSex(value);
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

            <VStack gap="16">
                <h2>Загрузить изображения</h2>
                <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture"
                    onChange={uploadImages}
                    beforeUpload={() => false}
                    style={{
                        minWidth: 300,
                    }}
                >
                    <Button icon={<UploadOutlined />}>Загрузить</Button>
                </Upload>
            </VStack>
        </VStack>
    );
});
