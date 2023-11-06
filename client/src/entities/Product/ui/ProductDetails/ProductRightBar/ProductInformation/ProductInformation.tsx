import { memo } from 'react';
import cls from './ProductInformation.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { ReactComponent as CopyIcon } from '@/shared/assets/icons/CopyIcon.svg';

interface ProductInformation {
    code?: string;
    idProduct?: string;
}

export const ProductInformation = memo((props: ProductInformation) => {
    const { code, idProduct } = props;

    return (
        <ul className={cls.descList}>
            <div>
                <HStack max justify="between" className={cls.listItem}>
                    <VStack className={cls.listItemData}>
                        <Text text="Артикул" size="s" color="primary40" />
                        <Text text={code} />
                    </VStack>
                    <CopyIcon />
                </HStack>
                <HStack max justify="between" className={cls.listItem}>
                    <VStack className={cls.listItemData}>
                        <Text text="Код товара" size="s" color="primary40" />
                        <Text text={idProduct} />
                    </VStack>
                    <CopyIcon />
                </HStack>
            </div>
            <VStack>
                <HStack max className={cls.listItem}>
                    <Text
                        text="Таблица размеров"
                        className={cls.listItemData}
                    />
                </HStack>
                <HStack max className={cls.listItem}>
                    <Text text="В избранное" className={cls.listItemData} />
                </HStack>
                <HStack max className={cls.listItem}>
                    <Text text="Описание" className={cls.listItemData} />
                </HStack>
            </VStack>
        </ul>
    );
});
