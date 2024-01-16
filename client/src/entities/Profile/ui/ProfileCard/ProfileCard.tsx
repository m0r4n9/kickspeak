import { memo } from 'react';
import { Profile } from '../../model/types/Profile.ts';
import { ProfileNameCard } from './Cards/ProfileNameCard.tsx';
import { ProfileEmailCard } from './Cards/ProfileEmailCard.tsx';
import { ProfilePhoneCard } from '../ProfileCard/Cards/ProfilePhoneCard.tsx';
import { ValidateProfileError } from '@/features/EditProfileCards/model/consts/consts.ts';

interface ProfileCardProps {
    data?: Profile;
    errors?: ValidateProfileError[];
    isLoading?: boolean;
    readonly?: boolean;
    onChangeName?: (value: string) => void;
    onChangeSurname?: (value: string) => void;
    onChangeEmail?: (value: string) => void;
    onChangePhone?: (value: string) => void;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
    const {
        data,
        errors,
        readonly,
        isLoading,
        onChangeName,
        onChangeSurname,
        onChangeEmail,
        onChangePhone,
    } = props;

    return (
        <div id="wrapper_data">
            <ProfileNameCard
                error={
                    errors?.includes(ValidateProfileError.INCORRECT_USER_DATA)
                        ? errors
                        : undefined
                }
                name={data?.name}
                isLoading={isLoading}
                surname={data?.surname}
                readonly={readonly}
                onChangeName={onChangeName}
                onChangeSurname={onChangeSurname}
            />
            <ProfileEmailCard
                error={
                    errors?.includes(ValidateProfileError.INCORRECT_EMAIL_DATA)
                        ? errors[0]
                        : undefined
                }
                email={data?.email}
                isLoading={isLoading}
                readonly={readonly}
                onChangeEmail={onChangeEmail}
            />
            <ProfilePhoneCard
                error={
                    errors?.includes(ValidateProfileError.INCORRECT_PHONE_DATA)
                        ? errors[0]
                        : undefined
                }
                phone={data?.phoneNumber}
                isLoading={isLoading}
                onChangePhone={onChangePhone}
                readonly={readonly}
            />
        </div>
    );
});
