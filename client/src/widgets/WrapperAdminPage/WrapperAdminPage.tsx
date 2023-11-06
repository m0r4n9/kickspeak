import { ReactNode } from 'react';
import cls from './WrapperAdminPage.module.scss';
import { AdminSidebar } from '@/widgets/AdminSidebar';
import { HStack } from '@/shared/ui/Stack';
import { idItems } from '@/widgets/AdminSidebar';

interface WrapperAdminPageProps {
    children: ReactNode;
    activeLink: idItems;
}

export const WrapperAdminPage = (props: WrapperAdminPageProps) => {
    const { children, activeLink } = props;

    return (
        <HStack
            justify="between"
            align="start"
            gap="16"
            max
            className={cls.WrapperAdminPage}
        >
            <AdminSidebar activeElement={activeLink} />
            {children}
        </HStack>
    );
};
