import { memo, useState } from 'react';
import cls from './ProductListImages.module.scss';
import { Product } from '../../../model/types/product.ts';
import { AppImage } from '@/shared/ui/AppImage';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useIsMath } from '@/shared/hooks/useIsMath';
import { IMG_BASE_URL } from '@/shared/api/api.ts';
import { Text } from '@/shared/ui/Text';

interface ProductListImages {
    product?: Product;
}

export const ProductListImages = memo(({ product }: ProductListImages) => {
    const { isMatch } = useIsMath();
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [active, setActive] = useState(0);

    return (
        <div className={cls.leftBar}>
            <div className={cls.productHeader}>
                <Text
                    title={product?.Brand?.name}
                    text={product?.name}
                    color="primary40"
                    align="center"
                />
            </div>

            <div className={cls.swiper}>
                <Swiper
                    slidesPerView={6}
                    spaceBetween={20}
                    width={300}
                    height={400}
                    autoHeight={isMatch}
                    className={cls.leftImages}
                    direction={isMatch ? 'horizontal' : 'vertical'}
                    modules={[Thumbs]}
                    onSwiper={(swiper) => {
                        setThumbsSwiper(swiper);
                    }}
                >
                    {product?.Images.map((image, index) => (
                        <SwiperSlide key={image.id}>
                            <div className={cls.containerPrevImage}>
                                <AppImage
                                    key={image.id}
                                    src={IMG_BASE_URL + image.url}
                                    className={cls.previewImage}
                                />
                                {index === active && (
                                    <div className={cls.overlay} />
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <Swiper
                slidesPerView={1}
                thumbs={{ swiper: thumbsSwiper }}
                height={640}
                cssMode
                autoHeight
                direction={isMatch ? 'horizontal' : 'vertical'}
                modules={[Thumbs, Mousewheel]}
                className={cls.wrapperMainImage}
                onSlideChange={(swiper) => {
                    setActive(swiper.activeIndex);
                }}
            >
                {product?.Images.map((image) => (
                    <SwiperSlide key={image.id}>
                        <div className={cls.containerBigImage}>
                            <AppImage
                                key={image.id}
                                src={IMG_BASE_URL + image.url}
                                alt=""
                                className={cls.mainImage}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
});
