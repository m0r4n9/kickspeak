import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProductFilterSize.module.scss';
import type { SizesFilter } from '@/pages/ProductsPage';
import { Checkbox, CheckBoxItem } from '@/shared/ui/Checkbox/Checkbox.tsx';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { ReactComponent as MagnifyingGlassIcon } from '@/shared/assets/icons/MagnifyingGlassIcon.svg';

interface ProductFilterSizeProps {
    sizes?: SizesFilter[];
    activeSizes?: string[];
    onChangeSize?: (checked: boolean, size: string) => void;
    searchSizes?: (query: string) => void;
    resetSizes?: () => void;
}

export const ProductFilterSize = memo((props: ProductFilterSizeProps) => {
    const { sizes, activeSizes, onChangeSize, searchSizes, resetSizes } = props;
    const [query, setQuery] = useState('');

    if (!sizes) {
        return null;
    }

    const sizesCheckbox: CheckBoxItem[] = sizes.map(({ name: size }) => ({
        value: size,
        content: `${
            Number(size) % 1 === 0
                ? Number(size).toFixed(0)
                : Number(size).toFixed(1)
        } EU`,
        checked: activeSizes?.includes(size),
    }));

    return (
        <VStack gap="8" className={classNames(cls.ProductFilterColor)}>
            <HStack justify="between" max>
                Размеры
                {activeSizes?.length ? (
                    <Button
                        variant="ghost"
                        onClick={resetSizes}
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
                        searchSizes?.(e.target.value);
                    }}
                    placeholder="Поиск"
                    className={cls.searchColor}
                />
                <MagnifyingGlassIcon className={cls.magnifyingGlassIcon} />
            </HStack>
            {/*<VStack max gap="8" className={cls.wrapperCheckbox}>*/}
            <div style={{ width: '100%' }}>
                {sizes.length ? (
                    <Checkbox
                        items={sizesCheckbox}
                        onChange={onChangeSize}
                        className={cls.sizeList}
                    />
                ) : (
                    <p
                        className={cls.searchFailed}
                    >{`По запросу «${query}» ничего не найдено`}</p>
                )}
            </div>
            {/*</VStack>*/}
        </VStack>
    );
});
