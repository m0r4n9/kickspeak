import { memo, useEffect } from 'react';
import cls from './ProductsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { productsPageReducer } from '../../model/slice/productsPageSlice.ts';
import { initProductsPage } from '../../model/services/initProductsPage/initProductsPage.ts';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useSearchParams } from 'react-router-dom';
import { ProductsInfiniteList } from '../ProductsInfiniteList/ProductsInfiniteList.tsx';
import { HStack } from '@/shared/ui/Stack';
import { NavToolbar } from '@/shared/ui/NavToolbar';
import { getRouteCatalog, getRouteMain } from '@/shared/const/route.ts';
import { Page } from '@/widgets/Page';
import { NavLinkToolbar } from '@/shared/ui/NavToolbar/NavToolbar.tsx';
import {
    DynamicModuleLoader,
    ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader.tsx';
import { ProductPageFilters } from '../ProductPageFilters/ProductPageFilters.tsx';
import { ProductPageOrder } from '../ProductPageOrder/ProductPageOrder.tsx';
import { ProductsPageMobileHeader } from '@/pages/ProductsPage/ui/ProductsPageMobileHeader/ProductsPageMobileHeader.tsx';
import { useIsMath } from '@/shared/hooks/useIsMath';

interface ProductsPageProps {
    className?: string;
}

const reducers: ReducerList = {
    productsPage: productsPageReducer,
};

const ProductsLinks: NavLinkToolbar[] = [
    {
        content: 'Главная',
        href: getRouteMain(),
    },
    {
        content: 'Каталог',
        href: getRouteCatalog(),
    },
];

const ProductsPage = (props: ProductsPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const { isMatch } = useIsMath();

    useEffect(() => {
        dispatch(initProductsPage(searchParams));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(cls.wrapperMenPage, {}, [className])}>
                <div className={cls.MenPage}>
                    {isMatch ? (
                        <ProductsPageMobileHeader />
                    ) : (
                        <HStack max justify="between" style={{ padding: 20 }}>
                            <NavToolbar links={ProductsLinks} />
                            <ProductPageOrder isMobile={isMatch} />
                        </HStack>
                    )}

                    {isMatch ? (
                        <div style={{ paddingTop: 70 }}>
                            <ProductsInfiniteList />
                        </div>
                    ) : (
                        <div className={cls.wrapperContent}>
                            <div className={cls.left}>
                                <ProductPageFilters />
                            </div>

                            <div className={cls.content}>
                                <ProductsInfiniteList />
                            </div>
                        </div>
                    )}
                </div>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ProductsPage);
