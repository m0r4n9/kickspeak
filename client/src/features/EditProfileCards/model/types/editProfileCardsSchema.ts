import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '../consts/consts.ts';

export interface ProfileSchema {
    data?: Profile;
    isLoading: boolean;
    readonly?: boolean;
    error?: string;
    validateError?: ValidateProfileError[];
}
