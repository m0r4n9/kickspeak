import { memo, useEffect } from 'react';
import { DynamicModuleLoader } from '@/shared/lib/components';
import cls from './BrandsPage.module.scss';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader.tsx';
import {
    brandsPageReducer,
    getBrands,
} from '../../model/slice/brandsPageSlice.ts';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Brand } from '@/entities/Brand';
import { fetchBrands } from '../../model/services/fetchBrands.ts';
import { getBrandsIsPageLoading } from '../../model/selectors/getBrandsIsPageLoading/getBrandsIsPageLoading.ts';
import { getBrandsPageError } from '../../model/selectors/getBrandsPageError/getBrandsPageError.ts';
import { getRouteBrands, getRouteMain } from '@/shared/const/route.ts';
import { BrandsNavigateLetters } from '@/features/brandsNavigateLetters';
import { NavToolbar } from '@/shared/ui/NavToolbar';
import { HStack } from '@/shared/ui/Stack';
import { Loader } from '@/shared/ui/Loader';
import { Page } from '@/widgets/Page';
import { BrandsList } from '@/widgets/BrandList';

const reducers: ReducerList = {
    brandsPage: brandsPageReducer,
};

const itemsToolbar = [
    {
        content: 'Главная',
        href: getRouteMain(),
    },
    {
        content: 'Бренды',
        href: getRouteBrands(),
    },
];

export const BrandsPage = () => {
    const brands = useSelector(getBrands.selectAll);
    const isLoading = useSelector(getBrandsIsPageLoading);
    const error = useSelector(getBrandsPageError);
    const dispatch = useAppDispatch();

    const groupedBrands = brands.reduce(
        (acc, brand) => {
            const firstLetter = brand?.name?.charAt(0).toUpperCase() || '';
            acc[firstLetter] = acc[firstLetter] || [];
            acc[firstLetter].push(brand);
            return acc;
        },
        {} as Record<string, Brand[]>,
    );

    useEffect(() => {
        dispatch(fetchBrands());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={cls.test}>
                <HStack max justify="between" style={{ padding: 20 }}>
                    <NavToolbar links={itemsToolbar} />
                </HStack>
                <BrandsNavigateLetters groupedBrands={groupedBrands} />

                {isLoading ? (
                    <HStack max justify="center">
                        <Loader />
                    </HStack>
                ) : (
                    <BrandsList brands={brands} groupedBrands={groupedBrands} />
                )}
            </Page>
        </DynamicModuleLoader>
    );
};

export default BrandsPage;
