import { VStack } from '@/shared/ui/Stack';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Text } from '@/shared/ui/Text';
import { Label } from '@/shared/ui/Label';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import type { StageAuth } from '../AuthUser';
import { signUp } from '../../model/services/signUp';

interface SignUpFormProps {
    onSuccess: () => void;
    changeStage: (stage: StageAuth) => void;
}

interface IFormSignUp {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export const SignUpForm = (props: SignUpFormProps) => {
    const { changeStage, onSuccess } = props;
    const {
        control,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm<IFormSignUp>({
        defaultValues: {
            email: '',
            password: '',
            passwordConfirmation: '',
        },
    });
    const dispatch = useAppDispatch();

    const isPasswordsEqual =
        watch('password') === watch('passwordConfirmation');

    const onSubmit: SubmitHandler<IFormSignUp> = async ({
        email,
        password,
    }) => {
        await dispatch(signUp({ email, password })).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                onSuccess();
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack align="stretch" gap="16">
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
                </VStack>

                <VStack max align="stretch">
                    <Label htmlFor="password">Пароль</Label>
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                id="password"
                                type="password"
                                value={value}
                                placeholder="Введите пароль"
                                onChange={onChange}
                                variant="underline"
                            />
                        )}
                    />
                </VStack>

                <VStack max align="stretch">
                    <Label htmlFor="passwordConfirmation">
                        Повторите пароль
                    </Label>
                    <Controller
                        name="passwordConfirmation"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                id="passwordConfirmation"
                                type="password"
                                value={value}
                                placeholder="Введите пароль"
                                onChange={onChange}
                                variant="underline"
                            />
                        )}
                    />
                    {!isPasswordsEqual && <p>Пароли не совпадают.</p>}
                </VStack>
                <Button variant="border">Зарегистрироваться</Button>
                <span>
                    Уже есть аккаунт?{' '}
                    <Button
                        type="button"
                        onClick={() => changeStage('signIn')}
                        style={{
                            color: 'blue',
                            cursor: 'pointer',
                        }}
                    >
                        Войти
                    </Button>
                </span>
            </VStack>
        </form>
    );
};
