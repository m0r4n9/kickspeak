import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import cls from './ProductFilterBrand.module.scss';
import { BrandsFilter } from '@/pages/ProductsPage';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { Checkbox } from '@/shared/ui/Checkbox';
import { CheckBoxItem } from '@/shared/ui/Checkbox/Checkbox.tsx';
import { ReactComponent as MagnifyingGlassIcon } from '@/shared/assets/icons/MagnifyingGlassIcon.svg';
import { Button } from '@/shared/ui/Button';

interface ProductFilterBrandProps {
    brands?: BrandsFilter[];
    activeBrands?: string[];
    onChangeBrands?: (checked: boolean, brand: string) => void;
    searchBrands?: (query: string) => void;
    resetBrands?: () => void;
}

export const ProductFilterBrand = memo((props: ProductFilterBrandProps) => {
    const { brands, activeBrands, onChangeBrands, searchBrands, resetBrands } =
        props;
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
            <HStack justify="between" max>
                Бренды
                {activeBrands?.length ? (
                    <Button
                        variant="ghost"
                        onClick={resetBrands}
                        className={cls.resetBtn}
                    >
                        Сбросить
                    </Button>
                ) : null}
            </HStack>
            <HStack gap="8" className={cls.inputWrapper}>
                <Input
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        searchBrands?.(e.target.value);
                    }}
                    placeholder="Поиск"
                    className={cls.searchBrands}
                />
                <MagnifyingGlassIcon className={cls.magnifyingGlassIcon} />
            </HStack>
            <VStack
                max
                gap="8"
                style={{
                    overflowY: 'auto',
                }}
            >
                {brands.length ? (
                    <Checkbox
                        items={brandsCheckbox}
                        onChange={onChangeBrands}
                    />
                ) : (
                    <p
                        className={cls.searchFailed}
                    >{`По запросу «${query}» ничего не найдено`}</p>
                )}
            </VStack>
        </VStack>
    );
});
