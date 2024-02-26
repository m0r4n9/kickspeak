import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './BrandItem.module.scss';
import { memo } from 'react';
import { Brand } from '../../model/types/brand.ts';
import { HStack, VStack } from '@/shared/ui/Stack';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteBrandsDetails } from '@/shared/const/route.ts';

interface BrandItemProps {
    className?: string;
    letter: string;
    brands: Brand[];
}

export const BrandItem = memo((props: BrandItemProps) => {
    const { className, letter, brands } = props;

    return (
        <HStack
            gap="16"
            max
            id={letter}
            className={classNames(cls.BrandItem, {}, [className])}
        >
            <VStack justify="start" align="end" className={cls.brandTitle}>
                {letter}
            </VStack>

            <ul>
                {brands.map((brand) => {
                    const content = brand.hasProducts ? (
                        <AppLink
                            to={getRouteBrandsDetails(brand.id)}
                            className={cls.brandLink}
                        >
                            {brand.name}
                        </AppLink>
                    ) : (
                        <p className={`${cls.brandLink} ${cls.disabled}`}>
                            {brand.name}
                        </p>
                    );
                    return <li key={brand.id}>{content}</li>;
                })}
            </ul>
        </HStack>
    );
});
