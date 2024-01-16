import { memo, useState } from 'react';
import cls from './EditBrandCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/lib/upload';

interface EditBrandCardProps {
    className?: string;
    name?: string;
    foundation?: string;
    country?: string;
    urlLogo?: string;
    setUrlLogo?: (value: string) => void;

    onChangeName?: (value: string) => void;
    onChangeFoundation?: (value: string) => void;
    onChangeCounty?: (value: string) => void;
    setLogo?: (file: File) => void;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

export const EditBrandCard = memo((props: EditBrandCardProps) => {
    const {
        className,
        name,
        foundation,
        country,
        urlLogo,
        setUrlLogo,
        onChangeName,
        onChangeFoundation,
        onChangeCounty,
        setLogo,
    } = props;
    const [loading, setLoading] = useState(false);


    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setUrlLogo?.(url);
                setLogo?.(info.file.originFileObj as File);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <VStack
            gap="16"
            className={classNames(cls.EditBrandCard, {}, [className])}
        >
            <HStack justify="between" className={cls.wrapperInput}>
                <label htmlFor="brand-name">Название:</label>
                <Input
                    placeholder="Название компании"
                    type="text"
                    id="brand-name"
                    value={name || ''}
                    onChange={(e) => onChangeName?.(e.target.value)}
                />
            </HStack>

            <HStack justify="between" className={cls.wrapperInput}>
                <label htmlFor="brand-foundation">Дата основания:</label>
                <input
                    type="text"
                    id="brand-foundation"
                    name="foundation"
                    value={foundation || ''}
                    onChange={(e) => onChangeFoundation?.(e.target.value)}
                />
            </HStack>

            <HStack justify="between" className={cls.wrapperInput}>
                <label htmlFor="brand-country">Страна:</label>
                <input
                    type="text"
                    id="brand-country"
                    name="country"
                    value={country || ''}
                    onChange={(e) => onChangeCounty?.(e.target.value)}
                />
            </HStack>

            <HStack
                max
                justify="between"
                className={cls.wrapperLogo}
            >
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    onChange={handleChange}
                >
                    {urlLogo ? (
                        <img
                            src={ urlLogo}
                            alt="avatar"
                            style={{ width: '100%' }}
                        />
                    ) : (
                        uploadButton
                    )}
                </Upload>
            </HStack>
        </VStack>
    );
});
