import { memo, Suspense } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async.tsx';
import LoginForm from "@/features/Auth/AuthUser/ui/LoginForm/LoginForm.tsx";

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = memo((props: LoginModalProps) => {
    const { className, onClose, isOpen } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose} lazy>
                <LoginForm onSuccess={onClose} />
        </Modal>
    );
});
