import { useCallback, useState } from 'react';
import { LoginForm } from '../index.ts';
import { Drawer } from '@/shared/ui/Drawer/Drawer.tsx';
import { Dropdown } from '@/shared/ui/Dropdown';
import { SignUpForm } from './SignUpForm/SignUpForm.tsx';

interface AuthUserProps {
    isMatch: boolean;
    isOpen: boolean;
    onClose: () => void;
}

export type StageAuth = 'signIn' | 'signUp';

export const AuthUser = (props: AuthUserProps) => {
    const { isMatch, isOpen, onClose } = props;
    const [stage, setStage] = useState<StageAuth>('signIn');

    const changeStage = useCallback((newStage: StageAuth) => {
        setStage(newStage);
    }, []);

    const content =
        stage === 'signIn' ? (
            <LoginForm onSuccess={onClose} changeStage={changeStage} />
        ) : (
            <SignUpForm onSuccess={onClose} changeStage={changeStage} />
        );

    if (isMatch) {
        return (
            <Drawer isOpen={isOpen} onClose={onClose}>
                {content}
            </Drawer>
        );
    }

    return (
        <Dropdown isOpen={isOpen} onClose={onClose}>
            {content}
        </Dropdown>
    );
};
