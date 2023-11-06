import cls from './AdminUsersPage.module.scss';
import { WrapperAdminPage } from '@/widgets/WrapperAdminPage';
import { AdminUsersList } from '../AdminUsersList/AdminUsersList.tsx';

const AdminUsersPage = () => {
    return (
        <div className={cls.AdminUsersPage}>
            <WrapperAdminPage activeLink="users">
                <AdminUsersList />
            </WrapperAdminPage>
        </div>
    );
};

export default AdminUsersPage;
