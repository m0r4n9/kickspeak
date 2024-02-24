import { classNames } from '@/shared/lib/classNames/classNames.ts';
import cls from './LoginForm.module.scss';
import { useEffect } from 'react';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { loginByEmail } from '../../model/services/loginByEmail.ts';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/shared/ui/Input';
import { Label } from '@/shared/ui/Label';
import type { StageAuth } from '../AuthUser.tsx';

interface LoginFormProps {
    className?: string;
    isOpen?: boolean;
    onSuccess: () => void;
    changeStage?: (stage: StageAuth) => void;
}

interface IFormLogin {
    email: string;
    pass: string;
}

export const LoginForm = (props: LoginFormProps) => {
    const { className, isOpen, onSuccess, changeStage } = props;
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<IFormLogin>({
        defaultValues: {
            email: '',
            pass: '',
        },
    });
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<IFormLogin> = async ({ email, pass }) => {
        await dispatch(loginByEmail({ email, password: pass })).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') onSuccess();
        });
    };

    const onKeyDown = async (e: KeyboardEvent) => {
        if (e.key == 'Enter') {
            handleSubmit(onSubmit);
        }
    };

    useEffect(() => {
        if (isOpen) window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isOpen, onKeyDown]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack
                align="stretch"
                gap="16"
                className={classNames(cls.LoginForm, {}, [className])}
            >
                <Text title="Вход / Регистрация" />
                <VStack max align="stretch">
                    <Label htmlFor="email">Email</Label>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Невалидная почта.',
                            },
                        }}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                id="email"
                                placeholder="Введите email"
                                value={value}
                                onChange={onChange}
                                variant="underline"
                            />
                        )}
                    />
                    {errors?.email?.message && <p>{errors?.email?.message}</p>}
                    {errors?.email?.type === 'required' && (
                        <p role="alert">Email обязательное поле.</p>
                    )}
                </VStack>

                <VStack max align="stretch">
                    <Label htmlFor="pass">Пароль</Label>
                    <Controller
                        name="pass"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                id="pass"
                                type="password"
                                value={value}
                                placeholder="Введите пароль"
                                onChange={onChange}
                                variant="underline"
                            />
                        )}
                    />
                    {errors?.pass?.type === 'required' && (
                        <p role="alert">Пароль обязательное поле.</p>
                    )}
                </VStack>

                <Button variant="border">Войти</Button>
                <span>
                    Нет аккаунта?{' '}
                    <Button
                        type="button"
                        onClick={() => changeStage?.('signUp')}
                        style={{
                            color: 'blue',
                            cursor: 'pointer',
                        }}
                    >
                        Регистрация
                    </Button>
                </span>
            </VStack>
        </form>
    );
};

export default LoginForm;
