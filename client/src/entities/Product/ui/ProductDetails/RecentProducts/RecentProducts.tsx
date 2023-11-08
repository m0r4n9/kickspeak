import { memo, useCallback, useRef } from 'react';
import cls from './RecentProducts.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { Product } from '../../../model/types/product.ts';
import { HStack } from '@/shared/ui/Stack';
import { ProductItem } from '../../ProductItem/ProductItem.tsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

interface RecentProductsProps {
    className?: string;
    recentProducts?: Product[];
    addProductCart?: (productId: number, sizeId: number) => void;
}

export const RecentProducts = memo((props: RecentProductsProps) => {
    const { className, recentProducts, addProductCart } = props;
    const swiperRef = useRef(null) as any;

    const handlePrev = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current.swiper.slideNext();
    }, []);

    return (
        <div className={classNames(cls.RecentProducts, {}, [className])}>
            <HStack
                justify="between"
                style={{ fontSize: 18, marginTop: 40, padding: 5 }}
            >
                Недавно просмотренные
                <HStack gap="8">
                    <div onClick={handlePrev}>Prev</div>
                    <div onClick={handleNext}>Next</div>
                </HStack>
            </HStack>
            <HStack
                justify="start"
                align="stretch"
                max
                className={cls.containerListProducts}
            >
                <Swiper
                    ref={swiperRef}
                    slidesPerView={3}
                    slidesPerGroup={1}
                    autoHeight={true}
                    modules={[Pagination, Navigation]}
                    className={cls.listProducts}
                >
                    {recentProducts?.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductItem
                                key={product.id}
                                product={product}
                                addProductCart={addProductCart}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </HStack>
        </div>
    );
});
