import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '../../consts/consts.ts';

export const validateProfile = (profile?: Profile) => {
    if (!profile) {
        return [ValidateProfileError.NO_DATA];
    }

    const errors: ValidateProfileError[] = [];

    const { name, email, phoneNumber } = profile;

    if (!name) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }

    if (!email?.includes('@')) {
        errors.push(ValidateProfileError.INCORRECT_EMAIL_DATA);
    }

    if (phoneNumber?.length !== 11) {
        errors.push(ValidateProfileError.INCORRECT_PHONE_DATA);
    }

    return errors;
};
