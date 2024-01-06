import {memo} from "react";
import cls from "../EditProductCard.module.scss";
import {Select} from "antd";
import {HStack} from "@/shared/ui/Stack";
import {colorsProduct} from "@/shared/const/colors.ts";

interface EditColorsProps {
    selectedColors?: string[];
    onChangeColors?: (value: string[]) => void;
}

export const EditColors = memo((props: EditColorsProps) => {
    const {selectedColors, onChangeColors} = props;

    const filteredOptions = colorsProduct.filter(
        (o) => !selectedColors?.includes(o),
    );

    return (
        <HStack justify="between" className={cls.wrapperInput}>
            <label htmlFor="color-product">Цвет продукта:</label>
            <Select
                id="color-product"
                mode="multiple"
                placeholder="Выберите цвет(а) товара"
                value={selectedColors}
                onChange={onChangeColors}
                style={{ width: 250 }}
                options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                }))}
            />
        </HStack>
    )
})