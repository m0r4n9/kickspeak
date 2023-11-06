import { UserRole } from '../consts/consts.ts';

export interface User {
    id: string;
    email: string;
    role?: UserRole[];
    accessToken: string;
    refreshToken: string;
}

export interface UserSchema {
    isLoading: boolean;
    authData?: User;
    _inited: boolean;
}
