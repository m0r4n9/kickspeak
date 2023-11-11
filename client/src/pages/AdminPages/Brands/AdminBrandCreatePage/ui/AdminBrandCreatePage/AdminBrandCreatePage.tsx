import cls from './AdminBrandCreatePage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { DynamicModuleLoader } from '@/shared/lib/components';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader.tsx';
import {
    brandCreateActions,
    brandCreateReducer,
} from '../../model/slice/brandCreateSlice.ts';
import { VStack } from '@/shared/ui/Stack';
import { WrapperAdminPage } from '@/widgets/WrapperAdminPage';
import { AdminFooter } from '@/features/Admin/adminFooter';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useCallback, useState } from 'react';
import { createBrand } from '../../model/services/createBrand.ts';

interface AdminBrandCreateProps {
    className?: string;
}

const reducer: ReducerList = {
    adminBrandCreate: brandCreateReducer,
};

const AdminBrandCreatePage = (props: AdminBrandCreateProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [logo, setLogo] = useState<File>();

    console.log(logo);

    const onChangeName = useCallback((value: string) => {
        dispatch(brandCreateActions.setName(value));
    }, []);

    const onChangeFoundation = useCallback((value: string) => {
        dispatch(brandCreateActions.setFoundation(Number(value)));
    }, []);

    const onChangeCountry = useCallback((value: string) => {
        dispatch(brandCreateActions.setCountry(value));
    }, []);

    const addLogo = useCallback((logo?: File) => {
        if (logo) setLogo(logo);
    }, []);

    const saveBrand = useCallback(() => {
        dispatch(createBrand({ logo }));
    }, [logo]);

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
                        <form></form>
                        <VStack max gap="16" className={cls.form}>
                            <div className={cls.wrapperInput}>
                                <label htmlFor="brand-name">
                                    Название компании:
                                </label>
                                <input
                                    id="brand-name"
                                    name="name"
                                    onChange={(e) => onChangeName(e.target.value)}
                                />
                            </div>

                            <div className={cls.wrapperInput}>
                                <label htmlFor="brand-foundation">
                                    Дата основания:
                                </label>
                                <input
                                    id="brand-foundation"
                                    name="foundation"
                                    type="number"
                                    onChange={(e) =>
                                        onChangeFoundation(e.target.value)
                                    }
                                />
                            </div>

                            <div className={cls.wrapperInput}>
                                <label htmlFor="brand-country">Страна:</label>
                                <input
                                    id="brand-country"
                                    name="country"
                                    onChange={(e) =>
                                        onChangeCountry(e.target.value)
                                    }
                                />
                            </div>

                            <div className={cls.wrapperInput}>
                                <input
                                    type="file"
                                    id="logo"
                                    name="logo"
                                    className={cls.fileInput}
                                    onChange={(e) => addLogo(e.target.files?.[0])}
                                    accept="image/png, image/jpeg"
                                />
                                <label htmlFor="logo">{logo?.name}</label>
                            </div>
                        </VStack>
                    </VStack>

                    <AdminFooter onUpdate={saveBrand} />
                </div>

            </WrapperAdminPage>
        </DynamicModuleLoader>
    );
};

export default AdminBrandCreatePage;
