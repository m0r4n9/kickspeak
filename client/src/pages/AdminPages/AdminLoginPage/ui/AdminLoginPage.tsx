import cls from './AdminLoginPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/features/Auth/AuthUser';
import {getRouteAdminBrands, getRouteAdminUsers} from "@/shared/const/route.ts";


export const AdminLoginPage = () => {
    const navigate = useNavigate();

    return (
        <div className={cls.AdminLoginPage}>
            <div className={cls.wrapperForm}>
                <div className={cls.form}>
                    <LoginForm
                        onSuccess={() => {
                            navigate(getRouteAdminBrands());
                        }}
                        registrationForm={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
