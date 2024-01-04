import cls from './AdminProductEditPage.module.scss';
import {
    DynamicModuleLoader,
    ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader.tsx';
import { adminProductDetailsReducer } from '../../model/slice/adminProductDetailsSlice.ts';
import { WrapperAdminPage } from '@/widgets/WrapperAdminPage';
import { VStack } from '@/shared/ui/Stack';
import { ProductEdit } from '../ProductEdit/ProductEdit.tsx';
import { useParams } from 'react-router-dom';

const reducer: ReducerList = {
    adminProductDetails: adminProductDetailsReducer,
};

export const AdminProductEditPage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <DynamicModuleLoader reducers={reducer}>
            <WrapperAdminPage activeLink="products">
                <VStack gap="16" max className={cls.AdminProductEditPage}>
                    <ProductEdit id={id} />
                </VStack>
            </WrapperAdminPage>
        </DynamicModuleLoader>
    );
};

export default AdminProductEditPage;
