import cls from './AdminUsersPage.module.scss';
import { WrapperAdminPage } from '@/widgets/WrapperAdminPage';
import { DynamicModuleLoader } from '@/shared/lib/components';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader.tsx';
import { adminUsersReducer } from '@/pages/AdminPages/Users/AdminUsersPage/model/slice/adminUsersSlice.ts';
import { AdminUsersContent } from '../AdminUsersContent/AdminUsersContent.tsx';

const reducer: ReducerList = {
    adminUsers: adminUsersReducer,
};

const AdminUsersPage = () => {
    return (
        <DynamicModuleLoader reducers={reducer}>
            <div className={cls.AdminUsersPage}>
                <WrapperAdminPage activeLink="users">
                    <AdminUsersContent />
                </WrapperAdminPage>
            </div>
        </DynamicModuleLoader>
    );
};

export default AdminUsersPage;
