import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProductFilterSex.module.scss';
import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { Checkbox } from '@/shared/ui/Checkbox';
import { ProductSexField } from '@/entities/Product';
import { CheckBoxItem } from '@/shared/ui/Checkbox/Checkbox.tsx';
import { productSexTypes } from '@/shared/lib/filtersFields/productSexTypes.ts';

interface ProductFilterSexProps {
    className?: string;
    brandId?: string;
    onChangeSex?: (checked: boolean, sex: ProductSexField) => void;
    sex?: ProductSexField[];
}

export const ProductFilterSex = memo((props: ProductFilterSexProps) => {
    const { className, sex, onChangeSex } = props;

    if (!sex) {
        return (
            <VStack
                className={classNames(cls.ProductFilterSex, {}, [className])}
            >
                Пол
            </VStack>
        );
    }

    const sexTypes: CheckBoxItem[] = productSexTypes(sex);

    return (
        <VStack className={classNames(cls.ProductFilterSex, {}, [className])}>
            Пол
            <Checkbox items={sexTypes} onChange={onChangeSex} />
        </VStack>
    );
});
