import { memo, useEffect, useState } from 'react';
import cls from '../AdminProductCreatePage/AdminProductCreatePage.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { Select } from 'antd';
import { $api } from '@/shared/api';

interface BrandFieldProps {
    onChangeBrand: (value: string) => void;
}

export const BrandField = memo((props: BrandFieldProps) => {
    const { onChangeBrand } = props;
    const [isLoading, setIsLoading] = useState(false);

    const [brands, setBrands] = useState<
        {
            label: string;
            value: string;
        }[]
    >([]);

    const fetchBrands = async () => {
        try {
            setIsLoading(true);
            const response = await $api.get<
                {
                    label: string;
                    value: string;
                }[]
            >('/admin/brands-name');
            setBrands(response.data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const filterOption = (
        input: string,
        option?: { label: string; value: string },
    ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <HStack justify="between" className={cls.wrapperInput}>
            <label htmlFor="">Бренд:</label>
            <Select
                showSearch
                placeholder="Выберите бренд"
                optionFilterProp="children"
                onChange={onChangeBrand}
                disabled={isLoading}
                loading={isLoading}
                style={{
                    minWidth: 250,
                }}
                // onSearch={onSearch}
                filterOption={filterOption}
                options={brands}
            />
        </HStack>
    );
});
