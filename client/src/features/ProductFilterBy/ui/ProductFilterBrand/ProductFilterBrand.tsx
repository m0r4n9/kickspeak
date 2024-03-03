import { classNames } from '@/shared/lib/classNames/classNames.ts';
import cls from './ProductFilterBrand.module.scss';
import { BrandsFilter } from '@/pages/ProductsPage';
import { VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { Checkbox } from '@/shared/ui/Checkbox';
import { CheckBoxItem } from '@/shared/ui/Checkbox/Checkbox.tsx';
import { memo, useState } from 'react';

interface ProductFilterBrandProps {
    brands?: BrandsFilter[];
    activeBrands?: string[];
    onChangeBrands?: (checked: boolean, brand: string) => void;
    searchBrands?: (query: string) => void;
}

export const ProductFilterBrand = memo((props: ProductFilterBrandProps) => {
    const { brands, activeBrands, onChangeBrands, searchBrands } = props;
    const [query, setQuery] = useState('');

    if (!brands) {
        return null;
    }

    const brandsCheckbox: CheckBoxItem[] = brands.map(({ name }) => ({
        value: name,
        content: name,
        checked: activeBrands?.includes(name),
    }));

    return (
        <VStack gap="8" className={classNames(cls.ProductFilterColor, {}, [])}>
            Бренды
            <Input
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    searchBrands?.(e.target.value);
                }}
                placeholder="Поиск"
            />
            <VStack
                max
                gap="8"
                style={{
                    overflowY: 'auto',
                }}
            >
                <Checkbox items={brandsCheckbox} onChange={onChangeBrands} />
            </VStack>
        </VStack>
    );
});
