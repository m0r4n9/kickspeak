import { memo, useMemo, useState } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, Input, InputNumber, Select } from 'antd';
import { SizeProduct } from '@/entities/Product';
import { useSelector } from 'react-redux';
import { getAdminProductDetailsData } from '../../../model/selectors/getAdminProductDetailsData/getAdminProductDetailsData.ts';

interface EditSizesProps {
    sizes?: SizeProduct[];
    addSize?: (name: string, quantity: number, productId: string) => void;
    deleteSize?: (sizeId: string) => void;
    updateSize?: (data: { id: string; quantity: number }) => void;
}

export const EditSizes = memo((props: EditSizesProps) => {
    const { sizes, deleteSize, addSize, updateSize } = props;
    const productId = useSelector(getAdminProductDetailsData)?.id;
    const [activeSize, setActiveSize] = useState('');
    const [quantity, setQuantity] = useState<number | null>(0);
    const [editQuantity, setEditQuantity] = useState<number | null>();

    // TODO: сделать лучше
    const sizesArray = useMemo(() => {
        let res = [];
        for (let i = 36; i <= 44; i += 0.5) {
            if (sizes?.find(({ name }) => name === i.toString())) continue;
            res.push({ value: i.toString(), label: i.toString() });
        }
        return res;
    }, [sizes]);

    return (
        <VStack gap="8">
            <h2>Размеры</h2>
            <HStack
                align="end"
                gap="16"
                max
                style={{ borderBottom: '1px solid gray', paddingBottom: 14 }}
            >
                <Button
                    onClick={() => {
                        if (productId && quantity)
                            addSize?.(activeSize, quantity, productId);
                    }}
                >
                    Добавить размер
                </Button>
                <HStack gap="8" align="end">
                    <VStack gap="8" align="start">
                        <label htmlFor="">Размер</label>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Search to Select"
                            value={activeSize}
                            onChange={(value) => {
                                setActiveSize(value);
                            }}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '')
                                    .toLowerCase()
                                    .localeCompare(
                                        (optionB?.label ?? '').toLowerCase(),
                                    )
                            }
                            options={sizesArray}
                        />
                    </VStack>
                    <VStack gap="8">
                        <label htmlFor="">Кол-во</label>
                        <InputNumber
                            min={0}
                            max={100}
                            value={quantity}
                            onChange={(value) => setQuantity(value)}
                        />
                    </VStack>
                </HStack>
            </HStack>
            {sizes?.map((size) => (
                <HStack gap="8" align="end" key={size.id}>
                    <VStack gap="8">
                        <label htmlFor="">Размер</label>
                        <input type="text" value={size.name} readOnly />
                    </VStack>
                    <VStack gap="8">
                        <label htmlFor="">Кол-во</label>
                        <InputNumber
                            value={size.quantity}
                            onChange={(value) => setEditQuantity(value)}
                        />
                    </VStack>
                    <HStack gap="8">
                        <Button
                            onClick={() => {
                                if (editQuantity)
                                    updateSize?.({
                                        id: size.id,
                                        quantity: editQuantity,
                                    });
                            }}
                        >
                            Изменить
                        </Button>
                        <Button danger onClick={() => deleteSize?.(size.id)}>
                            Удалить
                        </Button>
                    </HStack>
                </HStack>
            ))}
        </VStack>
    );
});
