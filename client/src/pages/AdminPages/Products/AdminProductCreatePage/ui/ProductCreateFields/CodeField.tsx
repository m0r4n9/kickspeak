import { memo } from 'react';
import cls from '../AdminProductCreatePage/AdminProductCreatePage.module.scss';
import { HStack } from '@/shared/ui/Stack';

interface CodeFieldProps {
    code: string;
    onChangeCode: (value: string) => void;
}

export const CodeField = memo((props: CodeFieldProps) => {
    const { code, onChangeCode } = props;

    return (
        <HStack justify="between" className={cls.wrapperInput}>
            <label htmlFor="product-code">Код продукта:</label>
            <input
                id="product-code"
                name="code"
                placeholder="Введите название"
                value={code}
                onChange={(e) => onChangeCode(e.target.value)}
            />
        </HStack>
    );
});
