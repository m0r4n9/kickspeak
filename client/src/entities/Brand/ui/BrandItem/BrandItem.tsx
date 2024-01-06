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
// TODO: исправить items с брендами!
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
                    // const activeBrand = Boolean(brand.productCount);
                    // let content;
                    // if (brand.Products.length > 0) {
                    //     content = (
                    //         <AppLink
                    //             to={getRouteBrandsDetails(brand.id.toString())}
                    //             className={classNames(cls.brandLink, {}, [])}
                    //         >
                    //             {brand.name}
                    //         </AppLink>
                    //     );
                    // } else {
                    //     content = (
                    //         <p className={`${cls.brandLink} ${cls.disabled}`}>
                    //             {brand.name}
                    //         </p>
                    //     );
                    // }

                    const content = (
                        <p className={`${cls.brandLink} ${cls.disabled}`}>
                            {brand.name}
                        </p>
                    )
                    return <li key={brand.id}>{content}</li>;
                })}
            </ul>
        </HStack>
    );
});
