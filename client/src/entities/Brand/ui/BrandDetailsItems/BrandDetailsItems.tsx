import { memo } from 'react';
import cls from './BrandDetailsItems.module.scss';
import { Brand } from '../../model/types/brand.ts';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { VStack } from '@/shared/ui/Stack';
import { AppImage } from '@/shared/ui/AppImage';

interface BrandDetailsItemsProps {
    className?: string;
    brand: Brand;
}

export const BrandDetailsItems = memo((props: BrandDetailsItemsProps) => {
    const { className, brand } = props;

    return (
        <VStack
            align="center"
            justify="center"
            max
            className={classNames(cls.BrandDetailsItems, {}, [className])}
        >
            <div className={cls.wrapperLogo}>
                <AppImage
                    src={`http://localhost:8000/${brand.logo}`}
                    alt={brand.name}
                    className={`${cls.brandLogo} ${cls.image}`}
                />
            </div>

            <VStack>
                <div>
                    <h2>{brand.name}</h2>
                    <p>{`Год основания - ${brand.foundation}`}`</p>
                    <p>{`Страна: ${brand.country}`}</p>
                </div>
            </VStack>
        </VStack>
    );
});
