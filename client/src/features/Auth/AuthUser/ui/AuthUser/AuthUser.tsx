import { LoginDrawer } from '../LoginDrawer/LoginDrawer.tsx';
import { LoginModal } from '../LoginModal/LoginModal.tsx';

interface AuthUserProps {
    isMatch: boolean;
    isOpen: boolean;
    onClose: () => void;
}

export const AuthUser = (props: AuthUserProps) => {
    const { isMatch, isOpen, onClose } = props;
    return isMatch ? (
        <LoginDrawer isOpen={isOpen} onClose={onClose} />
    ) : (
        <LoginModal isOpen={isOpen} onClose={onClose} />
    );
};
