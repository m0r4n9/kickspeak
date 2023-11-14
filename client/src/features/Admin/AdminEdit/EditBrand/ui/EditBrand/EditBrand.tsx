import { memo, useCallback, useEffect, useState } from 'react';
import cls from './EditBrand.module.scss';
import { fetchBrandById } from '../../model/services/fetchBrandById.ts';
import {
    adminBrandDetailsActions,
    adminBrandDetailsReducer,
} from '../../model/slice/adminBrandDetailsSlice.ts';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { DynamicModuleLoader } from '@/shared/lib/components';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader.tsx';
import { VStack } from '@/shared/ui/Stack';
import { useSelector } from 'react-redux';
import { getAdminBrandDetailsForm } from '../../model/selectors/getAdminBrandDetailsForm/getAdminBrandDetailsForm.ts';
import { getAdminBrandDetailsData } from '../../model/selectors/getAdminBrandDetailsData/getAdminBrandDetailsData.ts';
import { EditBrandCard } from '../EditBrandCard/EditBrandCard.tsx';
import { AdminFooter } from '@/features/Admin/adminFooter';
import { updateBrand } from '../../model/services/updateBrand.ts';

interface EditBrandProps {
    className?: string;
    id?: string;
}

const reducer: ReducerList = {
    adminBrandDetails: adminBrandDetailsReducer,
};

export const EditBrand = memo((props: EditBrandProps) => {
    const { className, id } = props;
    const dispatch = useAppDispatch();
    const brandData = useSelector(getAdminBrandDetailsData);
    const brandForm = useSelector(getAdminBrandDetailsForm);
    const [brandLogo, setBrandLogo] = useState<File>();

    useEffect(() => {
        if (id) dispatch(fetchBrandById({ id }));
    }, []);

    const cancelEdit = useCallback(() => {
        dispatch(adminBrandDetailsActions.cancelEdit());
    }, []);

    const onUpdateBrand = useCallback(() => {
        if (brandLogo) {
            dispatch(
                updateBrand({
                    logo: brandLogo,
                }),
            );
            return;
        }
        dispatch(updateBrand({}));
    }, [brandLogo]);

    const handleEditName = useCallback((value: string) => {
        dispatch(
            adminBrandDetailsActions.updateBrand({
                name: value || '',
            }),
        );
    }, []);

    const handleEditFoundation = useCallback((value: string) => {
        if (/^\d*$/.test(value)) {
            dispatch(
                adminBrandDetailsActions.updateBrand({
                    foundation: value || '',
                }),
            );
        }
    }, []);

    const handleEditCountry = useCallback((value: string) => {
        dispatch(
            adminBrandDetailsActions.updateBrand({
                country: value || '',
            }),
        );
    }, []);

    return (
        <DynamicModuleLoader reducers={reducer}>
            <VStack className={classNames(cls.EditBrand, {}, [className])}>
                <div className={cls.containerEditBrand}>
                    <VStack gap="16" max className={cls.containerTitle}>
                        <h1>Изменение компании</h1>
                        <h2>Индификатор: {brandData?.id}</h2>
                    </VStack>
                    <EditBrandCard
                        name={brandForm?.name}
                        foundation={brandForm?.foundation}
                        country={brandForm?.country}
                        urlLogo={brandData?.logo}
                        logo={brandLogo}
                        setLogo={setBrandLogo}
                        onChangeName={handleEditName}
                        onChangeFoundation={handleEditFoundation}
                        onChangeCounty={handleEditCountry}
                    />
                </div>

                <AdminFooter
                    onUpdate={onUpdateBrand}
                    onCancelEdit={cancelEdit}
                />
            </VStack>
        </DynamicModuleLoader>
    );
});
