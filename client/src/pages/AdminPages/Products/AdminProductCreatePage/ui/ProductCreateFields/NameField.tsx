import { memo } from 'react';
import cls from '../AdminProductCreatePage/AdminProductCreatePage.module.scss';
import { HStack } from '@/shared/ui/Stack';

interface NameFieldProps {
    name: string;
    onChangeName: (value: string) => void;
}

export const NameField = memo((props: NameFieldProps) => {
    const { name, onChangeName } = props;

    return (
        <HStack justify="between" className={cls.wrapperInput}>
            <label htmlFor="product-name">Название продукта:</label>
            <input
                id="product-name"
                name="name"
                placeholder="Введите название"
                value={name}
                onChange={(e) => onChangeName(e.target.value)}
            />
        </HStack>
    );
});
