import {memo} from "react";
import cls from "../EditProductCard.module.scss";
import {Select} from "antd";
import {HStack} from "@/shared/ui/Stack";
import {Product} from "@/entities/Product";

interface EditSexProps {
    sex?: string;
    updateForm?: (value: string, key: keyof Product) => void;
}

export const EditSex = memo((props: EditSexProps) => {
    const {sex, updateForm} = props;
    return (
        <HStack justify="between" className={cls.wrapperInput}>
            <label htmlFor="sex-product">Пол:</label>
            <Select
                id="sex-product"
                style={{ width: 120 }}
                value={sex}
                options={[
                    { value: 'U', label: 'Унисекс' },
                    { value: 'W', label: 'Женский' },
                    { value: 'M', label: 'Мужской' },
                ]}
                onChange={(value: string) => {
                    updateForm?.(value, 'sex');
                }}
            />
        </HStack>
    )
})