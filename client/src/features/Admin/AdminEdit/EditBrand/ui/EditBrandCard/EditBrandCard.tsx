import { ChangeEvent, memo, useRef } from 'react';
import cls from './EditBrandCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { HStack, VStack } from '@/shared/ui/Stack';
import { AppImage } from '@/shared/ui/AppImage';
import { useDragAndDrop } from '@/shared/hooks/useDragAndDrop';
import { Button } from '@/shared/ui/Button';

interface EditBrandCardProps {
    className?: string;
    name?: string;
    foundation?: string;
    country?: string;
    urlLogo?: string;
    logo?: File;

    onChangeName?: (value: string) => void;
    onChangeFoundation?: (value: string) => void;
    onChangeCounty?: (value: string) => void;
    setLogo?: (file: File) => void;
}

export const EditBrandCard = memo((props: EditBrandCardProps) => {
    const {
        className,
        name,
        foundation,
        country,
        urlLogo,
        logo,
        onChangeName,
        onChangeFoundation,
        onChangeCounty,
        setLogo,
    } = props;

    const { previewUrl, handleOndragOver, handleFile, handleOndrop, reset } =
        useDragAndDrop({
            setFile: setLogo,
        });
    const refFileInput = useRef<HTMLInputElement | null>(null);

    return (
        <VStack
            gap="16"
            className={classNames(cls.EditBrandCard, {}, [className])}
        >
            <HStack  justify="between" className={cls.wrapperInput}>
                <label htmlFor="brand-name">Название:</label>
                <input
                    type="text"
                    id="brand-name"
                    name="name"
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
                justify="between"
                className={cls.wrapperLogo}
                onDragOver={handleOndragOver}
                onDrop={handleOndrop}
            >
                <div>
                    <p>Логотип: </p>
                    <Button onClick={reset}>
                        Вернуть изображение
                    </Button>
                </div>
                <AppImage
                    src={previewUrl ? previewUrl : urlLogo}
                    onClick={() => refFileInput.current?.click()}
                    alt={name}
                    serverImages={!Boolean(previewUrl)}
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                    }}
                />
                <input
                    type="file"
                    ref={refFileInput}
                    hidden
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files) handleFile(e?.target?.files?.[0]);
                    }}
                />
            </HStack>

        </VStack>
    );
});
