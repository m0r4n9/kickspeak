import { memo } from 'react';
import { Drawer } from '@/shared/ui/Drawer/Drawer.tsx';
import LoginForm from "@/features/Auth/AuthUser/ui/LoginForm/LoginForm.tsx";

interface LoginDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LoginDrawer = memo((props: LoginDrawerProps) => {
    const { isOpen, onClose } = props;

    return (
        <Drawer isOpen={isOpen} onClose={onClose}>
            <LoginForm onSuccess={onClose}/>
        </Drawer>
    );
});
