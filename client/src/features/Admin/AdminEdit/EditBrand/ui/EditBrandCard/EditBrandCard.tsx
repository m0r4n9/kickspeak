import { memo } from 'react';
import cls from './EditBrandCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { HStack, VStack } from '@/shared/ui/Stack';

interface EditBrandCardProps {
    className?: string;
    name?: string;
    foundation?: string;
    country?: string;

    onChangeName?: (value: string) => void;
    onChangeFoundation?: (value: string) => void;
    onChangeCounty?: (value: string) => void;
}

export const EditBrandCard = memo((props: EditBrandCardProps) => {
    const {
        className,
        name,
        foundation,
        country,
        onChangeName,
        onChangeFoundation,
        onChangeCounty,
    } = props;

    return (
        <VStack
            gap="16"
            className={classNames(cls.EditBrandCard, {}, [className])}
        >
            <HStack justify="between" className={cls.wrapperInput}>
                <label htmlFor="brand-name">Название:</label>
                <input
                    type="text"
                    id="brand-name"
                    name="name"
                    value={name || ''}
                    onChange={(e) => onChangeName?.(e.target.value)}
                />
            </HStack>

            <HStack justify="between" className={cls.wrapperInput}>
                <label htmlFor="brand-foundation">Дата основания:</label>
                <input
                    type="text"
                    id="brand-foundation"
                    name="foundation"
                    value={foundation || ''}
                    onChange={(e) => onChangeFoundation?.(e.target.value)}
                />
            </HStack>

            <HStack justify="between" className={cls.wrapperInput}>
                <label htmlFor="brand-country">Страна:</label>
                <input
                    type="text"
                    id="brand-country"
                    name="country"
                    value={country || ''}
                    onChange={(e) => onChangeCounty?.(e.target.value)}
                />
            </HStack>
        </VStack>
    );
});
