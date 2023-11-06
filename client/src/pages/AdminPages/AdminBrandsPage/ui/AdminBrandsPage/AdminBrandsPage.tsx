import cls from './AdminBrandsPage.module.scss';
import { AdminBrandsList } from '../AdminBrandsList/AdminBrandsList.tsx';
import { WrapperAdminPage } from '@/widgets/WrapperAdminPage';


const AdminBrandsPage = () => {

    return (
        <div className={cls.AdminBrandsPage}>
            <WrapperAdminPage activeLink="brands">
                <AdminBrandsList />
            </WrapperAdminPage>
        </div>
    );
};

export default AdminBrandsPage;
