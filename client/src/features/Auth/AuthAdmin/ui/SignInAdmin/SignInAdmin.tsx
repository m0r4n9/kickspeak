import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import cls from './SignInAdmin.module.scss';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Label } from '@/shared/ui/Label';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { signInAdmin } from '../../model/services/signInAdmin';

interface SignInForm {
    email: string;
    password: string;
}

export const SignInAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<SignInForm>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const signIn: SubmitHandler<SignInForm> = async ({ email, password }) => {
        await dispatch(signInAdmin({ email, password })).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                navigate('/admin/brands');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(signIn)} className={cls.form}>
            <VStack gap="8">
                <HStack gap="8" max>
                    <Label htmlFor="email" className={cls.label}>
                        Email:
                    </Label>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                id="email"
                                placeholder="Enter email"
                                value={value}
                                onChange={onChange}
                                variant="border"
                                className={cls.input}
                            />
                        )}
                    />
                </HStack>
                <HStack gap="8" max>
                    <Label htmlFor="password" className={cls.label}>
                        Password:
                    </Label>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                value={value}
                                onChange={onChange}
                                variant="border"
                                className={cls.input}
                            />
                        )}
                    />
                </HStack>
            </VStack>
            <HStack justify="end" max className={cls.wrapperBtn}>
                <Button variant="border">Войти</Button>
            </HStack>
        </form>
    );
};
