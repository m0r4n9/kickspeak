import { ChangeEvent, memo, ReactNode, useRef } from 'react';
import cls from './DragAndDrop.module.scss';
import { useDragAndDrop } from '@/shared/hooks/useDragAndDrop';
import { classNames } from '@/shared/lib/classNames/classNames.ts';

interface DragAndDropProps {
    className?: string;
    image?: File;
    setImage?: (file: File) => void;
    svg?: ReactNode;
    textInfo?: string;
}

export const DragAndDrop = memo((props: DragAndDropProps) => {
    const { className, svg, image, textInfo, setImage } = props;
    const fileInput = useRef<HTMLInputElement | null>(null);
    const { previewUrl, handleFile, handleOndrop, handleOndragOver } =
        useDragAndDrop({
            setFile: setImage,
        });

    return (
        <div className={classNames(cls.containerDragAndDrop, {}, [className])}>
            <div
                className={cls.dnd}
                style={{
                    cursor: 'pointer',
                }}
                onClick={() => fileInput.current?.click()}
                onDragOver={handleOndragOver}
                onDrop={handleOndrop}
            >
                {svg}
                <span>{textInfo ? textInfo : "Добавьте изображение компании..."}</span>
                <div>
                    <input
                        type="file"
                        ref={fileInput}
                        hidden
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files)
                                handleFile(e?.target?.files?.[0]);
                        }}
                    />
                </div>
            </div>
            {previewUrl && (
                <div className={cls.wrapperPreviewImage}>
                    <img
                        src={previewUrl}
                        alt={image?.name}
                        className={cls.previewImage}
                    />
                    <span>{image?.name}</span>
                </div>
            )}
        </div>
    );
});
