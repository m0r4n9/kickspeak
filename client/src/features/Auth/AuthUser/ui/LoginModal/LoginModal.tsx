import { memo } from 'react';
import LoginForm from '../LoginForm/LoginForm.tsx';
import { Modal } from '@/shared/ui/Modal';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = memo((props: LoginModalProps) => {
    const { isOpen, onClose } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose} lazy>
            <LoginForm isOpen={isOpen} onSuccess={onClose} />
        </Modal>
    );
});
