import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProductFilterColor.module.scss';
import { memo, useState } from 'react';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Checkbox } from '@/shared/ui/Checkbox';
import { CheckBoxItem } from '@/shared/ui/Checkbox/Checkbox.tsx';
import { ColorsFilter } from '@/pages/ProductsPage';
import { ReactComponent as MagnifyingGlassIcon } from '@/shared/assets/icons/MagnifyingGlassIcon.svg';
import { Button } from '@/shared/ui/Button';

interface ProductFilterColorProps {
    className?: string;
    colors?: ColorsFilter[];
    activeColors?: string[];
    onChangeColor?: (checked: boolean, color: string) => void;
    searchColors?: (query: string) => void;
    resetColors?: () => void;
}

export const ProductFilterColor = memo((props: ProductFilterColorProps) => {
    const {
        className,
        colors,
        activeColors,
        onChangeColor,
        searchColors,
        resetColors,
    } = props;
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
            <HStack justify="between" max>
                Цвет
                {activeColors?.length ? (
                    <Button
                        variant="ghost"
                        onClick={resetColors}
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
                        searchColors?.(e.target.value);
                    }}
                    placeholder="Поиск"
                    className={cls.searchColor}
                />
                <MagnifyingGlassIcon className={cls.magnifyingGlassIcon} />
            </HStack>
            <VStack max gap="8" className={cls.wrapperCheckbox}>
                {colors.length ? (
                    <Checkbox
                        items={colorsCheckbox}
                        onChange={onChangeColor}
                        className={cls.colorsList}
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
