import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProductFilterPrice.module.scss';
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';

interface ProductFilterPriceProps {
    className?: string;
    startPrice?: number;
    endPrice?: number;
    onChangeStartPrice?: (value: string) => void;
    onChangeEndPrice?: (value: string) => void;
}

export const ProductFilterPrice = memo((props: ProductFilterPriceProps) => {
    const {
        className,
        startPrice,
        endPrice,
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
                <Input
                    value={startPrice}
                    onChange={onChangeStartPrice}
                    label={'От'}
                    labelFlex="labelColumn"
                    className={cls.inputPrice}
                />
                <Input
                    value={endPrice}
                    onChange={onChangeEndPrice}
                    label={'До'}
                    labelFlex="labelColumn"
                    className={cls.inputPrice}
                />
            </HStack>
        </VStack>
    );
});
