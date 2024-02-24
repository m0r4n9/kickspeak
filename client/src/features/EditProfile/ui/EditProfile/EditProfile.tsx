import { classNames } from '@/shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import cls from './EditProfile.module.scss';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData.ts';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError.ts';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly.ts';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading.ts';
import { updateProfile } from '../../model/services/updateProfile/updateProfile.ts';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData.ts';
import { ProfileHeader } from '../ProfileHeader/ProfileHeader.tsx';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Input } from '@/shared/ui/Input';
import { Label } from '@/shared/ui/Label';

interface ProfileCardsProps {
    className?: string;
    id?: string;
}

export interface ProfileFieldsForm {
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
}

export const EditProfile = (props: ProfileCardsProps) => {
    const { className, id } = props;
    const dispatch = useAppDispatch();
    const {
        control,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm<ProfileFieldsForm>({
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            phoneNumber: '',
        },
    });
    const userData = useSelector(getProfileData);
    const errorsFetch = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const isLoading = useSelector(getProfileIsLoading);

    const saveEdit: SubmitHandler<ProfileFieldsForm> = async (data) => {
        dispatch(updateProfile({ id: userData?.id, ...data }));
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    }, [dispatch]);

    const resetForm = useCallback(() => {
        reset({
            name: userData?.name || '',
            surname: userData?.surname || '',
            email: userData?.email || '',
            phoneNumber: userData?.phoneNumber || '',
        });
    }, [userData]);

    useEffect(() => {
        if (userData) resetForm();
    }, [userData]);

    return (
        <VStack
            align="center"
            className={classNames(cls.ProfileCards, {}, [className])}
        >
            <ProfileHeader
                saveEdit={handleSubmit(saveEdit)}
                cancelEdit={resetForm}
            />
            <form>
                <VStack
                    gap="24"
                    align="center"
                    id="name"
                    className={cls.accountItem}
                >
                    <div className={cls.avatar}>
                        <HStack
                            justify="center"
                            align="center"
                            className={cls.avatarData}
                        >
                            {userData?.name
                                ? userData.name.charAt(0) +
                                  userData?.surname?.charAt(0)
                                : 'U'}
                        </HStack>
                    </div>

                    <HStack
                        gap="16"
                        justify="between"
                        max
                        className={cls.container}
                    >
                        <VStack gap="4" max>
                            <Label htmlFor="name">Имя</Label>
                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: true,
                                    maxLength: 50,
                                }}
                                render={({ field: { value, onChange } }) => (
                                    <Input
                                        id="name"
                                        type="text"
                                        value={value}
                                        onChange={onChange}
                                        variant="border"
                                        readOnly={readonly}
                                        disabled={isLoading}
                                        className={classNames(cls.Input, {
                                            [cls.inputError]: Boolean(
                                                errors?.name,
                                            ),
                                        })}
                                    />
                                )}
                            />
                        </VStack>

                        <VStack gap="4" max>
                            <Label htmlFor="surname">Фамилия</Label>
                            <Controller
                                name="surname"
                                control={control}
                                rules={{
                                    required: true,
                                    maxLength: 50,
                                }}
                                render={({ field: { value, onChange } }) => (
                                    <Input
                                        id="surname"
                                        type="text"
                                        value={value}
                                        onChange={onChange}
                                        variant="border"
                                        readOnly={readonly}
                                        disabled={isLoading}
                                        className={classNames(cls.Input, {
                                            [cls.inputError]: Boolean(
                                                errors?.surname,
                                            ),
                                        })}
                                    />
                                )}
                            />
                        </VStack>
                    </HStack>
                    <div className={cls.accountDesc}>
                        Проверьте правильность ввода личных данных, они
                        необходимы для получения и оформления заказа
                    </div>
                </VStack>

                <VStack gap="24" align="start" max className={cls.accountItem}>
                    <Label htmlFor="email">Электронная почта</Label>
                    <VStack max gap="4">
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
                                    type="email"
                                    value={value}
                                    onChange={onChange}
                                    readOnly={readonly}
                                    variant="border"
                                    disabled={isLoading}
                                    className={classNames(cls.Input, {
                                        [cls.inputError]: Boolean(
                                            errors?.email,
                                        ),
                                    })}
                                    style={{ width: '100%' }}
                                />
                            )}
                        />

                        <div className={cls.accountDesc}>
                            {errors?.email?.message}
                            Получайте информацию о состоянии статуса ваших
                            заказов
                        </div>
                    </VStack>
                </VStack>

                <VStack
                    gap="24"
                    align="start"
                    max
                    id="phone"
                    className={cls.accountItem}
                >
                    <Label htmlFor="phoneNumber">Номер телефона</Label>
                    <VStack gap="4" max>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            rules={{
                                minLength: 11,
                                maxLength: 11,
                            }}
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    id="phoneNumber"
                                    type="tel"
                                    //pattern="[7-9]{1}[0-9]{9}"
                                    variant="border"
                                    value={value}
                                    onChange={onChange}
                                    readOnly={readonly}
                                    disabled={isLoading}
                                    className={classNames(cls.Input, {
                                        [cls.inputError]: Boolean(
                                            errors?.phoneNumber,
                                        ),
                                    })}
                                    style={{ width: '100%' }}
                                />
                            )}
                        />

                        <div className={cls.accountDesc}>
                            Номер телефона необходим для оформления заказа
                        </div>
                    </VStack>
                </VStack>
            </form>
        </VStack>
    );
};
