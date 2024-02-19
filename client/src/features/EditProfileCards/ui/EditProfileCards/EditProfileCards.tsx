import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './EditProfileCards.module.scss';
import { useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

import {
    fetchProfileData,
    getProfileData,
    getProfileError,
    getProfileIsLoading,
    getProfileReadonly,
    updateProfile,
} from '@/features/EditProfileCards';
import { ProfileHeader } from '../ProfileHeader/ProfileHeader.tsx';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';

interface ProfileCardsProps {
    className?: string;
    id?: string;
}

export interface ProfileFieldsForm {
    name: string;
    surname: string;
    email: string;
    phone: string;
}

export const EditProfileCards = (props: ProfileCardsProps) => {
    const { className, id } = props;
    const dispatch = useAppDispatch();
    const { control, reset, handleSubmit } = useForm<ProfileFieldsForm>({
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            phone: '',
        },
    });
    const userData = useSelector(getProfileData);
    const errors = useSelector(getProfileError);
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
            phone: userData?.phoneNumber || '',
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
                        <div className={cls.avatarData}>
                            {userData?.name
                                ? userData.name.charAt(0) +
                                  userData?.surname?.charAt(0)
                                : 'U'}
                        </div>
                    </div>

                    <HStack max justify="between" className={cls.container}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    id="name"
                                    type="text"
                                    value={value}
                                    onChange={onChange}
                                    variant="border"
                                    readOnly={readonly}
                                    disabled={isLoading}
                                    className={cls.Input}
                                />
                            )}
                        />
                        <Controller
                            name="surname"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    id="surname"
                                    type="text"
                                    value={value}
                                    onChange={onChange}
                                    variant="border"
                                    readOnly={readonly}
                                    disabled={isLoading}
                                    className={cls.Input}
                                />
                            )}
                        />
                    </HStack>
                    <div className={cls.accountDesc}>
                        Проверьте правильность ввода личных данных, они
                        необходимы для получения и оформления заказа
                    </div>
                </VStack>

                <VStack
                    gap="24"
                    align="start"
                    max
                    id="email"
                    className={cls.accountItem}
                >
                    <Text title="Электронная почта" size="s" bold />
                    <div className={cls.wrapperEmailInput}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    id="email"
                                    type="email"
                                    value={value}
                                    onChange={onChange}
                                    readOnly={readonly}
                                    variant="border"
                                    disabled={isLoading}
                                    className={cls.Input}
                                    style={{ width: '100%' }}
                                />
                            )}
                        />

                        <div className={cls.accountDesc}>
                            Получайте информацию о состоянии статуса ваших
                            заказов
                        </div>
                    </div>
                </VStack>

                <VStack
                    gap="24"
                    align="start"
                    max
                    id="phone"
                    className={cls.accountItem}
                >
                    <Text title="Номер телефона" size="s" bold />
                    <div className={cls.wrapperEmailInput}>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    type="tel"
                                    //pattern="[7-9]{1}[0-9]{9}"
                                    variant="border"
                                    value={value}
                                    onChange={onChange}
                                    readOnly={readonly}
                                    disabled={isLoading}
                                    className={cls.Input}
                                    style={{ width: '100%' }}
                                />
                            )}
                        />

                        <div className={cls.accountDesc}>
                            Номер телефона необходим для оформления заказа
                        </div>
                    </div>
                </VStack>
            </form>
        </VStack>
    );
};
