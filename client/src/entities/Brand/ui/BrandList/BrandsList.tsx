import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './BrandsList.module.scss';
import { memo } from 'react';
import { Brand } from '../../model/types/brand.ts';
import { BrandItem } from '../BrandItem/BrandItem.tsx';
import { HStack } from '@/shared/ui/Stack';

interface BrandsListProps {
    className?: string;
    groupedBrands: Record<string, Brand[]>;
}

export const BrandsList = memo((props: BrandsListProps) => {
    const { className, groupedBrands } = props;

    return (
        <HStack
            gap="32"
            wrap="wrap"
            className={classNames(cls.BrandsList, {}, [className])}
        >
            {Object.entries(groupedBrands).map(([letter, brands]) => (
                <BrandItem key={letter} letter={letter} brands={brands} />
            ))}
        </HStack>
    );
});
