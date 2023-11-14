import { adminproductsReducer } from '../../model/slice/adminProductsSlice.ts';
import { WrapperAdminPage } from '@/widgets/WrapperAdminPage';
import { DynamicModuleLoader } from '@/shared/lib/components';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader.tsx';
import { AdminProductsContent } from '../AdminProductsContent/AdminProductsContent.tsx';

const reducer: ReducerList = {
    adminProducts: adminproductsReducer,
};

const AdminProductsPage = () => {
    return (
        <DynamicModuleLoader reducers={reducer}>
            <div>
                <WrapperAdminPage activeLink="products">
                    <AdminProductsContent />
                </WrapperAdminPage>
            </div>
        </DynamicModuleLoader>
    );
};

export default AdminProductsPage;
