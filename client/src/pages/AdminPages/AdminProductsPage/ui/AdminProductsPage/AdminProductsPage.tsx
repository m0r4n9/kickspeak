import cls from './AdminProductsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames.ts';

interface AdminProductsPageProps {
    className?: string;
}

const AdminProductsPage = (props: AdminProductsPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.AdminProductsPage, {}, [className])}>
            123
        </div>
    );
};

export default AdminProductsPage;
