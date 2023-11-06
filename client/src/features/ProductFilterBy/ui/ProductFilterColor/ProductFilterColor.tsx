import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './ProductFilterColor.module.scss';
import {memo} from 'react';
import {Input} from '@/shared/ui/Input';
import {VStack} from '@/shared/ui/Stack';
import {ProductColor} from '@/entities/Product';
import {Checkbox} from '@/shared/ui/Checkbox';
import {CheckBoxItem} from '@/shared/ui/Checkbox/Checkbox.tsx';
import {productColorsTypes} from "@/shared/lib/filtersFields/productColorsTypes.ts";

interface ProductFilterColorProps {
    className?: string;
    onChangeColor?: (checked: boolean, color: ProductColor) => void;
    colors?: ProductColor[];
}

export const ProductFilterColor = memo((props: ProductFilterColorProps) => {
    const {className, onChangeColor, colors} = props;

    if (!colors) {
        return (
            <VStack
                gap="8"
                className={classNames(cls.ProductFilterColor, {}, [className])}
            >
                Цвет

            </VStack>
        )
    }

    const colorsType: CheckBoxItem[] = productColorsTypes(colors);


    return (
        <VStack
            gap="8"
            className={classNames(cls.ProductFilterColor, {}, [className])}
        >
            Цвет
            <Input value={''} onChange={() => {
            }} placeholder="Поиск"/>
            <VStack
                max
                gap="8"
                style={{
                    overflowY: 'auto',
                }}
            >
                <Checkbox
                    items={colorsType}
                    onChange={onChangeColor}
                />
            </VStack>
        </VStack>
    );
});
