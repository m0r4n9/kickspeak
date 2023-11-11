import cls from './AdminBrandsPage.module.scss';
import { WrapperAdminPage } from '@/widgets/WrapperAdminPage';
import {
    DynamicModuleLoader,
    ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader.tsx';
import { adminBrandReducer } from '@/pages/AdminPages/Brands/AdminBrandsPage';
import {AdminBrandsContent} from "../AdminBrandsContent/AdminBrandsContent.tsx";

const reducer: ReducerList = {
    adminBrands: adminBrandReducer,
};

const AdminBrandsPage = () => {
    return (
        <DynamicModuleLoader reducers={reducer} removeAfterUnmount={false}>
            <div className={cls.AdminBrandsPage}>
                <WrapperAdminPage activeLink="brands">
                    <AdminBrandsContent/>
                </WrapperAdminPage>
            </div>
        </DynamicModuleLoader>
    );
};

export default AdminBrandsPage;
