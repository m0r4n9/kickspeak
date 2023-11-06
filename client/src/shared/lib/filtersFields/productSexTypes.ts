import { ProductSexField } from '@/entities/Product';
import { CheckBoxItem } from '@/shared/ui/Checkbox/Checkbox.tsx';

export function productSexTypes(sex: ProductSexField[]): CheckBoxItem[] {
    return [
        {
            value: 'M',
            content: 'Мужской',
            checked: sex.includes('M'),
        },
        {
            value: 'W',
            content: 'Женский',
            checked: sex?.includes('W'),
        },
        {
            value: 'U',
            content: 'Унисекс',
            checked: sex?.includes('U'),
        },
    ];
}
