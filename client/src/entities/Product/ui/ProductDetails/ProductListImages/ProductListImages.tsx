import { memo, useRef, useState } from 'react';
import cls from './ProductListImages.module.scss';
import { Product } from '../../../model/types/product.ts';
import { AppImage } from '@/shared/ui/AppImage';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Mousewheel, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useIsMath } from '@/shared/hooks/useIsMath';
import { IMG_BASE_URL } from '@/shared/api/api.ts';
import { Text } from '@/shared/ui/Text';
import { HStack } from '@/shared/ui/Stack';

interface ProductListImages {
    product?: Product;
}

export const ProductListImages = memo(({ product }: ProductListImages) => {
    const { isMatch } = useIsMath();
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [active, setActive] = useState(0);
    const mainSwiper = useRef<SwiperRef>(null);
    const swiperPreview = useRef<SwiperRef>(null);

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
                    ref={swiperPreview}
                    slidesPerView={6}
                    breakpoints={{
                        991: {
                            direction: 'vertical',
                            height: 500,
                        },
                        0: {
                            direction: 'horizontal',
                            width: 400,
                        },
                    }}
                    wrapperClass={cls.wrapperSlide}
                    className={cls.leftImages}
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
                ref={mainSwiper}
                breakpoints={{
                    991: {
                        slidesPerView: 1,
                        height: 640,
                        direction: 'vertical',
                    },
                    0: {
                        slidesPerView: 1,
                        direction: 'horizontal',

                    },
                }}
                thumbs={{ swiper: thumbsSwiper }}
                cssMode
                autoHeight
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
