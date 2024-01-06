import { memo, useState } from 'react';
import { Product, SizeProduct } from '@/entities/Product';
import { VStack } from '@/shared/ui/Stack';
import cls from './EditProductCard.module.scss';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import { UploadChangeParam } from 'antd/lib/upload';
import { EditName } from './EditName/EditName.tsx';
import { EditPrice } from './EditPrice/EditPrice.tsx';
import { EditCode } from './EditCode/EditCode.tsx';
import { EditSex } from './EditSex/EditSex.tsx';
import { EditColors } from './EditColors/EditColors.tsx';
import { EditSizes } from './EditSizes/EditSizes.tsx';

interface EditProductCardProps {
    name?: string;
    price?: number;
    code?: string;
    sex?: string;
    selectedColors?: string[];
    sizes?: SizeProduct[];
    imagesList?: UploadFile[];

    updateForm?: (value: string, key: keyof Product) => void;
    onChangeColors?: (value: string[]) => void;
    updateImages?: (info: UploadChangeParam) => void;
    addSize?: (name: string, quantity: number, productId: string) => void;
    deleteSize?: (sizeId: string) => void;
    updateSize?: (data: {id: string, quantity: number}) => void;
}

export const EditProductCard = memo((props: EditProductCardProps) => {
    const {
        name,
        price,
        code,
        sex = '',
        selectedColors,
        sizes,
        imagesList,
        addSize,
        updateForm,
        onChangeColors,
        updateImages,
        deleteSize,
        updateSize
    } = props;
    const [hidden, setHidden] = useState(true);

    return (
        <VStack max gap="16">
            <EditName name={name} updateForm={updateForm} />
            <EditPrice price={price} updateForm={updateForm} />
            <EditCode code={code} updateForm={updateForm} />
            <EditSex sex={sex} updateForm={updateForm} />
            <EditColors
                selectedColors={selectedColors}
                onChangeColors={onChangeColors}
            />

            <VStack gap="16" className={cls.wrapperInput}>
                <Button
                    type="text"
                    onClick={() => setHidden((prevState) => !prevState)}
                >
                    {hidden ? 'Показать размеры' : 'Скрыть размеры'}
                </Button>
                {!hidden && (
                    <EditSizes
                        sizes={sizes}
                        addSize={addSize}
                        deleteSize={deleteSize}
                        updateSize={updateSize}
                    />
                )}
            </VStack>

            <div
                style={{
                    marginTop: 16,
                }}
            >
                <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture"
                    fileList={imagesList}
                    beforeUpload={() => false}
                    onChange={updateImages}
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </div>
        </VStack>
    );
});
