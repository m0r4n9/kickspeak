import { useState } from 'react';

interface UseDragAndDropProps {
    setFile?: (file: File) => void;
}

export function useDragAndDrop(props: UseDragAndDropProps) {
    const { setFile } = props;
    const [previewUrl, setPreviewUrl] = useState('');

    const reset = () => {
        setPreviewUrl("");
    }

    const handleOndragOver = (event: any) => {
        event.preventDefault();
    };

    const handleFile = (file: File) => {
        setFile?.(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleOndrop = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        let imageFile = event.dataTransfer.files[0];
        handleFile(imageFile);
    };

    return {
        previewUrl,
        handleFile,
        handleOndragOver,
        handleOndrop,
        reset,
    };
}
