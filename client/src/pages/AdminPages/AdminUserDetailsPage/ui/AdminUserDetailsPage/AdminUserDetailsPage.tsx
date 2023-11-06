import { useParams } from 'react-router-dom';
import { WrapperAdminPage } from '@/widgets/WrapperAdminPage';
import { EditUser } from '@/features/AdminEdit/EditUser';

const AdminUserDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <WrapperAdminPage activeLink="users">
            <EditUser id={id} />
        </WrapperAdminPage>
    );
};

export default AdminUserDetailsPage;
