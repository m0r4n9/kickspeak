import cls from './BrandDetailsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { Page } from '@/widgets/Page';
import { DynamicModuleLoader } from '@/shared/lib/components';
import { useParams } from 'react-router-dom';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader.tsx';
import { brandDetailsReducer } from '../../model/slice/brandDetailsSlice.ts';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useEffect } from 'react';
import { fetchBrandDetails } from '@/pages/BrandDetailsPage/model/services/fetchBrandDetails.ts';
import { BrandDetailsProductsFilters } from '@/pages/BrandDetailsPage/ui/BrandDetailsProductsFilters/BrandDetailsProductsFilters.tsx';
import { StickyContentLayout } from '@/shared/layouts';
import { ProductsInfiniteList } from '../ProductInfiniteList/ProductInfiniteList.tsx';

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

    useEffect(() => {
        if (id) dispatch(fetchBrandDetails(id));
    }, [id]);

    return (
        <DynamicModuleLoader reducers={reducer}>
            <Page
                className={classNames(cls.wrapperBrandDetailsPage, {}, [
                    className,
                ])}
            >
                <div className={cls.BrandDetailsPage}>
                    <StickyContentLayout
                        left={<BrandDetailsProductsFilters brandId={id} />}
                        content={<ProductsInfiniteList />}
                    />
                </div>
            </Page>
        </DynamicModuleLoader>
    );
};

export default BrandDetailsPage;
