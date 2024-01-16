import { classNames } from '@/shared/lib/classNames/classNames.ts';
import cls from './LoginForm.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { DynamicModuleLoader } from '@/shared/lib/components';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader.tsx';
import { loginActions, loginReducer } from '../../model/slice/loginSlice.ts';
import { useSelector } from 'react-redux';
import { getLoginEmail } from '../../model/selectors/getLoginEmail/getLoginEmail.ts';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword.ts';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading.ts';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError.ts';
import { loginByEmail } from '../../model/services/loginByEmail.ts';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { registrationUser } from '../../model/services/registrationUser.ts';
import { fetchCarts } from '@/entities/Cart';

interface LoginFormProps {
    className?: string;
    isOpen?: boolean;
    onSuccess: () => void;
    registrationForm?: boolean;
}

const reducersList: ReducerList = {
    loginForm: loginReducer,
};

export const LoginForm = (props: LoginFormProps) => {
    const { className, isOpen, onSuccess, registrationForm = true } = props;
    const dispatch = useAppDispatch();
    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const [loginContent, setLoginContent] = useState(true);
    const isLoading = useSelector(getLoginIsLoading);

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(loginActions.setEmail(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByEmail({ email, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            dispatch(fetchCarts());
            onSuccess();
        }
    }, [dispatch, password, email]);

    const onRegistrationClick = useCallback(async () => {
        const result = await dispatch(registrationUser({ email, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, password, email]);

    const onKeyDown = async (e: KeyboardEvent) => {
        if (e.key == 'Enter') {
            await onLoginClick();
        }
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    const content = loginContent ? (
        <>
            <Text title="Авторизация" />
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
            <Input
                value={email}
                placeholder="Введите почтовый адресс"
                onChange={onChangeEmail}
                variant="underline"
                autoFocus
                fullWidth
            />
            <Input
                value={password}
                type="password"
                placeholder="Введите пароль"
                onChange={onChangePassword}
                variant="underline"
                fullWidth
            />
            <HStack max gap="8" justify="end">
                {registrationForm && (
                    <Button
                        onClick={() => setLoginContent(false)}
                        variant="clear"
                        disabled={isLoading}
                        className={cls.Button}
                    >
                        Нет аккаунта?
                    </Button>
                )}

                <Button
                    variant="border"
                    onClick={onLoginClick}
                    disabled={isLoading}
                    className={cls.Button}
                >
                    Войти
                </Button>
            </HStack>
        </>
    ) : (
        <>
            <Text title="Регистрация" />
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
            <Input
                value={email}
                placeholder="Введите почтовый адресс"
                onChange={onChangeEmail}
                variant="underline"
                fullWidth
            />
            <Input
                value={password}
                placeholder="Введите пароль"
                onChange={onChangePassword}
                variant="underline"
                fullWidth
            />
            <HStack max gap="8" justify="end">
                <Button
                    onClick={() => setLoginContent(true)}
                    variant="clear"
                    disabled={isLoading}
                    className={cls.Button}
                >
                    Есть аккаунт?
                </Button>
                <Button
                    variant="border"
                    onClick={onRegistrationClick}
                    disabled={isLoading}
                    className={cls.Button}
                >
                    Зарегестрироваться
                </Button>
            </HStack>
        </>
    );

    return (
        <DynamicModuleLoader reducers={reducersList} removeAfterUnmount={true}>
            <VStack
                gap="24"
                className={classNames(cls.LoginForm, {}, [className])}
            >
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
};

export default LoginForm;
