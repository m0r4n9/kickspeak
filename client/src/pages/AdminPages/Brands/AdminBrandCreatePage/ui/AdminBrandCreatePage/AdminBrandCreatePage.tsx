import cls from './AdminBrandCreatePage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { DynamicModuleLoader } from '@/shared/lib/components';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader.tsx';
import {
    brandCreateActions,
    brandCreateReducer,
} from '../../model/slice/brandCreateSlice.ts';
import { HStack, VStack } from '@/shared/ui/Stack';
import { WrapperAdminPage } from '@/widgets/WrapperAdminPage';
import { AdminFooter } from '@/features/Admin/adminFooter';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useCallback, useState } from 'react';
import { createBrand } from '../../model/services/createBrand.ts';
import { useSelector } from 'react-redux';
import { getBrandCreateName } from '../../model/selectors/getBrandCreateName/getBrandCreateName.ts';
import { getBrandCreateFoundation } from '../../model/selectors/getBrandCreateFoundation/getBrandCreateFoundation.ts';
import { getBrandCreateCountry } from '../../model/selectors/getBrandCreateCountry/getBrandCreateCountry.ts';
import { ReactComponent as DnDIcon } from '@/shared/assets/icons/drag-drop.svg';
import { useNavigate } from 'react-router-dom';
import { getRouteAdminBrandDetails } from '@/shared/const/route.ts';
import { getBrandCreateErrors } from '@/pages/AdminPages/Brands/AdminBrandCreatePage/model/selectors/getBrandCreateErrors/getBrandCreateErrors.ts';
import { DragAndDrop } from '@/shared/ui/DragAndDrop';

interface AdminBrandCreateProps {
    className?: string;
}

const reducer: ReducerList = {
    adminBrandCreate: brandCreateReducer,
};

const AdminBrandCreatePage = (props: AdminBrandCreateProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const name = useSelector(getBrandCreateName) || '';
    const foundation = useSelector(getBrandCreateFoundation) || '';
    const country = useSelector(getBrandCreateCountry) || '';
    const errors = useSelector(getBrandCreateErrors);
    const navigate = useNavigate();
    const [logo, setLogo] = useState<File>();

    const onChangeName = useCallback((value: string) => {
        dispatch(brandCreateActions.setName(value));
    }, []);

    const onChangeFoundation = useCallback((value: string) => {
        if (/^\d*$/.test(value)) {
            dispatch(brandCreateActions.setFoundation(value));
        }
    }, []);

    const onChangeCountry = useCallback((value: string) => {
        dispatch(brandCreateActions.setCountry(value));
    }, []);

    const saveBrand = useCallback(() => {
        dispatch(createBrand({ logo })).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                navigate(getRouteAdminBrandDetails(res.payload as string));
            }
        });
    }, [logo]);

    const cancelCreate = useCallback(() => {
        dispatch(brandCreateActions.clearFields());
    }, []);

    return (
        <DynamicModuleLoader reducers={reducer}>
            <WrapperAdminPage activeLink="brands">
                <div className={cls.wrapperAdminBrandCreate}>
                    <VStack
                        max
                        className={classNames(cls.AdminBrandCreate, {}, [
                            className,
                        ])}
                    >
                        <div className={cls.containerTitle}>
                            <h1>Добавить бренд</h1>
                        </div>
                        {errors && (
                            <div style={{ color: 'red' }}>{errors.message}</div>
                        )}
                        <VStack max gap="16" className={cls.form}>
                            <HStack
                                justify="between"
                                className={cls.wrapperInput}
                            >
                                <label htmlFor="brand-name">
                                    Название компании:
                                </label>
                                <input
                                    id="brand-name"
                                    name="name"
                                    placeholder="Введите название"
                                    value={name}
                                    onChange={(e) =>
                                        onChangeName(e.target.value)
                                    }
                                />
                            </HStack>

                            <HStack
                                justify="between"
                                className={cls.wrapperInput}
                            >
                                <label htmlFor="brand-foundation">
                                    Дата основания:
                                </label>
                                <input
                                    id="brand-foundation"
                                    name="foundation"
                                    placeholder={new Date()
                                        .getFullYear()
                                        .toString()}
                                    value={foundation}
                                    onChange={(e) =>
                                        onChangeFoundation(e.target.value)
                                    }
                                />
                            </HStack>

                            <HStack
                                justify="between"
                                className={cls.wrapperInput}
                            >
                                <label htmlFor="brand-country">Страна:</label>
                                <input
                                    id="brand-country"
                                    name="country"
                                    placeholder="Страна компании"
                                    value={country}
                                    onChange={(e) =>
                                        onChangeCountry(e.target.value)
                                    }
                                />
                            </HStack>
                            <DragAndDrop
                                image={logo}
                                setImage={setLogo}
                                svg={<DnDIcon />}
                            />
                        </VStack>
                    </VStack>

                    <AdminFooter
                        onUpdate={saveBrand}
                        onCancelEdit={cancelCreate}
                        className={cls.adminFooter}
                    />
                </div>
            </WrapperAdminPage>
        </DynamicModuleLoader>
    );
};

export default AdminBrandCreatePage;
