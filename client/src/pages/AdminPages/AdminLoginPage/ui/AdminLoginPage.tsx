import { HStack, VStack } from '@/shared/ui/Stack';
import cls from './AdminLoginPage.module.scss';
import { SignInAdmin } from '@/features/Auth/AuthAdmin';

export const AdminLoginPage = () => {
    return (
        <HStack align="center" justify="center" className={cls.AdminLoginPage}>
            <div className={cls.content}>
                <VStack gap="16" max>
                    <h2>Вход в панель администратора.</h2>
                    <SignInAdmin />
                </VStack>
            </div>
        </HStack>
    );
};

export default AdminLoginPage;
