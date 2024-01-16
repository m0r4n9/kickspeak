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
import { IMG_BASE_URL } from '@/shared/api/api.ts';
import { notification } from 'antd';
import type { IconType } from 'antd/es/notification/interface';
import { useNavigate } from 'react-router-dom';
import { deleteBrand } from '../../model/services/deleteBrand.ts';
import { getRouteAdminBrands } from '@/shared/const/route.ts';

interface EditBrandProps {
    className?: string;
    id?: string;
}

const reducer: ReducerList = {
    adminBrandDetails: adminBrandDetailsReducer,
};

const key = 'updatable';

export const EditBrand = memo((props: EditBrandProps) => {
    const { className, id } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const brandData = useSelector(getAdminBrandDetailsData);
    const brandForm = useSelector(getAdminBrandDetailsForm);
    const [brandLogo, setBrandLogo] = useState<File>();
    const [logoUrl, setLogoUrl] = useState<string>();
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type: IconType) => {
        api.open({
            key,
            message: 'Успешно!',
            description: 'Данные обновлены.',
            type,
            duration: 2,
        });
    };

    useEffect(() => {
        if (brandData?.logo) setLogoUrl(IMG_BASE_URL + brandData?.logo);
    }, [brandData]);

    useEffect(() => {
        if (id) dispatch(fetchBrandById({ id }));
    }, []);

    const cancelEdit = useCallback(() => {
        dispatch(adminBrandDetailsActions.cancelEdit());
        setLogoUrl(IMG_BASE_URL + brandData?.logo);
    }, [brandData]);

    const onUpdateBrand = useCallback(() => {
        let logo = brandLogo ? { logo: brandLogo } : {};
        dispatch(updateBrand(logo)).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                openNotification('success');
            } else if (res.meta.requestStatus === 'rejected') {
                openNotification('error');
            }
        });
    }, [brandLogo]);

    const onDeleteBrand = useCallback(() => {
        dispatch(deleteBrand()).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                navigate(getRouteAdminBrands());
            }
        });
    }, []);

    const handleEditName = useCallback((value: string) => {
        dispatch(adminBrandDetailsActions.updateName(value || ''));
    }, []);

    // TODO: Refactor input price for Product
    const handleEditFoundation = useCallback((value: string) => {
        if (/^\d*$/.test(value)) {
            dispatch(adminBrandDetailsActions.updateFoundation(value || ''));
        }
    }, []);

    const handleEditCountry = useCallback((value: string) => {
        dispatch(adminBrandDetailsActions.updateCountry(value || ''));
    }, []);

    return (
        <DynamicModuleLoader reducers={reducer}>
            <VStack className={classNames(cls.EditBrand, {}, [className])}>
                <div className={cls.containerEditBrand}>
                    <div></div>
                    <VStack gap="16" max className={cls.containerTitle}>
                        {contextHolder}
                        <h1>Изменение компании</h1>
                        <h2>Индификатор: {brandData?.id}</h2>
                    </VStack>
                    <EditBrandCard
                        name={brandForm?.name}
                        foundation={brandForm?.foundation}
                        country={brandForm?.country}
                        urlLogo={logoUrl}
                        setUrlLogo={setLogoUrl}
                        setLogo={setBrandLogo}
                        onChangeName={handleEditName}
                        onChangeFoundation={handleEditFoundation}
                        onChangeCounty={handleEditCountry}
                    />
                </div>

                <AdminFooter
                    onUpdate={onUpdateBrand}
                    onCancelEdit={cancelEdit}
                    onDelete={onDeleteBrand}
                />
            </VStack>
        </DynamicModuleLoader>
    );
});
