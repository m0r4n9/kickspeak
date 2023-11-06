import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './EditProfileCards.module.scss';
import { useSelector } from 'react-redux';
import { memo, useCallback, useEffect } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { profileActions } from '../../model/slice/profileSlice.ts';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

import {
    fetchProfileData, getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
} from '@/features/EditProfileCards';
import { ProfileHeader } from '../ProfileHeader/ProfileHeader.tsx';
import { ProfileCard } from '@/entities/Profile';

interface ProfileCardsProps {
    className?: string;
    id?: string;
}


export const EditProfileCards = memo((props: ProfileCardsProps) => {
    const { className, id } = props;
    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const errors = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const isLoading = useSelector(getProfileIsLoading);


    useEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    }, [dispatch]);

    const onChangeName = useCallback(
        (value: string) => {
            dispatch(profileActions.updateProfile({ name: value || '' }));
        },
        [dispatch],
    );

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(profileActions.updateProfile({ surname: value || '' }));
        },
        [dispatch],
    );

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(profileActions.updateProfile({ email: value || '' }));
        },
        [dispatch],
    );

    const onChangePhone = useCallback(
        (value: string) => {
            dispatch(
                profileActions.updateProfile({ phoneNumber: value || '' }),
            );
        },
        [dispatch],
    );

    return (
        <VStack
            align="center"
            className={classNames(cls.ProfileCards, {}, [className])}
        >
            <ProfileHeader />
            <ProfileCard
                data={formData}
                errors={errors}
                isLoading={isLoading}
                readonly={readonly}
                onChangeName={onChangeName}
                onChangeSurname={onChangeUsername}
                onChangeEmail={onChangeEmail}
                onChangePhone={onChangePhone}
            />
        </VStack>
    );
});
