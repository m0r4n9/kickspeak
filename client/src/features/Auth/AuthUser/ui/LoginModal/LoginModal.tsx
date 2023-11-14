import { memo } from 'react';
import { Modal } from '@/shared/ui/Modal';
import LoginForm from '@/features/Auth/AuthUser/ui/LoginForm/LoginForm.tsx';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = memo((props: LoginModalProps) => {
    const {  isOpen, onClose } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose} lazy>
            <LoginForm onSuccess={onClose} />
        </Modal>
    );
});
