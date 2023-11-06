import cls from './BrandDetailsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { Page } from '@/widgets/Page';
import { DynamicModuleLoader } from '@/shared/lib/components';
import { useParams } from 'react-router-dom';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader.tsx';
import { brandDetailsReducer } from '../../model/slice/brandDetailsSlice.ts';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useCallback, useEffect, useMemo } from 'react';
import { fetchBrandDetails } from '@/pages/BrandDetailsPage/model/services/fetchBrandDetails.ts';
import { BrandDetailsProductsFilters } from '@/pages/BrandDetailsPage/ui/BrandDetailsProductsFilters/BrandDetailsProductsFilters.tsx';
import { HStack } from '@/shared/ui/Stack';
import { NavToolbar } from '@/shared/ui/NavToolbar';
import { NavLinkToolbar } from '@/shared/ui/NavToolbar/NavToolbar.tsx';
import { getRouteBrandsDetails, getRouteMain } from '@/shared/const/route.ts';
import { useSelector } from 'react-redux';
import { getBrandDetailsDataBrand } from '../../model/selectors/getBrandDetailsData/getBrandDetailsData.ts';
import { StickyContentLayout } from '@/shared/layouts';
import { ProductsInfiniteList } from '../ProductInfiniteList/ProductInfiniteList.tsx';
import { addProductCart } from '@/entities/Cart';

interface BrandDetailsPageProps {
    className?: string;
}

const reducer: ReducerList = {
    brandsDetails: brandDetailsReducer,
};

const BrandDetailsPage = (props: BrandDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const brandDetails = useSelector(getBrandDetailsDataBrand);

    const BrandDetailsLinks: NavLinkToolbar[] = useMemo(
        () => [
            {
                content: 'Главная',
                href: getRouteMain(),
            },
            {
                content: brandDetails?.name || '',
                href: getRouteBrandsDetails(brandDetails?.id.toString() || '0'),
            },
        ],
        [brandDetails],
    );

    useEffect(() => {
        if (id) dispatch(fetchBrandDetails(id));
    }, [id]);

    const addProduct = useCallback(
        (productId: number, sizeId: number) => {
            dispatch(
                addProductCart({
                    productId,
                    sizeId,
                }),
            );
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducer}>
            <Page
                className={classNames(cls.wrapperBrandDetailsPage, {}, [
                    className,
                ])}
            >
                <div className={cls.BrandDetailsPage}>
                    <HStack max justify="between" style={{ padding: 20 }}>
                        <NavToolbar links={BrandDetailsLinks} />
                    </HStack>
                    <StickyContentLayout
                        left={<BrandDetailsProductsFilters brandId={id} />}
                        content={
                            <ProductsInfiniteList
                                brand={brandDetails}
                                addProductCart={addProduct}
                            />
                        }
                    />
                </div>
            </Page>
        </DynamicModuleLoader>
    );
};

export default BrandDetailsPage;
