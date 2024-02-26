import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProductFilterPrice.module.scss';
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Label } from '@/shared/ui/Label';

interface ProductFilterPriceProps {
    className?: string;
    minPrice?: number;
    maxPrice?: number;
    minPriceFromDb?: number;
    maxPriceFromDB?: number;
    onChangeStartPrice?: (value: string) => void;
    onChangeEndPrice?: (value: string) => void;
}

export const ProductFilterPrice = memo((props: ProductFilterPriceProps) => {
    const {
        className,
        minPrice,
        maxPrice,
        minPriceFromDb,
        maxPriceFromDB,
        onChangeStartPrice,
        onChangeEndPrice,
    } = props;

    return (
        <VStack
            gap="4"
            className={classNames(cls.ProductFilterPrice, {}, [className])}
        >
            <Text text="Цена" />
            <HStack>
                <VStack gap="4">
                    <Label htmlFor="product-filter-price-start">От</Label>
                    <Input
                        id="product-filter-price-start"
                        value={minPrice}
                        placeholder={`${minPriceFromDb}`}
                        onChange={(e) => onChangeStartPrice?.(e.target.value)}
                        className={cls.inputPrice}
                    />
                </VStack>

                <VStack gap="4">
                    <Label htmlFor="product-filter-price-end">До</Label>
                    <Input
                        id="product-filter-price-end"
                        value={maxPrice}
                        placeholder={`${maxPriceFromDB}`}
                        onChange={(e) => onChangeEndPrice?.(e.target.value)}
                        className={cls.inputPrice}
                    />
                </VStack>
            </HStack>
        </VStack>
    );
});
