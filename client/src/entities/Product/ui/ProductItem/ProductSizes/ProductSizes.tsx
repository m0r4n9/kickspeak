import { useCallback, useState } from 'react';
import cls from './ProductSizes.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { SizeProduct } from '../../../model/types/product.ts';
import { ReactComponent as DoneLogo } from '@/shared/assets/icons/doneIcon.svg';
import { classNames } from '@/shared/lib/classNames/classNames.ts';

interface ProductSizesProps {
    hover?: boolean;
    sizes?: SizeProduct[];
    addProductCart?: (productId: number, sizeId: number) => void;
}

export const ProductSizes = (props: ProductSizesProps) => {
    const { hover, sizes, addProductCart } = props;
    const [activeButtonId, setActiveButtonId] = useState<number | null>(null);

    const onAddProductHandler = useCallback(
        (productId: number, sizeId: number) => {
            setActiveButtonId(sizeId);
            addProductCart?.(productId, sizeId);
            setTimeout(() => {
                setActiveButtonId(null);
            }, 2000);
        },
        [],
    );

    return (
        <div className={cls.contentSizes}>
            {hover && (
                <div className={cls.sizeBody}>
                    <div className={cls.sizesPlate}>
                        {sizes?.map((size) => {
                            const activeButton = size.id === activeButtonId?.toString();

                            return (
                                <HStack
                                    key={size.id}
                                    max
                                    className={cls.wrapperBtn}
                                >
                                    <span
                                        className={classNames(cls.sizeName, {
                                            [cls.disabled]: activeButton,
                                        })}
                                    >
                                        {size.name} EU
                                    </span>
                                    <Button
                                        className={cls.btn}
                                        disabled={activeButton}
                                        onClick={() =>
                                            onAddProductHandler(
                                                size.productId,
                                                Number(size.id),
                                            )
                                        }
                                        variant="card"
                                    >
                                        <DoneLogo
                                            className={classNames(cls.svg, {
                                                [cls.active]: activeButton,
                                            })}
                                        />
                                    </Button>
                                </HStack>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
