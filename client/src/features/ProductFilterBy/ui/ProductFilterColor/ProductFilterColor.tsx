import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProductFilterColor.module.scss';
import { memo, useState } from 'react';
import { Input } from '@/shared/ui/Input';
import { VStack } from '@/shared/ui/Stack';
import { Checkbox } from '@/shared/ui/Checkbox';
import { CheckBoxItem } from '@/shared/ui/Checkbox/Checkbox.tsx';
import { ColorsFilter } from '@/pages/ProductsPage';

interface ProductFilterColorProps {
    className?: string;
    colors?: ColorsFilter[];
    activeColors?: string[];
    onChangeColor?: (checked: boolean, color: string) => void;
    searchColors?: (query: string) => void;
}

export const ProductFilterColor = memo((props: ProductFilterColorProps) => {
    const { className, colors, activeColors, onChangeColor, searchColors } =
        props;
    const [query, setQuery] = useState('');

    if (!colors) {
        return null;
    }

    const colorsCheckbox: CheckBoxItem[] = colors.map(({ name: color }) => ({
        value: color,
        content: color,
        checked: activeColors?.includes(color),
    }));

    return (
        <VStack
            gap="8"
            className={classNames(cls.ProductFilterColor, {}, [className])}
        >
            Цвет
            <Input
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    searchColors?.(e.target.value);
                }}
                placeholder="Поиск"
            />
            <VStack max gap="8" className={cls.wrapperCheckbox}>
                <Checkbox
                    items={colorsCheckbox}
                    onChange={onChangeColor}
                    className={cls.colorsList}
                />
            </VStack>
        </VStack>
    );
});
