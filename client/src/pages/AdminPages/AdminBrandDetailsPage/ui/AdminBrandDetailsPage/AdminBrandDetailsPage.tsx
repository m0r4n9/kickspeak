import cls from './AdminBrandDetailsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';
import { useParams } from 'react-router-dom';

interface AdminBrandDetailsPageProps {
    className?: string;
}

const AdminBrandDetailsPage = (props: AdminBrandDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();


    return (
        <div className={classNames(cls.AdminBrandDetailsPage, {}, [className])}>
            <h1>It is details brand {id}</h1>
        </div>
    );
};

export default AdminBrandDetailsPage;
