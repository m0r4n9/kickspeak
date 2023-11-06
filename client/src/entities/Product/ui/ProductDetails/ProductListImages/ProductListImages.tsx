import { memo } from 'react';
import cls from './ProductListImages.module.scss';
import { Product } from '../../../model/types/product.ts';
import { AppImage } from '@/shared/ui/AppImage';
import { VStack } from '@/shared/ui/Stack';

interface ProductListImages {
    product?: Product;
}

export const ProductListImages = memo(({ product }: ProductListImages) => {
    const scrollToImage = (imageId: number) => {
        document.getElementById(`big_image-${imageId}`)?.scrollIntoView({
            behavior: 'smooth',
        });
    };

    return (
        <div className={cls.leftBar}>
            {/* SMALL IMAGES */}
            <div className={cls.swiper}>
                {product?.Images.map((image, index) => (
                    <div
                        key={image.id}
                        onClick={() => scrollToImage(index)}
                        id={`small_image-${index}`}
                    >
                        <AppImage
                            key={image.id}
                            src={image.url}
                            className={cls.previewImage}
                        />
                    </div>
                ))}
            </div>

            {/* BIG IMAGES */}
            <VStack className={cls.wrapperMainImage}>
                {product?.Images.map((image, index) => (
                    <div key={image.id} id={`big_image-${index}`}>
                        <AppImage
                            key={image.id}
                            src={image.url}
                            alt=""
                            className={cls.mainImage}
                        />
                    </div>
                ))}
            </VStack>
        </div>
    );
});
