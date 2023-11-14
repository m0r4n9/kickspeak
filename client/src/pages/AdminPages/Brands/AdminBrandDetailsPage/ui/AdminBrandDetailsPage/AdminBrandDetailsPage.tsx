import cls from './AdminBrandDetailsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { useParams } from 'react-router-dom';
import { WrapperAdminPage } from '@/widgets/WrapperAdminPage';
import { EditBrand } from '@/features/Admin/AdminEdit/EditBrand';
import {HStack, VStack} from "@/shared/ui/Stack";
import {Button} from "@/shared/ui/Button";

interface AdminBrandDetailsPageProps {
    className?: string;
}

const AdminBrandDetailsPage = (props: AdminBrandDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();

    return (
        <div className={classNames(cls.AdminBrandDetailsPage, {}, [className])}>
            <WrapperAdminPage activeLink="brands">
                <VStack gap="16" max className={cls.container}>
                    <EditBrand id={id}/>

                </VStack>
            </WrapperAdminPage>
        </div>
    );
};

export default AdminBrandDetailsPage;
