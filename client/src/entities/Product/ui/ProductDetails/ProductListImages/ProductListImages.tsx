import { memo, useState } from 'react';
import cls from './ProductListImages.module.scss';
import { Product } from '../../../model/types/product.ts';
import { AppImage } from '@/shared/ui/AppImage';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    FreeMode,
    Keyboard,
    Mousewheel,
    Navigation,
    Thumbs,
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useIsMath } from '@/shared/hooks/useIsMath';

interface ProductListImages {
    product?: Product;
}

export const ProductListImages = memo(({ product }: ProductListImages) => {
    const { isMatch } = useIsMath();
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [active, setActive] = useState(0);

    return (
        <div className={cls.leftBar}>
            <div className={cls.swiper}>
                <Swiper
                    slidesPerView={6}
                    spaceBetween={20}
                    width={300}
                    height={400}
                    className={cls.leftImages}
                    direction={isMatch ? 'horizontal' : 'vertical'}
                    modules={[FreeMode, Navigation, Thumbs]}
                    onSwiper={(swiper) => {
                        setThumbsSwiper(swiper);
                    }}
                >
                    {product?.Images.map((image, index) => (
                        <SwiperSlide key={image.id}>
                            <div
                                style={{
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    overflow: 'hidden',
                                    borderRadius: 4,
                                    position: 'relative',
                                }}
                            >
                                <AppImage
                                    key={image.id}
                                    src={image.url}
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
                cssMode={true}
                height={640}
                mousewheel={true}
                autoHeight={true}
                direction={isMatch ? 'horizontal' : 'vertical'}
                modules={[Thumbs, Mousewheel, Keyboard]}
                className={cls.wrapperMainImage}
                onSlideChange={(swiper) => {
                    setActive(swiper.activeIndex);
                }}
            >
                {product?.Images.map((image, index) => (
                    <SwiperSlide key={image.id}>
                        <div style={{ position: 'relative' }}>
                            <div
                                style={{
                                    display: 'block',
                                    height: '100%',
                                    width: '100%',
                                    paddingTop: '100%',
                                }}
                            >
                                <AppImage
                                    key={image.id}
                                    src={image.url}
                                    alt=""
                                    className={cls.mainImage}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
});
