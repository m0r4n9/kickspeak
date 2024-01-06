import cls from './AdminBrandEditPage.module.scss';
import { useParams } from 'react-router-dom';
import { WrapperAdminPage } from '@/widgets/WrapperAdminPage';
import { EditBrand } from '../EditBrand/EditBrand.tsx';
import { VStack } from '@/shared/ui/Stack';

const AdminBrandEditPage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className={cls.AdminBrandDetailsPage}>
            <WrapperAdminPage activeLink="brands">
                <VStack gap="16" max className={cls.container}>
                    <EditBrand id={id} />
                </VStack>
            </WrapperAdminPage>
        </div>
    );
};

export default AdminBrandEditPage;
